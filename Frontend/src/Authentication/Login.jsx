import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authentication.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null); // State for error message
  const navigate = useNavigate();

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
        localStorage.setItem("jwtToken", data.token);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="Header">
        <div className="Card">
          <h1 className="Title">Login</h1>
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
          <button type="submit" className="Button">
            Submit
          </button>
          <div className="LinkContainer">
            <Link to={"/signup"} className="Link">
              {"Don't"} have an account?
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
