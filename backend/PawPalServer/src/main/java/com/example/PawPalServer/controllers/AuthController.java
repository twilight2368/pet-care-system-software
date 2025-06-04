package com.example.PawPalServer.controllers;

import com.example.PawPalServer.domains.dtos.auth.LoginRequest;
import com.example.PawPalServer.domains.dtos.auth.LoginResponse;
import com.example.PawPalServer.domains.dtos.auth.RegisterRequest;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.AuthService;
import com.example.PawPalServer.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class AuthController {

    @Autowired
    private Mapper<UserDto, User> userMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @PostMapping("/api/auth/register")
    public ResponseEntity<UserDto> register(@RequestBody RegisterRequest registerRequest){
        UserDto userDto = UserDto.builder()
                                .username(registerRequest.getUsername())
                                .email(registerRequest.getEmail())
                                .phone(registerRequest.getPhone())
                                .fullName(registerRequest.getFullName())
                                .role(registerRequest.getRole())
                                .specialization(registerRequest.getSpecialization())
                                .role(registerRequest.getRole())
                                .build();
        User newUser = userMapper.mapToEntity(userDto);
        User savedUser = userService.createUser(newUser);
        UserDto savedUserDto = userMapper.mapToDto(savedUser);
        return new ResponseEntity<>(savedUserDto,HttpStatus.CREATED);
    }

    @PostMapping("/api/auth/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest){
        Optional<LoginResponse> response = authService.login(loginRequest);
        return response.map(loginResponse -> new ResponseEntity<>(loginResponse, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.UNAUTHORIZED));
    }
}
