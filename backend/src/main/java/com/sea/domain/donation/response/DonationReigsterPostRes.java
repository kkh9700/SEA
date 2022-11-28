package com.sea.domain.donation.response;

import com.sea.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DonationReigsterPostRes")
public class DonationReigsterPostRes extends BaseResponseBody{
	int donationId;
	
	public static DonationReigsterPostRes of(int statusCode, String message, int donationId) {
		DonationReigsterPostRes res = new DonationReigsterPostRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setDonationId(donationId);
		return res;
	}
}
