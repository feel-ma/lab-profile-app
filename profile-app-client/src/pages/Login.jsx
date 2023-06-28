import React from "react";
import axios from "axios";

import { useState, useContext } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";






const API_URL = "http://localhost:5005";


function Login(){

    const[username, setUsername] =useState("Username")
    const[password, setPassword] =useState("Password")
    const [errorMessage, setErrorMessage] = useState(undefined);

    const handleUsernameInput = e => setUsername(e.target.value);
 
     const handlePasswordInput = e => setPassword(e.target.value);

     const navigate = useNavigate();

     const { storeToken, authenticateUser } = useContext(AuthContext);
 

     const handleSubmit = (e) => {        // <==  ADD

        e.preventDefault();

        const LoginStudent = { username, password};
       
     
        console.log("Submitted: ", LoginStudent);

        axios.post(`${API_URL}/auth/login`, LoginStudent)
          .then((response) => {
          // Request to the server's endpoint `/auth/login` returns a response
          // with the JWT string ->  response.data.authToken
            console.log('JWT token', response.data.authToken );
            storeToken(response.data.authToken)

            authenticateUser()
          
            navigate('/');                             // <== ADD      
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
      }
     



    return (
        <>
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" value={username} onChange={handleUsernameInput}/>
                <input type="text" name="password" value={password} onChange={handlePasswordInput} />
                <button  type="submit"> Sign up</button>
            </form>
        </div>
        </>
    )
}

export default Login