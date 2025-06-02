package com.example.PawPalServer.mappers.implement;

import com.example.PawPalServer.domains.dtos.grooming.GroomingServiceDto;
import com.example.PawPalServer.domains.entities.GroomingService;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GroomingServiceMapper implements Mapper<GroomingServiceDto, GroomingService> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public GroomingServiceDto mapToDto(GroomingService groomingService) {
        return modelMapper.map(groomingService, GroomingServiceDto.class);
    }

    @Override
    public GroomingService mapToEntity(GroomingServiceDto groomingServiceDto) {
        return modelMapper.map(groomingServiceDto, GroomingService.class);
    }
}
