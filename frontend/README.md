# Frontend Documentation

## Overview
This document provides details on setting up, running, and maintaining the frontend of the application. The frontend is built using **React (Vite)** with **Tailwind CSS** and **shadcn** components.

## Prerequisites
Ensure you have the following installed:
- **Node.js** (Version 18 or higher)
- **npm** (for package management)

## Installation
Navigate to the `frontend` directory and install dependencies:
```sh
cd frontend
npm install  # or yarn install
```

## Running the Development Server
To start the frontend development server, use the following command from the root folder:
```sh
npm run client
```
This will execute:
```sh
npm run dev --prefix frontend
```
Vite will start a development server, typically at `http://localhost:5173/`.
<!-- 
## Build for Production
To generate a production build, run:
```sh
npm run build --prefix frontend
```
This creates an optimized build in the `frontend/dist` folder. -->

## Tech Stack
- **React (Vite)** - Fast build tool for frontend development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Pre-built UI components

## Styling
Tailwind CSS is configured in `tailwind.config.js`. Components from **shadcn** can be customized as needed.

## Shadcn Components
To add new components from **shadcn**, use:
```sh
npx shadcn-ui@latest add component-name
```
Replace `component-name` with the required component, such as `button`, `card`, etc.

## Environment Variables
Create a `.env.local` file in the `frontend` folder and define environment-specific values:
```
VITE_API_URL=http://localhost:5000
```
Access these values in your React code via:
```js
const apiUrl = import.meta.env.VITE_API_URL;
```

## Deployment
To deploy, upload the `dist` folder contents to a static hosting service such as **Vercel**, **Netlify**, or **GitHub Pages**.

## Troubleshooting
- If you encounter dependency issues, try deleting `node_modules` and `package-lock.json` and reinstalling:
  ```sh
  rm -rf node_modules package-lock.json
  npm install
  ```
- Ensure that the backend API URL is correctly set in `.env`.
- If Tailwind styles are not applying, restart the development server.

---
For further queries, refer to the official documentation of [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/), and [shadcn/ui](https://ui.shadcn.com/).

