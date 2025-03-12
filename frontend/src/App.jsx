import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./assets/css/styles.css";
import WordWrap from "./pages/WordWrap";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/wordwrap" element={<WordWrap />} />
      </Routes>
    </Router>
  );
}

export default App;
