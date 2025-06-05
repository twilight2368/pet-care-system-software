package com.example.PawPalServer.controllers;

import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.UserRole;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private Mapper<UserDto, User> userMapper;

    @GetMapping("/api/all-users")
    public ResponseEntity<List<UserDto>> getAllUsers(){
        List<User> result = userService.getUser();
        return new ResponseEntity<>(result.stream().map(user -> userMapper.mapToDto(user)).toList(), HttpStatus.OK);
    }

    @PostMapping("api/users")
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){
        User newUser = userMapper.mapToEntity(userDto);
        User newSavedUser = userService.createUser(newUser);
        UserDto newSavedUserDto = userMapper.mapToDto(newSavedUser);
        return new ResponseEntity<>(newSavedUserDto, HttpStatus.CREATED);
    }

    @GetMapping("/api/users")
    public ResponseEntity<Page<UserDto>> getUsers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "title") String sortBy
    ){
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        Page<User> userPage = userService.getUser(pageable);
        Page<UserDto> dtoPage = userPage.map(userMapper::mapToDto);
        return new ResponseEntity<>(dtoPage, HttpStatus.OK);
    }

    @GetMapping("/api/users/{id}")
    public ResponseEntity<UserDto> getUsers(@PathVariable("id") Integer id) {
        Optional<User> result = userService.getUser(id);
        return result
                .map(user -> new ResponseEntity<>(userMapper.mapToDto(user), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/api/users/{id}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("id") Integer id, @RequestBody UserDto userDto){
        if (userService.isExists(id)){
            userDto.setUserId(id);
            User userEntity = userMapper.mapToEntity(userDto);
            User savedAuthorEntity = userService.updateUser(userEntity);
            return new ResponseEntity<>(
                    userMapper.mapToDto(savedAuthorEntity),
                    HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/api/users-role")
    public ResponseEntity<Page<UserDto>> getUsersByRole(
            @RequestParam String role,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "PET_OWNER") String sortBy
    ){
        try{
            Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
            UserRole userRole = UserRole.valueOf(role);
            Page<User> userPage = userService.getUserByRole(userRole, pageable);
            Page<UserDto> dtoPage = userPage.map(userMapper::mapToDto);
            return new ResponseEntity<>(dtoPage, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/api/users/{id}")
    public void deleteUsers(@PathVariable Integer id){
        userService.delete(id);
    }
}
