import { useState } from "react";
import MyContext from "./MyContext"; // Import the context

const MyProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState("villagers");
  const paths = {
    villagers: "/villagers",
    fish: "/nh/fish",
    bugs: "/nh/bugs",
    "Sea Creatures": "/nh/sea" 
  }
  const values = {
    selectedItem,
    setSelectedItem,
    paths
  }
  return (
    <MyContext.Provider value={values}>
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
