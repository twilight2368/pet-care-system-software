package com.example.PawPalServer.services.interfaces;

import com.example.PawPalServer.domains.entities.DietPlan;

import java.util.List;

public interface DietPlanService {
    List<DietPlan> getDietPlanByPetId(Integer id);
    DietPlan createDietPlan(DietPlan dietPlan);
}
