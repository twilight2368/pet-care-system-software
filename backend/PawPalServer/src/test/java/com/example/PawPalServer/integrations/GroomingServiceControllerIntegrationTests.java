package com.example.PawPalServer.integrations;

import com.example.PawPalServer.domains.dtos.grooming.GroomingServiceDto;
import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.GroomingService;
import com.example.PawPalServer.domains.entities.Pet;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.*;
import com.example.PawPalServer.repositories.GroomingServiceRepository;
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
import java.time.LocalDateTime;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class GroomingServiceControllerIntegrationTests {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private GroomingServiceRepository groomingServiceRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;
    private User savedOwner;
    private User savedStaff;
    private Pet savedPet;
    private GroomingService savedGroomingService;

    @BeforeEach
    void setUp() {
        groomingServiceRepository.deleteAll();
        petRepository.deleteAll();
        userRepository.deleteAll();

        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();

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

        // Create staff using TestDataUtils and save to database
        UserDto staffDto = TestDataUtils.createUserData(UserRole.STAFF);
        savedStaff = userRepository.save(User.builder()
                .username("staffUser123")
                .fullName("Staff Member")
                .email("staff@mail.com")
                .phone("0987654321")
                .role(staffDto.getRole())
                .passwordHash("testPassword123")
                .isLock(staffDto.getIsLock())
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

        // Create grooming service and save to database
        savedGroomingService = groomingServiceRepository.save(GroomingService.builder()
                .pet(savedPet)
                .owner(savedOwner)
                .staff(savedStaff)
                .serviceDate(LocalDateTime.now().plusDays(1))
                .serviceType(GroomingServiceType.SPA)
                .status(ServiceStatus.PENDING)
                .notes("No special notes")
                .notesFromClient("Please be gentle")
                .recurrencePattern(RecurrencePattern.WEEKLY)
                .build());
    }

    @Test
    void testGetGroomingByDate_Success() throws Exception {
        // Arrange
        LocalDate searchDate = savedGroomingService.getServiceDate().toLocalDate();

        // Act & Assert
        mockMvc.perform(get("/api/grooming-date")
                        .param("date", searchDate.toString()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].serviceType").value("FULL_GROOMING"))
                .andExpect(jsonPath("$[0].status").value("PENDING"));
    }

    @Test
    void testGetGroomingByDate_NoResults() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/grooming-date")
                        .param("date", LocalDate.now().minusDays(5).toString()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void testGetGroomingByType_Success() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/grooming-type")
                        .param("type", "FULL_GROOMING"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].serviceType").value("FULL_GROOMING"));
    }

    @Test
    void testGetGroomingByType_NoResults() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/grooming-type")
                        .param("type", "NAIL_TRIMMING"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void testGetGroomingHistory_Success() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/grooming-history")
                        .param("page", "0")
                        .param("size", "10"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.content[0].serviceType").value("FULL_GROOMING"))
                .andExpect(jsonPath("$.totalElements").value(1));
    }

    @Test
    void testGetGroomingNew_Success() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/grooming-new"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].status").value("PENDING"));
    }

    @Test
    void testGetGroomingByPeriod_Success() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/grooming-period")
                        .param("pattern", "WEEKLY")
                        .param("page", "0")
                        .param("size", "5"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.content", hasSize(1)))
                .andExpect(jsonPath("$.content[0].recurrencePattern").value("WEEKLY"));
    }

    @Test
    void testGetGroomingByUser_Success() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/grooming/user/{id}", savedOwner.getUserId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].owner.userId").value(savedOwner.getUserId()));
    }

    @Test
    void testGetGroomingByUser_NoResults() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/grooming/user/{id}", 999))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    void testGetGroomingById_Success() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/grooming/{id}", savedGroomingService.getGroomingId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.groomingId").value(savedGroomingService.getGroomingId()))
                .andExpect(jsonPath("$.serviceType").value("FULL_GROOMING"));
    }

    @Test
    void testGetGroomingById_NotFound() throws Exception {
        // Act & Assert
        mockMvc.perform(get("/api/grooming/{id}", 999))
                .andExpect(status().isNotFound());
    }

    @Test
    void testCreateGrooming_Success() throws Exception {
        // Arrange
        GroomingServiceDto groomingServiceDto = TestDataUtils.createGroomingServiceData(
                convertPetToDto(savedPet),
                convertUserToDto(savedOwner),
                convertUserToDto(savedStaff),
                GroomingServiceType.BATH_AND_TRIM,
                ServiceStatus.PENDING,
                RecurrencePattern.MONTHLY
        );

        // Act & Assert
        mockMvc.perform(post("/api/grooming")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(groomingServiceDto)))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.serviceType").value("BATH_ONLY"))
                .andExpect(jsonPath("$.status").value("PENDING"));
    }

    @Test
    void testUpdateGrooming_Success() throws Exception {
        // Arrange
        GroomingServiceDto updateDto = TestDataUtils.createGroomingServiceData(
                convertPetToDto(savedPet),
                convertUserToDto(savedOwner),
                convertUserToDto(savedStaff),
                GroomingServiceType.SPA,
                ServiceStatus.COMPLETED,
                RecurrencePattern.WEEKLY
        );
        updateDto.setGroomingId(savedGroomingService.getGroomingId());
        updateDto.setNotes("Updated notes");

        // Act & Assert
        mockMvc.perform(put("/api/grooming/{id}", savedGroomingService.getGroomingId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDto)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.status").value("COMPLETED"))
                .andExpect(jsonPath("$.notes").value("Updated notes"));
    }

    @Test
    void testUpdateGrooming_NotFound() throws Exception {
        // Arrange
        GroomingServiceDto updateDto = TestDataUtils.createGroomingServiceData(
                convertPetToDto(savedPet),
                convertUserToDto(savedOwner),
                convertUserToDto(savedStaff),
                GroomingServiceType.SPA,
                ServiceStatus.COMPLETED,
                RecurrencePattern.WEEKLY
        );

        // Act & Assert
        mockMvc.perform(put("/api/grooming/{id}", 999)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDto)))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteGrooming_Success() throws Exception {
        // Act & Assert
        mockMvc.perform(delete("/api/grooming/{id}", savedGroomingService.getGroomingId()))
                .andExpect(status().isOk());

        // Verify deletion
        mockMvc.perform(get("/api/grooming/{id}", savedGroomingService.getGroomingId()))
                .andExpect(status().isNotFound());
    }

    // Helper methods to convert entities to DTOs
    private PetDto convertPetToDto(Pet pet) {
        return PetDto.builder()
                .petId(pet.getPetId())
                .name(pet.getName())
                .age(pet.getAge())
                .breed(pet.getBreed())
                .color(pet.getColor())
                .bloodType(pet.getBloodType())
                .gender(pet.getGender())
                .weightKg(pet.getWeightKg())
                .heightCm(pet.getHeightCm())
                .spayedNeutered(pet.getSpayedNeutered())
                .microchipped(pet.getMicrochipped())
                .isAlert(pet.getIsAlert())
                .healthNotes(pet.getHealthNotes())
                .build();
    }

    private UserDto convertUserToDto(User user) {
        return UserDto.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .isLock(user.getIsLock())
                .build();
    }
}