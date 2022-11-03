import {Movie} from "../model/Movie";
import "./MovieCard.css"
import {useNavigate} from "react-router-dom";

type MovieCardProps = {
   movie:Movie;
   deleteMovie:(id:string) => void;
}

export default function MovieCard(props:MovieCardProps){

    const navigate = useNavigate()

    const deleteHandler = () => {
        if (props.movie.id === undefined){
            return null;
        }
        props.deleteMovie(props.movie.id);
    }

    return(
        <div className={"movie-card"}>
            <button onClick={deleteHandler}>Delete</button>
            <button onClick={() => navigate(`/movie/${props.movie.id}`)}>Detail</button>
            <img src={props.movie.poster} alt={"test"}/>
            <p>{props.movie.title} ({props.movie.releaseYear})</p>
        </div>
    )
}