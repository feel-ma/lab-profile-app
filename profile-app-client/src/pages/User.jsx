import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";


function UserPage(){

    const { isLoggedIn, user, logOutUser} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(undefined);

    useEffect(() => {
      // Fetch user data or perform any other necessary actions when the component mounts
    }, []);


    return (
        <>
         {isLoggedIn && (
        <>
         <button onClick={logOutUser}>Logout</button>
      <div> Im login</div>
     
          <p>Name: {user.username}</p>
          <p>Campus: {user.campus}</p>
          <p>City: {user.course}</p>
        </>
      )}
 
      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
          <div> IM LOGOUT</div>
        </>
      )}

{ errorMessage && <p className="error-message">{errorMessage}</p> }

        </>
    )
}

export default UserPage