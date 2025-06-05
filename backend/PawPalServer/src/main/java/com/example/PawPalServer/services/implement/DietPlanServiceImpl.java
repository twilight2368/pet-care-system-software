package com.example.PawPalServer.services.implement;

import com.example.PawPalServer.domains.entities.DietPlan;
import com.example.PawPalServer.repositories.DietPlanRepository;
import com.example.PawPalServer.services.interfaces.DietPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DietPlanServiceImpl implements DietPlanService {

    @Autowired
    private DietPlanRepository dietPlanRepository;

    @Override
    public List<DietPlan> getDietPlanByPetId(Integer id) {
        return dietPlanRepository.findByPet_petId(id);
    }

    @Override
    public DietPlan createDietPlan(DietPlan dietPlan) {
        return dietPlanRepository.save(dietPlan);
    }
}
