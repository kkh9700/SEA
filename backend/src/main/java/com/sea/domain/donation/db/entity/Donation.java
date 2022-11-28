package com.sea.domain.donation.db.entity;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sea.domain.animal.db.entity.Animal;
import com.sea.domain.user.db.entity.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "DONATION")
public class Donation {
	
	@Id
	@Column(name = "dontion_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	int donationId;
	
	@Column(name = "donation_amount")
	double donationAmount;
	
	@CreationTimestamp
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", shape = JsonFormat.Shape.STRING)
	@Column(name = "donation_created_at")
	LocalDateTime donationCreatedAt;
	
	@Column(name = "donation_status_code", length = 20)
	String donationStatusCode;
	
	@Column(name = "donation_transaction_hash", length = 200)
	String donationTransactionHash;
	
	@ManyToOne
	@JoinColumn(name = "fk_user_id")
	User fkUserId;
	
	@ManyToOne
	@JoinColumn(name = "fk_animal_id")
	Animal fkAnimalId;
	
	public void update() {
		this.donationStatusCode = "NFT 생성 완료";
	}
}
