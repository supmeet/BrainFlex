import { Link } from "react-router-dom";

const GameCard = ({ title, description, logo, link }) => {
  return (
    <Link to={link} className="game-card-link">
      <div className="game-card">
        <div className="card-content">
          <img src={logo} alt={`${title} Logo`} className="game-logo" />
          <h3 className="game-title">{title}</h3>
        </div>
        <div className="card-hover">
          <p className="game-description">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
