import React from "react";
import logo from "../../logo.png";
import { Link, useLocation } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";

const Header = () => {
  const location = useLocation();
//   console.log(location.pathname);
  return (
    <nav className="header">
      <img src={logo} alt="Logo" />

      <div>
        <Link
          className={`${location.pathname === "/" ? "active" : ""}`}
          to="/"
        >
          Home
        </Link>
        <Link to="/tvshows" className={`${location.pathname === "/tvshows" ? "active" : ""}`}>Tv Shows</Link>
        <Link to="/movies" className={`${location.pathname === "/movies" ? "active" : ""}`}>Movies</Link>
        <Link to="/recent" className={`${location.pathname === "/recent" ? "active" : ""}`}>Recently Added</Link>
        <Link to="/mylist" className={`${location.pathname === "/mylist" ? "active" : ""}`}>My List</Link>
      </div>

      <RiSearchLine />
    </nav>
  );
};

export default Header;
