package com.example.PawPalServer.mappers.implement;

import com.example.PawPalServer.domains.dtos.pet.PetDto;
import com.example.PawPalServer.domains.entities.Pet;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PetMapper implements Mapper<PetDto, Pet> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public PetDto mapToDto(Pet pet) {
        return modelMapper.map(pet, PetDto.class);
    }

    @Override
    public Pet mapToEntity(PetDto petDto) {
        return modelMapper.map(petDto, Pet.class);
    }
}
