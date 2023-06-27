import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";


function Home() {

  const { 
    isLoggedIn,
    user,                   // <== UPDATE
    logOutUser              // <== UPDATE
  } = useContext(AuthContext);


    return (
      <>
        <Link to="/signup">
          <button>Sign up</button>
        </Link>
        <Link to="/login">
          <button>Log in</button>
        </Link>
        <Link to="/user">
          <button>User</button>
        </Link>
        <button onClick={logOutUser}>Logout</button>
        
        
      </>
    );
  }
  
  export default Home;
  