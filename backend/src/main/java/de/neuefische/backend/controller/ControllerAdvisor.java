package de.neuefische.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.NoSuchElementException;

@ControllerAdvice
public class ControllerAdvisor {

    @ExceptionHandler(NoSuchElementException.class)
    protected ResponseEntity<Object> handleConflict(NoSuchElementException ex){

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body("Element not found! Error: " + ex.getMessage());
    }

    @ExceptionHandler(IllegalArgumentException.class)
    protected ResponseEntity<Object> handleConflict(IllegalArgumentException ex){

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body("Given element not processable! Error: " + ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    protected ResponseEntity<Object> handleConflict(Exception ex){

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Server error: " + ex.getMessage());
    }

}
