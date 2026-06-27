package com.resumebuilder.skill.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
public class CreateSkillRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotNull
    private Integer displayOrder;
}
