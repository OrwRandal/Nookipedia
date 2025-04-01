import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Catagory from "./pages/Catagory";
import BrowsePage from "./pages/BrowsePage";
import NavBar from "./components/Navbar";
import ItemInfoPage from "./pages/ItemInfoPage";
import SavedPage from "./pages/savedPage";
import { Routes, Route } from "react-router-dom";
import MyProvider from "./context/MyProvider";

function App() {
  return (
    <MyProvider>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:catagory" element={<Catagory />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/info/:category/:name/:id?" element={<ItemInfoPage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
      </div>
    </MyProvider>
  );
}

export default App;
