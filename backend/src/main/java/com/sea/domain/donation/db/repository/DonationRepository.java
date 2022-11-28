package com.sea.domain.donation.db.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sea.domain.donation.db.entity.Donation;
import com.sea.domain.donation.dto.DonationDto;
import com.sea.domain.user.db.entity.User;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Integer>{
	Optional<List<Donation>> findByFkUserId(User user);
}
