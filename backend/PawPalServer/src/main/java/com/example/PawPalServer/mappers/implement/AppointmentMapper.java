package com.example.PawPalServer.mappers.implement;

import com.example.PawPalServer.domains.dtos.appointment.AppointmentDto;
import com.example.PawPalServer.domains.entities.Appointment;
import com.example.PawPalServer.mappers.interfaces.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AppointmentMapper implements Mapper<AppointmentDto, Appointment> {

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public AppointmentDto mapToDto(Appointment appointment) {
        return modelMapper.map(appointment, AppointmentDto.class);
    }

    @Override
    public Appointment mapToEntity(AppointmentDto appointmentDto) {
        return modelMapper.map(appointmentDto, Appointment.class);
    }
}
