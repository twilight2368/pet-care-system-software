package com.example.PawPalServer.controllers;

import com.example.PawPalServer.domains.dtos.boarding.BoardingBookingDto;
import com.example.PawPalServer.domains.entities.BoardingBooking;
import com.example.PawPalServer.enums.ServiceStatus;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.BoardingBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class BoardingBookingController {
    @Autowired
    private BoardingBookingService boardingBookingService;

    @Autowired
    private Mapper<BoardingBookingDto, BoardingBooking> boardingBookingMapper;

    @GetMapping("/api/boarding/{id}")
    public ResponseEntity<BoardingBookingDto> getBoardingBooking(@PathVariable("id") Integer id){
        Optional<BoardingBooking> result = boardingBookingService.getBoardingBookingById(id);
        return result.map(boardingBooking -> new ResponseEntity<>(boardingBookingMapper.mapToDto(boardingBooking), HttpStatus.OK))
                    .orElseGet(()->new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/api/boarding")
    public ResponseEntity<BoardingBookingDto> createBoardingBooking(@RequestBody BoardingBookingDto boardingBookingDto){
        BoardingBooking createBooking = boardingBookingService.createBoardingBookingById(boardingBookingMapper.mapToEntity(boardingBookingDto));
        return new ResponseEntity<>(boardingBookingMapper.mapToDto(createBooking), HttpStatus.CREATED);
    }

    @PutMapping("/api/boarding/{id}")
    public ResponseEntity<BoardingBookingDto> updateBoardingBooking(@PathVariable("id") Integer id, @RequestBody BoardingBookingDto boardingBookingDto){
        if (boardingBookingService.isExist(id)){
            BoardingBooking updateBooking = boardingBookingService.updateBoardingBookingById(boardingBookingMapper.mapToEntity(boardingBookingDto));
            return new ResponseEntity<>(boardingBookingMapper.mapToDto(updateBooking), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/api/boarding/{id}")
    public void deleteBoardingBooking(@PathVariable("id") Integer id){
        boardingBookingService.delete(id);
    }

    @GetMapping("/api/boarding-user/{id}")
    public ResponseEntity<List<BoardingBookingDto>> getBoardingBookingByUserId(@PathVariable("id") Integer id){
        List<BoardingBooking> result = boardingBookingService.getBoardingBookingByUserId(id);
        return new ResponseEntity<>( result.stream().map(boardingBookingMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @GetMapping("/api/boarding-room/{id}")
    public ResponseEntity<List<BoardingBookingDto>> getBoardingBookingByRoomId(@PathVariable("id") Integer id){
        List<BoardingBooking> result = boardingBookingService.getBoardingBookingByRoomId(id);
        return new ResponseEntity<>( result.stream().map(boardingBookingMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @GetMapping("/api/boarding-status")
    public ResponseEntity<List<BoardingBookingDto>> getBoardingBookingByUserId(@RequestParam("status") ServiceStatus status){
        List<BoardingBooking> result = boardingBookingService.getBoardingBookingByStatus(status);
        return new ResponseEntity<>( result.stream().map(boardingBookingMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @GetMapping("/api/boarding-history")
    public ResponseEntity<List<BoardingBookingDto>> getBoardingBookingHistory(){
        List<BoardingBooking> result = boardingBookingService.getBoardingBookingHistory();
        return new ResponseEntity<>( result.stream().map(boardingBookingMapper::mapToDto).toList(), HttpStatus.OK);
    }
}
