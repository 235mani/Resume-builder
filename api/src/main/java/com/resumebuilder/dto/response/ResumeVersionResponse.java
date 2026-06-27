package com.resumebuilder.dto.response;

import com.resumebuilder.entity.ResumeTemplate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ResumeVersionResponse {

    private Long id;

    private String name;

    private String displayTitle;

    private String professionalSummary;

    private ResumeTemplate template;

    private String slug;

    private Boolean isPublic;
}