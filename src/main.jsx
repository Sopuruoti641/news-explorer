import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/news-explorer/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// "dev": "vite",
// "build": "vite build",
// "lint": "eslint .",
// "preview": "vite preview",
// "predeploy": "npm run build",
// "deploy": "gh-pages -d dist"
