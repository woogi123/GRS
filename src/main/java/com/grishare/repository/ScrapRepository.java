package com.grishare.repository;

import com.grishare.domain.Post;
import com.grishare.domain.Scrap;
import com.grishare.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    // 스크랩 목록 조회
    List<Scrap> findAllByUserId(Long userId); // user PK 값 실제 아이디 아님!

    Optional<Scrap> findByPostIdAndUserId(Long postId, Long userId);
}
