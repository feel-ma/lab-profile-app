import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
const API_URL = 'http://localhost:5005';

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    //  <==  ADD
    localStorage.setItem('authToken', token);
  };

 /*  const getUser = (id) => {

    const ID= {}
    const userData = {};
    axios.get(`${API_URL}/api/users`, id).then((data) => {
      //setUser(data)
      userData = data;
    });

    console.log(userData);

    return userData;

    //
  };
 */

  const getUser = (id) => {

    console.log("i am the id",id)
    const userData = {};
    return axios
      .get(`${API_URL}/api/users?id=${id}`)
      .then((response) => {
        userData.data = response.data;
        console.log("i am the user data",userData.data);
        return userData.data;
      })
      .catch((error) => {
        console.error(error);
        throw error; // propagate the error
      });
  };
  


  const authenticateUser = () => {
    //  <==  ADD
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that the JWT token is valid
          const user = response.data;

         // console.log(user);
          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    // <== ADD
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    // <== ADD
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
  };

  useEffect(() => {
    //  <==  ADD
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        removeToken,
        logOutUser,
        getUser
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
