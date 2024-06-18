import { useState } from "react";
import "./Signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("https://localhost:3000w/api/user/signup", {
        // Replace with your backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
      } else {
        const data = await response.json();
        console.log("Signup successful:", data);
        // Handle successful signup (e.g., redirect to login page or display success message)
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="HeaderContainer">
          <h1 className="h1">Sign up</h1>
        </div>
        <div>
          <span>Email</span>
          <input
            id="input1"
            className="input"
            placeholder="enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <span>Password</span>
          <input
            id="input2"
            className="input"
            placeholder="enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default Signup;
