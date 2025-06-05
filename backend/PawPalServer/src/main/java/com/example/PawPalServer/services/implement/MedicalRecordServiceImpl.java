package com.example.PawPalServer.services.implement;

import com.example.PawPalServer.domains.entities.MedicalRecord;
import com.example.PawPalServer.repositories.MedicalRecordRepository;
import com.example.PawPalServer.services.interfaces.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MedicalRecordServiceImpl implements MedicalRecordService {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Override
    public Optional<MedicalRecord> getMedicalRecord(Integer id) {
        return medicalRecordRepository.findById(id);
    }

    @Override
    public List<MedicalRecord> getMedicalRecordByPetId(Integer pet_id) {
        return medicalRecordRepository.findByPet_petId(pet_id);
    }

    @Override
    public MedicalRecord createMedicalRecord(MedicalRecord medicalRecord) {
        return medicalRecordRepository.save(medicalRecord);
    }

    @Override
    public MedicalRecord updateMedicalRecord(MedicalRecord medicalRecord) {
        return medicalRecordRepository.save(medicalRecord);
    }

    @Override
    public boolean isExist(Integer id) {
        return medicalRecordRepository.existsById(id);
    }


    @Override
    public void delete(Integer id) {
        medicalRecordRepository.deleteById(id);
    }
}
