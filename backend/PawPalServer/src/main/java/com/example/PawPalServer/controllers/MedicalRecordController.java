package com.example.PawPalServer.controllers;


import com.example.PawPalServer.domains.dtos.medical.MedicalRecordDto;
import com.example.PawPalServer.domains.entities.MedicalRecord;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import com.example.PawPalServer.services.interfaces.MedicalRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class MedicalRecordController {
    @Autowired
    private MedicalRecordService medicalRecordService;

    @Autowired
    private Mapper<MedicalRecordDto, MedicalRecord> medicalRecordMapper;

    @GetMapping("/api/medical/{id}")
    public ResponseEntity<MedicalRecordDto> getMedicalRecord(@PathVariable("id") Integer id){
        Optional<MedicalRecord> medicalRecord = medicalRecordService.getMedicalRecord(id);
        return medicalRecord
                .map(medicalRecordEntity -> new ResponseEntity<>(medicalRecordMapper
                                                                    .mapToDto(medicalRecordEntity), HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/api/medical-pet/{id}")
    public ResponseEntity<List<MedicalRecordDto>> getMedicalRecordByPet(@PathVariable("id") Integer id){
        List<MedicalRecord> results = medicalRecordService.getMedicalRecordByPetId(id);
        return new ResponseEntity<>(results.stream().map(result -> medicalRecordMapper.mapToDto(result)).toList(), HttpStatus.OK);
    }

    @PostMapping("/api/medical")
    public ResponseEntity<MedicalRecordDto> createMedicalRecord(@RequestBody MedicalRecordDto medicalRecordDto){
        MedicalRecord newMedical = medicalRecordService.createMedicalRecord(medicalRecordMapper.mapToEntity(medicalRecordDto));
        return new ResponseEntity<>(medicalRecordMapper.mapToDto(newMedical), HttpStatus.CREATED);
    }

    @PutMapping("/api/medical/{id}")
    public ResponseEntity<MedicalRecordDto> updateMedicalRecord(@PathVariable("id") Integer id, @RequestBody MedicalRecordDto medicalRecordDto){
        if (medicalRecordService.isExist(id)){
            MedicalRecord updateRecord = medicalRecordService.updateMedicalRecord(medicalRecordMapper.mapToEntity(medicalRecordDto));
            return new ResponseEntity<>(medicalRecordMapper.mapToDto(updateRecord), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/api/medical/{id}")
    public void deleteMedical(@PathVariable("id") Integer id){
        medicalRecordService.delete(id);
    }
}
