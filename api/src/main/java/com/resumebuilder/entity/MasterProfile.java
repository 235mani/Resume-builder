package com.resumebuilder.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "master_profiles")
@Getter
@Setter
public class MasterProfile extends BaseEntity {

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(nullable = false, length = 50)
    private String firstName;

    @Column(nullable = false, length = 50)
    private String lastName;

    @Column(nullable = false, length = 100)
    private String email;

    @Column(length = 20)
    private String phone;

    @Column(length = 100)
    private String location;

    @Column(length = 255)
    private String linkedin;

    @Column(length = 255)
    private String github;

    @Column(length = 255)
    private String portfolio;

    @Column(length = 500)
    private String photoUrl;

    @OneToMany(
            mappedBy = "masterProfile",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<ResumeVersion> resumeVersions = new ArrayList<>();
}
