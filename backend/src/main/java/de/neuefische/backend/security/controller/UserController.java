package de.neuefische.backend.security.controller;

import de.neuefische.backend.security.model.CreateUserDto;
import de.neuefische.backend.security.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String login(){

        // Ask Security Context for User information
        return SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();
    }

    @GetMapping("/logout")
    public void logout(HttpSession session){

        session.invalidate();
    }


    @PostMapping("/register")
    public String register(@RequestBody CreateUserDto createUserDto){

        return userService.register(createUserDto);
    }

}
