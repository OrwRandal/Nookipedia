import "../home.css";
import Carousel from "../components/Carousel";
import { useState, useContext } from "react";
import MyContext from "../context/MyContext";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const catagories = [
  {
    catagory: "villagers",
    image: "https://dodo.ac/np/images/5/51/Agent_S_NH_Villager_Icon.png",
  },
  {
    catagory: "bugs",
    image: "https://dodo.ac/np/images/3/37/Grasshopper_NH_Icon.png",
  },
  {
    catagory: "fish",
    image: "https://dodo.ac/np/images/d/db/Cherry_Salmon_NH_Icon.png",
  },
  {
    catagory: "Sea Creatures",
    image: "http://dodo.ac/np/images/5/58/Octopus_NH_Icon.png",
  },
];

const Home = () => {
  const {setSelectedItem} = useContext(MyContext);
  const navigate = useNavigate()
  const handleClick = (key) => {
    console.log(`Navigating to ${key}`);
    setSelectedItem(key)
    navigate("/browse/")
  }

  return (
    <>
      <h1 id="homeTitle">Nookipedia</h1>
      <section className="bio">
        Welcome to your one-stop spot for all things Animal Crossing! This cozy
        little corner of the web is powered by the magical Nookipedia API—which
        means you’ll get the freshest villager gossip, bug and fish facts, event
        dates, and all the adorable items your heart desires. Think of it like
        your trusty NookPhone, but way cooler (and with fewer bells owed to Tom
        Nook). So grab a cup of coffee from Brewster, kick back, and explore
        your favorite ACNH goodies. 🍃
      </section>
      <h1 className="subtitle">Games</h1>
      <Carousel />
      <h1 className="subtitle">Categories</h1>
      <section className="catagories">
        {catagories.map((catagory, idx) => {
          const key = catagory.catagory;
          return (
            <div 
            key={key} 
            className="catagory"
            onClick={() => handleClick(catagory.catagory)}
            >
              <div className="front-card">
                <img src={catagory.image} />
                <h3>{catagory.catagory}</h3>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Home;
