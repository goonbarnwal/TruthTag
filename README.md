 🛡️ TruthTag – AI-Powered Job Scam Detection Chrome Extension
1.	Problem Statement
Online job scams are rapidly increasing, especially targeting students and freshers.
Fake job postings often demand training fees, promise instant joining, or operate on unverified platforms, causing financial and emotional loss.
Currently, users lack a real-time tool to verify job authenticity while browsing.

2.	Users & Context
•	Target Users
-	Students and fresh graduates  
-	Job seekers  
-	Freelancers  

•	Usage Context
-	Browsing job portals and company websites  
-	Receiving job offers via WhatsApp, Telegram, or email  
-	Need instant verification without leaving the webpage  

3.	Solution Overview
TruthTag is an AI-powered Chrome Extension that scans job-related webpages in real time and evaluates their trustworthiness.
What It Does
- Scans webpage text automatically  
- Uses ML-based NLP scoring to detect scam language  
- Generates a dynamic risk score  
- Shows clear reasons and red flags  
- Displays a verified trust badge on safe websites  

 How It Works
 
4.	Setup & Run Instructions
Step 1: Clone the Repository
git clone https://github.com/goonbarnwal/TruthTag
Models & Data
NLP & Scoring Logic
•	Keyword-based NLP scoring (ML-inspired logic)
•	Regex pattern matching for scam phrases
•	Dynamic weighted risk calculation
Data Sources
•	Webpage text extracted from DOM
•	Known scam language patterns
•	Trusted job platform whitelist
Licenses
•	Fully open-source
•	No paid third-party APIs
•	All processing done locally in browser

5.	Evaluation & Guardrails
Accuracy & Safety
•	Combines rule-based logic with NLP scoring
•	Transparent reasons shown for every risk score
•	No automatic blocking of websites
Bias & Hallucination Mitigation
•	No generative AI content creation
•	No personal data collection
•	User-controlled rescan functionality
6.	Known Limitations & Risks
•	NLP scoring is heuristic-based (not deep learning yet)
•	Aggressive marketing language may be flagged
•	Cannot analyze content inside PDFs or images
•	Advanced company verification APIs not yet integrated
7.	Team
•	Project Name: TruthTag Labs
•	Team Member Name: 1. Anurag Bhardwaj 
               Contributor: Frontend and Deploy 
                        Github: https://github.com/anuragb11687
•	Team Member Name: 2. Goon Barnwal
               Contributor: Backend and Truthtag Extension
                        Github: https://github.com/goonbarnwal
