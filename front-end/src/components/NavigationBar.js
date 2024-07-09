import React from "react";
import { Link } from "react-router-dom";
import "../../src/App.css";

const NavigationBar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Recipe Tracker
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="btn btn-link nav-link" to="/add-recipe">
                + Add Recipe
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="nav-link rounded"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
