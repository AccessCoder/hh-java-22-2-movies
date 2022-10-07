import {Movie} from "../model/Movie";
import "./MovieCard.css"

type MovieCardProps = {
   movie:Movie
}

export default function MovieCard(props:MovieCardProps){

    return(
        <div className={"movie-card"}>
            <img src={props.movie.poster} alt={"test"}/>
            <p>{props.movie.title} ({props.movie.releaseYear})</p>
        </div>
    )
}