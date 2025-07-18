package com.grishare.repository;

import com.grishare.domain.LikeNation;
import com.grishare.domain.LikePost;
import com.grishare.domain.Nation;
import com.grishare.dto.NationReturnDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeNationRepository extends JpaRepository<LikeNation,Long > {
    Optional<LikeNation> findByNationIdAndUserId(Long nationId, Long userId);

    List<LikeNation> findAllByUserId(Long userId);

    Integer countAllByNation_Id(Long nation_Id);
}
