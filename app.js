/**
 * Application Controller - Ajay Prakash Mahadik Voice Portfolio
 * Continuous Conversational Agent powered by AIBrain (Gemini API + Strict Grounding).
 */

(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const PORTFOLIO_DATA = window.PORTFOLIO_DATA;
    const VoiceAgent = window.VoiceAgent;
    const AIBrain = window.AIBrain;

    if (!PORTFOLIO_DATA || !VoiceAgent) {
      console.error('Missing core data or agent modules.');
      return;
    }

    // Initialize AI Brain
    const brain = AIBrain ? new AIBrain() : null;

    // Screens in Center Canvas
    const canvasOverview = document.getElementById('canvas-overview');
    const canvasProjectCard = document.getElementById('canvas-project-card');
    const canvasInfoCard = document.getElementById('canvas-info-card');

    // Project Card Elements
    const cardTitle = document.getElementById('card-title');
    const cardSubtitle = document.getElementById('card-subtitle');
    const cardTagline = document.getElementById('card-tagline');
    const cardCategory = document.getElementById('card-category');
    const cardBadge = document.getElementById('card-badge');
    const cardNorthStar = document.getElementById('card-north-star');
    const cardMetricsGrid = document.getElementById('card-metrics-grid');
    const cardPrdContainer = document.getElementById('card-prd-container');
    const cardBtnMvp = document.getElementById('card-btn-mvp');
    const btnCloseCard = document.getElementById('btn-close-card');

    // Info Card Elements
    const infoCardType = document.getElementById('info-card-type');
    const infoCardTitle = document.getElementById('info-card-title');
    const infoCardSubtitle = document.getElementById('info-card-subtitle');
    const infoCardBody = document.getElementById('info-card-body');
    const btnCloseInfoCard = document.getElementById('btn-close-info-card');

    // Bottom Dock Controls
    const micBtn = document.getElementById('mic-btn');
    const transcriptPill = document.getElementById('transcript-pill');
    const transcriptPillText = document.getElementById('transcript-pill-text');
    const intentPillsRow = document.getElementById('intent-pills-row');

    // Handoff Toast
    const handoffToast = document.getElementById('handoff-toast');
    const handoffToastMsg = document.getElementById('handoff-toast-msg');

    // AI Settings Modal Elements
    const btnOpenSettings = document.getElementById('btn-open-settings');
    const aiSettingsModal = document.getElementById('ai-settings-modal');
    const btnCloseSettings = document.getElementById('btn-close-settings');
    const inputGeminiKey = document.getElementById('input-gemini-key');
    const btnSaveKey = document.getElementById('btn-save-key');
    const btnClearKey = document.getElementById('btn-clear-key');
    const aiEngineLabel = document.getElementById('ai-engine-label');
    const aiStatusIndicator = document.getElementById('ai-status-indicator');

    let currentActiveProject = null;

    function updateAIEngineUI() {
      if (brain && brain.hasApiKey()) {
        if (aiEngineLabel) aiEngineLabel.textContent = "Live Gemini";
        if (aiStatusIndicator) {
          aiStatusIndicator.className = "w-1.5 h-1.5 rounded-full bg-emerald-400";
        }
      } else {
        if (aiEngineLabel) aiEngineLabel.textContent = "AI Brain";
        if (aiStatusIndicator) {
          aiStatusIndicator.className = "w-1.5 h-1.5 rounded-full bg-sky-400";
        }
      }
    }
    updateAIEngineUI();

    if (btnOpenSettings) {
      btnOpenSettings.addEventListener('click', () => {
        if (brain && inputGeminiKey) {
          inputGeminiKey.value = brain.apiKey || '';
        }
        aiSettingsModal.style.display = 'flex';
      });
    }

    if (btnCloseSettings) {
      btnCloseSettings.addEventListener('click', () => {
        aiSettingsModal.style.display = 'none';
      });
    }

    if (btnSaveKey && inputGeminiKey) {
      btnSaveKey.addEventListener('click', () => {
        const val = inputGeminiKey.value.trim();
        if (brain) {
          brain.setApiKey(val);
          updateAIEngineUI();
        }
        aiSettingsModal.style.display = 'none';
      });
    }

    if (btnClearKey && inputGeminiKey) {
      btnClearKey.addEventListener('click', () => {
        if (brain) {
          brain.setApiKey('');
          inputGeminiKey.value = '';
          updateAIEngineUI();
        }
        aiSettingsModal.style.display = 'none';
      });
    }

    // Initialize Voice Agent
    const agent = new VoiceAgent({
      onStateChange: (state) => {
        updateMicVisualState(state);
      },
      onTranscriptUpdate: (text, isCommitted) => {
        if (text && text.trim().length > 0) {
          transcriptPill.style.display = 'inline-flex';
          if (isCommitted) {
            transcriptPillText.textContent = `Heard: "${text}"`;
          } else {
            transcriptPillText.textContent = text;
          }
        } else {
          transcriptPill.style.display = 'none';
        }
      },
      onKaraokeWord: (word) => {
        if (word && word.trim().length > 0) {
          transcriptPill.style.display = 'inline-flex';
          transcriptPillText.innerHTML = `Speaking: <span class="karaoke-active-word">${word}</span>`;
        }
      },
      onHighlightMetric: (elementId) => {
        highlightMetricElement(elementId);
      },
      onClearHighlights: () => {
        clearMetricHighlights();
      },
      onCommitQuery: (text) => {
        handleUserSpokenInput(text);
      }
    });

    window.portfolioAgent = agent;

    agent.setRecruiterReturnCallback((projectId) => {
      handleRecruiterReturn(projectId);
    });

    /* ------------------------------------------------------------------------
       MIC & VISUALIZER STATUS
       ------------------------------------------------------------------------ */
    function updateMicVisualState(state) {
      micBtn.classList.remove('listening', 'speaking');

      if (state === 'listening') {
        micBtn.classList.add('listening');
        transcriptPill.style.display = 'inline-flex';
        transcriptPillText.textContent = 'Listening for your question...';
      } else if (state === 'speaking') {
        micBtn.classList.add('speaking');
      } else {
        setTimeout(() => {
          if (!agent.isSpeaking && !agent.isListening) {
            transcriptPill.style.display = 'none';
          }
        }, 1000);
      }
    }

    micBtn.addEventListener('click', () => {
      if (!agent.hasGreeted) {
        agent.hasGreeted = true;
        const greeting = "Hi, I am Ajay's Portfolio Agent. What would you like to explore?";
        agent.speak(greeting);
      } else {
        agent.toggleListening();
      }
    });

    /* ------------------------------------------------------------------------
       CONTEXT-AWARE BOTTOM INTENT PILLS
       Switches smartly between Overview prompts and Project Deep-Dive prompts!
       ------------------------------------------------------------------------ */
    const overviewPills = [
      { label: "⚖️ AI Contract Copilot", query: "AI Contract Review Copilot" },
      { label: "📷 Google Photos AI", query: "Google Photos AI Discovery" },
      { label: "🏦 ClariFund Workspace", query: "ClariFund Loan Decision Workspace" },
      { label: "🚗 Park+ Teardown", query: "Park+ Product Teardown" },
      { label: "💼 CredCore Experience", query: "CredCore experience" },
      { label: "🎓 Academic Background", query: "educational background" },
      { label: "🛠️ Skills Taxonomy", query: "skills and competencies" }
    ];

    function getProjectPills(projectId) {
      if (projectId === 'experience') {
        return [
          { label: "📄 200+ Credit Facilities", query: "How many credit agreements did Ajay analyze?" },
          { label: "🤖 n8n & Gemini AI Workflows", query: "What tools do you use for document parsing?" },
          { label: "📊 Covenant Taxonomies", query: "What financial covenants do you interpret?" },
          { label: "💼 6 Core Responsibilities", query: "What are your responsibilities at CredCore?" },
          { label: "← Back to Overview", query: "show overview", isAction: 'overview' }
        ];
      } else if (projectId === 'education') {
        return [
          { label: "🎓 IFIM Law School (2020-2025)", query: "Tell me about IFIM Law School" },
          { label: "🏛️ KSLU Affiliation", query: "What is Karnataka State Law University affiliation?" },
          { label: "🤝 Placement Convenor", query: "What was your role in the placement committee?" },
          { label: "← Back to Overview", query: "show overview", isAction: 'overview' }
        ];
      } else if (projectId === 'legal-copilot') {
        return [
          { label: "⚡ -40% Review Time", query: "What is the median review time metric?" },
          { label: "🛡️ 98% Risk Recall", query: "What is the critical risk recall guardrail?" },
          { label: "🧩 Split-Pane Architecture", query: "Explain the split-pane risk architecture" },
          { label: "🎯 Problem Statement", query: "What problem does Legal Copilot solve?" },
          { label: "← Back to Overview", query: "show overview", isAction: 'overview' }
        ];
      } else if (projectId === 'google-photos') {
        return [
          { label: "🎯 RICE 108 Episodic Anchor", query: "What was the RICE score for episodic retrieval?" },
          { label: "⚠️ WhatsApp Date Flaw", query: "Explain the WhatsApp chronological failure" },
          { label: "📜 4 Canonical Rules", query: "What are the four canonical system rules?" },
          { label: "← Back to Overview", query: "show overview", isAction: 'overview' }
        ];
      } else if (projectId === 'clarifund') {
        return [
          { label: "📊 14.80% True APR", query: "What is the true APR calculation?" },
          { label: "💰 ₹39.2L Net Disbursal", query: "Explain the gross vs net disbursal reconciliation" },
          { label: "🔒 CA Guest Access", query: "How does authenticated guest access work for CAs?" },
          { label: "← Back to Overview", query: "show overview", isAction: 'overview' }
        ];
      } else if (projectId === 'park-plus') {
        return [
          { label: "⏱️ 8-10s Utility Moat", query: "What is the FASTag recharge speed?" },
          { label: "🔄 State-Machine UI", query: "Explain the state-machine recommendation" },
          { label: "📈 3:1 LTV:CAC Target", query: "What is the LTV to CAC target?" },
          { label: "← Back to Overview", query: "show overview", isAction: 'overview' }
        ];
      }
      return overviewPills;
    }

    function renderIntentPills(context = 'overview', contextId = null) {
      intentPillsRow.innerHTML = '';
      const pills = ((context === 'project' || context === 'context') && contextId) ? getProjectPills(contextId) : overviewPills;

      pills.forEach(item => {
        const pill = document.createElement('button');
        pill.className = 'intent-chip-vibrant';
        pill.textContent = item.label;
        pill.addEventListener('click', () => {
          if (item.isAction === 'overview') {
            agent.cancelSpeech();
            showOverview();
          } else {
            handleUserSpokenInput(item.query);
          }
        });
        intentPillsRow.appendChild(pill);
      });
    }

    renderIntentPills('overview');

    /* ------------------------------------------------------------------------
       OVERVIEW CARD INTERACTION HOOKS (Showcase Grid & Topics)
       ------------------------------------------------------------------------ */
    document.querySelectorAll('[data-project-click]').forEach(el => {
      el.addEventListener('click', () => {
        const projectId = el.getAttribute('data-project-click');
        if (projectId) {
          agent.hasGreeted = true;
          showProjectCard(projectId);
        }
      });
    });

    // Story Starter Pills Hook (Option A Mockup)
    document.querySelectorAll('[data-story-query]').forEach(el => {
      el.addEventListener('click', () => {
        const query = el.getAttribute('data-story-query');
        if (query) {
          agent.hasGreeted = true;
          handleUserSpokenInput(query);
        }
      });
    });

    document.querySelectorAll('[data-topic-click]').forEach(el => {
      el.addEventListener('click', () => {
        const topic = el.getAttribute('data-topic-click');
        agent.hasGreeted = true;
        if (topic === 'education') {
          showEducationCard({
            title: "Academic Background & Leadership",
            subtitle: "IFIM Law School, Bangalore • BBA LL.B. (2020 – 2025)",
            voiceResponse: PORTFOLIO_DATA.profile.education.voicePitch,
            data: PORTFOLIO_DATA.profile.education
          });
        } else if (topic === 'experience') {
          showExperienceCard({
            title: "Current Role: CredCore",
            subtitle: "Legal Analyst, Pune (Nov 2025 – Present)",
            voiceResponse: PORTFOLIO_DATA.profile.experience.voicePitch,
            data: PORTFOLIO_DATA.profile.experience
          });
        } else if (topic === 'competencies') {
          showCompetenciesCard({
            title: "Skills & Core Competencies",
            subtitle: "Product Management, LegalTech, FinTech & Commercial Drafting",
            voiceResponse: "Ajay's toolkit combines product discovery and interactive prototyping with specialized legaltech data taxonomies, CLM workflows, and private credit covenant analysis.",
            data: PORTFOLIO_DATA.profile.competencies
          });
        } else if (topic === 'internships') {
          showInternshipsCard({
            title: "Legal Internships & Practice",
            subtitle: "B2B Contracting, Title Due Diligence & Arbitration Research",
            voiceResponse: "Ajay completed intensive internships in commercial contracting at ADReS Now, real estate title due diligence at TruEstate, and consumer arbitration research at the National Law School Bangalore.",
            data: PORTFOLIO_DATA.profile.internships
          });
        } else if (topic === 'fellowship') {
          showFellowshipCard({
            title: PORTFOLIO_DATA.profile.fellowship.title,
            subtitle: "Recognized as Top Fellow Nationwide",
            voiceResponse: PORTFOLIO_DATA.profile.fellowship.summary,
            data: PORTFOLIO_DATA.profile.fellowship
          });
        }
      });
    });

    /* ------------------------------------------------------------------------
       DYNAMIC AI INTENT & REASONING (Gemini API with Strict Grounding)
       ------------------------------------------------------------------------ */
    async function handleUserSpokenInput(query) {
      if (!query || !query.trim()) return;
      agent.hasGreeted = true;

      const activeContext = currentActiveProject ? currentActiveProject.id : (sessionStorage.getItem('active_context_id') || null);

      // Process query through Live AI Brain or Grounded Engine
      const result = brain ? await brain.processQuery(query, activeContext) : PORTFOLIO_DATA.analyzeQuery(query, activeContext);

      const screen = result.screen || result.type;
      const speech = result.speech || result.voiceResponse;

      if (screen === 'project' && result.projectId) {
        showProjectCard(result.projectId, speech, result.highlightMetricId);
      } else if (screen === 'education') {
        showEducationCard({
          title: "Academic Background & Leadership",
          subtitle: "IFIM Law School, Bangalore • BBA LL.B. (2020 – 2025)",
          voiceResponse: speech,
          data: PORTFOLIO_DATA.profile.education
        });
      } else if (screen === 'experience') {
        showExperienceCard({
          title: "Current Role: CredCore",
          subtitle: "Legal Analyst, Pune (Nov 2025 – Present)",
          voiceResponse: speech,
          data: PORTFOLIO_DATA.profile.experience
        });
      } else if (screen === 'fellowship') {
        showFellowshipCard({
          title: "NextLeap Product Management Fellowship (2026)",
          subtitle: "Recognized as Top Fellow",
          voiceResponse: speech,
          data: PORTFOLIO_DATA.profile.fellowship
        });
      } else if (screen === 'internships') {
        showInternshipsCard({
          title: "Legal Internships & Practice",
          subtitle: "B2B Contracting, Title Due Diligence & Arbitration Research",
          voiceResponse: speech,
          data: PORTFOLIO_DATA.profile.internships
        });
      } else if (screen === 'competencies') {
        showCompetenciesCard({
          title: "Skills & Core Competencies",
          subtitle: "Product Management, LegalTech, FinTech & Commercial Drafting",
          voiceResponse: speech,
          data: PORTFOLIO_DATA.profile.competencies
        });
      } else if (screen === 'contact') {
        showContactCard({
          title: "Contact & Credentials",
          subtitle: "Pune, India • ajaymahadik93@gmail.com",
          voiceResponse: speech,
          data: PORTFOLIO_DATA.profile.contact
        });
      } else if (screen === 'guidance') {
        // Helpful clarification: stay on current screen and prompt gently without reciting hero bio!
        transcriptPill.style.display = 'inline-flex';
        transcriptPillText.textContent = "Didn't catch that — ask about projects, CredCore, or education";
        agent.speak(speech);
      } else if (screen === 'bio' || screen === 'overview') {
        showOverview();
        agent.speak(speech);
      } else {
        agent.speak(speech);
      }
    }

    /* ------------------------------------------------------------------------
       VIEW 1: EDUCATION & ACADEMIC CARD
       ------------------------------------------------------------------------ */
    function showEducationCard(result) {
      currentActiveProject = null;
      sessionStorage.setItem('active_context_id', 'education');
      hideAllCanvasViews();
      canvasInfoCard.style.display = 'block';
      renderIntentPills('context', 'education');

      infoCardType.textContent = "Academic Qualifications";
      infoCardTitle.textContent = result.title;
      infoCardSubtitle.textContent = result.subtitle;

      const edu = result.data;
      infoCardBody.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="p-4 rounded-xl bg-white/85 border border-slate-200 shadow-sm">
            <div class="text-[10px] uppercase font-bold text-blue-600 mb-1">Degree & Timeline</div>
            <div class="text-sm font-bold text-slate-900 mb-1">${edu.degree}</div>
            <div class="text-xs text-slate-500">${edu.period} • 5-Year Integrated Law</div>
          </div>
          <div class="p-4 rounded-xl bg-white/85 border border-slate-200 shadow-sm">
            <div class="text-[10px] uppercase font-bold text-emerald-600 mb-1">Institution & Affiliation</div>
            <div class="text-sm font-bold text-slate-900 mb-1">${edu.institution}</div>
            <div class="text-xs text-slate-500">${edu.affiliation}</div>
          </div>
        </div>

        <div class="p-4 rounded-xl bg-white/85 border border-slate-200 mb-3 shadow-sm">
          <div class="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">Leadership & Responsibilities</div>
          <ul class="space-y-1.5 list-disc list-inside text-xs text-slate-700">
            ${edu.positionsOfResponsibility.map(p => `<li>${p}</li>`).join('')}
          </ul>
        </div>
      `;

      agent.speak(result.voiceResponse);
    }

    /* ------------------------------------------------------------------------
       VIEW 2: CREDCORE WORK EXPERIENCE CARD
       ------------------------------------------------------------------------ */
    function showExperienceCard(result) {
      currentActiveProject = null;
      sessionStorage.setItem('active_context_id', 'experience');
      hideAllCanvasViews();
      canvasInfoCard.style.display = 'block';
      renderIntentPills('context', 'experience');

      infoCardType.textContent = "Professional Experience";
      infoCardTitle.textContent = result.title;
      infoCardSubtitle.textContent = result.subtitle;

      const exp = result.data;
      infoCardBody.innerHTML = `
        <div class="p-4 rounded-xl bg-white/85 border border-slate-200 mb-4 flex items-center justify-between shadow-sm">
          <div>
            <div class="text-sm font-bold text-slate-900">${exp.company} • ${exp.role}</div>
            <div class="text-xs text-slate-500">${exp.location} • ${exp.period}</div>
          </div>
          <span class="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">Current Role</span>
        </div>

        <div class="p-4 rounded-xl bg-white/85 border border-slate-200 mb-3 shadow-sm">
          <div class="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">Key Contributions & Technical Execution</div>
          <ul class="space-y-2 list-disc list-inside text-xs text-slate-700">
            ${exp.bullets.map(b => `<li class="leading-relaxed">${b}</li>`).join('')}
          </ul>
        </div>
      `;

      agent.speak(result.voiceResponse);
    }

    /* ------------------------------------------------------------------------
       VIEW 2B: NEXTLEAP FELLOWSHIP CARD
       ------------------------------------------------------------------------ */
    function showFellowshipCard(result) {
      currentActiveProject = null;
      sessionStorage.setItem('active_context_id', 'fellowship');
      hideAllCanvasViews();
      canvasInfoCard.style.display = 'block';
      renderIntentPills('overview');

      infoCardType.textContent = "Fellowship Recognition";
      infoCardTitle.textContent = result.title;
      infoCardSubtitle.textContent = result.subtitle;

      infoCardBody.innerHTML = `
        <div class="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50/70 border border-amber-200/80 mb-4 shadow-sm">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xl">🏆</span>
            <div class="text-sm font-bold text-slate-900">NextLeap Product Management Fellowship (2026)</div>
          </div>
          <p class="text-xs text-slate-700 leading-relaxed">${result.data.summary}</p>
        </div>
      `;

      agent.speak(result.voiceResponse);
    }

    /* ------------------------------------------------------------------------
       VIEW 3: INTERNSHIPS & DUE DILIGENCE CARD
       ------------------------------------------------------------------------ */
    function showInternshipsCard(result) {
      currentActiveProject = null;
      sessionStorage.setItem('active_context_id', 'internships');
      hideAllCanvasViews();
      canvasInfoCard.style.display = 'block';
      renderIntentPills('overview');

      infoCardType.textContent = "Legal Practice & Internships";
      infoCardTitle.textContent = result.title;
      infoCardSubtitle.textContent = result.subtitle;

      const internships = result.data;
      infoCardBody.innerHTML = `
        <div class="space-y-3">
          ${internships.map(item => `
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
              <div class="flex items-center justify-between mb-1">
                <span class="text-xs font-bold text-sky-400">${item.domain}</span>
                <span class="text-[11px] text-slate-400 font-mono">${item.org}</span>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed">${item.details}</p>
            </div>
          `).join('')}
        </div>
      `;

      agent.speak(result.voiceResponse);
    }

    /* ------------------------------------------------------------------------
       VIEW 4: SKILLS & CORE COMPETENCIES CARD
       ------------------------------------------------------------------------ */
    function showCompetenciesCard(result) {
      currentActiveProject = null;
      sessionStorage.setItem('active_context_id', 'competencies');
      hideAllCanvasViews();
      canvasInfoCard.style.display = 'block';
      renderIntentPills('overview');

      infoCardType.textContent = "Skill Taxonomy";
      infoCardTitle.textContent = result.title;
      infoCardSubtitle.textContent = result.subtitle;

      const comp = result.data;
      infoCardBody.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          ${comp.map(c => `
            <div class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 shadow-sm">
              <div class="text-xs font-bold text-sky-400 mb-1.5 uppercase tracking-wide">${c.category}</div>
              <p class="text-xs text-slate-300 leading-relaxed">${c.items}</p>
            </div>
          `).join('')}
        </div>
      `;

      agent.speak(result.voiceResponse);
    }

    /* ------------------------------------------------------------------------
       VIEW 5: CONTACT CARD
       ------------------------------------------------------------------------ */
    function showContactCard(result) {
      currentActiveProject = null;
      sessionStorage.setItem('active_context_id', 'contact');
      hideAllCanvasViews();
      canvasInfoCard.style.display = 'block';
      renderIntentPills('overview');

      infoCardType.textContent = "Contact & Credentials";
      infoCardTitle.textContent = result.title;
      infoCardSubtitle.textContent = result.subtitle;

      infoCardBody.innerHTML = `
        <div class="p-5 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-4">
          <p class="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
            Available for APM and Technical Product Management opportunities at the intersection of AI, LegalTech, and FinTech.
          </p>
          <div class="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a href="mailto:ajaymahadik93@gmail.com" class="btn-primary-action text-xs">
              Email Ajay (ajaymahadik93@gmail.com)
            </a>
            <a href="CV_Ajay_Mahadik.pdf" target="_blank" class="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-xs font-semibold text-white transition-colors">
              Download CV (PDF)
            </a>
          </div>
        </div>
      `;

      agent.speak(result.voiceResponse);
    }

    /* ------------------------------------------------------------------------
       VIEW 6: PROJECT CANVAS (Deep Dive)
       ------------------------------------------------------------------------ */
    function showProjectCard(projectId, customPitch = null, targetMetricId = null) {
      const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
      if (!project) return;

      currentActiveProject = project;
      sessionStorage.setItem('active_project_id', project.id);
      sessionStorage.setItem('active_context_id', project.id);

      hideAllCanvasViews();
      canvasProjectCard.style.display = 'block';

      // Update contextual chips for this project
      renderIntentPills('project', project.id);

      // Left Column
      cardTitle.textContent = project.title;
      cardSubtitle.textContent = project.subtitle;
      cardTagline.textContent = `“${project.tagline}”`;
      cardCategory.textContent = project.category;
      cardBadge.textContent = project.badge;
      cardNorthStar.textContent = project.northStar;

      // Target Metrics
      cardMetricsGrid.innerHTML = '';
      project.highlights.forEach(h => {
        const item = document.createElement('div');
        item.className = 'p-3 rounded-xl bg-slate-900/80 border border-slate-800 news-anchor-highlight shadow-sm';
        item.id = `metric-box-${h.id}`;
        item.innerHTML = `
          <div class="text-[10px] text-slate-400 uppercase tracking-wider mb-0.5">${h.label}</div>
          <div class="text-xl font-bold text-sky-400 mb-0.5">${h.value}</div>
          <div class="text-[11px] text-slate-400 leading-snug">${h.desc}</div>
        `;
        cardMetricsGrid.appendChild(item);
      });

      // Highlight target metric if specified
      if (targetMetricId) {
        setTimeout(() => {
          highlightMetricElement(`metric-box-${targetMetricId}`);
        }, 300);
      }

      // Right Column: Scrollable PRD Document Stream
      cardPrdContainer.innerHTML = `
        <div class="space-y-4 text-xs text-slate-300">
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 news-anchor-highlight" id="card-problem-block">
            <div class="text-[11px] font-semibold text-sky-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <svg class="w-3.5 h-3.5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Problem & Behavioral Opportunity
            </div>
            <p class="leading-relaxed text-slate-200 mb-2.5">${project.problem}</p>
            <div class="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300">
              <span class="font-medium text-emerald-400">Core JTBD:</span> ${project.jtbd}
            </div>
          </div>

          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div class="text-[11px] font-semibold text-purple-400 uppercase tracking-wider mb-1">Operational Scope</div>
            <p class="font-mono text-slate-300 text-[11px]">${project.focusScope}</p>
          </div>

          ${project.keyArtifacts.map(art => `
            <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-800 news-anchor-highlight" id="card-art-${art.metricId}">
              <div class="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider mb-2">${art.title}</div>
              <ul class="space-y-1.5 text-slate-300 list-disc list-inside">
                ${art.points.map(pt => `<li class="leading-relaxed">${pt}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      `;

      // Configure "Launch Live MVP" Button
      cardBtnMvp.href = project.mvpUrl;
      cardBtnMvp.onclick = (e) => {
        e.preventDefault();
        sessionStorage.setItem('mvp_launched_tab', 'true');
        sessionStorage.setItem('active_project_id', project.id);
        window.open(project.mvpUrl, '_blank');
      };

      // Deliver pitch with multimodal news-anchor highlighting
      const pitchText = customPitch || project.voicePitch;
      const highlightMappings = getHighlightMappings(project.id);
      agent.speak(pitchText, { projectId: project.id, highlightMappings });
    }

    function hideAllCanvasViews() {
      canvasOverview.style.display = 'none';
      canvasProjectCard.style.display = 'none';
      canvasInfoCard.style.display = 'none';
    }

    function showOverview() {
      currentActiveProject = null;
      sessionStorage.removeItem('active_project_id');
      sessionStorage.removeItem('active_context_id');
      hideAllCanvasViews();
      canvasOverview.style.display = 'block';
      renderIntentPills('overview');
    }

    if (btnCloseCard) {
      btnCloseCard.addEventListener('click', () => {
        agent.cancelSpeech();
        showOverview();
      });
    }

    if (btnCloseInfoCard) {
      btnCloseInfoCard.addEventListener('click', () => {
        agent.cancelSpeech();
        showOverview();
      });
    }

    const btnHeaderHome = document.getElementById('btn-header-home');
    if (btnHeaderHome) {
      btnHeaderHome.addEventListener('click', () => {
        agent.cancelSpeech();
        showOverview();
      });
    }

    /* ------------------------------------------------------------------------
       MULTIMODAL SYNC MAPPINGS ("News Anchor Effect")
       ------------------------------------------------------------------------ */
    function getHighlightMappings(projectId) {
      if (projectId === 'legal-copilot') {
        return [
          { triggers: ['40%', 'median', 'review time'], elementId: 'metric-box-median-review' },
          { triggers: ['98%', 'critical-risk', 'recall', 'guardrail'], elementId: 'metric-box-risk-recall' },
          { triggers: ['split-pane', 'severity', 'confidence', 'stages', '6-stage'], elementId: 'card-art-risk-architecture' },
          { triggers: ['in-house', 'bottlenecks', 'hours', 'first-pass'], elementId: 'card-problem-block' }
        ];
      } else if (projectId === 'google-photos') {
        return [
          { triggers: ['558', 'friction', 'rows', 'analyzing'], elementId: 'card-art-data-lineage' },
          { triggers: ['44%', 'intent matching', 'bottleneck'], elementId: 'metric-box-intent-matching' },
          { triggers: ['visual intent', 'exif', 'canonical rules', 'clustering'], elementId: 'card-art-rule-visual-intent' },
          { triggers: ['whatsapp', 'overwrite', 'capture dates', '23.5%'], elementId: 'metric-box-temporal-flaw' },
          { triggers: ['108', 'rice', 'ersr'], elementId: 'metric-box-rice-score' }
        ];
      } else if (projectId === 'clarifund') {
        return [
          { triggers: ['14.8%', 'apr', 'true apr', 'kfs'], elementId: 'metric-box-true-apr' },
          { triggers: ['gross', 'disbursals', 'net disbursals', '39.2', 'fees'], elementId: 'metric-box-net-disbursal' },
          { triggers: ['informed decision'], elementId: 'metric-box-informed-decision' },
          { triggers: ['accountants', 'guest access', 'chartered'], elementId: 'card-art-guest-access' }
        ];
      } else if (projectId === 'park-plus') {
        return [
          { triggers: ['eight seconds', '8-10', 'fastag', 'speed'], elementId: 'metric-box-recharge-speed' },
          { triggers: ['state-machine', 'utility mode', 'discovery mode'], elementId: 'card-art-state-machine' },
          { triggers: ['ltv', 'cac', 'ratio', 'retention', 'opt-out'], elementId: 'metric-box-failure-guardrail' }
        ];
      }
      return [];
    }

    function highlightMetricElement(elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        document.querySelectorAll('.active-glow').forEach(node => {
          if (node.id !== elementId) node.classList.remove('active-glow');
        });
        el.classList.add('active-glow');
      }
    }

    function clearMetricHighlights() {
      document.querySelectorAll('.active-glow').forEach(node => {
        node.classList.remove('active-glow');
      });
    }

    /* ------------------------------------------------------------------------
       STATE 4: RECRUITER RETURN DETECTION (Page Visibility API)
       ------------------------------------------------------------------------ */
    function handleRecruiterReturn(projectId) {
      const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
      if (!project) return;

      showProjectCard(projectId, project.voicePitch);

      handoffToastMsg.textContent = `Memory Restored • Welcome back from ${project.title}`;
      handoffToast.style.display = 'flex';

      setTimeout(() => {
        handoffToast.style.display = 'none';
      }, 5000);

      setTimeout(() => {
        agent.speak(project.followUpVoice, {
          projectId: project.id,
          highlightMappings: getHighlightMappings(project.id)
        });
      }, 800);
    }
  });
})();
