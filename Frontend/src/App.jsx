import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import Home from "./Home";
import Graphs from "./Graphs";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />\
            <Route path="/" element={<Home />} />
            <Route path="/1" element={<Graphs />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
