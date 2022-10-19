package de.neuefische.backend.service;

import de.neuefische.backend.model.Movie;
import de.neuefische.backend.respository.MovieRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MovieService {

    private final MovieRepo repo;
    private final IdService idService;

    @Autowired
    public MovieService(MovieRepo repo, IdService idService) {
        this.repo = repo;
        this.idService = idService;
    }

    public List<Movie> getAllMovies() {
        return repo.findAll();
    }

    public Movie addMovie(Movie movie) {
        if(movie.getTitle() == null || movie.getTitle().isEmpty()){
            throw new IllegalArgumentException("Given movie is missing mandatory title");
        }


        // Generate and set id for new movie
        movie.setId(idService.generateId());

        return repo.save(movie);
    }

    public Movie getMovie(String id) {
        // Versuche ein Movie aus der DB auszulesen
        // Falls für die ID kein Movie gefunden wurde, werfe Exception
        return repo.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Not a single movie found with id:" + id));
    }

    public void deleteMovie(String id) {
        repo.deleteById(id);
    }
}
