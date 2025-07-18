package com.grishare.domain;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Table(name = "Quote")
@Entity @Getter
@AllArgsConstructor
@NoArgsConstructor
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "meal")
    private Integer meal;

    @Column(name = "taxi")
    private Integer taxi;

    @Column(name = "coffee")
    private Integer coffee;

    @Column(name = "rice")
    private Integer rice;

    @OneToOne
    @JoinColumn(name = "ad_id")
    private AdministrativeDivision administrativeDivision;

}
