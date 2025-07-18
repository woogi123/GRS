package com.grishare.dto;

import com.grishare.domain.Nation;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class NationWarningReturnDto {

    public String nationName;

    public Integer nationWarning;

    public NationWarningReturnDto(Nation nation) {
        this.nationName = nation.getCountryName();
        this.nationWarning = nation.getTravelWarning();
    }
}
