import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./dataSource";

function SearchResults() {
    const { searchTerm } = useParams(); //get the search term from the URL
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState(null); //store the selected car for editing or deleting
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get(`/cars/search/model/${searchTerm}`);
                setCars(response.data); //set the fetched cars
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setLoading(false); //stop the loading spinner
            }
        };

        fetchCars();
    }, [searchTerm]);

    const handleEdit = (car) => {
        setSelectedCar(car); //set the car to be edited
        setShowEditModal(true); //show the edit modal
    };

    const handleDelete = (car) => {
        console.log("selected car to delete: " + car);
        setSelectedCar(car); //set the car to be deleted
        setShowDeleteModal(true); //show the delete modal
    };

    const updateCar = async () => {
        try {
            console.log("Updating car payload:", selectedCar); //log the payload being sent
            const response = await axios.put(`/cars/${selectedCar.carId}`, selectedCar);
            console.log("Update response:", response.data);
        
            setCars((prevCars) =>
                prevCars.map((car) =>
                    car.carId === selectedCar.carId ? selectedCar : car
                )
            );
            setShowEditModal(false);
        } catch (error) {
            console.error("Error updating car:", error.response?.data || error.message);
        }
    };
    
    

    const deleteCar = async () => {
        try {
            await axios.delete(`/cars/${selectedCar.carId}`); //delete the car from the database
            setCars((prevCars) =>
                prevCars.filter((car) => car.carId !== selectedCar.carId)
            );
            setShowDeleteModal(false); //close the modal
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-5">
            <h2>Search Results for "{searchTerm}"</h2>
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
                                    <button className="btn btn-primary me-2" onClick={() => handleEdit(car)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(car)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No cars found for the search term "{searchTerm}".</p>
                )}
            </div>

            {/* Edit Modal */}
            {showEditModal && selectedCar && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Car</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={selectedCar.make}
                                    onChange={(e) =>
                                        setSelectedCar({ ...selectedCar, make: e.target.value })
                                    }
                                    placeholder="Make"
                                />
                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    value={selectedCar.model}
                                    onChange={(e) =>
                                        setSelectedCar({ ...selectedCar, model: e.target.value })
                                    }
                                    placeholder="Model"
                                />
                                <input
                                    type="number"
                                    className="form-control mb-2"
                                    value={selectedCar.year}
                                    onChange={(e) =>
                                        setSelectedCar({ ...selectedCar, year: e.target.value })
                                    }
                                    placeholder="Year"
                                />
                                <textarea
                                    className="form-control mb-2"
                                    value={selectedCar.description}
                                    onChange={(e) =>
                                        setSelectedCar({ ...selectedCar, description: e.target.value })
                                    }
                                    placeholder="Description"
                                />
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedCar.url}
                                    onChange={(e) =>
                                        setSelectedCar({ ...selectedCar, url: e.target.value })
                                    }
                                    placeholder="Image URL"
                                />
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={updateCar}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedCar && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Delete</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDeleteModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Are you sure you want to delete{" "}
                                    <strong>{selectedCar.make} {selectedCar.model}</strong>?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button className="btn btn-danger" onClick={deleteCar}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchResults;