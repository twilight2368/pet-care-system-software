package com.example.PawPalServer.services.interfaces;

import com.example.PawPalServer.domains.entities.MedicalRecord;

import java.util.List;
import java.util.Optional;

public interface MedicalRecordService {
    Optional<MedicalRecord> getMedicalRecord(Integer id);
    List<MedicalRecord> getMedicalRecordByPetId(Integer pet_id);
    MedicalRecord createMedicalRecord(MedicalRecord medicalRecord);
    MedicalRecord updateMedicalRecord(MedicalRecord medicalRecord);
    boolean isExist(Integer id);
    void delete(Integer id);
}
