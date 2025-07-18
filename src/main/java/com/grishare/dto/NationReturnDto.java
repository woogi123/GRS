package com.grishare.dto;

import com.grishare.domain.Nation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class NationReturnDto {

    private Long id;

    private String iso2;

    private String iso3;

    private int isoN;

    private String countryName;

    private String countryEnName;

    private String continentCode;

    private Integer travelWarning;

    private String warningHistory;

    private String currency;
    private int like_count;

    private String nationImgUrl;

    public NationReturnDto(Nation nation){
        this.id = nation.getId();
        this.iso2 = nation.getIso2();
        this.iso3 = nation.getIso3();
        this.isoN = nation.getIsoN();
        this.countryName = nation.getCountryName();
        this.countryEnName = nation.getCountryEnName();
        this.continentCode = nation.getContinentCode();
        this.travelWarning = nation.getTravelWarning();
        this.warningHistory = nation.getWarningHistory();
        this.currency = nation.getCurrency();
        this.like_count = nation.getLikeNations().size();
        this.nationImgUrl = nation.getNationImgUrl();
    }
}
