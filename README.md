# Project Documentation

## Overview
This project consists of a **frontend** and **backend**, built with modern web development tools. The frontend uses **Vite** for fast development and React for UI components, while the backend is built on **Express.js** and **Apollo Server** to provide a GraphQL API.

---

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Features](#features)
3. [Setup](#setup)
4. [Development Scripts](#development-scripts)

---

## Technologies Used

### Frontend
- **Vite**: Build tool for fast frontend development.
- **React**: Library for building user interfaces.
- **Material-UI (MUI)**: UI component library.
- **GraphQL**: Data query and manipulation language.
- **Apollo Client**: GraphQL client for state management.
- **Recharts & React Chart.js 2**: Libraries for data visualization.
- **Firebase**: Backend-as-a-service for authentication and data storage.

### Backend
- **Express.js**: Web framework for Node.js.
- **Apollo Server**: GraphQL server implementation.
- **MongoDB with Mongoose**: NoSQL database and ODM.
- **GraphQL Subscriptions**: For real-time updates.
- **Multer**: Middleware for handling file uploads.
- **dotenv**: For managing environment variables.

---

## Features

### Frontend
- Fast development and builds with **Vite**.
- Dynamic UI with **React** and **MUI** components.
- GraphQL queries and mutations using **Apollo Client**.
- Real-time updates via **GraphQL Subscriptions**.
- Data visualization with **Recharts** and **React Chart.js 2**.
- User authentication and data management with **Firebase**.

### Backend
- RESTful API and GraphQL support.
- Real-time data updates using **GraphQL Subscriptions**.
- File uploads using **Multer**.
- MongoDB integration via **Mongoose**.
- Modular and scalable server design.

## Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- NPM or Yarn

### Steps

#### Frontend
1. Navigate to the `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` directory and configure your environment variables:
   ```env
   VITE_API_URL=http://localhost:4000/graphql
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

#### Backend
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and configure your environment variables:
   ```env
   MONGO_URI=mongodb://localhost:27017/your-database
   PORT=4000
   ```
4. Start the server:
   ```bash
   npm run server
   ```

---

## Development Scripts

### Frontend
| Script          | Description                                  |
|------------------|----------------------------------------------|
| `npm run dev`   | Starts the development server.              |
| `npm run build` | Builds the application for production.      |
| `npm run lint`  | Runs ESLint for code quality checks.        |
| `npm run preview` | Previews the production build locally.    |

### Backend
| Script            | Description                                   |
|--------------------|-----------------------------------------------|
| `npm run server`  | Starts the backend server using Nodemon.     |
| `npm test`        | Placeholder for running tests.               |

---

## Notes
- Update dependencies regularly to stay up to date with security patches.
- Ensure your `.env` files are never pushed to version control. Use `.env.example` as a template for sharing configuration settings.
