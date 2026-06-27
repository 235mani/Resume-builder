package com.resumebuilder.skill.mapper;


import com.resumebuilder.entity.ResumeVersion;
import com.resumebuilder.skill.dto.CreateSkillRequest;
import com.resumebuilder.skill.dto.SkillResponse;
import com.resumebuilder.skill.dto.UpdateSkillRequest;
import com.resumebuilder.skill.entity.Skill;
import org.springframework.stereotype.Component;

@Component
public class SkillMapper {

    public Skill toEntity(CreateSkillRequest request, ResumeVersion resumeVersion) {

        return Skill.builder()
                .resumeVersion(resumeVersion)
                .name(request.getName().trim())
                .displayOrder(request.getDisplayOrder())
                .build();
    }

    public SkillResponse toResponse(Skill skill) {

        return SkillResponse.builder()
                .id(skill.getId())
                .name(skill.getName())
                .displayOrder(skill.getDisplayOrder())
                .build();
    }

    public void updateEntity(Skill skill, UpdateSkillRequest request) {

        skill.setName(request.getName().trim());
        skill.setDisplayOrder(request.getDisplayOrder());
    }
}