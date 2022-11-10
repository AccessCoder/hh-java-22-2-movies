import {Movie} from "../model/Movie";
import MovieCard from "./MovieCard";
import {FormEvent, useState} from "react";
import "./MovieGallery.css"
import {toast} from "react-toastify";


type MovieGalleryProps = {
    movies:Movie[]
    getAllMovies:() => void;
    postNewMovie:(newMovie:Movie) => void;
    deleteMovie:(id:string) => void;
    me: string;
}

export default function MovieGallery(props:MovieGalleryProps){

    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [poster, setPoster] = useState("");

    const onCreate = (e:FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (!name || !year || !poster) {
            toast.error(`Please fill movie title, year and posterUrl`)
            return
        }

        const newMovie: Movie = {
            title: name,
            releaseYear: year,
            poster: poster
        }

        props.postNewMovie(newMovie)
    }

    return(
        <>
            <form onSubmit={(e) => onCreate(e)}>
                <input name={"title"} placeholder={"title"} onChange={event => setName(event.target.value)}/>
                <input name={"year"} placeholder={"year"} onChange={event => setYear(event.target.value)}/>
                <input name={"posterUrl"} placeholder={"posterUrl"} onChange={event => setPoster(event.target.value)}/>
                <button type={"submit"}> Confirm </button>
            </form>

            <div className={"cards"}>
                {props.movies.length <1 ?
                    <h1> Keine Filme Vorhanden </h1>
                    :
                    props.movies.map((m) =>
                <div className={"card"}>
                <MovieCard movie={m} deleteMovie={props.deleteMovie}/>
                </div>)}
            </div>
        </>
    )
}