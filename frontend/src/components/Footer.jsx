import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <p>Copyright BrainFlex © 2025</p>
      <div className="footer-links">
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </footer>
  );
};

export default Footer;
