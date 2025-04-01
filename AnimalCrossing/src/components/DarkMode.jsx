import { useContext } from "react";
import MyContext from "../context/MyContext";

const DarkMode = () => {
    const {isDarkMode, toggleMode} = useContext(MyContext);

  return (
    <button
      className="container"
      aria-label="Toggle color mode"
      title="Toggle color mode"
      onClick={toggleMode}
    >
      <div className={`sun ${!isDarkMode ? "visible" : ""}`}></div>
      <div className={`moon ${isDarkMode ? "visible" : ""}`}>
        <div className="star"></div>
        <div className="star small"></div>
      </div>
    </button>
  );
};

export default DarkMode;
