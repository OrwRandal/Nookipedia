import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Catagory from "./pages/Catagory";
import BrowsePage from "./pages/BrowsePage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:catagory" element={<Catagory />} />
        <Route path="/browse" element={<BrowsePage />} />
      </Routes>
    </div>
  );
}

export default App;
