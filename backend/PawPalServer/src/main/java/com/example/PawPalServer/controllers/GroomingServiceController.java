package com.example.PawPalServer.controllers;

import com.example.PawPalServer.domains.dtos.grooming.GroomingServiceDto;
import com.example.PawPalServer.domains.entities.GroomingService;
import com.example.PawPalServer.enums.GroomingServiceType;
import com.example.PawPalServer.enums.RecurrencePattern;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.GroomingServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
public class GroomingServiceController {

    @Autowired
    private GroomingServiceInterface groomingServiceInterface;

    @Autowired
    private Mapper<GroomingServiceDto, GroomingService> groomingServiceMapper;

    @GetMapping("/api/grooming-date")
    public ResponseEntity<List<GroomingServiceDto>> getGroomingByDate(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        LocalDateTime startOfDay = date.atTime(0,0,0);
        LocalDateTime endOfDay = date.atTime(23,59, 59);
        List<GroomingService> results = groomingServiceInterface.getGroomingBookingByDate(startOfDay, endOfDay);
        return new ResponseEntity<>(results.stream().map(groomingServiceMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @GetMapping("/api/grooming-type")
    public ResponseEntity<List<GroomingServiceDto>> getGroomingByType(
            @RequestParam("type") GroomingServiceType groomingServiceType) {

        List<GroomingService> results = groomingServiceInterface.getGroomingBookingByType(groomingServiceType);
        return new ResponseEntity<>(results.stream().map(groomingServiceMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @GetMapping("/api/grooming-history")
    public ResponseEntity<Page<GroomingServiceDto>> getGroomingHistory(@PageableDefault(sort = "serviceDate", direction = Sort.Direction.ASC) Pageable pageable){
        Page<GroomingService> groomingPage = groomingServiceInterface.getGroomingBookingHistory(pageable);
        return new ResponseEntity<>(groomingPage.map(groomingServiceMapper::mapToDto), HttpStatus.OK);
    }

    @GetMapping("/api/grooming-new")
    public ResponseEntity<List<GroomingServiceDto>> getGroomingNew() {
        List<GroomingService> results = groomingServiceInterface.getNewGroomingBooking();
        return new ResponseEntity<>(results.stream().map(groomingServiceMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @GetMapping("/api/grooming-period")
    public ResponseEntity<Page<GroomingServiceDto>> getGroomingByPeriod(
            @RequestParam("pattern")RecurrencePattern recurrencePattern,
            @PageableDefault(page = 0, size = 5,sort = "serviceDate", direction = Sort.Direction.ASC) Pageable pageable
    ) {

        Page<GroomingService> results = groomingServiceInterface.getPeriodGroomingBooking(recurrencePattern, pageable);
        return new ResponseEntity<>(results.map(groomingServiceMapper::mapToDto), HttpStatus.OK);
    }

    @GetMapping("/api/grooming/user/{id}")
    public ResponseEntity<List<GroomingServiceDto>> getGroomingByUser(@PathVariable("id") Integer userId) {
        List<GroomingService> results = groomingServiceInterface.getGroomingByUser(userId);
        return new ResponseEntity<>(results.stream().map(groomingServiceMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @GetMapping("/api/grooming/{id}")
    public ResponseEntity<GroomingServiceDto> getGroomingById(@PathVariable("id") Integer id) {
        Optional<GroomingService> results = groomingServiceInterface.getGroomingService(id);
        return results.map(result -> new ResponseEntity<>(groomingServiceMapper.mapToDto(result), HttpStatus.OK))
                    .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/api/grooming")
    public ResponseEntity<GroomingServiceDto> createGroomingById(@RequestBody GroomingServiceDto groomingServiceDto) {
        GroomingService results = groomingServiceInterface.createGroomingService(groomingServiceMapper.mapToEntity(groomingServiceDto));
        return new ResponseEntity<>(groomingServiceMapper.mapToDto(results), HttpStatus.CREATED);
    }


    @PutMapping("/api/grooming/{id}")
    public ResponseEntity<GroomingServiceDto> updateGroomingById(@PathVariable("id") Integer id, @RequestBody GroomingServiceDto groomingServiceDto) {
        if (groomingServiceInterface.isExist(id)){
            GroomingService results = groomingServiceInterface.updateGroomingService(groomingServiceMapper.mapToEntity(groomingServiceDto));
            return new ResponseEntity<>(groomingServiceMapper.mapToDto(results), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/api/grooming/{id}")
    public void deleteGroomingById(@PathVariable("id") Integer id) {
            groomingServiceInterface.delete(id);
    }
}
