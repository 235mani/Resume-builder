package com.resumebuilder.service.impl;

import com.resumebuilder.dto.request.ResumeVersionRequest;
import com.resumebuilder.dto.response.ResumeVersionResponse;
import com.resumebuilder.entity.MasterProfile;
import com.resumebuilder.entity.ResumeVersion;
import com.resumebuilder.exception.ResourceAlreadyExistsException;
import com.resumebuilder.mapper.ResumeVersionMapper;
import com.resumebuilder.repository.ResumeVersionRepository;
import com.resumebuilder.service.CurrentUserService;
import com.resumebuilder.service.ResumeVersionService;
import com.resumebuilder.util.SlugUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeVersionServiceImpl implements ResumeVersionService {

    private final ResumeVersionRepository resumeVersionRepository;
    private final CurrentUserService currentUserService;
    private final ResumeVersionMapper resumeVersionMapper;

    @Override
    public ResumeVersionResponse create(ResumeVersionRequest request) {

        MasterProfile profile = currentUserService.getCurrentProfile();

        String slug = SlugUtil.toSlug(request.getName());

        if (resumeVersionRepository.existsByMasterProfileAndSlug(profile, slug)) {
            throw new ResourceAlreadyExistsException(
                    "Resume name already exists.");
        }

        ResumeVersion resume = resumeVersionMapper.toEntity(request);

        resume.setMasterProfile(profile);
        resume.setSlug(slug);
        resume.setIsPublic(false);

        ResumeVersion savedResume = resumeVersionRepository.save(resume);

        return resumeVersionMapper.toResponse(savedResume);
    }

    @Override
    public List<ResumeVersionResponse> getAll() {

        MasterProfile profile = currentUserService.getCurrentProfile();

        return resumeVersionRepository.findByMasterProfile(profile)
                .stream()
                .map(resumeVersionMapper::toResponse)
                .toList();
    }

    @Override
    public ResumeVersionResponse getById(Long resumeVersionId) {

        ResumeVersion resume =
                currentUserService.getOwnedResumeVersion(resumeVersionId);

        return resumeVersionMapper.toResponse(resume);
    }

    @Override
    public ResumeVersionResponse update(Long resumeVersionId,
                                        ResumeVersionRequest request) {

        ResumeVersion resume =
                currentUserService.getOwnedResumeVersion(resumeVersionId);

        String slug = SlugUtil.toSlug(request.getName());

        if (!resume.getSlug().equals(slug)
                && resumeVersionRepository.existsByMasterProfileAndSlug(
                resume.getMasterProfile(),
                slug)) {

            throw new ResourceAlreadyExistsException(
                    "Resume name already exists.");
        }

        resumeVersionMapper.updateEntity(request, resume);

        resume.setSlug(slug);

        ResumeVersion updatedResume =
                resumeVersionRepository.save(resume);

        return resumeVersionMapper.toResponse(updatedResume);
    }

    @Override
    public void delete(Long resumeVersionId) {

        ResumeVersion resume =
                currentUserService.getOwnedResumeVersion(resumeVersionId);

        resumeVersionRepository.delete(resume);
    }

    @Override
    public ResumeVersionResponse publish(Long resumeVersionId) {

        ResumeVersion resume =
                currentUserService.getOwnedResumeVersion(resumeVersionId);

        resume.setIsPublic(true);

        return resumeVersionMapper.toResponse(
                resumeVersionRepository.save(resume)
        );
    }

    @Override
    public ResumeVersionResponse unpublish(Long resumeVersionId) {

        ResumeVersion resume =
                currentUserService.getOwnedResumeVersion(resumeVersionId);

        resume.setIsPublic(false);

        return resumeVersionMapper.toResponse(
                resumeVersionRepository.save(resume)
        );
    }
}
