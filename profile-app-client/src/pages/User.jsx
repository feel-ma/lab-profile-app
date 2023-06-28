import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import service from "../api/service";
import axios from "axios";
const API_URL = 'http://localhost:5005';


function UserPage(){

    const { isLoggedIn, user, logOutUser, getUser} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState(undefined);
    const [ userdata, updateData] = useState({})
    const [imageUrl, setImageUrl] = useState("");

    const handleFileUpload = (e) => {
      // console.log("The file to be uploaded is: ", e.target.files[0]);
   
      const uploadData = new FormData();
   
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new movie in '/api/movies' POST route
      uploadData.append("imageUrl", e.target.files[0]);
   
      service
        .uploadImage(uploadData)
        .then(response => {
          console.log("response is: ", response);
          // response carries "fileUrl" which we can use to update the state
          setImageUrl(response.fileUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
   
      service
        .uploadImage( imageUrl )
        .then(res => {
          // console.log("added new movie: ", res);
   
          // Reset the form
    
          setImageUrl("");
        
          // navigate to another page
        
        })
        .catch(err => console.log("Error while adding the new movie: ", err));

     /*    axios
        .post(`${API_URL}/api/users?id=${user._id}`, imageUrl)
        .then((response) => {
         
        })
        .catch((error) => {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        });
   */
      console.log('Submitted: ', imageUrl);
    };

    useEffect(() => {
      //console.log(user._id)
    getUser(user._id).then((r) =>{
      updateData(r)
    })
    //  console.log("campus",userdata.campus)
    }, []);


    return (
        <>
         {isLoggedIn && (
        <>
         <button onClick={logOutUser}>Logout</button>
      <div> Im login</div>
     
          <p>Name: {userdata.username}</p>
          <p>Campus: {userdata.campus}</p>
          <p>Course: {userdata.course}</p>

          <form onSubmit={handleSubmit}>
           <input type="file" name ="imageUrl" onChange={(e) => handleFileUpload(e)} />
           <button type="submit">Save image</button>
          </form>

        
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