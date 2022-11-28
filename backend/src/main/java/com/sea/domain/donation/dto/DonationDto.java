package com.sea.domain.donation.dto;

import java.time.LocalDateTime;

import com.sea.domain.donation.db.entity.Donation;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("DonationDto")
public class DonationDto implements Comparable<DonationDto> {
	@ApiModelProperty(value = "기부키")
	int donationId;

	@ApiModelProperty(value = "기부금액")
	double donationAmount;

	@ApiModelProperty(value = "기부자키")
	int userId;

	@ApiModelProperty(value = "기부시간")
	LocalDateTime donationCreatedAt;

	@ApiModelProperty(value = "상태코드")
	String donationStatusCode;

	@ApiModelProperty(value = "트랜잭션 해쉬")
	String donationTransactionHash;

	@ApiModelProperty(value = "동물키")
	int animalId;

	public DonationDto(Donation donation) {
		this.donationId = donation.getDonationId();
		this.donationAmount = donation.getDonationAmount();
		this.userId = donation.getFkUserId().getUserId();
		this.donationCreatedAt = donation.getDonationCreatedAt();
		this.donationStatusCode = donation.getDonationStatusCode();
		this.donationTransactionHash = donation.getDonationTransactionHash();
		this.animalId = donation.getFkAnimalId().getAnimalId();
	}

	@Override
	public int compareTo(DonationDto o) {
		return animalId - o.animalId;
	}
}
