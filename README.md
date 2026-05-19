# AI Smart Complaint Management System

A full-stack (MERN) web application for citizens to report issues. It features AI integration (via OpenRouter) to automatically analyze, categorize, and prioritize complaints, routing them to the correct department while generating auto-responses.

## Tech Stack
- **Frontend**: React.js (Vite), Tailwind CSS, React Router, Context API, Axios.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Auth.
- **AI Integration**: OpenRouter API (GPT models).

## Folder Structure
- `/backend`: Node/Express backend code.
- `/frontend`: React frontend code.

## Prerequisites
- Node.js installed
- MongoDB URI (local or Atlas)
- OpenRouter API Key

## Setup Instructions

### 1. Backend Setup
1. Open terminal and navigate to `/backend`.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and fill in your variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENROUTER_API_KEY=your_openrouter_key
   ```
4. Start the backend server:
   - Development: `node server.js` or `npm run dev` (if nodemon is installed).

### 2. Frontend Setup
1. Open a new terminal and navigate to `/frontend`.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` (optional, defaults to `http://localhost:5000/api`):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend server:
   - `npm run dev`

### API Endpoints
- **Auth**: `POST /api/auth/signup`, `POST /api/auth/login`
- **Complaints**: 
  - `GET /api/complaints`
  - `POST /api/complaints`
  - `GET /api/complaints/:id`
  - `PUT /api/complaints/:id` (Admin only)
  - `DELETE /api/complaints/:id` (Admin only)
  - `GET /api/complaints/search?location=...`

## Deployment to Render

To deploy this project to Render.com as a single Web Service:

1. Push your repository to GitHub.
2. In Render, create a new **Web Service** and connect your GitHub repo.
3. Set the following build settings:
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Add the following Environment Variables in the Render dashboard:
   - `PORT`: (Leave blank, Render handles this)
   - `MONGO_URI`: Your MongoDB Atlas connection string.
   - `JWT_SECRET`: A secure random string.
   - `OPENROUTER_API_KEY`: Your valid API key.
5. In your frontend `.env` (or replacing it directly in the build step), ensure `VITE_API_URL` points to your deployed backend URL. You can achieve this by having Render build the frontend using relative paths or injecting the frontend env during build.

*(Alternatively, you can host the frontend on Vercel/Netlify and the backend on Render separately. To do that, just connect `/frontend` to Vercel, and `/backend` to Render, updating `VITE_API_URL` accordingly.)*

## Postman Collection
Import the provided `AI_Smart_Complaint_Management_System.postman_collection.json` file into Postman to test the backend APIs independently.
