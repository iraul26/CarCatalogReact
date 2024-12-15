import React, { useState } from "react";
import axios from "./dataSource";

function CreateCar() {
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: "",
        description: "",
        url: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting car..");
            const response = await axios.post("/cars", formData);
            console.log("Car created successfully:", response.data);
            // Clear the form after successful submission
            setFormData({
                make: "",
                model: "",
                year: "",
                description: "",
                url: "",
            });
        } catch (error) {
            console.error("Error creating car:", error);
        }
    };

    return (
        <div className="create-car-container">
            <h2>Create a New Car</h2>
            <form onSubmit={handleSubmit}>
                {/* Make */}
                <div className="form-group">
                    <label htmlFor="make">Make</label>
                    <input
                        type="text"
                        id="make"
                        name="make"
                        value={formData.make}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter car make"
                        required
                    />
                </div>

                {/* Model */}
                <div className="form-group">
                    <label htmlFor="model">Model</label>
                    <input
                        type="text"
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter car model"
                        required
                    />
                </div>

                {/* Year */}
                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter car year"
                        required
                    />
                </div>

                {/* Description */}
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter car description"
                        rows="3"
                        required
                    />
                </div>

                {/* Image URL */}
                <div className="form-group">
                    <label htmlFor="url">Image URL</label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter image URL"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default CreateCar;