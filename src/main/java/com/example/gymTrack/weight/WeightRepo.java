package com.example.gymTrack.weight;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@Repository
public interface WeightRepo extends JpaRepository<Weight, Long> {


    @Query("""
        SELECT weight FROM Weight weight where weight.user.id = :userId
        """)
    List<Weight> findAllByUserId(Long userId);


    @Query("""
        SELECT weight from Weight weight where weight.user.id = :userId and YEAR(weight.date) = :year and MONTH(weight.date) = :month
        """)
    List<Weight> findAllByMonth(Long userId, int year, int month);

    @Query("""
        SELECT weight.date from Weight weight where weight.user.id = :userId
        """)
    List<LocalDate> findAllDateByUserId(Long userId);
}
