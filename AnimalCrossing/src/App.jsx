import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Catagory from "./pages/Catagory";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:catagory" element={<Catagory />} />
      </Routes>
    </div>
  );
}

export default App;
