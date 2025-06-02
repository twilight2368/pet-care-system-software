package com.example.PawPalServer.domains.dtos.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DropdownOptionDTO {
    private String label;  // Display text
    private String value;  // Actual value to send/store
}
