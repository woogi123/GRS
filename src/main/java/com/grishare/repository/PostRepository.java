package com.grishare.repository;

import com.grishare.domain.Post;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.Entity;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @EntityGraph(attributePaths = {"user", "postImage"})
    @Query("select p from Post as p order by p.createdAt DESC")
    List<Post> findAll();
    @Query("select p from Post as p where p.nation.id = ?1 order by p.createdAt DESC")
    public List<Post> findAllByNationId(long nationId);

    List<Post> findAllByUserId(Long userId);
}

