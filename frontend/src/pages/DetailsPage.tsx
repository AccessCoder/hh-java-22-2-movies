import {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./DetailsPage.css";
import {Movie} from "../model/Movie";
import EditMovieDetails from "../components/EditMovieDetails";
import useDetailedMovie from "../hooks/useDetailedMovie";

type MoviesDetailsPageProps = {
    updateMovie: (updatedMovie: Movie) => void
    deleteMovie: (id: string) => void
}

export default function DetailsPage(props: MoviesDetailsPageProps) {
    const {loadDetailedMovie, detailedMovie} = useDetailedMovie();

    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        if (id) {
            loadDetailedMovie(id)
        }
        // eslint-disable-next-line
    }, [id])

    const onUpdateMovie = (movie: Movie) => {
        props.updateMovie(movie)
        navigate('/')
    }

    const onDelete = (id: string) => {
        props.deleteMovie(id)
        navigate('/')
    }

    return (
        <div className={"movie-details"}>
            <h2>Edit Movie</h2>

            {detailedMovie ?
                <EditMovieDetails movie={detailedMovie} updateMovie={onUpdateMovie}/>
            : <p>Error! Movie could not be found! <Link to="/">Back</Link></p> }

            {id &&
                <button onClick={() => onDelete(id)}> Delete</button>
            }

            <button onClick={() => navigate(`/`)}>Back</button>
        </div>
    )
}
