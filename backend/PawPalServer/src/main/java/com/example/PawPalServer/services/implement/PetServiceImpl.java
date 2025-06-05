package com.example.PawPalServer.services.implement;

import com.example.PawPalServer.domains.entities.Pet;
import com.example.PawPalServer.repositories.PetRepository;
import com.example.PawPalServer.services.interfaces.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PetServiceImpl implements PetService {

    @Autowired
    private PetRepository petRepository;

    @Override
    public List<Pet> getPetByUserId(Integer user_id) {
        return petRepository.findByOwner_UserId(user_id);
    }

    @Override
    public Pet createPet(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public Optional<Pet> getPetById(Integer id) {
        return petRepository.findById(id);
    }

    @Override
    public Pet updatePet(Pet pet) {
        return petRepository.save(pet);
    }

    @Override
    public boolean isExist(Integer id) {
        return petRepository.existsById(id);
    }

    @Override
    public void delete(Integer id) {
        petRepository.deleteById(id);
    }
}
