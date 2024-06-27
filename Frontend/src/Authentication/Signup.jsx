import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Authentication.css";

function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
        setSuccessMessage(""); 
      } else {
        const data = await response.json();
        console.log("Signup successful:", data);
        setSuccessMessage("User signed up successfully!");
        setEmail(""); 
        setPassword("");
        setErrorMessage(""); 
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("An error occurred. Please try again.");
      setSuccessMessage(""); 
    }
  };

  return (
    <div className="Header">
      <form onSubmit={handleSubmit} className="Card">
        <h1 className="Title">Sign up</h1>
        <div className="InputGroup">
          <label htmlFor="input1" className="Label">
            Email
          </label>
          <input
            id="input1"
            className="Input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
        </div>
        <div className="InputGroup">
          <label htmlFor="input2" className="Label">
            Password
          </label>
          <input
            id="input2"
            className="Input"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        {errorMessage && <p className="ErrorMessage">{errorMessage}</p>}
        {successMessage && <p className="SuccessMessage">{successMessage}</p>}
        <button type="submit" className="Button">
          Submit
        </button>
        <div className="LinkContainer">
          <Link to={"/login"} className="Link">
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
