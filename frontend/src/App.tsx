import React from 'react';
import './App.css';
import useMovies from "./hooks/useMovies";
import MovieGallery from "./components/MovieGallery";
import {HashRouter, Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage";
import NavBar from "./components/NavBar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import DetailsPage from "./pages/DetailsPage";

function App() {

    const {movies, getAllMovies, postNewMovie, updateMovie, deleteMovie} = useMovies();


    return (
        <div className="App">
            <ToastContainer position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="dark"/>
            <header className={"App-header"}>
            <HashRouter>
                <h1> Movie Gallery</h1>
                <NavBar/>
                <Routes>
                    <Route path={"/homepage"} element={<Homepage/>}/>
                    <Route path={"/"} element={<MovieGallery movies={movies} getAllMovies={getAllMovies} postNewMovie={postNewMovie} deleteMovie={deleteMovie}/>}/>
                    <Route path={'/movie/:id'}
                           element={<DetailsPage
                               updateMovie={updateMovie}
                               deleteMovie={deleteMovie}/>}/>
                </Routes>
            </HashRouter>
            </header>
        </div>
    );
}

export default App;
