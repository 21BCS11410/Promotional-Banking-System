import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '4aed88',
            },
          },
        }}
      />
    </BrowserRouter>
  </React.StrictMode>
);
