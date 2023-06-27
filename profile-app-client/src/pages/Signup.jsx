import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5005';

  
const campusOptions = [
  "Madrid",
  "Barcelona",
  "Miami",
  "Paris",
  "Berlin",
  "Amsterdam",
  "México",
  "Sao Paulo",
  "Lisbon",
  "Remote",
];

const courseOptions = [
  "Web Dev",
  "UX/UI",
  "Data Analytics",
  "Cyber Security",
];

function Signup() {
  const [username, setUsername] = useState('Username');
  const [password, setPassword] = useState('Password');
  const [campus, setCampus] = useState(courseOptions[0]);
  const [course, setCourse] = useState(courseOptions[0]);
  const [errorMessage, setErrorMessage] = useState(undefined);


  const navigate = useNavigate();

  const handleUsernameInput = (e) => setUsername(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const handleCampusInput = (e) => setCampus(e.target.value);

  const handleCourseInput = (e) => setCourse(e.target.value);

  const handleSubmit = (e) => {
    // <==  ADD
    e.preventDefault();
    const newStudent = { username, password, campus, course };

    axios
      .post(`${API_URL}/auth/signup`, newStudent)
      .then((response) => {
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });

    console.log('Submitted: ', newStudent);
  };

  return (
    <>
      <div>
        <h1>Sign UP!</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameInput}
          />
          <input
            type="text"
            name="password"
            value={password}
            onChange={handlePasswordInput}
          />
          <select name="campus" value={campus} onChange={handleCampusInput}>
            <option value="">Select Campus</option>
            {campusOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select name="course" value={course} onChange={handleCourseInput}>
            <option value={courseOptions[0]}>Select Course</option>
            {courseOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button type="submit"> Sign up</button>
        </form>
      </div>
    </>
  );
}

export default Signup;
