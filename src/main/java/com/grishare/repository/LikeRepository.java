package com.grishare.repository;

import com.grishare.domain.LikePost;
import com.grishare.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Entity;
import java.util.List;
import java.util.Optional;

@Repository
public interface LikeRepository extends JpaRepository<LikePost,Long> {

    Optional<LikePost> findByPostIdAndUserId(Long postId, Long userId);

    @Query(value = "SELECT post_id, COUNT(post_id) AS count FROM like_post GROUP BY post_id ORDER BY count DESC", nativeQuery = true)
    List<Object[]> getPostLikesCount();
}
