import { useState } from "react";
import "../home.css";
import { useContext } from "react";
import MyContext from "../context/MyContext";

const Carousel = () => {
  const { isDarkMode } = useContext(MyContext);
  const games = [
    {
      title: "Animal Crossing: New Horizons",
      image: "/ac5.jpg",
      releaseDate: "March 20, 2020",
      platform: "Nintendo Switch",
      description: "Escape to a deserted island and create your dream life.",
    },
    {
      title: "Animal Crossing: New Leaf",
      image: "/ac4.webp",
      releaseDate: "November 8, 2012",
      platform: "Nintendo 3DS",
      description: "Become the mayor and shape your town however you like!",
    },
    {
      title: "Animal Crossing: Wild World",
      image: "/ac2.webp",
      releaseDate: "November 23, 2005",
      platform: "Nintendo DS",
      description: "Take your village on the go with portable play.",
    },
    {
      title: "Animal Crossing: City Folk",
      image: "/ac3.jpg",
      releaseDate: "November 16, 2008",
      platform: "Nintendo Wii",
      description: "Visit the big city while keeping your village cozy.",
    },
    {
      title: "Animal Crossing (GameCube)",
      image: "/ac1.jpg",
      releaseDate: "September 15, 2002",
      platform: "Nintendo GameCube",
      description: "The original — start your new life in a peaceful village.",
    },
    {
      title: "Animal Crossing: Pocket Camp",
      image: "/ac8.jpg",
      releaseDate: "October 25, 2017",
      platform: "iOS / Android",
      description: "Create your perfect campsite with friends and furniture.",
    },
    {
      title: "Animal Crossing: Happy Home Designer",
      image: "/ac6.webp",
      releaseDate: "July 30, 2015",
      platform: "Nintendo 3DS",
      description: "Design dream homes for your favorite villagers.",
    },
    {
      title: "Animal Crossing: Amiibo Festival",
      image: "/ac7.jpg",
      releaseDate: "November 13, 2015",
      platform: "Nintendo Wii U",
      description: "A party game spin-off featuring your favorite characters.",
    },
  ];
  const [startIndex, setStartIndex] = useState(0);
  const [flipped, setFlipped] = useState({});

  const handleFlip = (index) => {
    setFlipped((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNext = () => {
    if (startIndex + 3 < games.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleGames = games.slice(startIndex, startIndex + 3);
  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        <button className="nav-button left" onClick={handlePrev}>
          &larr;
        </button>

        <div className="carousel">
          {visibleGames.map((game, idx) => {
            const actualIndex = startIndex + idx;
            return (
              <div
                key={actualIndex}
                className={`flip-card ${flipped[actualIndex] ? "flipped" : ""}`}
                onClick={() => handleFlip(actualIndex)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <img src={game.image} alt={game.title} />
                  </div>
                  <div className={`flip-card-back ${isDarkMode ? "darkInput" : "lightInput"}`}>
                    <h3>{game.title}</h3>
                    <p>
                      <strong>Release:</strong> {game.releaseDate}
                    </p>
                    <p>
                      <strong>Console:</strong> {game.platform}
                    </p>
                    <p>{game.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button className="nav-button right" onClick={handleNext}>
          &rarr;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
