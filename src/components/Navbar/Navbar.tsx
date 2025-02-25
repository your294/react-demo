import { Link } from "react-router-dom";
import "./navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="header">Posts</h1>
      <div className="right-bar">
        <div className="post">
          <Link to="/">To New Posts!</Link>
        </div>
        <div className="post">
          <Link to="/single">Single Post!</Link>
        </div>
      </div>
    </nav>
  );
}
