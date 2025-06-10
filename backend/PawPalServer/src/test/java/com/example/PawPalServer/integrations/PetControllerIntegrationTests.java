package com.example.PawPalServer.integrations;

import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.Pet;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.PetGender;
import com.example.PawPalServer.enums.UserRole;
import com.example.PawPalServer.repositories.PetRepository;
import com.example.PawPalServer.repositories.UserRepository;
import com.example.PawPalServer.utils.TestDataUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
public class PetControllerIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PetRepository petRepository;

    private User savedOwner;
    private Pet savedPet;

    @BeforeEach
    void setUp() {
        petRepository.deleteAll();
        userRepository.deleteAll();

        // Create owner using TestDataUtils and save to database
        UserDto ownerDto = TestDataUtils.createUserData(UserRole.PET_OWNER);
        savedOwner = userRepository.save(User.builder()
                .username(ownerDto.getUsername())
                .fullName(ownerDto.getFullName())
                .email(ownerDto.getEmail())
                .phone(ownerDto.getPhone())
                .role(ownerDto.getRole())
                .passwordHash("testPassword123")
                .isLock(ownerDto.getIsLock())
                .build());

        // Create pet using TestDataUtils and save to database
        PetDto petDto = TestDataUtils.createPetData(PetGender.MALE);
        savedPet = petRepository.save(Pet.builder()
                .name("Buddy")
                .age(petDto.getAge())
                .breed(petDto.getBreed())
                .color(petDto.getColor())
                .bloodType(petDto.getBloodType())
                .gender(petDto.getGender())
                .weightKg(petDto.getWeightKg())
                .heightCm(petDto.getHeightCm())
                .spayedNeutered(petDto.getSpayedNeutered())
                .microchipped(petDto.getMicrochipped())
                .isAlert(petDto.getIsAlert())
                .healthNotes(petDto.getHealthNotes())
                .owner(savedOwner)
                .build());
    }

    @Test
    void shouldCreatePetSuccessfully() throws Exception {
        // Create owner DTO for the request
        UserDto ownerDto = UserDto.builder()
                .userId(savedOwner.getUserId())
                .username(savedOwner.getUsername())
                .fullName(savedOwner.getFullName())
                .email(savedOwner.getEmail())
                .phone(savedOwner.getPhone())
                .role(savedOwner.getRole())
                .isLock(savedOwner.getIsLock())
                .build();

        // Create pet DTO using TestDataUtils
        PetDto petDto = TestDataUtils.createPetData(PetGender.FEMALE);
        petDto.setName("Luna");
        petDto.setOwner(ownerDto);

        mockMvc.perform(post("/api/pets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(petDto)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Luna"))
                .andExpect(jsonPath("$.gender").value("FEMALE"))
                .andExpect(jsonPath("$.breed").value(petDto.getBreed()))
                .andExpect(jsonPath("$.owner.username").value(savedOwner.getUsername()));
    }

    @Test
    void shouldGetPetByIdSuccessfully() throws Exception {
        mockMvc.perform(get("/api/pets/" + savedPet.getPetId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value(savedPet.getName()))
                .andExpect(jsonPath("$.breed").value(savedPet.getBreed()))
                .andExpect(jsonPath("$.gender").value(savedPet.getGender().toString()));
    }

    @Test
    void shouldReturnNotFoundWhenPetDoesNotExist() throws Exception {
        mockMvc.perform(get("/api/pets/999999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldGetPetsByUserIdSuccessfully() throws Exception {
        mockMvc.perform(get("/api/pets-user/" + savedOwner.getUserId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].name").value(savedPet.getName()))
                .andExpect(jsonPath("$[0].owner.username").value(savedOwner.getUsername()));
    }

    @Test
    void shouldUpdatePetSuccessfully() throws Exception {
        // Create updated pet DTO using TestDataUtils
        PetDto updatedPetDto = TestDataUtils.createPetData(PetGender.MALE);
        updatedPetDto.setPetId(savedPet.getPetId());
        updatedPetDto.setName("Updated Buddy");
        updatedPetDto.setAge(3);

        // Set owner
        UserDto ownerDto = UserDto.builder()
                .userId(savedOwner.getUserId())
                .username(savedOwner.getUsername())
                .fullName(savedOwner.getFullName())
                .email(savedOwner.getEmail())
                .phone(savedOwner.getPhone())
                .role(savedOwner.getRole())
                .isLock(savedOwner.getIsLock())
                .build();
        updatedPetDto.setOwner(ownerDto);

        mockMvc.perform(put("/api/pets/" + savedPet.getPetId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedPetDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Buddy"))
                .andExpect(jsonPath("$.age").value(3));
    }

    @Test
    void shouldReturnNotFoundWhenUpdatingNonExistentPet() throws Exception {
        PetDto petDto = TestDataUtils.createPetData(PetGender.MALE);
        petDto.setName("Non-existent Pet");

        mockMvc.perform(put("/api/pets/999999")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(petDto)))
                .andExpect(status().isNotFound());
    }

    @Test
    void shouldDeletePetSuccessfully() throws Exception {
        mockMvc.perform(delete("/api/pets/" + savedPet.getPetId()))
                .andExpect(status().isOk());

        // Verify pet is deleted
        mockMvc.perform(get("/api/pets/" + savedPet.getPetId()))
                .andExpect(status().isNotFound());
    }
}