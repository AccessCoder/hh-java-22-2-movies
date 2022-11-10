package de.neuefische.backend.security.service;

import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.model.CreateUserDto;
import de.neuefische.backend.security.model.UserInfoDto;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class UserService {

    private final AppUserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(AppUserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }


    public String register(CreateUserDto createUserDto) {

        // Hash password (with BCrypt)
        String hashedPassword = passwordEncoder.encode(createUserDto.getPassword());

        // Create AppUser
        AppUser appUser = new AppUser();
        appUser.setUsername(createUserDto.getUsername());
        appUser.setPasswordHash(hashedPassword);
        appUser.setRoles(List.of("USER"));

        // Save AppUser in DB
        return userRepo.save(appUser).getUsername();

    }

    public UserInfoDto getUserInfoDtoByUsername(String username) {

        AppUser appUser = userRepo.findById(username)
                .orElseThrow(() -> new NoSuchElementException());

        return UserInfoDto.builder()
                .username(appUser.getUsername())
                .roles(appUser.getRoles())
                .build();
    }
}
