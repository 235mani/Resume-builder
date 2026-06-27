package com.resumebuilder.skill.service.impl;

import com.resumebuilder.entity.ResumeVersion;
import com.resumebuilder.exception.ResourceNotFoundException;
import com.resumebuilder.service.CurrentUserService;
import com.resumebuilder.skill.dto.CreateSkillRequest;
import com.resumebuilder.skill.dto.SkillResponse;
import com.resumebuilder.skill.dto.UpdateSkillRequest;
import com.resumebuilder.skill.entity.Skill;
import com.resumebuilder.skill.mapper.SkillMapper;
import com.resumebuilder.skill.repository.SkillRepository;
import com.resumebuilder.skill.service.SkillService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;
    private final SkillMapper skillMapper;
    private final CurrentUserService currentUserService;


    @Override
    public SkillResponse create(Long resumeVersionId,
                                CreateSkillRequest request) {

        ResumeVersion resumeVersion =
                currentUserService.getOwnedResumeVersion(resumeVersionId);

        Skill skill =
                skillMapper.toEntity(request, resumeVersion);

        skillRepository.save(skill);

        return skillMapper.toResponse(skill);
    }

    @Override
    @Transactional(readOnly = true)
    public List<SkillResponse> getAll(Long resumeVersionId) {

        ResumeVersion resumeVersion =
                currentUserService.getOwnedResumeVersion(resumeVersionId);

        return skillRepository
                .findByResumeVersionOrderByDisplayOrderAsc(resumeVersion)
                .stream()
                .map(skillMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public SkillResponse getById(Long resumeVersionId,
                                 Long skillId) {

        ResumeVersion resumeVersion =
                currentUserService.getOwnedResumeVersion(resumeVersionId);

        Skill skill = skillRepository
                .findByIdAndResumeVersion(skillId, resumeVersion)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found"));

        return skillMapper.toResponse(skill);
    }

    @Override
    public SkillResponse update(Long resumeVersionId, Long skillId, UpdateSkillRequest request) {
        ResumeVersion resumeVersion = currentUserService.getOwnedResumeVersion(resumeVersionId);

        Skill skill = skillRepository
                .findByIdAndResumeVersion(skillId, resumeVersion)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found"));

        skillMapper.updateEntity(skill, request);

        skillRepository.save(skill);

        return skillMapper.toResponse(skill);
    }

    @Override
    public void delete(Long resumeVersionId, Long skillId) {
        ResumeVersion resumeVersion = currentUserService.getOwnedResumeVersion(resumeVersionId);

        Skill skill = skillRepository
                .findByIdAndResumeVersion(skillId, resumeVersion)
                .orElseThrow(() -> new ResourceNotFoundException("Skill not found"));

        skillRepository.delete(skill);
    }
}
