package com.example.gymTrack.repository;

import com.example.gymTrack.domain.entity.Role;
import com.example.gymTrack.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String username);

    Optional<User> findFirstByRoles(Role role);

}
