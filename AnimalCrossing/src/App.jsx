import { useContext } from "react";
import "./App.css";
import Home from "./pages/Home";

import BrowsePage from "./pages/BrowsePage";
import NavBar from "./components/Navbar";
import ItemInfoPage from "./pages/ItemInfoPage";
import SavedPage from "./pages/savedPage";
import { Routes, Route } from "react-router-dom";
import MyContext from "./context/MyContext";

function App() {
  const {isDarkMode} = useContext(MyContext);
  return (
      <div className={isDarkMode? "darkApp App": "App"}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/info/:category/:name/:id?" element={<ItemInfoPage />} />
          <Route path="/saved" element={<SavedPage />} />
        </Routes>
      </div>
  );
}

export default App;
