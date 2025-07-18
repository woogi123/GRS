package com.grishare.service;

import com.grishare.dto.MailDto;

public interface MailService {

    public MailDto createMail(String tmpPassword, String memberEmail);

    public void sendMail(MailDto mailVo);
}
