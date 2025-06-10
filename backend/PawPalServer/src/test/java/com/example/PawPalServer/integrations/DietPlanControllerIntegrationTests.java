package com.example.PawPalServer.integrations;

import com.example.PawPalServer.domains.dtos.diet.DietPlanDto;
import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.dtos.user.UserDto;
import com.example.PawPalServer.domains.entities.DietPlan;
import com.example.PawPalServer.domains.entities.Pet;
import com.example.PawPalServer.domains.entities.User;
import com.example.PawPalServer.enums.PetGender;
import com.example.PawPalServer.enums.UserRole;
import com.example.PawPalServer.repositories.DietPlanRepository;
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

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class DietPlanControllerIntegrationTests {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private DietPlanRepository dietPlanRepository;

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;
    private Pet testPet;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        dietPlanRepository.deleteAll();
        petRepository.deleteAll();

        userRepository.deleteAll();

        // Create owner using TestDataUtils and save to database
        UserDto ownerDto = TestDataUtils.createUserData(UserRole.PET_OWNER);
        User savedOwner = userRepository.save(User.builder()
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
    void testGetDietPlanByPetId_WhenNoDietPlansExist_ShouldReturnEmptyList() throws Exception {
        mockMvc.perform(get("/api/plan/{pet-id}", testPet.getPetId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", is(empty())));
    }

    @Test
    void testGetDietPlanByPetId_WhenDietPlansExist_ShouldReturnDietPlansList() throws Exception {
        // Given
        DietPlan dietPlan1 = new DietPlan();
        dietPlan1.setPet(testPet);
        dietPlan1.setDietDetails("High protein diet");
        dietPlan1.setStartDate(LocalDate.now());
        dietPlan1.setEndDate(LocalDate.now().plusDays(30));
        dietPlanRepository.save(dietPlan1);

        DietPlan dietPlan2 = new DietPlan();
        dietPlan2.setPet(testPet);
        dietPlan2.setDietDetails("Low carb diet");
        dietPlan2.setStartDate(LocalDate.now().plusDays(31));
        dietPlan2.setEndDate(LocalDate.now().plusDays(60));
        dietPlanRepository.save(dietPlan2);

        // When & Then
        mockMvc.perform(get("/api/plan/{pet-id}", testPet.getPetId()))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].dietDetails", is("High protein diet")))
                .andExpect(jsonPath("$[1].dietDetails", is("Low carb diet")));
    }

    @Test
    void testGetDietPlanByPetId_WithNonExistentPetId_ShouldReturnEmptyList() throws Exception {
        Integer nonExistentPetId = 99999;

        mockMvc.perform(get("/api/plan/{pet-id}", nonExistentPetId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", is(empty())));
    }

    @Test
    void testCreateDietPlan_WithValidData_ShouldCreateDietPlan() throws Exception {
        // Given
        PetDto petDto = PetDto.builder()
                .petId(testPet.getPetId())
                .age(testPet.getAge())
                .breed(testPet.getBreed())
                .color(testPet.getColor())
                .gender(testPet.getGender())
                .build();

        DietPlanDto dietPlanDto = TestDataUtils.createDietPlanData(
                petDto,
                LocalDate.now(),
                LocalDate.now().plusDays(30),
                "Balanced nutrition plan"
        );

        String jsonContent = objectMapper.writeValueAsString(dietPlanDto);

        // When & Then
        mockMvc.perform(post("/api/plan")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.dietDetails", is("Balanced nutrition plan")))
                .andExpect(jsonPath("$.pet.petId", is(testPet.getPetId())));

        // Verify diet plan was persisted
        assert dietPlanRepository.count() == 1;
    }

    @Test
    void testCreateDietPlan_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        // Given - empty diet plan data
        DietPlanDto invalidDietPlanDto = DietPlanDto.builder().build();
        String jsonContent = objectMapper.writeValueAsString(invalidDietPlanDto);

        // When & Then
        mockMvc.perform(post("/api/plan")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateDietPlan_WithMalformedJson_ShouldReturnBadRequest() throws Exception {
        String malformedJson = "{ \"dietDetails\": }";

        mockMvc.perform(post("/api/plan")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(malformedJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateDietPlan_WithInvalidDateRange_ShouldReturnBadRequest() throws Exception {
        // Given - end date before start date
        PetDto petDto = PetDto.builder()
                .petId(testPet.getPetId())
                .age(testPet.getAge())
                .breed(testPet.getBreed())
                .color(testPet.getColor())
                .gender(testPet.getGender())
                .build();

        DietPlanDto dietPlanDto = TestDataUtils.createDietPlanData(
                petDto,
                LocalDate.now(),
                LocalDate.now().minusDays(10), // End date before start date
                "Invalid date range plan"
        );

        String jsonContent = objectMapper.writeValueAsString(dietPlanDto);

        // When & Then
        mockMvc.perform(post("/api/plan")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testEndToEnd_CreateDietPlanAndRetrieveByPetId() throws Exception {
        // Create a diet plan
        PetDto petDto = PetDto.builder()
                .petId(testPet.getPetId())
                .age(testPet.getAge())
                .breed(testPet.getBreed())
                .color(testPet.getColor())
                .gender(testPet.getGender())
                .build();

        DietPlanDto dietPlanDto = TestDataUtils.createDietPlanData(
                petDto,
                LocalDate.now(),
                LocalDate.now().plusDays(45),
                "End-to-end test diet plan"
        );

        String jsonContent = objectMapper.writeValueAsString(dietPlanDto);

        mockMvc.perform(post("/api/plan")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isCreated());

        // Retrieve diet plans by pet ID and verify the created plan is there
        mockMvc.perform(get("/api/plan/{pet-id}", testPet.getPetId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].dietDetails", is("End-to-end test diet plan")))
                .andExpect(jsonPath("$[0].pet.petId", is(testPet.getPetId())));
    }

    @Test
    void testGetDietPlanByPetId_WithMultiplePets_ShouldReturnOnlyCorrectPetPlans() throws Exception {
        // Create another pet
        Pet otherPet = new Pet();
        otherPet.setAge(3);
        otherPet.setBreed("Labrador");
        otherPet.setColor("Black");
        otherPet.setGender(PetGender.FEMALE);
        otherPet = petRepository.save(otherPet);

        // Create diet plans for both pets
        DietPlan plan1 = new DietPlan();
        plan1.setPet(testPet);
        plan1.setDietDetails("Plan for pet 1");
        plan1.setStartDate(LocalDate.now());
        plan1.setEndDate(LocalDate.now().plusDays(30));
        dietPlanRepository.save(plan1);

        DietPlan plan2 = new DietPlan();
        plan2.setPet(otherPet);
        plan2.setDietDetails("Plan for pet 2");
        plan2.setStartDate(LocalDate.now());
        plan2.setEndDate(LocalDate.now().plusDays(30));
        dietPlanRepository.save(plan2);

        // Verify only the correct pet's plan is returned
        mockMvc.perform(get("/api/plan/{pet-id}", testPet.getPetId()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].dietDetails", is("Plan for pet 1")))
                .andExpect(jsonPath("$[0].pet.petId", is(testPet.getPetId())));
    }
}