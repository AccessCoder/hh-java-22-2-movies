import {Movie} from "../model/Movie";
import {FormEvent, useState} from "react";

type ShowMovieDetailsProps = {
    movie: Movie
    updateMovie : (updatedMovie : Movie) => void
}

export default function EditMovieDetails (props : ShowMovieDetailsProps){

   const [title, setTitle] = useState<string>(props.movie.title)
   const [releaseYear, setReleaseYear] = useState<string>(props.movie.releaseYear)
   const [poster, setPoster] = useState<string>(props.movie.poster)


    const saveMovie =  (event : FormEvent<HTMLFormElement> ) => {
       event.preventDefault()

       const updatedMovie = {
           id: props.movie.id,
           title,
           releaseYear,
           poster
       }

       props.updateMovie(updatedMovie)
    }

    return(
        <div>
            <form onSubmit={saveMovie}>
                <input type={"text"} defaultValue={title} onChange={e => setTitle(e.target.value)}/>
                <input type={"text"} defaultValue={releaseYear} onChange={e => setReleaseYear(e.target.value)}/>
                <input type={"text"} defaultValue={poster} onChange={e => setPoster(e.target.value)}/>
                <button type={"submit"}>Save</button>
            </form>

        </div>

    )
}