import React, { useState } from "react";
import styled from "styled-components";

const Frame = styled.div`
  padding: 100px;
  background-color: ${({ theme }) => theme.text_primary};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  max-width: 400px;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
  padding: 50px;
`;

const HeaderContainer = styled.div`
  align-items: center;
  margin-bottom: 30px;
  justify-content: center;
`;

const HeaderTitle = styled.h1`
  font-size: 30px;
  color: #333;
  font-weight: 700;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: left;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #555;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4d4f;
  margin-bottom: 15px;
  font-size: 14px;
`;

const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #0056b3;
  }
`;

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
    <Frame>
      <form onSubmit={handleSubmit}>
        <FormContainer>
          <HeaderContainer>
            <HeaderTitle>Sign up</HeaderTitle>
          </HeaderContainer>
          <InputContainer>
            <InputLabel htmlFor="input1">Email</InputLabel>
            <InputField
              id="input1"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </InputContainer>
          <InputContainer>
            <InputLabel htmlFor="input2">Password</InputLabel>
            <InputField
              id="input2"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </InputContainer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <ButtonContainer>
            <SubmitButton type="submit">Submit</SubmitButton>
          </ButtonContainer>
        </FormContainer>
      </form>
    </Frame>
  );
}

export default SignupForm;
