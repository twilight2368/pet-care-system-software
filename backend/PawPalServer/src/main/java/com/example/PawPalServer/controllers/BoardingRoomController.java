package com.example.PawPalServer.controllers;

import com.example.PawPalServer.domains.dtos.room.BoardingRoomDto;
import com.example.PawPalServer.domains.entities.BoardingRoom;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.BoardingRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BoardingRoomController {

    @Autowired
    private BoardingRoomService boardingRoomService;

    @Autowired
    private Mapper<BoardingRoomDto, BoardingRoom> boardingRoomMapper;

    @GetMapping("/api/room")
    public ResponseEntity<List<BoardingRoomDto>> getRooms(){
        List<BoardingRoom> results = boardingRoomService.getRooms();
        return new ResponseEntity<>(results.stream().map(boardingRoomMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @PostMapping("/api/room")
    public ResponseEntity<BoardingRoomDto> createRoom(@RequestBody BoardingRoomDto boardingRoomDto){
        BoardingRoom newRoom = boardingRoomService.createRoom(boardingRoomMapper.mapToEntity(boardingRoomDto));
        return new ResponseEntity<>(boardingRoomMapper.mapToDto(newRoom), HttpStatus.CREATED);
    }
}
