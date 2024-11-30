
# Custom Email Sender

A web application for sending customized emails with personalized and dynamic content, featuring scheduling capabilities. Built using React, Node.js, and Express, with integration of a Large Language Model (LLM) for generating personalized email content.

## Features
- **Dynamic Text Generation**: Generate personalized email content using a Large Language Model (LLM).
- **Custom Email Templates**: Create and edit email templates for various use cases.
- **Scheduling**: Set specific dates and times for email delivery.
- **User-Friendly Interface**: Intuitive design for creating, managing, and sending emails.

## Tools & Technologies
- **Frontend**: React
- **Backend**: Node.js, Express
- **API**: REST APIs for seamless communication between the frontend and backend.
- **LLM Integration**: Dynamic content generation for personalized email experiences.

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A suitable LLM API key (e.g., OpenAI API)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/custom-email-sender.git
   ```
2. Navigate to the project directory:
   ```bash
   cd custom-email-sender
   ```
3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
4. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```
5. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     PORT=5000
     LLM_API_KEY=your-llm-api-key
     ```
6. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
7. Start the frontend server:
   ```bash
   cd ../frontend
   npm start
   ```

## Usage
1. Open your browser and navigate to `http://localhost:3000`.
2. Log in or register to access the application.
3. Create or select an email template.
4. Customize content using LLM suggestions.
5. Schedule or send the email immediately.

## Folder Structure
```
custom-email-sender/
├── backend/         # Backend server
│   ├── routes/      # API routes
│   ├── models/      # Database models (if applicable)
│   └── server.js    # Main backend server file
├── frontend/        # Frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Application pages
│   │   └── App.js       # Main React app file
└── README.md         # Project documentation
```

