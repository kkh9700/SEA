package com.sea.domain.donation.response;

import java.util.List;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.animal.dto.MyAnimalDto;
import com.sea.domain.animal.response.MyListGetRes;
import com.sea.domain.donation.dto.MyDonationDto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AnimalNameListGetRes")
public class MyDonationListGetRes extends BaseResponseBody{
	List<MyDonationDto> list;
	
	public static MyDonationListGetRes of(int statusCode, String message, List<MyDonationDto> list) {
		MyDonationListGetRes res = new MyDonationListGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setList(list);
		return res;
	}
}
