package com.grishare.domain;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name="exchangerate")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ExchangeRate {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "country_name")
    private String countryName;

    @Enumerated(EnumType.STRING)
    @Column(name = "bank")
    private Bank bank;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_id")
    private Nation nation;

    @Column(name = "country_code")
    private String countryCode;

    @Column(name = "cur_unit")
    private String curUnit;

    @Column(name = "exchange_rate")
    private Float exchangeRate;

    public ExchangeRate(String countryName, Bank bank, String countryCode, String curUnit, Float exchangeRate) {
        this.countryName = countryName;
        this.bank = bank;
        this.countryCode = countryCode;
        this.curUnit = curUnit;
        this.exchangeRate = exchangeRate;
    }
}
