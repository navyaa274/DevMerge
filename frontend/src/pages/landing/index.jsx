import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import ContactUs from "../contact/index";
import "../../styles/landing.css";
// import logo from "./dv2.jpg";

function Landing() {
  return (
    <div className="app">
      <header className="header">
        {/* <div className="logo"><img {...logo} ></img></div> */}
        <nav className="navbar">
          <a href="#features">Features</a>
          <a href="#teams">Teams</a>
          <a href="#pricing">Pricing</a>
          <a href="#guides">Guides</a>
          <a href="#blog">Blog</a>
          <a href="#careers">Careers</a>
        </nav>
        <div className="header-actions">
          {/* Use Link for navigation */}
          
          <Link to="/home">
            <button className="button outline">Home</button>
          </Link>

          <Link to="/contact">
            <button className="button outline">Contact Us</button>
          </Link>
          <Link to="/login">
            <button className="button link">Log in</button>
          </Link>
          <Link to="/register">
            <button className="button primary">Start Building</button>
          </Link>
          <Link to="/analysis/:id">
            <button className="button outline">Analysis</button>
          </Link>
        </div>
      </header>

      {/* Define Routes */}
      <main>
        {/* <Routes>
          <Route
            path="/"
            element={ */}
              <div className="hero">
                <div className="hero-content">
                  <div className="head"> DevMerge</div>
                  <p>
                  Elevate your team's coding prowess with DevMerge: seamlessly collaborate, innovate, and deploy projects at lightning speed, from any device, anywhere. 🚀
                  </p>
                  <div className="hero-actions">
                  <Link to="/register">
                    <button className="button primary">Get Started with Your Team</button>
                  </Link>
                  </div>
                </div>
              </div>
            {/* }
          />
          <Route path="/contact-sales" element={<ContactUs />} />
          <Route path="/start-building" element={<h1>Start Building Page</h1>} />
          <Route path="/get-started" element={<h1>Get Started Page</h1>} />
        </Routes> */}
      </main>
    </div>
  );
}

export default Landing;
