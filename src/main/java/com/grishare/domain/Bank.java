package com.grishare.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Bank {
    ECA("한국수출입은행"),
    NH("농협은행"),
    SINHAN("신한은행"),
    BofK("한국은행"),
    HANA("하나은행"),
    KB("국민은행");
    private final String bankName;

}
