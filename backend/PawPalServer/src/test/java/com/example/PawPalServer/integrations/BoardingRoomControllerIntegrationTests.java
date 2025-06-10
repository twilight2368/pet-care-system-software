package com.example.PawPalServer.integrations;

import com.example.PawPalServer.domains.dtos.room.BoardingRoomDto;
import com.example.PawPalServer.domains.entities.BoardingRoom;
import com.example.PawPalServer.repositories.BoardingRoomRepository;
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

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
public class BoardingRoomControllerIntegrationTests {

    @Autowired
    private WebApplicationContext webApplicationContext;

    @Autowired
    private BoardingRoomRepository boardingRoomRepository;

    @Autowired
    private ObjectMapper objectMapper;

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
        boardingRoomRepository.deleteAll();
    }

    @Test
    void testGetRooms_WhenNoRoomsExist_ShouldReturnEmptyList() throws Exception {
        mockMvc.perform(get("/api/room"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", is(empty())));
    }

    @Test
    void testGetRooms_WhenRoomsExist_ShouldReturnRoomsList() throws Exception {
        // Given
        BoardingRoom room1 = new BoardingRoom();
        room1.setRoomNumber("R001");
        boardingRoomRepository.save(room1);

        BoardingRoom room2 = new BoardingRoom();
        room2.setRoomNumber("R002");
        boardingRoomRepository.save(room2);

        // When & Then
        mockMvc.perform(get("/api/room"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].roomNumber", is("R001")))
                .andExpect(jsonPath("$[1].roomNumber", is("R002")));
    }

    @Test
    void testCreateRoom_WithValidData_ShouldCreateRoom() throws Exception {
        // Given
        BoardingRoomDto roomDto = TestDataUtils.createBoardingRoomData("R003");
        String jsonContent = objectMapper.writeValueAsString(roomDto);

        // When & Then
        mockMvc.perform(post("/api/room")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.roomNumber", is("R003")));

        // Verify room was persisted
        assert boardingRoomRepository.count() == 1;
    }

    @Test
    void testCreateRoom_WithInvalidData_ShouldReturnBadRequest() throws Exception {
        // Given - empty room data
        BoardingRoomDto invalidRoomDto = BoardingRoomDto.builder().build();
        String jsonContent = objectMapper.writeValueAsString(invalidRoomDto);

        // When & Then
        mockMvc.perform(post("/api/room")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testCreateRoom_WithDuplicateRoomNumber_ShouldHandleConflict() throws Exception {
        // Given - existing room
        BoardingRoom existingRoom = new BoardingRoom();
        existingRoom.setRoomNumber("R001");
        boardingRoomRepository.save(existingRoom);

        // Try to create another room with same number
        BoardingRoomDto duplicateRoomDto = TestDataUtils.createBoardingRoomData("R001");
        String jsonContent = objectMapper.writeValueAsString(duplicateRoomDto);

        // When & Then
        mockMvc.perform(post("/api/room")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isConflict());
    }

    @Test
    void testCreateRoom_WithMalformedJson_ShouldReturnBadRequest() throws Exception {
        String malformedJson = "{ \"roomNumber\": }";

        mockMvc.perform(post("/api/room")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(malformedJson))
                .andExpect(status().isBadRequest());
    }

    @Test
    void testEndToEnd_CreateAndRetrieveRoom() throws Exception {
        // Create a room
        BoardingRoomDto roomDto = TestDataUtils.createBoardingRoomData("R999");
        String jsonContent = objectMapper.writeValueAsString(roomDto);

        mockMvc.perform(post("/api/room")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(jsonContent))
                .andExpect(status().isCreated());

        // Retrieve all rooms and verify the created room is there
        mockMvc.perform(get("/api/room"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].roomNumber", is("R999")));
    }
}