package com.resumebuilder.dto.request;

import com.resumebuilder.entity.ResumeTemplate;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResumeVersionRequest {

    @NotBlank
    @Size(max = 100)
    private String name;

    @NotBlank
    @Size(max = 100)
    private String displayTitle;

    @Size(max = 5000)
    private String professionalSummary;

    @NotNull
    private ResumeTemplate template;
}