import {useEffect, useState} from "react";
import axios from "axios";
import {Movie} from "../model/Movie";
import {toast} from "react-toastify";

export default function useMovies(){

    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        getAllMovies()
    }, [])

    const getAllMovies = () => {
        axios.get("/api/movie")
            .then(res => res.data)
            .then(d => setMovies(d))
            .catch((error) => toast.error(error.message))

    }

    const postNewMovie = (movie:Movie) => {
        axios.post("/api/movie", movie)
            .then(() => toast.success("Movie added to database"))
            .catch((error) => toast.error(error.message))
            .then(getAllMovies)
    }

    const updateMovie = (movie:Movie) => {
        axios.put("/api/movie", movie)
            .then(() => toast.success("Movie updated to database"))
            .catch((error) => toast.error(error.message))
            .then(getAllMovies)
    }

    const deleteMovie = (id:string) => {
        axios.delete("/api/movie/"+id)
            .then(getAllMovies)
            .then(() => toast.success("Movie deleted"))
            .catch((e) => toast.error(e.message))
    }

    return {movies, getAllMovies, postNewMovie, updateMovie, deleteMovie}
}