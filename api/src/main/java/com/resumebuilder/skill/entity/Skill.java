package com.resumebuilder.skill.entity;

import com.resumebuilder.entity.BaseEntity;
import com.resumebuilder.entity.ResumeVersion;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "skills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Skill extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "resume_version_id")
    private ResumeVersion resumeVersion;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private Integer displayOrder;
}