package com.example.PawPalServer.mappers.implement;

import com.example.PawPalServer.domains.dtos.diet.DietPlanDto;
import com.example.PawPalServer.domains.entities.DietPlan;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class DietPlanMapper implements Mapper<DietPlanDto, DietPlan> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public DietPlanDto mapToDto(DietPlan dietPlan) {
        return modelMapper.map(dietPlan, DietPlanDto.class);
    }

    @Override
    public DietPlan mapToEntity(DietPlanDto dietPlanDto) {
        return modelMapper.map(dietPlanDto, DietPlan.class);
    }
}
