import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";

ReactDOM.render(
  <Router>
    <React.StrictMode>
    <AuthProviderWrapper> 
      <App />
      </AuthProviderWrapper> 
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
);