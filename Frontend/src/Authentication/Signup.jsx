import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Authentication.css';


function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      } else {
        const data = await response.json();
        console.log("Signup successful:", data);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

return (
  <div className="Header">
    <form onSubmit={handleSubmit} className="Card">
      <h1 className="Title">Sign up</h1>
      <div className="InputGroup">
        <label htmlFor="input1" className="Label">Email</label>
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
        <label htmlFor="input2" className="Label">Password</label>
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
      <button type="submit" className="Button">Submit</button>
      <div className="LinkContainer">
        <Link to={'/login'} className="Link">Already have an account?</Link>
      </div>
    </form>
  </div>
);
};

export default SignupForm;





//earlier code
//   return (
//     <Frame>
//       <form onSubmit={handleSubmit}>
//         <FormContainer>
//           <HeaderContainer>
//             <HeaderTitle>Sign up</HeaderTitle>
//           </HeaderContainer>
//           <InputContainer>
//             <InputLabel htmlFor="input1">Email</InputLabel>
//             <InputField
//               id="input1"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               type="email"
//             />
//           </InputContainer>
//           <InputContainer>
//             <InputLabel htmlFor="input2">Password</InputLabel>
//             <InputField
//               id="input2"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               type="password"
//             />
//           </InputContainer>
//           {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
//           <ButtonContainer>
//             <SubmitButton type="submit">Submit</SubmitButton>
//           </ButtonContainer>
//           <Link to={'/login'}>
//                 Already have an account?
//         </Link>
//         </FormContainer>
//       </form>
//     </Frame>
//   );
// }