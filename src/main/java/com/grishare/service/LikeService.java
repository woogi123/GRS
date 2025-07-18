package com.grishare.service;

import com.grishare.domain.Post;
import com.grishare.domain.user.User;

public interface LikeService {
    public void addLike(String userLoginId, Long postId);

    public Boolean checkLike(String userLoginId, Long postId);

    public void deleteLike(String userLoginId, Long postId);
    public void updateOfLikePost(final Long postId, final User user);
}
