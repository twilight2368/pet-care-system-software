package com.example.PawPalServer.integrations;

import com.example.PawPalServer.controllers.UserController;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.UserRole;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.UserService;
import com.example.PawPalServer.utils.TestDataUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;

import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private Mapper<UserDto, User> userMapper;

    @Autowired
    private ObjectMapper objectMapper;

    private UserDto testUserDto;
    private User testUserEntity;

    @BeforeEach
    void setUp() {
        testUserDto = TestDataUtils.createUserData(UserRole.PET_OWNER);
        testUserDto.setUserId(1);
        testUserEntity = new User();
        testUserEntity.setUserId(1);
        testUserEntity.setUsername(testUserDto.getUsername());
        testUserEntity.setFullName(testUserDto.getFullName());
        testUserEntity.setEmail(testUserDto.getEmail());
        testUserEntity.setPhone(testUserDto.getPhone());
        testUserEntity.setRole(testUserDto.getRole());
    }

    @Test
    void testGetAllUsers() throws Exception {
        Mockito.when(userService.getUser()).thenReturn(List.of(testUserEntity));
        Mockito.when(userMapper.mapToDto(any(User.class))).thenReturn(testUserDto);

        mockMvc.perform(get("/api/all-users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value(testUserDto.getUsername()));
    }

    @Test
    void testCreateUser() throws Exception {
        Mockito.when(userMapper.mapToEntity(any(UserDto.class))).thenReturn(testUserEntity);
        Mockito.when(userService.createUser(any(User.class))).thenReturn(testUserEntity);
        Mockito.when(userMapper.mapToDto(any(User.class))).thenReturn(testUserDto);

        mockMvc.perform(post("/api/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testUserDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.username").value(testUserDto.getUsername()));
    }

    @Test
    void testGetUsersPaged() throws Exception {
        Mockito.when(userService.getUser(any(PageRequest.class)))
                .thenReturn(new PageImpl<>(List.of(testUserEntity)));
        Mockito.when(userMapper.mapToDto(any(User.class))).thenReturn(testUserDto);

        mockMvc.perform(get("/api/users?page=0&size=1&sortBy=username"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].username").value(testUserDto.getUsername()));
    }

    @Test
    void testGetUserById_Found() throws Exception {
        Mockito.when(userService.getUser(1)).thenReturn(Optional.of(testUserEntity));
        Mockito.when(userMapper.mapToDto(any(User.class))).thenReturn(testUserDto);

        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(testUserDto.getUsername()));
    }

    @Test
    void testGetUserById_NotFound() throws Exception {
        Mockito.when(userService.getUser(99)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/users/99"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testUpdateUser_Found() throws Exception {
        Mockito.when(userService.isExists(1)).thenReturn(true);
        Mockito.when(userMapper.mapToEntity(any(UserDto.class))).thenReturn(testUserEntity);
        Mockito.when(userService.updateUser(any(User.class))).thenReturn(testUserEntity);
        Mockito.when(userMapper.mapToDto(any(User.class))).thenReturn(testUserDto);

        mockMvc.perform(put("/api/users/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testUserDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value(testUserDto.getUsername()));
    }

    @Test
    void testUpdateUser_NotFound() throws Exception {
        Mockito.when(userService.isExists(99)).thenReturn(false);

        mockMvc.perform(put("/api/users/99")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(testUserDto)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetUsersByRole() throws Exception {
        Mockito.when(userService.getUserByRole(UserRole.PET_OWNER)).thenReturn(List.of(testUserEntity));
        Mockito.when(userMapper.mapToDto(any(User.class))).thenReturn(testUserDto);

        mockMvc.perform(get("/api/users-role?role=PET_OWNER"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].username").value(testUserDto.getUsername()));
    }

    @Test
    void testDeleteUser() throws Exception {
        mockMvc.perform(delete("/api/users/1"))
                .andExpect(status().isOk());
    }
}
