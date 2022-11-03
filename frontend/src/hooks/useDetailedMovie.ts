import axios from "axios";
import {useState} from "react";
import {Movie} from "../model/Movie";
import {toast} from "react-toastify";


export default function useDetailedMovie() {

    const [detailedMovie, setDetailedMovie] = useState<Movie>()

    const loadDetailedMovie = (id: string) => {
        axios.get("/api/movie/" + id)
            .then(response => response.data)
            .then(movie => setDetailedMovie(movie))
            .catch((error) => toast.error(error.response.data))
    }

    return {loadDetailedMovie, detailedMovie};
}