package com.sea.domain.donation.service;

import java.util.List;

import com.sea.domain.donation.db.entity.Donation;
import com.sea.domain.donation.dto.MyDonationDto;
import com.sea.domain.donation.request.DonationRegisterPostReq;
import com.sea.domain.user.db.entity.User;

public interface DonationService {

	List<MyDonationDto> getDonationList(String walletAddress);
	Donation createDonation(DonationRegisterPostReq registerInfo);

    Donation updateDonation(int donationId);
}
