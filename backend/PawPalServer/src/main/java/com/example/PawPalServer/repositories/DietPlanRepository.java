package com.example.PawPalServer.repositories;

import com.example.PawPalServer.domains.entities.DietPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Integer> {
    List<DietPlan> findByPet_petId(Integer id);
}
