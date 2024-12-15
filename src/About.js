import React from "react";

function About() {
    return (
        <div className="container my-5">
            {/* Page Title */}
            <h1 className="text-center mb-4">About The Car Catalog</h1>

            {/* Introduction Section */}
            <div className="row">
                <div className="col-md-6">
                    <h3>Welcome to The Car Catalog</h3>
                    <p>
                        The Car Catalog is your ultimate resource for discovering a wide variety of cars from different makes and models. Our platform allows you to explore cars by their make, model, and other key features, making it easy to find the car that best suits your needs.
                    </p>
                </div>
                <div className="col-md-6">
                    <img
                        src="https://i.etsystatic.com/15403325/r/il/eb32f5/3399078879/il_fullxfull.3399078879_nk4z.jpg"
                        alt="Car catalog"
                        className="img-fluid rounded"
                    />
                </div>
            </div>

            {/* Features Section */}
            <div className="row mt-5">
                <div className="col-md-4">
                    <h4>Easy Search</h4>
                    <p>
                        Find cars by make, model, year, and features with our easy-to-use search functionality.
                    </p>
                </div>
                <div className="col-md-4">
                    <h4>Detailed Information</h4>
                    <p>
                        Each car listing comes with comprehensive details including images, descriptions, and specifications.
                    </p>
                </div>
                <div className="col-md-4">
                    <h4>Regular Updates</h4>
                    <p>
                        I update the catalog regularly to keep you informed about the latest cars available in the market.
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <div className="row mt-5">
                <div className="col-12">
                    <h3>Meet The Dev</h3>
                    <p>
                        The dev is dedicated to providing the best experience for car enthusiasts. I am working to maintain an up-to-date, user-friendly car catalog.
                    </p>
                </div>

                {/* Team Member */}
                <div className="col-md-4 text-center">
                    <img
                        src="https://avatars.githubusercontent.com/u/128333880?s=400&u=9fad119b6e77734c5d9097d996f2e5bd3710e191&v=4"
                        alt="raul-sanchez"
                        className="img-fluid rounded-circle mb-3"
                    />
                    <h5>Raul Sanchez</h5>
                    <p>Developer</p>
                </div>
            </div>
        </div>
    );
}

export default About;