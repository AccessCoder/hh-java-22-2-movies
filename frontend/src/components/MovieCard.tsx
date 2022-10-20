import {Movie} from "../model/Movie";
import {useState} from "react";
import "./MovieCard.css"

type MovieCardProps = {
   movie:Movie;
   deleteMovie:(id:string) => void;
}

export default function MovieCard(props:MovieCardProps){

    const deleteHandler = () => {
        if (props.movie.id === undefined){
            return null;
        }
        props.deleteMovie(props.movie.id);
    }

    return(
        <div className={"movie-card"}>
            <button onClick={deleteHandler}>Delete</button>
            <img src={props.movie.poster} alt={"test"}/>
            <p>{props.movie.title} ({props.movie.releaseYear})</p>
        </div>
    )
}