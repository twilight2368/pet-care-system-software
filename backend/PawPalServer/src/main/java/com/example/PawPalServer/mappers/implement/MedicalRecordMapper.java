package com.example.PawPalServer.mappers.implement;

import com.example.PawPalServer.domains.dtos.medical.MedicalRecordDto;
import com.example.PawPalServer.domains.entities.MedicalRecord;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MedicalRecordMapper implements Mapper<MedicalRecordDto, MedicalRecord> {
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MedicalRecordDto mapToDto(MedicalRecord medicalRecord) {
        return modelMapper.map(medicalRecord, MedicalRecordDto.class);
    }

    @Override
    public MedicalRecord mapToEntity(MedicalRecordDto medicalRecordDto) {
        return modelMapper.map(medicalRecordDto, MedicalRecord.class);
    }
}
