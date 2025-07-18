package com.grishare.repository;

import com.grishare.domain.AdministrativeDivision;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdministrativeDivisionRepository extends JpaRepository<AdministrativeDivision, Character> {
    public List<AdministrativeDivision> findAllById(char iso);

    public List<AdministrativeDivision> findAllByNation_Id (Long id);
}
