package com.resumebuilder.controller;

import com.resumebuilder.dto.request.ResumeVersionRequest;
import com.resumebuilder.dto.response.ResumeVersionResponse;
import com.resumebuilder.service.ResumeVersionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume-versions")
@RequiredArgsConstructor
public class ResumeVersionController {

    private final ResumeVersionService resumeVersionService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResumeVersionResponse create(
            @Valid @RequestBody ResumeVersionRequest request) {

        return resumeVersionService.create(request);
    }

    @GetMapping
    public List<ResumeVersionResponse> getAll() {
        return resumeVersionService.getAll();
    }

    @GetMapping("/{resumeVersionId}")
    public ResumeVersionResponse getById(
            @PathVariable Long resumeVersionId) {

        return resumeVersionService.getById(resumeVersionId);
    }

    @PutMapping("/{resumeVersionId}")
    public ResumeVersionResponse update(
            @PathVariable Long resumeVersionId,
            @Valid @RequestBody ResumeVersionRequest request) {

        return resumeVersionService.update(resumeVersionId, request);
    }

    @DeleteMapping("/{resumeVersionId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long resumeVersionId) {
        resumeVersionService.delete(resumeVersionId);
    }

    @PatchMapping("/{resumeVersionId}/publish")
    public ResumeVersionResponse publish(
            @PathVariable Long resumeVersionId) {

        return resumeVersionService.publish(resumeVersionId);
    }

    @PatchMapping("/{resumeVersionId}/unpublish")
    public ResumeVersionResponse unpublish(
            @PathVariable Long resumeVersionId) {

        return resumeVersionService.unpublish(resumeVersionId);
    }
}