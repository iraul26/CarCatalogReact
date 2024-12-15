import React from 'react';
import CarsByMake from './CarsByMake';
import NavBar from './NavBar';
import Home from './Home';
import CreateCar from './CreateCar';
import About from './About';
import SearchResults from './SearchResults';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';

function App() {
  return (
    <>
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/create' element={<CreateCar/>} />
        <Route path='/about' element={<About />} />
        <Route path='/search/:searchTerm' element={<SearchResults />} />
        <Route path='/cars/make/:make' element={<CarsByMake />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
