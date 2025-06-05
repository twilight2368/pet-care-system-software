package com.example.PawPalServer.services.interfaces;

import com.example.PawPalServer.domains.entities.Pet;

import java.util.List;
import java.util.Optional;

public interface PetService {
     List<Pet> getPetByUserId(Integer user_id);
     Pet createPet(Pet pet);
     Optional<Pet> getPetById(Integer id);
     Pet updatePet(Pet pet);
     boolean isExist(Integer id);
     void delete(Integer id);
}
