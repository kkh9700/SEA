package com.sea.domain.animal.response;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.animal.dto.AnimalDto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@ApiModel("AnimalDetailGetRes")
public class AnimalDetailGetRes extends BaseResponseBody{
	AnimalDto dto;
	
	public static AnimalDetailGetRes of(int statusCode, String message, AnimalDto dto) {
		AnimalDetailGetRes res = new AnimalDetailGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setDto(dto);
		return res;
	}
}
