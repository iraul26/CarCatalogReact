import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./dataSource";

function CarsByMake() {
    const { make } = useParams(); //get the selected make from the URL
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarsByMake = async () => {
            try {
                const response = await axios.get(`/cars/search/make/${make}`);
                console.log("fetched makes: ", response.data);
                setCars(response.data); //set the fetched cars
            } catch (error) {
                console.error("Error fetching cars by make:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarsByMake();
    }, [make]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-5">
            <h2>Cars for Make: "{make}"</h2>
            <div className="row">
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <div className="col-md-4" key={car.carId}>
                            <div className="card mb-4">
                                <img src={car.url} className="card-img-top" alt={car.model} />
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {car.make} {car.model} ({car.year})
                                    </h5>
                                    <p className="card-text">{car.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No cars found for make "{make}".</p>
                )}
            </div>
        </div>
    );
}

export default CarsByMake;