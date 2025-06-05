package com.example.PawPalServer.repositories;

import com.example.PawPalServer.domains.entities.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PetRepository extends JpaRepository<Pet, Integer> {
    List<Pet> findByOwner_UserId(Integer userId);
}
