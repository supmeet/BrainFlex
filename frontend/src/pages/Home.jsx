// src/pages/Home.jsx
import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import Footer from "../components/Footer";
import wordWrapLogo from "../assets/images/WordWrap-logo.webp";
import brainFlexLogo from "../assets/images/BrainFlex-logo.webp";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const games = [
    {
      title: "WordWrap",
      description: "Test your vocabulary with this challenging word puzzle!",
      logo: wordWrapLogo,
      link: "/games/wordwrap",
    },
    {
      title: "Scrumble",
      description: "Test your vocabulary with this challenging word puzzle!",
      logo: brainFlexLogo,
    },
    {
      title: "WordWrap",
      description: "Test your vocabulary with this challenging word puzzle!",
      logo: wordWrapLogo,
    },
    {
      title: "WordWrap",
      description: "Test your vocabulary with this challenging word puzzle!",
      logo: wordWrapLogo,
    },
    {
      title: "WordWrap",
      description: "Test your vocabulary with this challenging word puzzle!",
      logo: wordWrapLogo,
    },
    {
      title: "WordWrap",
      description: "Test your vocabulary with this challenging word puzzle!",
      logo: wordWrapLogo,
    },
    {
      title: "WordWrap",
      description: "Test your vocabulary with this challenging word puzzle!",
      logo: wordWrapLogo,
    },
    {
      title: "WordWrap",
      description: "Test your vocabulary with this challenging word puzzle!",
      logo: wordWrapLogo,
    },
  ];

  const navigate = useNavigate();

  const handleGameClick = (link) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.username) {
      navigate(link);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="home-container">
      <Header />
      <Navbar />
      <main className="main-content1">
        <div className="games-grid">
          {games.map((game, index) => (
            <div key={index} onClick={() => handleGameClick(game.link)}>
              <GameCard
                title={game.title}
                description={game.description}
                logo={game.logo}
                link={game.link}
              />
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
