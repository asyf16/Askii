# ASKII - Interview Practice Platform

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/352ca3d5-5ac5-4a1b-8603-5ee92bfe715b" />

ASKII is an interview practice platform designed to simulate real-world interview scenarios. It helps users prepare for job interviews by generating personalized questions, recording their responses, and providing transcriptions for review. The platform also includes a secure login system with Auth0 for personalized progress tracking.

## Features

- **Personalized Interview Questions:** Generates customized interview questions using Google Gemini, categorized by job roles and interview types (e.g., behavioral, technical, resume-based).
- **Speech-to-Text Transcriptions:** Records and transcribes video responses for review, making it easier to analyze and improve your answers.
- **Progress Tracking:** Tracks user responses and stores data, providing valuable insights and progress analysis.
- **Secure Login with Auth0:** Integrated Auth0 authentication for secure login and personalized experiences.

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, and Shadcn
- **Backend:** Node.js, API routes for handling questions and responses
- **Voice Generation:** Google Gemini API for generating personalized interview questions
- **Video Recording:** MediaRecorder API to record video and audio responses
- **Cloud Storage:** Recorded videos stored in Google Cloud buckets through pre-signed URLs
- **Speech-to-Text:** Integrated with Deepgram for speech-to-text and text-to-speech transcription
- **Authentication:** Auth0 for secure login and session management
- **State Management:** React Context API and Local storage for managing global state
- **Database:** PostgreSQL with Prisma ORM for data storage

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/1b5fcab5-bbce-46a0-be1c-4ffeb6c059b3" />

## Usage
- **Sign in:** Use your Auth0 account to securely log in and access your personalized interview experience.
- **Start Interview:** The platform will generate interview questions for you based on your preferences.
- **Record Responses:** Answer the questions, and the platform will record your video responses and transcribe them using speech-to-text technology.
- **Track Progress:** View your recorded videos and transcriptions to track your progress.

<img width="1470" alt="image" src="https://github.com/user-attachments/assets/164f1d48-1a9d-4f8e-bc23-997ae0ec55e9" />

## Getting Started

Follow these steps to get the project up and running on your local machine for development purposes.

### Prerequisites

- Node.js (v16.0 or higher)
- npm or yarn
- PostgreSQL database (for storing user data and progress)
- Auth0 account for authentication

### Setup

1. Clone the repository
   ```
   git clone https://github.com/your-username/askii.git
2. Install dependencies
   ```
   npm install
4. Set up .env variables by creating an .env.local file with your API keys
   ```
    NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain
    NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
    DEEPGRAM_API_KEY=your-deepgram-api-key
    GOOGLE_GEMINI_API_KEY=your-google-gemini-api-key
    DATABASE_URL=your-postgresql-database-url
6. Set up the database
   ```
   npx prisma migrate dev
7. Run the development server
   ```
   npm run dev
Now, you should be able to use ASKII on your local device. 
