Project Name: AutoPitch AI

Target Themes: Best AI / Data-Driven Solution & Best Business Management Solution

The Problem Statement: B2B SaaS agencies and freelancers spend countless hours manually auditing client websites, identifying UI/UX flaws, and writing personalized cold emails. Despite this effort, the conversion rate remains abysmal (under 2%) because traditional text-based PDF audits are boring, slow, and fail to immediately demonstrate ROI.

Our Approach & Solution: We built AutoPitch AI, an intelligent, zero-friction client acquisition engine. Instead of a single AI generating a boring report, we deployed an Agentic Swarm Architecture (Multi-Agent War Room). When a user inputs a target URL, AutoPitch AI deploys three specialized AI agents:
1.	UX Spy: Identifies conversion bottlenecks and UI flaws.
2.	CRO Hacker: Calculates potential lost revenue and suggests layout fixes.
3.	SEO Scout: Analyzes underlying structure and performance.
These agents collaborate in real-time to generate an instant, comprehensive audit, a live auto-fixed code component (Generative UI), and a highly personalized video outreach script.

Technical Execution (How it works):
•	Frontend: Built with React & Vite, utilizing Framer Motion for the live terminal-style Agent War Room animations and a premium dark-mode aesthetic (Tailwind CSS).
•	AI Engine: Powered by NVIDIA NIM (abacusai/dracarys-llama-3.1-70b-instruct) for lightning-fast, highly accurate structured JSON generation to drive the multi-agent conversation.
•	Generative UI: Uses react-live to take AI-suggested code fixes and render them dynamically in the browser.

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set `NVIDIA_API_KEY` in `.env.local` to your NVIDIA key used for OpenRouter requests
3. Run the app:
   `npm run dev`
