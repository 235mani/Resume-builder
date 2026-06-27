package com.resumebuilder.skill.dto;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SkillResponse {

    private Long id;

    private String name;

    private Integer displayOrder;
}
