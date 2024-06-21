import { useState } from "react";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Login>Hi</Login>
        {/* <Signup>Hello</Signup> */}
      </div>
    </>
  );
}

export default App;
