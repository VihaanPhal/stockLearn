import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch("http://localhost:3000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error);
      } else {
        const data = await response.json();
        console.log("Login successful:", data);
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
          <h1 className="h1">Login</h1>
        </div>
        <div>
          <span>Email</span>
          <input
            id="input1"
            className="input"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <span>Password</span>
          <input
            id="input2"
            className="input"
            placeholder="Enter password"
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

export default Login;
