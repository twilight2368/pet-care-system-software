package com.example.PawPalServer.controllers;

import com.example.PawPalServer.domains.dtos.diet.DietPlanDto;
import com.example.PawPalServer.domains.entities.DietPlan;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.DietPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class DietPlanController {
    @Autowired
    private DietPlanService dietPlanService;

    @Autowired
    private Mapper<DietPlanDto, DietPlan> dietPlanMapper;

    @GetMapping("/api/plan/{pet-id}")
    public ResponseEntity<List<DietPlanDto>> getDietPlanByPetId(@PathVariable("pet-id") Integer id){
        List<DietPlan> results = dietPlanService.getDietPlanByPetId(id);
        return new ResponseEntity<>(results.stream().map(dietPlanMapper::mapToDto).toList(), HttpStatus.OK);
    }

    @PostMapping("/api/plan")
    public ResponseEntity<DietPlanDto> createDietPlan(@RequestBody DietPlanDto dietPlanDto){
        DietPlan savedDietPlan = dietPlanService.createDietPlan(dietPlanMapper.mapToEntity(dietPlanDto));
        return new ResponseEntity<>(dietPlanMapper.mapToDto(savedDietPlan), HttpStatus.CREATED);
    }
}
