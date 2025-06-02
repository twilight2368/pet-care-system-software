package com.example.PawPalServer.mappers.interfaces;

public interface Mapper<Dto, Entity> {
    Dto mapToDto(Entity entity);
    Entity mapToEntity(Dto dto);
}