package de.neuefische.backend.controller;

import de.neuefische.backend.model.Movie;
import de.neuefische.backend.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movie")
public class MovieController {

    private final MovieService service;

    @Autowired
    public MovieController(MovieService service) {
        this.service = service;
    }

    @GetMapping
    public List<Movie> getAllMovies(){
        return service.getAllMovies();
    }

    @GetMapping("{id}")
    public Movie getMovie(@PathVariable String id){
        return service.getMovie(id);
    }

    @PostMapping
    public Movie addMovie(@RequestBody Movie movie){
        return service.addMovie(movie);
    }

    @PutMapping
    public Movie updateMovie(@RequestBody Movie movie){
        return service.updateMovie(movie);
    }

    @DeleteMapping("{id}")
    public void deleteMovie(@PathVariable String id){
        service.deleteMovie(id);
    }
}
