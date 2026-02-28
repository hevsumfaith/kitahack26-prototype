# HalaTuju: The AI Career Oracle

> **Empowering Malaysian Students**

## 📖 Project Overview
HalaTuju is a decision-support platform designed for Malaysian secondary students. It bridges the gap between traditional counseling and the digital economy by providing an AI-driven "Oracle" that analyzes student psychometrics to suggest the ideal Form 4 stream and future career path.

## ✨ Key Features
* **Intelligent Diagnostic:** A comprehensive assessment mapping interest, talent, and personality.
* **AI Career Persona:** Generates a detailed, future-proof career identity using Google Gemini.
* **Predictive Streams:** Real-time calculation of optimal academic pathways based on response patterns & compatibility logic.

## 🛠️ Tech Stack
* **Framework:** Next.js 14+ (App Router)
* **Intelligence:** Google Gemini API
* **Backend:** Firebase (Authentication & Realtime Database)
  

## ⚙️ Local Setup Instructions

Follow these steps to run the HalaTuju prototype locally for evaluation.

### 1. Prerequisites
* **Node.js:** v18.17.0 or higher
* **npm:** v9 or higher

### 2. Installation

  Clone the repository
  git clone [https://github.com/hevsumfaith/kitahack26-prototype.git](https://github.com/hevsumfaith/kitahack26-prototype.git)

  Navigate to the project folder
  cd kitahack26-prototype

### 3. Environment Configuration
Create a `.env.local` file in your root directory and fill in your own credentials:
This project requires Google Gemini for the AI career generation and Firebase for data persistence. You can obtain these keys from the Google AI Studio and Firebase Console. API Keys are necessary for the AI features to work.

##### Google Gemini AI API Key
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

##### Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

##### Start the development server
npm run dev

##### Open http://localhost:9000 in your browser to view the application.
