package com.example.PawPalServer.integrations;

import com.example.PawPalServer.domains.dtos.medical.MedicalRecordDto;
import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.MedicalRecord;
import com.example.PawPalServer.domains.entities.Pet;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.PetGender;
import com.example.PawPalServer.enums.UserRole;
import com.example.PawPalServer.repositories.MedicalRecordRepository;
import com.example.PawPalServer.repositories.PetRepository;
import com.example.PawPalServer.repositories.UserRepository;
import com.example.PawPalServer.utils.TestDataUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.WebApplicationContext;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class MedicalRecordControllerIntegrationTests {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;
    private Pet testPet;
    private User testVet;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

        // Clean up
        medicalRecordRepository.deleteAll();
        petRepository.deleteAll();
        userRepository.deleteAll();

        // Create owner using TestDataUtils and save to database
        UserDto ownerDto = TestDataUtils.createUserData(UserRole.PET_OWNER);
        User savedOwner = userRepository.save(User.builder()
                .username(ownerDto.getUsername() + "user")
                .fullName(ownerDto.getFullName())
                .email("user" + ownerDto.getEmail())
                .phone(ownerDto.getPhone())
                .role(ownerDto.getRole())
                .passwordHash("testPassword123")
                .isLock(ownerDto.getIsLock())
                .build());

        // Create veterinarian using TestDataUtils and save to database
        UserDto vetDto = TestDataUtils.createUserData(UserRole.VETERINARIAN);
        User savedVet = userRepository.save(User.builder()
                .username(vetDto.getUsername() + "vet")
                .fullName(vetDto.getFullName())
                .email("vet" + vetDto.getEmail())
                .phone(vetDto.getPhone())
                .role(vetDto.getRole())
                .specialization(vetDto.getSpecialization())
                .passwordHash("testPassword123")
                .isLock(vetDto.getIsLock())
                .build());

        // Create pet using TestDataUtils and save to database
        PetDto petDto = TestDataUtils.createPetData(PetGender.MALE);
        Pet savedPet = petRepository.save(Pet.builder()
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
    void testGetMedicalRecord_ShouldReturnRecord() throws Exception {
        // Create a medical record
        MedicalRecord record = new MedicalRecord();
        record.setPet(testPet);
        record.setVeterinarian(testVet);
        record.setDiagnosis("Healthy");
        record.setVisitDate(LocalDate.now());
        record = medicalRecordRepository.save(record);

        // Test GET
        mockMvc.perform(get("/api/medical/{id}", record.getRecordId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.diagnosis").value("Healthy"));
    }

    @Test
    void testCreateMedicalRecord_ShouldCreateRecord() throws Exception {
        // Create DTOs
        PetDto petDto = PetDto.builder()
                .petId(testPet.getPetId())
                .breed("Dog")
                .build();

        UserDto vetDto = UserDto.builder()
                .userId(testVet.getUserId())
                .username("testvet")
                .build();

        MedicalRecordDto recordDto = TestDataUtils.createMedicalRecordData(petDto, vetDto);
        String jsonContent = objectMapper.writeValueAsString(recordDto);

        // Test POST
        mockMvc.perform(post("/api/medical")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.diagnosis").value("Healthy"));
    }

    @Test
    void testGetMedicalRecord_NotFound_ShouldReturn404() throws Exception {
        mockMvc.perform(get("/api/medical/999"))
                .andExpect(status().isNotFound());
    }
}