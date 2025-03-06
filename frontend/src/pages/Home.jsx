// src/pages/Home.jsx
import React from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import GameCard from "../components/GameCard";
import Footer from "../components/Footer";
import wordWrapLogo from "../assets/images/WordWrap-logo.webp";
import brainFlexLogo from "../assets/images/BrainFlex-logo.webp";

const Home = () => {
  const games = [
    {
      title: "WordWrap",
      description: "Test your vocabulary with this challenging word puzzle!",
      logo: wordWrapLogo,
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

  return (
    <div className="home-container">
      <Header />
      <Navbar />
      <main className="main-content">
        <div className="games-grid">
          {games.map((game, index) => (
            <GameCard
              key={index}
              title={game.title}
              description={game.description}
              logo={game.logo}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
