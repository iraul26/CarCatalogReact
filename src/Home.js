import React from "react";
import HeroBanner from "./assets/hero-image.png";
import "./css/homescreen.css";

function Home() {
    return (
        <div className="home-container">
            <div className="content">
                <img
                    src={HeroBanner}
                    alt="herobanner"
                    className="background-image"
                />
                <h1 className="centered-text">Welcome to the Car Catalog</h1>
            </div>
            <footer className="footer">© 2024 Car Catalog. All rights reserved.</footer>
        </div>
    );
};

export default Home;