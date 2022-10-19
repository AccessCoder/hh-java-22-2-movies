package de.neuefische.backend.controller;

import de.neuefische.backend.model.Movie;
import de.neuefische.backend.respository.MovieRepo;
import de.neuefische.backend.service.IdService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MovieControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    private MovieRepo repo;

    @MockBean
    private IdService idService;


    @DirtiesContext
    @Test
    void getAllMovies() throws Exception {
        //GIVEN
        Movie dummyMovie = new Movie("1", "Matrix", "1999", "www.post.com/image1.jpeg");
        repo.save(dummyMovie);

        //WHEN &THEN

        mockMvc.perform(
                get("/api/movie"))
                .andExpect(status().is(200))
                .andExpect(content().string("""
                        [{"id":"1","title":"Matrix","releaseYear":"1999","poster":"www.post.com/image1.jpeg"}]"""));
    }

    @DirtiesContext
    @Test
    void getMovie_whenMovieNotExists_returns404() throws Exception {
        //GIVEN

        //WHEN &THEN
        mockMvc.perform(
                get("/api/movie/12345"))
                .andExpect(status().is(404));
    }


    @DirtiesContext
    @Test
    void addMovie() throws Exception {
        //GIVEN
        when(idService.generateId()).thenReturn("123");

        //WHEN & THEN
        mockMvc.perform(
                        post("/api/movie")
                                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                                .content("""
                                    {"title":"Matrix","releaseYear":"1999","poster":"www.post.com/image1.jpeg"}"""))
                .andExpect(status().is(200))
                .andExpect(content().string("""
                        {"id":"123","title":"Matrix","releaseYear":"1999","poster":"www.post.com/image1.jpeg"}"""));
    }

    @DirtiesContext
    @Test
    void addMovie_whenMissingName_returns400() throws Exception {
        //GIVEN
        when(idService.generateId()).thenReturn("123");

        //WHEN & THEN
        mockMvc.perform(
                        post("/api/movie")
                                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                                .content("""
                                    {"releaseYear":"1999","poster":"www.post.com/image1.jpeg"}"""))
                .andExpect(status().is(400));
    }

    @DirtiesContext
    @Test
    void deleteMovie() throws Exception {
        //GIVEN
        Movie dummyMovie = new Movie("1", "Matrix", "1999", "www.post.com/image1.jpeg");
        repo.save(dummyMovie);

        //WHEN &THEN
        mockMvc.perform(delete("/api/movie/1"))
                .andExpect(status().is(200));
    }


}
