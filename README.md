# Sadie Frontend

A modern React + Vite application that serves as the user interface for the Library Book Catalog. It connects to the **Sam Library API** to provide a seamless book browsing and management experience.

## 🛠 Prerequisites

- **Node.js**: v18+ (v20+ recommended)
- **npm** or **yarn**
- **Sam API**: Running locally (default `http://localhost:3000`)

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
The app uses environment variables for configuration. Copy the example file:
```bash
cp .env.example .env
```
Ensure `VITE_API_URL` points to your running Sam API instance.

### 3. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:5173`.

## 📚 Features

- **Public Catalog**: Browse available books without an account.
- **Secure Login**: Access your personal dashboard (connected to Sam API).
- **Responsive Design**: Optimized for both desktop and mobile viewing.

## 🛠 Tech Stack

- **React 19**: UI Library
- **Vite**: Build Tool & Dev Server
- **Axios**: API Client
- **Tailwind CSS**: Styling
- **React Router**: Frontend Routing
