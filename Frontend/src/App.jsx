import { useState } from "react";
import "./App.css";
import Signup from "./Authentication/Signup";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Signup>hello</Signup>
      </div>
    </>
  );
}

export default App;
