package com.grishare.service;

import com.grishare.domain.user.User;

public interface ScrapService {

    public void addScrap(String userLoginId, Long postId);
    public void deleteScrap(String userLoginId, Long postId);
    public Boolean checkScrap(String userLoginId, Long postId);
    public void updateOfScrapPost(final Long postId, final User user);
}
