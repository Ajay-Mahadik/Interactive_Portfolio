/**
 * AI Brain Engine - Ajay Prakash Mahadik Voice Portfolio
 * 
 * Powered by Google Gemini API with Strict Zero-Hallucination Grounding Protocol.
 * Supports:
 * 1. Live LLM Reasoning (Gemini 1.5 Flash) with JSON schema output
 * 2. Strict system instruction grounding with verified CV, PRDs, and Metrics
 * 3. Fallback to Deterministic Grounded Engine if offline or no key present
 */

(function () {
  class AIBrain {
    constructor() {
      this.apiKey = this.loadApiKey();
      this.model = 'gemini-1.5-flash';
      this.endpoint = 'https://generativelanguage.googleapis.com/v1beta/models';
    }

    loadApiKey() {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlKey = urlParams.get('gemini_key') || urlParams.get('key');
        if (urlKey) {
          localStorage.setItem('gemini_api_key', urlKey);
          return urlKey;
        }
        return localStorage.getItem('gemini_api_key') || (window.CONFIG && window.CONFIG.GEMINI_API_KEY) || '';
      }
      return '';
    }

    setApiKey(key) {
      this.apiKey = (key || '').trim();
      if (typeof window !== 'undefined') {
        localStorage.setItem('gemini_api_key', this.apiKey);
      }
    }

    hasApiKey() {
      return !!this.apiKey && this.apiKey.length > 10;
    }

    /* ------------------------------------------------------------------------
       STRICT SYSTEM PROMPT & AUDITABLE REPOSITORY GROUNDING
       ------------------------------------------------------------------------ */
    buildSystemInstruction() {
      return `You are the voice-first AI Portfolio Agent for Ajay Prakash Mahadik.

CRITICAL GUARDRAILS & ZERO HALLUCINATION POLICY:
1. You MUST ONLY answer based on the verified repository facts provided below.
2. If asked about background, metrics, projects, or credentials not in this repository, you MUST politely abstain: "Ajay's portfolio knowledge base does not cover that specific detail. Feel free to ask about his work at CredCore, his AI Contract Copilot, Google Photos AI, ClariFund, or his academic background."
3. NEVER invent or assume any metrics, dates, companies, or tools.
4. Voice length constraint: Keep 'speech' punchy, conversational, and UNDER 35 WORDS (10-14 seconds of spoken voice).
5. Output format: You MUST return a single valid JSON object with this exact schema:
{
  "speech": "Punchy conversational text spoken out loud (max 35 words)",
  "screen": "project" | "education" | "experience" | "internships" | "competencies" | "contact" | "overview",
  "projectId": "legal-copilot" | "google-photos" | "clarifund" | "park-plus" | null,
  "highlightMetricId": "median-review" | "risk-recall" | "true-apr" | "net-disbursal" | "intent-matching" | "recharge-speed" | null
}

VERIFIED REPOSITORY DATA:
- Identity: Ajay Prakash Mahadik. Current Role: Legal Analyst at CredCore, Pune (Nov 2025 – Present).
- Core Focus: Bridging law and AI product engineering; private credit documentation, legal data taxonomies, automated document-parsing AI (n8n, Gemini API), PRDs, working dashboard prototypes. Seeking APM opportunities.
- Education: BBA LL.B. (2020 – 2025) from IFIM Law School, Bangalore (Affiliated to Karnataka State Law University). Convenor of Internship and Placement Committee (2024), Co-Convenor (2022-2024).
- Fellowship: Top Fellow - NextLeap Product Management Fellowship (2026).
- Project 1 - Legal Copilot (AI Contract Review): Focus: Master Services Agreements (MSAs). Split-pane workspace. Target: -40% median first-pass review time. Quality guardrail: ≥98% critical-risk recall, ≥95% material-risk recall, ≥70% AI-assisted coverage. Separates risk severity from model confidence. Human-in-the-loop. Live MVP: https://ajay-mahadik.github.io/Legal-Copilot/
- Project 2 - Google Photos AI (AI Native Discovery Engine): Problem: 44% behavioral bottleneck at intent matching; 23.5% chronological failure due to WhatsApp/EXIF overwrite; only 2.2% recall explicit dates. S3 Episodic AI Anchor selected with RICE score 108. 4 canonical rules: Visual Intent > EXIF Date, Episodic Clustering, Exact Match Sorting, Conversational Filters. North Star: Episodic Retrieval Success Rate (ERSR). Live MVP: https://googlephotos-mvp-z.netlify.app/
- Project 3 - ClariFund (SME Loan Decision Workspace): Problem: Approved SMEs face hidden fees and buried covenants. 8-step decision layer. Reconciles gross ₹40L loan vs net disbursal ₹39.2L (₹80k fees) and 14.80% true APR vs 12.5% headline. Scoped CA & Co-Director guest access. North Star: Informed Decision Rate. 0.0% unsupported AI answers. Live MVP: https://clarifund-decisionworkplace.netlify.app/
- Project 4 - Park+ Teardown (Utility-to-Commerce Flow): Mission: Digitize car ownership via RC. Frictionless 8-10s FASTag recharge, but pushing car-wash pop-ups at toll queues causes friction. Recommendation: State-machine UI separating Utility Mode from Discovery Mode. Target: 2x conversion, 70% MoM retention, 3:1 LTV to CAC.
- CredCore Details: Deconstructed 200+ private credit agreements to map financial covenants and payment waterfalls into structured data schemas.
- Internships: ADReS Now (commercial B2B contracts), TruEstate (real estate title due diligence), NLSIU Bangalore (dispute & arbitration research).
- Links: LinkedIn (linkedin.com/in/ajay-mahadik-09/), GitHub (github.com/Ajay-Mahadik), NextLeap (nextleap.app/portfolio/ajay-mahadik).`;
    }

    /* ------------------------------------------------------------------------
       LIVE AI INTENT & REASONING (Gemini API with Fallback)
       ------------------------------------------------------------------------ */
    async processQuery(userQuery, activeContext = null) {
      const rawQuery = (userQuery || '').trim();
      const PORTFOLIO_DATA = window.PORTFOLIO_DATA;

      if (!rawQuery) {
        return {
          speech: "I am listening. Ask about Ajay's CredCore work, education, or any of his four AI projects.",
          screen: "overview",
          projectId: null,
          highlightMetricId: null
        };
      }

      // If API key is available, execute live Gemini reasoning
      if (this.hasApiKey()) {
        try {
          const liveResult = await this.callGeminiAPI(rawQuery, activeContext);
          if (liveResult && liveResult.speech) {
            return liveResult;
          }
        } catch (err) {
          console.warn('Live Gemini AI call failed or timed out. Falling back to deterministic engine:', err);
        }
      }

      // Deterministic Fallback Engine (Guarantees zero downtime and zero hallucination)
      const fallback = PORTFOLIO_DATA ? PORTFOLIO_DATA.analyzeQuery(rawQuery, activeContext) : {
        type: 'guidance',
        voiceResponse: "I'm listening. You can ask about Ajay's CredCore work, education, or explore his AI projects like Legal Copilot and Google Photos."
      };

      return {
        speech: fallback.voiceResponse,
        screen: fallback.type,
        projectId: fallback.projectId || null,
        highlightMetricId: fallback.highlightMetricId || null,
        fallbackData: fallback.data || null,
        fallbackTitle: fallback.title || null,
        fallbackSubtitle: fallback.subtitle || null
      };
    }

    async callGeminiAPI(userQuery, activeContext = null) {
      const url = `${this.endpoint}/${this.model}:generateContent?key=${this.apiKey}`;

      const contextPrefix = activeContext ? `[Active Screen Context: Currently viewing project "${activeContext}"]\n` : '';
      const promptText = `${contextPrefix}User Question: "${userQuery}"`;

      const requestBody = {
        system_instruction: {
          parts: [{ text: this.buildSystemInstruction() }]
        },
        contents: [
          {
            role: "user",
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
          temperature: 0.1, // Near-zero temperature for strict deterministic adherence
          topP: 0.8,
          response_mime_type: "application/json"
        }
      };

      // Strict 2800ms latency envelope: prevents UI from hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2800);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini API error (${response.status}): ${errText}`);
      }

      const data = await response.json();
      const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!candidateText) {
        throw new Error('No candidate content returned from Gemini.');
      }

      // Parse structured JSON
      const parsed = JSON.parse(candidateText);
      return {
        speech: parsed.speech || '',
        screen: parsed.screen || 'overview',
        projectId: parsed.projectId || null,
        highlightMetricId: parsed.highlightMetricId || null,
        isLiveAI: true
      };
    }
  }

  // Universal export to window
  if (typeof window !== 'undefined') {
    window.AIBrain = AIBrain;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AIBrain };
  }
})();
