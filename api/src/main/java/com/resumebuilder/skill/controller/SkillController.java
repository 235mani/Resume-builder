package com.resumebuilder.skill.controller;

import com.resumebuilder.skill.dto.CreateSkillRequest;
import com.resumebuilder.skill.dto.SkillResponse;
import com.resumebuilder.skill.dto.UpdateSkillRequest;
import com.resumebuilder.skill.service.SkillService;
import jakarta.validation.Valid;
import lombok.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resume-versions/{resumeVersionId}/skills")
@RequiredArgsConstructor
public class SkillController {

    private final SkillService skillService;

    @PostMapping
    public ResponseEntity<SkillResponse> create(
            @PathVariable Long resumeVersionId,
            @Valid @RequestBody CreateSkillRequest request) {

        return ResponseEntity.ok(
                skillService.create(resumeVersionId, request));
    }

    @GetMapping
    public ResponseEntity<List<SkillResponse>> getAll(
            @PathVariable Long resumeVersionId) {

        return ResponseEntity.ok(
                skillService.getAll(resumeVersionId));
    }

    @GetMapping("/{skillId}")
    public ResponseEntity<SkillResponse> getById(
            @PathVariable Long resumeVersionId,
            @PathVariable Long skillId) {

        return ResponseEntity.ok(
                skillService.getById(resumeVersionId, skillId));
    }

    @PutMapping("/{skillId}")
    public ResponseEntity<SkillResponse> update(
            @PathVariable Long resumeVersionId,
            @PathVariable Long skillId,
            @Valid @RequestBody UpdateSkillRequest request) {

        return ResponseEntity.ok(
                skillService.update(resumeVersionId, skillId, request));
    }

    @DeleteMapping("/{skillId}")
    public ResponseEntity<Void> delete(
            @PathVariable Long resumeVersionId,
            @PathVariable Long skillId) {

        skillService.delete(resumeVersionId, skillId);

        return ResponseEntity.noContent().build();
    }
}
