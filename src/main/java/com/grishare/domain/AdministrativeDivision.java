package com.grishare.domain;

import lombok.Getter;

import javax.persistence.*;
import java.util.Collection;

@Entity @Getter
@Table(name = "AdministrativeDivision")
public class AdministrativeDivision {

    @Id
    @Column(name = "ad_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @Column(name = "adName")
    private String adName;

    @OneToOne(mappedBy = "administrativeDivision")
    private Quote quote;
}
