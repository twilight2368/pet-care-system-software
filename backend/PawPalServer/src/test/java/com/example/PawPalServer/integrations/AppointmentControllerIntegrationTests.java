package com.example.PawPalServer.integrations;

import com.example.PawPalServer.domains.dtos.appointment.AppointmentDto;
import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.Appointment;
import com.example.PawPalServer.domains.entities.Pet;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.AppointmentType;
import com.example.PawPalServer.enums.PetGender;
import com.example.PawPalServer.enums.ServiceStatus;
import com.example.PawPalServer.enums.UserRole;
import com.example.PawPalServer.repositories.AppointmentRepository;
import com.example.PawPalServer.repositories.PetRepository;
import com.example.PawPalServer.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
public class AppointmentControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    private User savedOwner;
    private User savedVet;
    private Pet savedPet;

    @BeforeEach
    void setUp() {
        appointmentRepository.deleteAll();
        petRepository.deleteAll();
        userRepository.deleteAll();

        savedOwner = userRepository.save(User.builder()
                .username("owner123")
                .fullName("Test Owner")
                .email("owner@example.com")
                .passwordHash("1234567890")
                .phone("1234567890")
                .role(UserRole.PET_OWNER)
                .isLock(false)
                .build());

        savedVet = userRepository.save(User.builder()
                .username("vet123")
                .fullName("Test Vet")
                .email("vet@example.com")
                .passwordHash("1234567890")
                .phone("9876543210")
                .role(UserRole.VETERINARIAN)
                .specialization("General")
                .isLock(false)
                .build());

        savedPet = petRepository.save(Pet.builder()
                .name("Fluffy")
                .age(3)
                .breed("Poodle")
                .color("White")
                .gender(PetGender.FEMALE)
                .owner(savedOwner)
                .build());
    }

    @Test
    void shouldCreateAppointmentSuccessfully() throws Exception {
        // Create DTOs for the request
        UserDto ownerDto = UserDto.builder()
                .userId(savedOwner.getUserId())
                .username(savedOwner.getUsername())
                .fullName(savedOwner.getFullName())
                .email(savedOwner.getEmail())
                .phone(savedOwner.getPhone())
                .role(savedOwner.getRole())
                .isLock(savedOwner.getIsLock())
                .build();

        UserDto vetDto = UserDto.builder()
                .userId(savedVet.getUserId())
                .username(savedVet.getUsername())
                .fullName(savedVet.getFullName())
                .email(savedVet.getEmail())
                .phone(savedVet.getPhone())
                .role(savedVet.getRole())
                .specialization(savedVet.getSpecialization())
                .isLock(savedVet.getIsLock())
                .build();

        PetDto petDto = PetDto.builder()
                .petId(savedPet.getPetId())
                .name(savedPet.getName())
                .age(savedPet.getAge())
                .breed(savedPet.getBreed())
                .color(savedPet.getColor())
                .gender(savedPet.getGender())
                .build();

        AppointmentDto dto = AppointmentDto.builder()
                .owner(ownerDto)
                .veterinarian(vetDto)
                .pet(petDto)
                .appointmentDate(LocalDateTime.now().plusDays(2))
                .appointmentType(AppointmentType.CHECKUP)
                .status(ServiceStatus.PENDING)
                .notes("Annual check")
                .notesFromClient("Be gentle please.")
                .build();

        mockMvc.perform(post("/api/appointment")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.owner.username").value(savedOwner.getUsername()))
                .andExpect(jsonPath("$.veterinarian.username").value(savedVet.getUsername()))
                .andExpect(jsonPath("$.appointmentType").value("CHECKUP"));
    }

    @Test
    void shouldReturnNotFoundWhenAppointmentDoesNotExist() throws Exception {
        mockMvc.perform(get("/api/appointment/999999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldReturnPagedAppointments() throws Exception {
        mockMvc.perform(get("/api/appointment/staff/paged?page=0&size=5"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray());
    }

    @Test
    void shouldDeleteAppointmentSuccessfully() throws Exception {
        // First create an appointment to delete
        Appointment appointment = appointmentRepository.save(Appointment.builder()
                .owner(savedOwner)
                .veterinarian(savedVet)
                .pet(savedPet)
                .appointmentDate(LocalDateTime.now().plusDays(1))
                .appointmentType(AppointmentType.CHECKUP)
                .status(ServiceStatus.PENDING)
                .notes("Test appointment")
                .build());

        mockMvc.perform(delete("/api/appointment/" + appointment.getAppointmentId()))
                .andExpect(status().isOk()); // Assuming delete returns 200 OK, adjust if needed
    }
}