package com.resumebuilder.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(
        name = "resume_versions",
        uniqueConstraints = {
                @UniqueConstraint(
                        columnNames = {"master_profile_id", "slug"}
                )
        }
)
@Getter
@Setter
public class ResumeVersion extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "master_profile_id", nullable = false)
    private MasterProfile masterProfile;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false, length = 100)
    private String displayTitle;

    @Column(length = 5000)
    private String professionalSummary;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResumeTemplate template;

    @Column(nullable = false)
    private String slug;

    @Column(nullable = false)
    private Boolean isPublic = false;
}