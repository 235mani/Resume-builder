package com.resumebuilder.mapper;

import com.resumebuilder.dto.request.ResumeVersionRequest;
import com.resumebuilder.dto.response.ResumeVersionResponse;
import com.resumebuilder.entity.ResumeVersion;
import org.springframework.stereotype.Component;

@Component
public class ResumeVersionMapper {

    public ResumeVersion toEntity(ResumeVersionRequest request) {

        ResumeVersion resume = new ResumeVersion();

        resume.setName(request.getName());
        resume.setDisplayTitle(request.getDisplayTitle());
        resume.setProfessionalSummary(request.getProfessionalSummary());
        resume.setTemplate(request.getTemplate());

        return resume;
    }

    public ResumeVersionResponse toResponse(ResumeVersion resume) {

        return ResumeVersionResponse.builder()
                .id(resume.getId())
                .name(resume.getName())
                .displayTitle(resume.getDisplayTitle())
                .professionalSummary(resume.getProfessionalSummary())
                .template(resume.getTemplate())
                .slug(resume.getSlug())
                .isPublic(resume.getIsPublic())
                .build();
    }

    public void updateEntity(ResumeVersionRequest request,
                             ResumeVersion resume) {

        resume.setName(request.getName());
        resume.setDisplayTitle(request.getDisplayTitle());
        resume.setProfessionalSummary(request.getProfessionalSummary());
        resume.setTemplate(request.getTemplate());
    }
}