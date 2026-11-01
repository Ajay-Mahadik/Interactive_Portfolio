/**
 * VoiceAgent Core Engine - Ajay Prakash Mahadik Voice Portfolio
 * 
 * Progressive Multi-Turn Conversational Voice Engine:
 * - Original Natural Voice Selection: Restores smooth, friendly browser voice (Google US English, Samantha, Jenny, Natural)
 * - Safe Multi-Turn SpeechRecognition: Bulletproof audio stream lifecycle with graceful silence timeouts
 * - Absolute Interruptibility: Instant mic cutoff and audio reset without deadlock
 * - Multimodal Synchronization: News-anchor glowing and karaoke word tracking
 * - Automatic Progressive Turn-Taking loop with non-blocking transitions
 * - State 4 Page Visibility Memory Handoff
 */

class VoiceAgent {
  constructor({ onStateChange, onTranscriptUpdate, onKaraokeWord, onHighlightMetric, onClearHighlights, onCommitQuery }) {
    this.onStateChange = onStateChange || (() => {});
    this.onTranscriptUpdate = onTranscriptUpdate || (() => {});
    this.onKaraokeWord = onKaraokeWord || (() => {});
    this.onHighlightMetric = onHighlightMetric || (() => {});
    this.onClearHighlights = onClearHighlights || (() => {});
    this.onCommitQuery = onCommitQuery || (() => {});

    this.currentState = 'standby'; // 'standby' | 'listening' | 'speaking' | 'canvas'
    this.isListening = false;
    this.isRecognizing = false;
    this.isSpeaking = false;
    this.recognition = null;
    this.currentUtterance = null;
    this.activeProjectId = null;
    this.hasGreeted = false;
    this.turnDebounceTimer = null;
    this.safetyEndTimer = null;
    this.accumulatedTranscript = '';

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognitionAvailable = !!SpeechRecognition;

    // Load available voices
    this.preferredVoice = null;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }

    // State 4 Page Visibility Memory Listener
    this.setupPageVisibilityListener();
  }

  /* ------------------------------------------------------------------------
     NATURAL ORIGINAL VOICE SELECTOR (Excludes robotic SAPI David / Zira)
     ------------------------------------------------------------------------ */
  loadVoices() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      const voices = window.speechSynthesis.getVoices();
      if (!Array.isArray(voices) || voices.length === 0) return;

      // 1. Google US English (Original natural browser voice)
      const googleVoice = voices.find(v => {
        const n = (v.name || '').toLowerCase();
        const l = (v.lang || '').toLowerCase();
        return l.startsWith('en') && n.includes('google') && n.includes('us');
      }) || voices.find(v => {
        const n = (v.name || '').toLowerCase();
        const l = (v.lang || '').toLowerCase();
        return l.startsWith('en') && n.includes('google');
      });

      if (googleVoice) {
        this.preferredVoice = googleVoice;
        return;
      }

      // 2. Microsoft Natural Online voices (Edge/Windows)
      const naturalVoice = voices.find(v => {
        const n = (v.name || '').toLowerCase();
        const l = (v.lang || '').toLowerCase();
        return l.startsWith('en') && (n.includes('natural') || n.includes('jenny') || n.includes('aria') || n.includes('guy'));
      });
      if (naturalVoice) {
        this.preferredVoice = naturalVoice;
        return;
      }

      // 3. Apple Samantha / Daniel
      const appleVoice = voices.find(v => {
        const n = (v.name || '').toLowerCase();
        const l = (v.lang || '').toLowerCase();
        return l.startsWith('en') && (n.includes('samantha') || n.includes('daniel'));
      });
      if (appleVoice) {
        this.preferredVoice = appleVoice;
        return;
      }

      // 4. Any English voice that is NOT David, Zira, Desktop (avoid robotic SAPI)
      const cleanEnVoice = voices.find(v => {
        const n = (v.name || '').toLowerCase();
        const l = (v.lang || '').toLowerCase();
        return l.startsWith('en') && !n.includes('david') && !n.includes('zira') && !n.includes('desktop');
      });
      if (cleanEnVoice) {
        this.preferredVoice = cleanEnVoice;
        return;
      }

      // 5. Fallback: browser default English voice
      this.preferredVoice = voices.find(v => (v.lang || '').startsWith('en')) || voices[0] || null;
    } catch (e) {
      this.preferredVoice = null;
    }
  }

  setState(newState) {
    this.currentState = newState;
    this.onStateChange(newState);
  }

  /* ------------------------------------------------------------------------
     MULTI-TURN SPEECH RECOGNITION (Zero-Collision Audio Stream Manager)
     Reuses a single persistent SpeechRecognition instance to avoid
     Chrome re-prompting for microphone permission on every turn.
     ------------------------------------------------------------------------ */
  initRecognition() {
    if (this.recognition) return; // Already initialized

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      const navLang = (typeof navigator !== 'undefined' && navigator.language) ? navigator.language : 'en-US';
      rec.lang = navLang.startsWith('en') ? navLang : 'en-US';

      rec.onstart = () => {
        this.isRecognizing = true;
        this.setState('listening');
        this.onTranscriptUpdate('Listening... Speak your question', false);
      };

      rec.onresult = (event) => {
        if (!this.isListening) return; // Ignore results when not actively listening

        let interim = '';
        let final = '';

        for (let i = 0; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript + ' ';
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        const heardText = (final + interim).trim();
        if (!heardText) return;

        this.accumulatedTranscript = heardText;
        this.onTranscriptUpdate(heardText, false);

        if (this.turnDebounceTimer) clearTimeout(this.turnDebounceTimer);

        // Smart silence pause: 1200ms allows user to finish natural full sentences without premature cut-off
        const waitMs = final.trim().length > 0 ? 1200 : 1800;
        this.turnDebounceTimer = setTimeout(() => {
          if (this.accumulatedTranscript && this.isListening && !this.isSpeaking) {
            this.commitTurn(this.accumulatedTranscript);
          }
        }, waitMs);
      };

      rec.onerror = (err) => {
        if (err.error === 'not-allowed') {
          this.isListening = false;
          this.isRecognizing = false;
          this.recognition = null; // Must recreate after permission denial
          this.setState(this.activeProjectId ? 'canvas' : 'standby');
          this.onTranscriptUpdate('Microphone access blocked. Click any prompt chip below.', false);
        } else if (err.error === 'no-speech') {
          // Graceful silence timeout - release mic cleanly
          this.isRecognizing = false;
          this.isListening = false;
          this.setState(this.activeProjectId ? 'canvas' : 'standby');
          this.onTranscriptUpdate('Tap mic or prompt chip to speak', false);
        } else if (err.error === 'aborted') {
          this.isRecognizing = false;
        }
      };

      rec.onend = () => {
        this.isRecognizing = false;

        // If still in listening mode, Chrome auto-stopped (e.g. silence/network) → restart seamlessly
        if (this.isListening && !this.isSpeaking) {
          // Check for uncommitted speech first
          if (this.accumulatedTranscript) {
            const clean = this.accumulatedTranscript.trim();
            if (clean.length >= 3 && !/^(uh|um|ah|oh|ok|okay|a|the|so|and)$/i.test(clean)) {
              this.commitTurn(this.accumulatedTranscript);
              return;
            }
          }

          // Auto-restart recognition to keep the session alive without re-prompting
          setTimeout(() => {
            if (this.isListening && !this.isSpeaking && this.recognition && !this.isRecognizing) {
              try {
                this.recognition.start();
              } catch (e) {
                // Already started or DOM error; ignore
              }
            }
          }, 120);
          return;
        }

        // Fully stopped
        if (!this.isSpeaking) {
          this.isListening = false;
          this.setState(this.activeProjectId ? 'canvas' : 'standby');
          this.onTranscriptUpdate('Tap mic or prompt chip to speak', false);
        }
      };

      this.recognition = rec;
    } catch (err) {
      this.isRecognizing = false;
      this.recognition = null;
    }
  }

  startListening() {
    if (this.isSpeaking) {
      this.cancelSpeech();
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.onTranscriptUpdate('Speech recognition unavailable in this browser. Tap any prompt chip below.', false);
      return;
    }

    this.isListening = true;
    this.accumulatedTranscript = '';
    this.setState('listening');
    this.onTranscriptUpdate('Listening... Speak your question', false);

    // Initialize the persistent recognition instance if needed
    this.initRecognition();

    // Start (or restart) the existing instance — no new permission prompt
    setTimeout(() => {
      if (this.recognition && !this.isRecognizing) {
        try {
          this.recognition.start();
        } catch (e) {
          // If start fails (e.g. already running), abort and retry once
          try {
            this.recognition.abort();
          } catch (_) {}
          setTimeout(() => {
            if (this.recognition && !this.isRecognizing && this.isListening) {
              try { this.recognition.start(); } catch (_) {}
            }
          }, 150);
        }
      }
    }, 80);
  }

  commitTurn(text) {
    if (this.turnDebounceTimer) clearTimeout(this.turnDebounceTimer);
    this.turnDebounceTimer = null;
    const cleanText = (text || '').trim();
    this.accumulatedTranscript = '';

    // Ignore empty string or single filler noise
    if (cleanText.length < 3 || /^(uh|um|ah|oh|ok|okay|a|the|so|and)$/i.test(cleanText)) {
      return;
    }

    // Stop microphone before AI delivers vocal response
    this.stopListening();
    this.onTranscriptUpdate(cleanText, true);
    this.onCommitQuery(cleanText);
  }

  stopListening() {
    this.isListening = false;
    if (this.turnDebounceTimer) clearTimeout(this.turnDebounceTimer);

    // Stop the recognition stream but KEEP the instance alive for reuse
    if (this.recognition && this.isRecognizing) {
      try {
        this.recognition.stop(); // Graceful stop (not abort/destroy)
      } catch (e) {}
    }
    this.isRecognizing = false;

    if (this.currentState === 'listening') {
      this.setState(this.activeProjectId ? 'canvas' : 'standby');
    }
  }

  /* ------------------------------------------------------------------------
     ABSOLUTE INTERRUPTIBILITY
     ------------------------------------------------------------------------ */
  cancelSpeech() {
    if (this.safetyEndTimer) {
      clearTimeout(this.safetyEndTimer);
      this.safetyEndTimer = null;
    }

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      if (this.currentUtterance) {
        this.currentUtterance.onend = null;
        this.currentUtterance.onerror = null;
        this.currentUtterance.onboundary = null;
        this.currentUtterance = null;
      }
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    this.isSpeaking = false;
    this.onClearHighlights();
    this.onKaraokeWord('');
  }

  interrupt() {
    if (this.turnDebounceTimer) clearTimeout(this.turnDebounceTimer);
    this.accumulatedTranscript = '';

    this.cancelSpeech();

    this.setState('listening');
    this.onTranscriptUpdate('Listening for your question...', false);

    setTimeout(() => {
      this.startListening();
    }, 100);
  }

  toggleListening() {
    if (this.isSpeaking) {
      this.interrupt();
    } else if (this.isListening) {
      // User tapped mic while listening -> refresh and keep listening with high responsiveness
      this.accumulatedTranscript = '';
      this.onTranscriptUpdate('Listening... Speak now', false);
    } else {
      this.startListening();
    }
  }

  /* ------------------------------------------------------------------------
     SPEECH SYNTHESIS & MULTIMODAL SYNC ("News Anchor Effect")
     ------------------------------------------------------------------------ */
  speak(text, { projectId = null, highlightMappings = [] } = {}) {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.warn('Speech synthesis not supported in this browser.');
      return;
    }

    // Stop listening so mic does not capture speaker audio
    this.stopListening();

    // Cancel prior speech if actively speaking with safe buffer
    if (window.speechSynthesis.speaking) {
      this.cancelSpeech();
      setTimeout(() => {
        this.doSpeak(text, { projectId, highlightMappings });
      }, 80);
      return;
    }

    this.doSpeak(text, { projectId, highlightMappings });
  }

  doSpeak(text, { projectId = null, highlightMappings = [] } = {}) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {}

    this.activeProjectId = projectId;
    this.isSpeaking = true;
    this.setState('speaking');

    const utterance = new SpeechSynthesisUtterance(text);
    if (!this.preferredVoice) {
      this.loadVoices();
    }
    if (this.preferredVoice) {
      utterance.voice = this.preferredVoice;
    }
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onboundary = (event) => {
      if (event.name === 'word') {
        const charIndex = event.charIndex;
        const spokenSubstr = text.substring(charIndex).split(/\s+/)[0] || '';

        this.onKaraokeWord(spokenSubstr);

        if (highlightMappings && highlightMappings.length > 0) {
          const scanWindow = text.substring(Math.max(0, charIndex - 18), Math.min(text.length, charIndex + 28)).toLowerCase();
          for (const item of highlightMappings) {
            const matches = item.triggers.some(trigger => scanWindow.includes(trigger.toLowerCase()));
            if (matches) {
              this.onHighlightMetric(item.elementId);
            }
          }
        }
      }
    };

    utterance.onend = () => {
      this.handleSpeechComplete();
    };

    utterance.onerror = () => {
      this.handleSpeechComplete();
    };

    // Safety End Timer: ensures the agent never hangs if Chrome drops onend event
    const wordCount = (text || '').split(/\s+/).length;
    const safetyMs = Math.max(3000, (wordCount / 2.2) * 1000 + 2000);
    if (this.safetyEndTimer) clearTimeout(this.safetyEndTimer);
    this.safetyEndTimer = setTimeout(() => {
      if (this.isSpeaking) {
        this.handleSpeechComplete();
      }
    }, safetyMs);

    this.currentUtterance = utterance;
    try {
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      this.handleSpeechComplete();
    }
  }

  handleSpeechComplete() {
    if (this.safetyEndTimer) {
      clearTimeout(this.safetyEndTimer);
      this.safetyEndTimer = null;
    }

    this.isSpeaking = false;
    this.currentUtterance = null;
    setTimeout(() => {
      this.onClearHighlights();
      this.onKaraokeWord('');
    }, 400);

    // Enter clean ready state
    this.setState(this.activeProjectId ? 'canvas' : 'standby');
    this.onTranscriptUpdate('Tap mic or prompt chip to ask follow-up', false);

    // PROGRESSIVE TURN-TAKING: Automatically resumes listening for the next question!
    setTimeout(() => {
      if (!this.isSpeaking && !this.isListening) {
        this.startListening();
      }
    }, 450);
  }

  /* ------------------------------------------------------------------------
     STATE 4: HANDOFF & MEMORY (Page Visibility API)
     ------------------------------------------------------------------------ */
  setupPageVisibilityListener() {
    if (typeof document === 'undefined') return;
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        const mvpLaunched = sessionStorage.getItem('mvp_launched_tab');
        const activeProjId = sessionStorage.getItem('active_project_id');

        if (mvpLaunched === 'true' && activeProjId) {
          sessionStorage.removeItem('mvp_launched_tab');
          if (this.onRecruiterReturnCallback) {
            this.onRecruiterReturnCallback(activeProjId);
          }
        }
      }
    });
  }

  setRecruiterReturnCallback(callback) {
    this.onRecruiterReturnCallback = callback;
  }
}

// Universal export
if (typeof window !== 'undefined') {
  window.VoiceAgent = VoiceAgent;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VoiceAgent };
}
