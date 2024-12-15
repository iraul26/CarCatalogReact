import React, { useState, useEffect } from "react";
import ChargerLogo from "./assets/charger.png";
import axios from "./dataSource";
import "./css/navbar.css";
import { Link, useNavigate } from "react-router-dom";

function NavBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [makes, setMakes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await axios.get("/cars/makes");
        console.log("Fetched makes:", response.data); //debug the fetched makes
        setMakes(response.data);
      } catch (error) {
        console.log("Error fetching the makes: ", error);
      }
    };

    fetchMakes();
  }, []);

  const handleMakeClick = (make) => {
    console.log("Navigating to make:", make); //debug the clicked make
    navigate(`/cars/make/${make}`);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <span className="navbar-brand">
        <Link to="/">
          <img src={ChargerLogo} alt="Charger Logo" width={80} />
        </Link>
      </span>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <Link to="/create" className="nav-item nav-link">
            Create
          </Link>

          {/* Dropdown menu */}
          <div className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Makes
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {makes.map((make) => (
                <li key={make}>
                  <a
                    className="dropdown-item"
                    onClick={() => handleMakeClick(make)}
                  >
                    {make}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <Link to="/about" className="nav-item nav-link">
            About
          </Link>
        </div>

        {/* Search form */}
        <form className="form-inline ms-auto" onSubmit={handleSearchSubmit}>
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search model"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
