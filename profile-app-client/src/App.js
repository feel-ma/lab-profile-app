import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import UserPage from "./pages/User";

function App() {
  return (
   <>
    <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/user" element={<UserPage />}/>
       </Routes>
       <div>i am working</div>

       
      
       </>
  );
}

export default App;
