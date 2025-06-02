package com.example.PawPalServer.repositories;

import com.example.PawPalServer.domains.entities.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Integer> {}
