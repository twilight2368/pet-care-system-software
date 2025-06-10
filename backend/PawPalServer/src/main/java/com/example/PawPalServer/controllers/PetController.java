package com.example.PawPalServer.controllers;

import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.entities.Pet;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class PetController {

    @Autowired
    private PetService petService;

    @Autowired
    private Mapper<PetDto, Pet> petMapper;

    @GetMapping("/api/pets-user/{id}")
    public ResponseEntity<List<PetDto>> getPetByUserId(@PathVariable("id") Integer id){
        List<Pet> result = petService.getPetByUserId(id);
        return new ResponseEntity<>(result.stream().map(petMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @GetMapping("/api/pets/{id}")
    public ResponseEntity<PetDto> getPetById(@PathVariable("id") Integer id){
        Optional<Pet> petResult = petService.getPetById(id);
        return petResult.map(pet -> new ResponseEntity<>(petMapper.mapToDto(pet), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/api/pets")
    public ResponseEntity<PetDto> createPet(@RequestBody PetDto petDto){
        Pet savedPet = petService.createPet(petMapper.mapToEntity(petDto));
        return new ResponseEntity<>(petMapper.mapToDto(savedPet), HttpStatus.CREATED);
    }

    @PutMapping("/api/pets/{id}")
    public ResponseEntity<PetDto> updatePet(@PathVariable("id") Integer id, @RequestBody PetDto petDto){
        if (petService.isExist(id)){
            Pet updatedPet = petService.updatePet(petMapper.mapToEntity(petDto));
            return new ResponseEntity<>(petMapper.mapToDto(updatedPet), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/api/pets/{id}")
    public void deletePet(@PathVariable("id") Integer id){
        petService.delete(id);
    }
}
