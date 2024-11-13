# Personal RAG Chatbot 🤖

## Overview

The Personal RAG Chatbot is a Retrieval-Augmented Generation (RAG) AI chatbot integrated into my portfolio site. It is designed to answer questions about my professional experience, projects, skills, and hobbies, offering an interactive way for visitors (including recruiters) to learn more about me.

By leveraging Cohere's language model and a retrieval-based system, this chatbot dynamically retrieves relevant information from my personal knowledge base to provide accurate, real-time answers.

## Features

<b>Dynamic Question-Answering</b>: Responds to queries about my work experience, projects, and hobbies using retrieval-augmented generation.

<b>Context-Aware Responses</b>: Retrieves relevant data from a vector database to generate precise, context-specific answers.

<b>Up-to-Date Knowledge</b>: The retrieval system allows for easy updates, ensuring the chatbot reflects the latest information about my skills and projects.

## Architecture

The system consists of the following components:

### Frontend: 
A React-based portfolio site that provides the user interface.

### Backend:

- <b>FastAPI</b>: Serves as the API backend for the chatbot.

- <b>Cohere</b>: Used for generating responses based on retrieved data.

- <b>Vector Database (e.g., Pinecone/Supabase/FAISS)</b>: Stores embeddings of my personal data for efficient retrieval.


### Data Pipeline:

- Embeddings are created using Cohere's embedding model.

- User queries are processed to retrieve the most relevant information from the vector database.

- The retrieved context is combined with the user query and passed to Cohere's language model for response generation.


## System Design Diagram


## Tech Stack

<b>Frontend</b>: React, TypeScript

<b>Backend</b>: FastAPI (Python)

<b>NLP & Embeddings</b>: Cohere API

<b>Database</b>: Supabase (PostgreSQL) / Pinecone / FAISS (for vector search)

<b>Deployment</b>: Vercel (Frontend), Docker (Backend)

## Installation & Setup

### Clone the repository:

```ssh 
git clone https://github.com/yourusername/personal-rag-chatbot.git

cd personal-rag-chatbot
```

### Set up environment variables:

Create a `.env` file and add your Cohere API key and database credentials.
(Refer to `.env.example` file)

```ssh
COHERE_API_KEY=<API Key Here>
```

### Change directory to backend

```ssh
cd backend/
```

### Install dependencies:

```sh
pip install -r requirements.txt
```

### Run the FastAPI backend:

```sh
fastapi dev main.py
```

## Optional Frontend to test the Chatbot

### Change directory to frontend

```sh
cd chatbot-ui/
```

### Start the frontend:

```ssh
npm install

npm run dev
```

### Open browser

Go to <b><a href="http://localhost:5173">http://localhost:5173</a></b> to see frontend


## Example Questions

- "Tell me about your experience at TD"

- "What projects have you worked on related to full-stack development?"

- "What are your hobbies outside of software engineering?"

## Future Enhancements

- <b>Improved Contextual Understanding</b>: Enhance retrieval with more granular context to improve the quality of answers.

- <b>User Feedback Loop</b>: Incorporate a feedback mechanism to learn from user interactions and improve responses.

- <b>Enhanced Knowledge Base</b>: Expand the dataset with more detailed information about recent projects and skills.