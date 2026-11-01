# Ajay Prakash Mahadik - Multimodal Voice-First AI Portfolio

> **Progressive Voice-First AI Agent Web Application**  
> Strictly grounded in verified source files (CV, AI Contract Review PRD, Google Photos AI PRD, ClariFund PRD, Park+ Teardown). Zero hallucination.

---

## 🚀 Live Links & Project MVPs

| Project | Live MVP / Deck | Category | North Star Metric | Key Quality Guardrail |
| :--- | :--- | :--- | :--- | :--- |
| **Legal Copilot** | [Launch MVP](https://ajay-mahadik.github.io/Legal-Copilot/) | LegalTech AI | Median First-Pass Review Time (**-40%**) | **≥98%** Critical-Risk Recall |
| **Google Photos AI** | [Launch MVP](https://googlephotos-mvp-z.netlify.app/) | Consumer AI / Search | Episodic Retrieval Success Rate (**ERSR**) | Visual Intent > Broken EXIF Dates |
| **ClariFund** | [Launch MVP](https://clarifund-decisionworkplace.netlify.app/) | FinTech / Decision Layer | **Informed Decision Rate** | **14.80%** KFS APR • 0.0% AI Hallucination |
| **Park+ Teardown** | [View Case Study](https://nextleap.app/portfolio/ajay-mahadik) | Super-App Teardown | **LTV to CAC Ratio** (Target 3:1) | ≤15% Notification Opt-out Threshold |

- **LinkedIn**: [linkedin.com/in/ajay-mahadik-09](https://www.linkedin.com/in/ajay-mahadik-09/)
- **GitHub**: [github.com/Ajay-Mahadik](https://github.com/Ajay-Mahadik)
- **NextLeap Portfolio**: [nextleap.app/portfolio/ajay-mahadik](https://nextleap.app/portfolio/ajay-mahadik)

---

## 🎙️ Core Voice AI Mechanics

### 1. Multimodal Sync ("News Anchor Effect")
- Spoken words from the portfolio agent are parsed in real time via `SpeechSynthesisUtterance.onboundary`.
- Whenever the AI mentions key metrics or architecture concepts (e.g., `-40% review time`, `98% critical-risk recall`, `14.8% APR`, `558 friction rows`), the corresponding visual card, badge, or block on the screen immediately lights up with an active neon ambient glow and karaoke subtitle highlight.

### 2. Absolute Interruptibility
- The user can click the central or floating microphone button at **any moment** during playback.
- Instantly aborts speech synthesis (`window.speechSynthesis.cancel()`), clears visual glow highlights, plays a soft audio interrupt chime, and switches straight into active listening mode with zero hang time.

### 3. State 4 Handoff & Memory
- When a recruiter clicks **"Launch Live MVP"**, the application stores the project ID in `sessionStorage` and opens the live app in a new tab.
- When the recruiter switches back to the portfolio tab, the browser's **Page Visibility API** (`visibilitychange`) detects their return, keeps the exact project card open, displays a `"Memory Restored"` toast, and automatically speaks a contextual follow-up question.

---

## 🧭 Progressive States

1. **State 1: Standby (Landing)**  
   Clean minimalistic dashboard with Ajay's bio (*Legal Analyst at CredCore*), professional headshot, social links, and a central pulsating microphone button. Tapping the mic plays the audio greeting: *"Hi, I am Ajay's Portfolio Agent. Tap the mic to start."*
2. **State 2: Activation and Intent Router**  
   Smooth shift to an active listening state featuring an interactive HTML5 audio visualizer canvas and 6 intent-driven prompt chips.
3. **State 3: Dynamic Project Canvas (Deep Dive)**  
   Split-screen view. The AI delivers a punchy 15–20s elevator pitch (max 50 words) with real-time news-anchor glow synchronization, metric cards, a scrollable PRD container, and a prominent "Launch Live MVP" button.
4. **State 4: Handoff and Memory**  
   Seamless tab switching and automatic recruiter return detection.

---

## 💻 Running the Application

### Option 1: Direct Browser Launch
Simply double-click `index.html` or open it in any modern browser (Chrome, Edge, Firefox, Safari). All assets and modules are built to work directly without any build tool or server required.

### Option 2: Local HTTP Server (PowerShell)
Run the included PowerShell server:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1
```
Then visit: `http://localhost:8080`

