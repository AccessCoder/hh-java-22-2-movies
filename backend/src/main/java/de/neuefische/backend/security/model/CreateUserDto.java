package de.neuefische.backend.security.model;


import lombok.Data;

@Data
public class CreateUserDto {

    private String username;
    private String password;
}
