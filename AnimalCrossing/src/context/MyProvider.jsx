import { useState, useEffect } from "react";
import MyContext from "./MyContext"; // Import the context

const MyProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState("villagers");
  const [saved, setSaved] = useState(() => {
    return JSON.parse(localStorage.getItem("savedData")) || {
      villagers: [],
      fish: [],
      bugs: [],
      "Sea Creatures": []
    };
  });

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMode = () => {
    setIsDarkMode((prev) => !prev);
  };


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("savedData")) || saved;
    setSaved(storedData);
  }, []);

  const paths = {
    villagers: "/villagers",
    fish: "/nh/fish",
    bugs: "/nh/bugs",
    "Sea Creatures": "/nh/sea" 
  }
  const values = {
    selectedItem,
    setSelectedItem,
    paths,
    saved,
    setSaved,
    isDarkMode,
    toggleMode
  }
  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
