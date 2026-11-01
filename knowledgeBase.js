/**
 * Ajay Prakash Mahadik - Grounded Knowledge Base & Active Semantic Analyzer
 * STRICT GUARDRAIL: ZERO HALLUCINATION.
 * Grounded in verified CV, PRDs, and LinkedIn data.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Ajay Prakash Mahadik",
    title: "Legal Analyst at CredCore | AI & LegalTech Product Builder",
    currentRole: "Legal Analyst, CredCore, Pune (Nov 2025 – Present)",
    contact: {
      phone: "+91 8010605913",
      email: "ajaymahadik93@gmail.com",
      location: "Pune, India"
    },
    links: {
      linkedin: "https://www.linkedin.com/in/ajay-mahadik-09/",
      github: "https://github.com/Ajay-Mahadik",
      nextleap: "https://nextleap.app/portfolio/ajay-mahadik",
      cvFile: "CV_Ajay_Mahadik.pdf"
    },
    headshot: "ajay-headshot.jpg",
    
    // Short, punchy, conversational bio
    shortBio: "Product-focused legal professional at CredCore specializing in private credit documentation and automated document-parsing AI workflows (n8n, Gemini API). Bridges regulatory logic with product execution to build intuitive, high-recall digital workspaces.",
    shortBioSpeech: "I’m Ajay Mahadik, a legal analyst at CredCore. I bridge regulatory logic and product execution—building high-recall AI review workflows, private credit data schemas, and deterministic prototypes.",
    
    education: {
      degree: "BBA LL.B. (5-Year Integrated Law Degree)",
      period: "2020 – 2025",
      institution: "IFIM Law School, Bangalore",
      affiliation: "Affiliated to Karnataka State Law University (KSLU)",
      positionsOfResponsibility: [
        "Convenor of Internship and Placement Committee at IFIM Law School [2024]",
        "Co-Convenor of Placement Committee at IFIM Law School [2022-2024]"
      ],
      voicePitch: "Ajay completed his 5-year integrated BBA LL.B. at IFIM Law School, Bangalore, affiliated to Karnataka State Law University, graduating in 2025. He served as Placement Committee Convenor and Co-Convenor."
    },

    experience: {
      role: "Legal Analyst",
      company: "CredCore",
      location: "Pune, India",
      period: "Nov 2025 – Present",
      bullets: [
        "Deconstructed 200 + complex private credit agreements (including bespoke facilities, intercreditor terms, and amendments) to extract and map critical financial covenants, pricing mechanics, and payment waterfalls into structured data schemas.",
        "Reviewed and validated data extracted by junior analysts, ensuring accuracy and completeness across high-value transactions.",
        "Provided legal interpretation on covenants, events of default, PIK provisions, and representations & warranties; flagged risk anomalies and operational inefficiencies.",
        "Served as subject matter expert for Legal, Product, and Operations teams, translating complex documentation into clear, actionable insights for strategic decision-making.",
        "Drove process optimization by streamlining data extraction workflows, building legal data taxonomies, and collaborating with tech teams on document-parsing tools.",
        "Extracted and codified borrower compliance obligations embedded within financial instruments, ensuring accurate representation of contractual terms."
      ],
      voicePitch: "At CredCore, Ajay deconstructs private credit agreements to extract covenants, payment waterfalls, and compliance rules into structured schemas, collaborating with engineering to automate document-parsing tools using Gemini and n8n."
    },

    internships: [
      {
        domain: "Commercial Contracting & Corporate",
        org: "ADReS Now! | Rights & Marks",
        details: "Drafted and structured high-value B2B commercial agreements (MoUs, NDAs, Service Agreements, Employment Contracts) and conducted IP research across Trademarks, Patents, and Copyrights."
      },
      {
        domain: "Real Estate & Title Due Diligence",
        org: "TruEstate / IQOL Tech",
        details: "Managed legal processes for court/bank-auctioned properties, executing title verification, due diligence, and property documentation digitization."
      },
      {
        domain: "Regulatory & Dispute Research",
        org: "NLSIU Bangalore | Sampat’s Law Office | High Court/Dist. Research",
        details: "Conducted cross-border dispute research for e-commerce, consumer protection, and arbitration frameworks; authored briefs for consumer and corporate disputes."
      }
    ],

    fellowship: {
      title: "Top Fellow - NextLeap Product Management Fellowship (2026)",
      summary: "Recognized as Top Fellow. Authored extensive PRDs for Google Photos AI Cognitive Discovery and ClariFund SME Loan Workspace, achieving top evaluation honors."
    },

    competencies: [
      {
        category: "Product Management",
        items: "User Research, PRD Authoring, Product Discovery, Metrics & Analytics, Roadmapping, Interactive Prototyping, Vibe Coding (Anti-Gravity), AI-Assisted Design (Claude, Gemini), UI/UX Wireframing, SQL/Excel"
      },
      {
        category: "Legaltech & Operations",
        items: "Legal Data Taxonomies, Document Parsing AI, Contract Lifecycle Management (CLM), Data Extraction & Structuring, Process Optimization"
      },
      {
        category: "Fintech & Private Credit",
        items: "Private Credit Documentation, Financial Covenants, Risk Assessment & Mitigation, Compliance Obligations, Deal Structuring"
      },
      {
        category: "Commercial & Corporate",
        items: "Contract Drafting & Vetting (MoUs, NDAs, Service Agreements), Legal Due Diligence, Corporate Compliance, Intellectual Property (IPR)"
      }
    ]
  },

  projects: [
    {
      id: "legal-copilot",
      title: "AI Contract Review Copilot",
      subtitle: "LegalTech PRD & Interactive Prototype",
      tagline: "A web-based legal decision-support workspace for faster, safer first-pass review of commercial contracts.",
      northStar: "Compress 'read the whole contract' into 'know what deserves my attention first.'",
      focusScope: "Master Services Agreements (MSAs) • Desktop Web App • Human-in-the-loop",
      mvpUrl: "https://ajay-mahadik.github.io/Legal-Copilot/",
      category: "LegalTech AI",
      badge: "Flagship LegalTech MVP",
      problem: "In-house commercial lawyers spend substantial time on repetitive first-pass contract reviews, particularly identifying deviations from company-approved positions. This creates review bottlenecks without compromising legal accuracy or lawyer control.",
      jtbd: "When I receive a contract that needs legal review, I want to quickly identify material deviations and other potential risks, understand why they matter, and decide what to do next—so I can focus my time on issues that genuinely require legal judgment.",
      
      voicePitch: "I engineered Legal Copilot to solve contract bottlenecks for in-house teams. Its split-pane workspace separates risk severity from model confidence, targeting a 40% cut in review time with a 98% critical-risk recall guardrail. The lawyer retains final judgment.",
      
      followUpVoice: "Welcome back! What did you think of the split-pane redlining interface and the 98% critical-risk recall guardrail?",
      
      highlights: [
        { id: "median-review", label: "Median Review Time", value: "-40%", desc: "Target reduction in median first-pass review time using timestamps." },
        { id: "risk-recall", label: "Critical-Risk Recall", value: "≥98%", desc: "Strict quality envelope guardrail for critical legal findings." },
        { id: "assisted-coverage", label: "AI-Assisted Coverage", value: "≥70%", desc: "% of clauses reviewed with direct AI assistance." },
        { id: "material-recall", label: "Material-Risk Recall", value: "≥95%", desc: "Benchmark recall across all material contract deviations." }
      ],

      keyArtifacts: [
        {
          title: "Architecture & Risk Pipeline",
          metricId: "risk-architecture",
          points: [
            "6-stage pipeline: Extract structure → Classify legal category → Compare with Playbook → Assess impact/likelihood/evidence → Classify (High/Med/Potential/Standard) → Prioritize.",
            "Crucial Rule: Risk severity and model confidence are separate dimensions. High-impact / lower-confidence findings surface as 'Potential Risk — Needs Review' to eliminate alert fatigue without silent downgrades.",
            "Explainability by design: Every AI finding links directly to the source clause and matching company playbook rule."
          ]
        },
        {
          title: "User Experience Design",
          metricId: "ux-principles",
          points: [
            "Split-pane layout: Clause Map + Raw Source Text + AI Reasoning Panel.",
            "Instant redlining: One-click fallback language generation, in-line comments, and direct escalation paths.",
            "Explicit non-goals: No autonomous AI signing, no autonomous negotiation, no open-ended generic chatbot."
          ]
        }
      ]
    },

    {
      id: "google-photos",
      title: "Google Photos AI Discovery Engine",
      subtitle: "Graduation PM Case Study (NextLeap Top Fellow)",
      tagline: "2 Billion Users, Infinite Storage. The Category Discovery Paradox.",
      northStar: "Episodic Retrieval Success Rate (ERSR)",
      focusScope: "Cognitive Retrieval Layer • Gemini AI • Streamlit MVP",
      mvpUrl: "https://googlephotos-mvp-z.netlify.app/",
      category: "Consumer AI / Search",
      badge: "Graduation Project",
      problem: "Users experience high search failure rates due to chronological metadata mismatch—such as third-party platforms (WhatsApp) overwriting capture dates with transfer dates. This breaks retrieval even when users accurately recall the specific episodic context.",
      jtbd: "When I remember a meaningful life moment by visual context, people, or events, I want Google Photos to find the exact memory even if third-party apps corrupted the original timestamp.",

      voicePitch: "Google Photos search breaks when WhatsApp overwrites photo capture dates. Analyzing 558 user friction rows, I found 44% drop-off at intent matching. I built a Gemini-powered MVP where visual intent overrides broken EXIF dates, boosting episodic retrieval.",

      followUpVoice: "Welcome back! Did you test how the Gemini engine re-anchors the 2021 winter trip photo despite its 2026 WhatsApp timestamp?",

      highlights: [
        { id: "intent-matching", label: "Intent Matching Bottleneck", value: "44%", desc: "Largest survey bottleneck pinpointed in retrieval funnel (n=21)." },
        { id: "temporal-flaw", label: "Chronological Failure", value: "23.5%", desc: "Largest coded metadata failure across 549 classifiable user reviews." },
        { id: "cognitive-gap", label: "Explicit Date Recall", value: "2.2%", desc: "Only 2.2% of users recall explicit calendar dates; 77% rely on episodic memories." },
        { id: "rice-score", label: "Episodic AI Anchor RICE", value: "108", desc: "Outranked Heuristic EXIF Override (63) and UI Prompt (40)." }
      ],

      keyArtifacts: [
        {
          title: "Audited Evidence Base",
          metricId: "data-lineage",
          points: [
            "Implemented pipeline ingesting reviews from Google Play (87.5%), Reddit (6.9%), and App Store (5.6%).",
            "558 AI_Insights rows generated; 551 clean analyzed rows; 464 classified as high severity.",
            "Archetype segmentation: Episodic Reminiscer (77.0%), Visual Fragments (12.2%), Ephemeral Utility (10.5%)."
          ]
        },
        {
          title: "The 4 Canonical System Rules",
          metricId: "rule-visual-intent",
          points: [
            "Rule 1: Visual Intent > EXIF Date (strong contextual match outranks stale stored transfer date).",
            "Rule 2: Episodic Clustering (groups related photos across multi-month journeys like kitchen renovations).",
            "Rule 3: Exact Match Sorting (high-confidence direct matches first; looser context below).",
            "Rule 4: Generate Conversational Filters (follow-up chips to resolve missing anchors)."
          ]
        }
      ]
    },

    {
      id: "clarifund",
      title: "ClariFund: SME Loan Decision Workspace",
      subtitle: "FinTech PRD & Live Decision Workspace",
      tagline: "Helping approved SMEs understand loan offers and make confident, informed decisions.",
      northStar: "Informed Decision Rate",
      focusScope: "SME Commercial Term Loan • Post-Approval Decision Layer • Web App",
      mvpUrl: "https://clarifund-decisionworkplace.netlify.app/",
      category: "FinTech / Decision Systems",
      badge: "FinTech PRD & MVP",
      problem: "Approved SME borrowers struggle to understand total economic cost (headline rate vs APR), fee deductions, and buried covenants (personal guarantees, DSCR ≥ 1.25×), contributing to delayed decisions and drop-off.",
      jtbd: "When I receive an approved loan offer for my business, I want to quickly understand its true cost, key obligations, and potential consequences, and validate them with my advisors, so I can decide with confidence.",

      voicePitch: "Approved SMEs often drop off due to hidden fees and buried covenants. I designed ClariFund's 8-step decision workspace, reconciling gross loans with net disbursals and true 14.8% APR. It provides authenticated accountant access, maximizing informed decisions without compromising credit quality.",

      followUpVoice: "Welcome back! Did you explore the real-time cost reconciliation donut and the role-scoped CA guest access flow in ClariFund?",

      highlights: [
        { id: "true-apr", label: "KFS-Compliant APR", value: "14.80%", desc: "Dynamic APR derivation vs. 12.5% nominal headline interest rate." },
        { id: "net-disbursal", label: "Gross vs. Net Disbursal", value: "₹39.2L", desc: "Reconciled from ₹40L sanctioned minus ₹80k itemized upfront fees." },
        { id: "informed-decision", label: "North Star Metric", value: "Informed Decision Rate", desc: "% of borrowers reaching deliberate accept/decline within validity." },
        { id: "ai-abstention", label: "Unsupported AI Answers", value: "0.0%", desc: "Strict deterministic retrieval with mandatory abstention when unverified." }
      ],

      keyArtifacts: [
        {
          title: "8-Step Reconciled Decision Stream",
          metricId: "decision-stream",
          points: [
            "Steps: 01 Approved → 02 Overview → 03 Cost → 04 Repayment → 05 Obligations → 06 KFS Ack → 07 Execution → 08 Disburse.",
            "Cost reconciliation: Principal ₹40,00,000, Fees ₹80,000, Net Cash ₹39,20,000, EMI ₹1,33,815, Total Repayment ₹48,17,322.",
            "Statutory guardrail: Dynamic APR derivation with explicit separation of 16-day KFS validity vs. ≥3-day statutory cooling-off look-up period."
          ]
        },
        {
          title: "Orchestration & Operational SLA",
          metricId: "guest-access",
          points: [
            "Authenticated Guest Access: OTP-authenticated, role-scoped workspaces for external CAs and Co-Directors.",
            "Policy-aware validity protection: Formal covenant queries automatically tag as 'sla_review_pending', freezing expiry clocks until credit review completes.",
            "ClariGuide Contextual AI Assistant with verbatim clause citations and zero hallucination."
          ]
        }
      ]
    },

    {
      id: "park-plus",
      title: "Park+ Product Teardown",
      subtitle: "Utility-to-Commerce Teardown & State-Machine UI",
      tagline: "Digitize offline car ownership. Converting fragmented tasks into unified commerce.",
      northStar: "LTV to CAC Ratio / ARPU (Target: 3:1)",
      focusScope: "Automotive Super-App • FASTag & Challans • Mobile UX Teardown",
      mvpUrl: "https://nextleap.app/portfolio/ajay-mahadik",
      category: "Product Teardown",
      badge: "Product Teardown",
      problem: "Park+ delivers a frictionless 8-10 second FASTag recharge flow, but pushes aggressive car-wash subscription popups at toll booths when users are in high anxiety, inducing conditioned popup blindness and abandonment.",
      jtbd: "When I'm driving or clearing an urgent traffic fine, I want instant zero-friction payment without intrusive commercial ads interrupting my task.",

      voicePitch: "In this teardown, I analyzed Park Plus's utility-to-commerce funnel. While FASTag recharges take eight seconds, pushing car-wash pop-ups at toll booths creates friction. I proposed a state-machine UI separating high-stress utility from discovery, doubling cross-sell conversion.",

      followUpVoice: "Welcome back! What are your thoughts on using a state-machine dashboard to separate high-anxiety toll tasks from marketplace discovery?",

      highlights: [
        { id: "recharge-speed", label: "Utility Speed Moat", value: "8-10 sec", desc: "UPI payment completion using Vehicle RC as primary key." },
        { id: "conversion-target", label: "Commerce Target", value: "2x Uplift", desc: "Projected conversion by shifting cross-sell to post-utility relaxed state." },
        { id: "retention-rate", label: "Service Retention", value: "70% MoM", desc: "Month-over-month renewal target for car wash and insurance." },
        { id: "failure-guardrail", label: "Opt-Out Failure Guardrail", value: "≤15%", desc: "If notification opt-outs exceed 15%, pause promotional triggers immediately." }
      ],

      keyArtifacts: [
        {
          title: "Key Teardown Recommendations",
          metricId: "state-machine",
          points: [
            "1. Context-Aware Smart Dashboard: Introduce state-machine UI. If user has pending fine or low FASTag, enter 'Utility Mode' (strip all ads). Once resolved, transition to 'Discovery Mode'.",
            "2. Granular Notification Controls: User settings allow separate control for FASTag (Always on), Insurance (Weekly digest), and Promotional (Monthly only).",
            "3. Predictive Cross-Sell Engine: ML model predicting service need based on vehicle age and service history instead of generic popups."
          ]
        }
      ]
    }
  ],

  // ------------------------------------------------------------------------
  // ACTIVE GROUNDED SEMANTIC ANALYZER (Context-Aware Multi-Turn)
  // Strictly isolates sections: Never mixes up CredCore, Education, and Projects!
  // ------------------------------------------------------------------------
  analyzeQuery: function(rawQuery, activeContextId = null) {
    const q = (rawQuery || '').toLowerCase().trim();
    const ctx = (activeContextId || (typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('active_project_id') : null) || '').toLowerCase();

    // 1. Current Role & CredCore Experience (including all phonetic STT variants, synonyms & context)
    const mentionsCredCore = q.match(/\b(credcore|cred core|credit core|cred code|credit card|credit score|cred score|current code|great code|great core|create core|red core|critcore|crit core|credco|c red|thread core|bread core|dead core|card core|cred|credit)\b/) ||
      q.match(/\b(current experience|work experience|professional experience|job experience|present experience|past experience|experience|current role|current job|current company|current work|present role|present job|present company|where do you work|where does ajay work|what is your job|what is your role|what do you do|what does ajay do|legal analyst|private credit|credit agreements|financial covenants|covenants extraction|waterfalls|payment waterfalls)\b/);

    if (mentionsCredCore) {
      if (q.match(/\b(200|how many|volume|deals|agreements|facilities|contracts)\b/)) {
        return {
          type: 'experience',
          title: "CredCore: Deal Volume & Taxonomy",
          subtitle: "200+ Private Credit Facilities Deconstructed",
          voiceResponse: "At CredCore, Ajay deconstructed over 200 complex private credit agreements, including bespoke facilities, intercreditor terms, and amendments, mapping them into structured data schemas.",
          data: PORTFOLIO_DATA.profile.experience
        };
      }
      if (q.match(/\b(tool|tools|tech|gemini|n8n|automation|automate|parsing)\b/)) {
        return {
          type: 'experience',
          title: "CredCore: AI Workflows",
          subtitle: "Gemini API & n8n Document Parsing",
          voiceResponse: "Ajay collaborates with engineering to build automated document-parsing AI tools using Gemini and n8n, streamlining covenant data extraction workflows.",
          data: PORTFOLIO_DATA.profile.experience
        };
      }
      if (q.match(/\b(covenant|covenants|pik|waterfall|waterfalls|default)\b/)) {
        return {
          type: 'experience',
          title: "CredCore: Covenants & Waterfall Logic",
          subtitle: "Financial Covenants, PIK & Events of Default",
          voiceResponse: "Ajay interprets financial covenants, events of default, payment waterfalls, and PIK provisions across high-value transactions.",
          data: PORTFOLIO_DATA.profile.experience
        };
      }
      return {
        type: 'experience',
        title: "Current Role: CredCore",
        subtitle: "Legal Analyst, Pune (Nov 2025 – Present)",
        voiceResponse: "At CredCore, Ajay deconstructs private credit agreements to extract covenants, payment waterfalls, and compliance rules into structured schemas, collaborating with engineering to automate document-parsing tools using Gemini and n8n.",
        data: PORTFOLIO_DATA.profile.experience
      };
    }

    // 2. Education / Academic Background (strictly IFIM & law school only)
    if (q.match(/\b(education|educational|academics|academic|degree|college|university|law school|ifim|kslu|bba|llb|law graduate|graduated|study|studied|qualification|qualifications|school|placement convenor|co-convenor|placement committee|responsibilities at college|responsibilities at the college)\b/)) {
      if (q.match(/\b(responsibilities|placement|committee|convenor|co-convenor|leadership|role)\b/)) {
        return {
          type: 'education',
          title: "Placement Committee Leadership",
          subtitle: "Convenor [2024] • Co-Convenor [2022-2024]",
          voiceResponse: "Ajay served as Convenor of the Internship and Placement Committee at IFIM Law School in 2024, and Co-Convenor from 2022 to 2024, leading institutional placement operations.",
          data: PORTFOLIO_DATA.profile.education
        };
      }
      return {
        type: 'education',
        title: "Academic Background & Leadership",
        subtitle: "IFIM Law School, Bangalore • BBA LL.B. (2020 – 2025)",
        voiceResponse: PORTFOLIO_DATA.profile.education.voicePitch,
        data: PORTFOLIO_DATA.profile.education
      };
    }

    // 3. Internships & Legal Practice (strictly internships only)
    if (q.match(/\b(internship|internships|due diligence|real estate|title verification|commercial contracting|adres|truestate|nlsiu)\b/)) {
      return {
        type: 'internships',
        title: "Legal Internships & Practice",
        subtitle: "B2B Contracting, Title Due Diligence & Arbitration Research",
        voiceResponse: "Ajay completed intensive internships in commercial contracting at ADReS Now, real estate title due diligence at TruEstate, and consumer arbitration research at the National Law School Bangalore.",
        data: PORTFOLIO_DATA.profile.internships
      };
    }

    // 4. Skills & Core Competencies (strictly skills taxonomy only)
    if (q.match(/\b(skills|competencies|tools|tech stack|sql|excel|n8n|gemini|vibe coding|product skills|clm)\b/)) {
      return {
        type: 'competencies',
        title: "Skills & Core Competencies",
        subtitle: "Product Management, LegalTech, FinTech & Commercial Drafting",
        voiceResponse: "Ajay's toolkit combines product discovery and interactive prototyping with specialized legaltech data taxonomies, CLM workflows, and private credit covenant analysis.",
        data: PORTFOLIO_DATA.profile.competencies
      };
    }

    // 5. Lawyer building AI / Transition / Why PM
    if (q.match(/\b(transition to pm|how does a legal analyst transition|how does a lawyer|lawyer build|why pm|philosophy|transition|law to product)\b/)) {
      return {
        type: 'project',
        projectId: 'legal-copilot',
        voiceResponse: "I bridge law and product engineering. At CredCore, I deconstructed over 200 credit agreements into structured schemas. Rather than treating AI as open-ended chat, I build deterministic, guardrailed workspaces with strict risk recall, clear UX taxonomies, and functional prototypes using Gemini and n8n."
      };
    }

    // 5b. Workflow Automation / n8n / Gemini AI workflows
    if (q.match(/\b(workflow automation|tell me about your workflow automation|automation workflow|automated document-parsing|how do you automate|document-parsing|n8n and gemini)\b/)) {
      return {
        type: 'experience',
        title: "CredCore: AI Workflows",
        subtitle: "Gemini API & n8n Document Parsing Workflows",
        voiceResponse: "At CredCore, Ajay automates document-parsing workflows using n8n and the Gemini API, extracting and codifying complex financial covenants, pricing mechanics, and payment waterfalls into structured data schemas.",
        data: PORTFOLIO_DATA.profile.experience
      };
    }

    // 5c. Why Wispr Flow / Voice UI
    if (q.match(/\b(why wispr flow|wispr flow|wispr|why voice|voice first|why voice portfolio)\b/)) {
      return {
        type: 'guidance',
        title: "Voice-First Architecture: Why Wispr Flow",
        subtitle: "Conversational UI with Zero-Latency Executive Recall",
        voiceResponse: "Wispr Flow inspired this portfolio's voice-first interaction. By pairing natural speech recognition with deterministic multimodal highlights, recruiters and hiring managers can explore Ajay's PRDs and track record with zero latency."
      };
    }

    // 5d. Fellowship / NextLeap PM Fellowship
    if (q.match(/\b(fellowship|top fellow|nextleap|top pm fellow)\b/)) {
      return {
        type: 'fellowship',
        title: "NextLeap Product Management Fellowship (2026)",
        subtitle: "Awarded Top Fellow Honors",
        voiceResponse: "Ajay was recognized as a Top Fellow in the NextLeap 2026 Product Management Fellowship, authoring standout PRDs for Google Photos AI Cognitive Discovery and ClariFund SME Loan Workspace.",
        data: PORTFOLIO_DATA.profile.fellowship
      };
    }

    // 6. Source Code / GitHub Repositories
    if (q.match(/\b(source code|view code|github repo|repository|repositories|git repo|code link)\b/)) {
      return {
        type: 'contact',
        title: "GitHub & Source Repositories",
        subtitle: "github.com/Ajay-Mahadik",
        voiceResponse: "Ajay's code and live prototypes are hosted on GitHub at github.com/Ajay-Mahadik, with links accessible on the top right.",
        data: PORTFOLIO_DATA.profile.contact
      };
    }

    // 7. Contact / Resume / CV
    if (q.match(/\b(contact|email|phone|linkedin|github|reach|hire|resume|cv)\b/)) {
      return {
        type: 'contact',
        title: "Contact & Credentials",
        subtitle: "Pune, India • ajaymahadik93@gmail.com",
        voiceResponse: "You can reach Ajay directly at ajaymahadik93@gmail.com, or view his LinkedIn, GitHub, and full downloadable CV in the top navigation bar.",
        data: PORTFOLIO_DATA.profile.contact
      };
    }

    // 8. General Project Inquiries ("show me projects", "tell me about the project", "what have you built", "case studies")
    if (q.match(/\b(projects|project|all projects|list projects|show projects|what projects|case study|case studies|what did you build|what have you built|portfolio work|mvp|prototypes)\b/) && !q.match(/\b(photo|loan|clarifund|park|contract|copilot)\b/)) {
      return {
        type: 'project',
        projectId: 'legal-copilot',
        voiceResponse: "Ajay has engineered three core AI and FinTech products: Legal Copilot for contract review, Google Photos AI for episodic retrieval, and ClariFund for loan decisions. Here is his flagship Legal Copilot."
      };
    }

    // 8b. Overview / Home navigation
    if (q.match(/\b(overview|home|go back|back to overview|show overview|main screen)\b/)) {
      return {
        type: 'overview',
        voiceResponse: "Here is the portfolio overview featuring Ajay's products, CredCore experience, and academic background. What would you like to explore?"
      };
    }

    // ----------------------------------------------------------------------
    // PROJECT QUERIES (Explicit mentions ALWAYS take precedence over active screen)
    // ----------------------------------------------------------------------
    const mentionsGooglePhotos = q.match(/\b(google photos|google photo|photo|photos|photo project|exif|episodic|ersr|whatsapp|gallery|image|images)\b/);
    const mentionsClariFund = q.match(/\b(clarifund|clari fund|clarified|sme|loan|loans|loan project|borrower|lender|apr|disbursal|kfs|fintech project)\b/);
    const mentionsParkPlus = q.match(/\b(park|park\+|parkplus|park plus|fastag|challan|toll|car|teardown|utility to commerce)\b/);
    const mentionsLegalCopilot = q.match(/\b(contract|copilot|legal copilot|legal project|legaltech project|ai contract|redline|first-pass|first pass|msa|playbook|clause|legaltech|clarifai)\b/);

    // 1. Explicit Switch: Google Photos AI
    if (mentionsGooglePhotos) {
      if (q.match(/\b(metric|metrics|ersr|rice|score|success rate)\b/)) {
        return {
          type: 'project',
          projectId: 'google-photos',
          highlightMetricId: 'rice-score',
          voiceResponse: "The Episodic AI Anchor achieved a top RICE score of 108, directly targeting a 20% lift in Episodic Retrieval Success Rate."
        };
      }
      if (q.match(/\b(bottleneck|problem|intent matching|friction|whatsapp|exif date)\b/)) {
        return {
          type: 'project',
          projectId: 'google-photos',
          highlightMetricId: 'intent-matching',
          voiceResponse: "User research across 558 reviews found 44% friction at intent matching, and 23.5% failure because WhatsApp transfers overwrite original capture dates."
        };
      }
      if (q.match(/\b(rules|canonical rules|clustering|exact match|architecture)\b/)) {
        return {
          type: 'project',
          projectId: 'google-photos',
          highlightMetricId: 'rule-visual-intent',
          voiceResponse: "The system enforces four canonical rules: Visual Intent overrides EXIF Date, Episodic Clustering, Exact Match Sorting, and Conversational Filters."
        };
      }
      return {
        type: 'project',
        projectId: 'google-photos',
        voiceResponse: PORTFOLIO_DATA.projects.find(p => p.id === 'google-photos').voicePitch
      };
    }

    // 2. Explicit Switch: ClariFund
    if (mentionsClariFund) {
      if (q.match(/\b(apr|interest rate|true apr|kfs|headline rate)\b/)) {
        return {
          type: 'project',
          projectId: 'clarifund',
          highlightMetricId: 'true-apr',
          voiceResponse: "ClariFund computes a true KFS APR of 14.80%, uncovering ₹80,000 in upfront processing and insurance fees buried beneath the 12.5% headline rate."
        };
      }
      if (q.match(/\b(disbursal|net cash|gross|fees|39.2|40l)\b/)) {
        return {
          type: 'project',
          projectId: 'clarifund',
          highlightMetricId: 'net-disbursal',
          voiceResponse: "The workspace reconciles gross ₹40 lakh loans against net ₹39.2 lakh disbursals, providing full fee transparency before binding loan execution."
        };
      }
      if (q.match(/\b(guest access|accountant|ca|director|auditor)\b/)) {
        return {
          type: 'project',
          projectId: 'clarifund',
          highlightMetricId: 'guest-access',
          voiceResponse: "ClariFund provides scoped, OTP-authenticated guest access for external Chartered Accountants and Co-Directors to validate covenants without sharing login credentials."
        };
      }
      return {
        type: 'project',
        projectId: 'clarifund',
        voiceResponse: PORTFOLIO_DATA.projects.find(p => p.id === 'clarifund').voicePitch
      };
    }

    // 3. Explicit Switch: Park+ Teardown
    if (mentionsParkPlus) {
      if (q.match(/\b(fastag|speed|recharge|8-10|eight seconds)\b/)) {
        return {
          type: 'project',
          projectId: 'park-plus',
          highlightMetricId: 'recharge-speed',
          voiceResponse: "Park+ maintains an 8-to-10 second utility speed moat for FASTag recharges using Vehicle RC as the primary identifier."
        };
      }
      if (q.match(/\b(state machine|recommendation|solution|utility mode|discovery mode)\b/)) {
        return {
          type: 'project',
          projectId: 'park-plus',
          highlightMetricId: 'state-machine',
          voiceResponse: "The teardown recommends a state-machine UI that enforces Utility Mode during toll queues, pausing ads until the user enters relaxed Discovery Mode."
        };
      }
      if (q.match(/\b(ltv|cac|commerce|retention|conversion)\b/)) {
        return {
          type: 'project',
          projectId: 'park-plus',
          highlightMetricId: 'failure-guardrail',
          voiceResponse: "The strategy targets a 3-to-1 LTV to CAC ratio and 70% month-over-month retention, with automatic pauses if opt-outs exceed 15%."
        };
      }
      return {
        type: 'project',
        projectId: 'park-plus',
        voiceResponse: PORTFOLIO_DATA.projects.find(p => p.id === 'park-plus').voicePitch
      };
    }

    // 4. Explicit Switch: Legal Copilot
    if (mentionsLegalCopilot) {
      if (q.match(/\b(metric|metrics|north star|median review|time|-40%|reduction|speed)\b/)) {
        return {
          type: 'project',
          projectId: 'legal-copilot',
          highlightMetricId: 'median-review',
          voiceResponse: "The North Star metric is reducing median first-pass review time by 40% using automated clause timestamps, backed by a 98% critical-risk recall guardrail."
        };
      }
      if (q.match(/\b(recall|risk recall|guardrail|accuracy|false negative|critical risk|material risk)\b/)) {
        return {
          type: 'project',
          projectId: 'legal-copilot',
          highlightMetricId: 'risk-recall',
          voiceResponse: "Legal Copilot maintains a strict 98% critical-risk recall and 95% material-risk recall envelope, ensuring severe contract deviations are never silently downgraded."
        };
      }
      if (q.match(/\b(coverage|ai assisted|ai coverage)\b/)) {
        return {
          type: 'project',
          projectId: 'legal-copilot',
          highlightMetricId: 'assisted-coverage',
          voiceResponse: "The platform targets at least 70% AI-assisted coverage across standard clauses, leaving attorneys in full control of nuanced, high-discretion terms."
        };
      }
      if (q.match(/\b(architecture|split pane|pipeline|stages|playbook|how does it work|guardrails)\b/)) {
        return {
          type: 'project',
          projectId: 'legal-copilot',
          highlightMetricId: 'risk-architecture',
          voiceResponse: "The architecture separates risk severity from model confidence across a 6-stage pipeline, linking every finding directly to source text and company playbook rules."
        };
      }
      if (q.match(/\b(problem|opportunity|jtbd|why)\b/)) {
        return {
          type: 'project',
          projectId: 'legal-copilot',
          voiceResponse: "Commercial lawyers waste hours on repetitive first-pass MSA reviews. Legal Copilot compresses 'read the whole contract' into 'know what deserves attention first'."
        };
      }
      return {
        type: 'project',
        projectId: 'legal-copilot',
        voiceResponse: PORTFOLIO_DATA.projects.find(p => p.id === 'legal-copilot').voicePitch
      };
    }

    // ----------------------------------------------------------------------
    // CONTEXTUAL INQUIRIES (Only when query does NOT name another project)
    // ----------------------------------------------------------------------
    if (ctx === 'legal-copilot') {
      if (q.match(/\b(metric|metrics|north star|median review|time|-40%|reduction|speed)\b/)) {
        return {
          type: 'project',
          projectId: 'legal-copilot',
          highlightMetricId: 'median-review',
          voiceResponse: "The North Star metric is reducing median first-pass review time by 40% using automated clause timestamps, backed by a 98% critical-risk recall guardrail."
        };
      }
      if (q.match(/\b(recall|risk recall|guardrail|accuracy|false negative|critical risk|material risk)\b/)) {
        return {
          type: 'project',
          projectId: 'legal-copilot',
          highlightMetricId: 'risk-recall',
          voiceResponse: "Legal Copilot maintains a strict 98% critical-risk recall and 95% material-risk recall envelope, ensuring severe contract deviations are never silently downgraded."
        };
      }
      if (q.match(/\b(coverage|ai assisted|ai coverage)\b/)) {
        return {
          type: 'project',
          projectId: 'legal-copilot',
          highlightMetricId: 'assisted-coverage',
          voiceResponse: "The platform targets at least 70% AI-assisted coverage across standard clauses, leaving attorneys in full control of nuanced, high-discretion terms."
        };
      }
      if (q.match(/\b(architecture|split pane|pipeline|stages|playbook|how does it work|guardrails)\b/)) {
        return {
          type: 'project',
          projectId: 'legal-copilot',
          highlightMetricId: 'risk-architecture',
          voiceResponse: "The architecture separates risk severity from model confidence across a 6-stage pipeline, linking every finding directly to source text and company playbook rules."
        };
      }
      if (q.match(/\b(problem|opportunity|jtbd|why)\b/)) {
        return {
          type: 'project',
          projectId: 'legal-copilot',
          voiceResponse: "Commercial lawyers waste hours on repetitive first-pass MSA reviews. Legal Copilot compresses 'read the whole contract' into 'know what deserves attention first'."
        };
      }
    } else if (ctx === 'google-photos') {
      if (q.match(/\b(metric|metrics|ersr|rice|score|success rate)\b/)) {
        return {
          type: 'project',
          projectId: 'google-photos',
          highlightMetricId: 'rice-score',
          voiceResponse: "The Episodic AI Anchor achieved a top RICE score of 108, directly targeting a 20% lift in Episodic Retrieval Success Rate."
        };
      }
      if (q.match(/\b(bottleneck|problem|intent matching|friction|whatsapp|exif date)\b/)) {
        return {
          type: 'project',
          projectId: 'google-photos',
          highlightMetricId: 'intent-matching',
          voiceResponse: "User research across 558 reviews found 44% friction at intent matching, and 23.5% failure because WhatsApp transfers overwrite original capture dates."
        };
      }
      if (q.match(/\b(rules|canonical rules|clustering|exact match|architecture)\b/)) {
        return {
          type: 'project',
          projectId: 'google-photos',
          highlightMetricId: 'rule-visual-intent',
          voiceResponse: "The system enforces four canonical rules: Visual Intent overrides EXIF Date, Episodic Clustering, Exact Match Sorting, and Conversational Filters."
        };
      }
    } else if (ctx === 'clarifund') {
      if (q.match(/\b(apr|interest rate|true apr|kfs|headline rate)\b/)) {
        return {
          type: 'project',
          projectId: 'clarifund',
          highlightMetricId: 'true-apr',
          voiceResponse: "ClariFund computes a true KFS APR of 14.80%, uncovering ₹80,000 in upfront processing and insurance fees buried beneath the 12.5% headline rate."
        };
      }
      if (q.match(/\b(disbursal|net cash|gross|fees|39.2|40l)\b/)) {
        return {
          type: 'project',
          projectId: 'clarifund',
          highlightMetricId: 'net-disbursal',
          voiceResponse: "The workspace reconciles gross ₹40 lakh loans against net ₹39.2 lakh disbursals, providing full fee transparency before binding loan execution."
        };
      }
      if (q.match(/\b(guest access|accountant|ca|director|auditor)\b/)) {
        return {
          type: 'project',
          projectId: 'clarifund',
          highlightMetricId: 'guest-access',
          voiceResponse: "ClariFund provides scoped, OTP-authenticated guest access for external Chartered Accountants and Co-Directors to validate covenants without sharing login credentials."
        };
      }
    } else if (ctx === 'park-plus') {
      if (q.match(/\b(fastag|speed|recharge|8-10|eight seconds)\b/)) {
        return {
          type: 'project',
          projectId: 'park-plus',
          highlightMetricId: 'recharge-speed',
          voiceResponse: "Park+ maintains an 8-to-10 second utility speed moat for FASTag recharges using Vehicle RC as the primary identifier."
        };
      }
      if (q.match(/\b(state machine|recommendation|solution|utility mode|discovery mode)\b/)) {
        return {
          type: 'project',
          projectId: 'park-plus',
          highlightMetricId: 'state-machine',
          voiceResponse: "The teardown recommends a state-machine UI that enforces Utility Mode during toll queues, pausing ads until the user enters relaxed Discovery Mode."
        };
      }
      if (q.match(/\b(ltv|cac|commerce|retention|conversion)\b/)) {
        return {
          type: 'project',
          projectId: 'park-plus',
          highlightMetricId: 'failure-guardrail',
          voiceResponse: "The strategy targets a 3-to-1 LTV to CAC ratio and 70% month-over-month retention, with automatic pauses if opt-outs exceed 15%."
        };
      }
    } else if (ctx === 'experience') {
      if (q.match(/\b(200|how many|volume|deals|agreements|facilities|contracts)\b/)) {
        return {
          type: 'experience',
          title: "CredCore: Deal Volume & Taxonomy",
          subtitle: "200+ Private Credit Facilities Deconstructed",
          voiceResponse: "At CredCore, Ajay deconstructed over 200 complex private credit agreements, including bespoke facilities, intercreditor terms, and amendments, mapping them into structured data schemas.",
          data: PORTFOLIO_DATA.profile.experience
        };
      }
      if (q.match(/\b(tool|tools|tech|gemini|n8n|automation|automate|parsing|how do you automate)\b/)) {
        return {
          type: 'experience',
          title: "CredCore: AI Workflows",
          subtitle: "Gemini API & n8n Document Parsing",
          voiceResponse: "Ajay collaborates with engineering to build automated document-parsing AI tools using Gemini and n8n, streamlining covenant data extraction workflows.",
          data: PORTFOLIO_DATA.profile.experience
        };
      }
      if (q.match(/\b(covenant|covenants|pik|waterfall|waterfalls|default|obligations)\b/)) {
        return {
          type: 'experience',
          title: "CredCore: Covenants & Waterfall Logic",
          subtitle: "Financial Covenants, PIK & Events of Default",
          voiceResponse: "Ajay interprets financial covenants, events of default, payment waterfalls, and PIK provisions across high-value transactions.",
          data: PORTFOLIO_DATA.profile.experience
        };
      }
      if (q.match(/\b(responsibilities|duties|what do you do|tell me more|details)\b/)) {
        return {
          type: 'experience',
          title: "Current Role: CredCore",
          subtitle: "Legal Analyst, Pune (Nov 2025 – Present)",
          voiceResponse: "As Legal Analyst, Ajay deconstructs private credit deals, validates extracted data, advises product and tech teams, and codifies borrower compliance obligations.",
          data: PORTFOLIO_DATA.profile.experience
        };
      }
    } else if (ctx === 'education') {
      if (q.match(/\b(college|law school|university|kslu|ifim|where|institution)\b/)) {
        return {
          type: 'education',
          title: "Academic Background: IFIM Law School",
          subtitle: "Bangalore • Affiliated to Karnataka State Law University",
          voiceResponse: "Ajay studied at IFIM Law School in Bangalore, affiliated to Karnataka State Law University, completing his 5-year integrated BBA LL.B. degree from 2020 to 2025.",
          data: PORTFOLIO_DATA.profile.education
        };
      }
      if (q.match(/\b(responsibilities|placement|committee|convenor|co-convenor|leadership|role)\b/)) {
        return {
          type: 'education',
          title: "Placement Committee Leadership",
          subtitle: "Convenor [2024] • Co-Convenor [2022-2024]",
          voiceResponse: "Ajay served as Convenor of the Internship and Placement Committee at IFIM Law School in 2024, and Co-Convenor from 2022 to 2024, leading institutional placement operations.",
          data: PORTFOLIO_DATA.profile.education
        };
      }
      if (q.match(/\b(degree|course|bba llb|stream|timeline|years)\b/)) {
        return {
          type: 'education',
          title: "BBA LL.B. Degree",
          subtitle: "5-Year Integrated Law (2020 – 2025)",
          voiceResponse: "Ajay completed the 5-year integrated BBA LL.B. program from 2020 to 2025, specializing in corporate law and commercial contracts.",
          data: PORTFOLIO_DATA.profile.education
        };
      }
    }

    // 9. Explicit Bio Request ONLY (When user specifically asks for Ajay's bio or intro)
    if (q.match(/\b(who is ajay|about ajay|tell me about yourself|who are you|introduce yourself|your bio|your introduction|give me your bio)\b/)) {
      return {
        type: 'bio',
        title: "Ajay Mahadik",
        subtitle: "Legal Analyst at CredCore • AI Product Builder",
        voiceResponse: PORTFOLIO_DATA.profile.shortBioSpeech,
        data: PORTFOLIO_DATA.profile
      };
    }

    // Default Fallback: Conversational Guidance (NEVER repeat hero bio on unrecognized speech!)
    return {
      type: 'guidance',
      title: "Portfolio Assistant",
      subtitle: "Ask about CredCore, Projects, or Education",
      voiceResponse: "I'm listening. You can ask about Ajay's CredCore work, education, or explore his AI projects like Legal Copilot and Google Photos."
    };
  }
};

// Universal export
if (typeof window !== 'undefined') {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PORTFOLIO_DATA };
}
