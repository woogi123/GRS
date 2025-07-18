package com.grishare.repository;

import com.grishare.domain.Nation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NationRepository extends JpaRepository<Nation, Long> {
    List<Nation> findByIso2(String iso2);

}
