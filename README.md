# Gmail AI Email Classifier

## Overview

Gmail AI Email Classifier is a web application that allows users to authenticate with their Gmail account, fetch their emails, and classify them into different categories such as Important, Promotional, Social, Marketing, and Spam using an AI model. The application leverages the Google Generative AI model for email classification and the Gmail API for fetching emails.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and building web applications.
- **Google Gemini AI**: For classifying emails into various categories.
- **Google APIs**: Including Gmail API and OAuth2 for authentication and fetching emails.
- **Node.js**: For server-side logic.
- **CSS**: For styling the web application.

## Features

- **Google Authentication**: Securely log in with your Google account.
- **Fetch Emails**: Retrieve the latest emails from your Gmail account.
- **Classify Emails**: Classify emails into categories such as Important, Promotional, Social, Marketing, and Spam.
- **Detailed Email View**: Click on an email to view its full content.

## Important Note

**Due to some error in code while selecting more than 10 emails in the dropdown, everything crashes and due to time constraint, I couldn’t fix it.**

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v12 or higher)
- **npm** (v6 or higher)

## Setup and Installation

Follow these steps to clone the repository and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gmail-ai-email-classifier.git
cd gmail-ai-email-classifier
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of the project and add the following environment variables. Replace the placeholder values with your actual Google API credentials.

```env
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Start the Development Server

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.
