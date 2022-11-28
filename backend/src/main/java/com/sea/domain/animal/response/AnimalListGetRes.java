package com.sea.domain.animal.response;

import org.springframework.data.domain.Page;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.animal.dto.AnimalDto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AnimalListGetRes")
public class AnimalListGetRes extends BaseResponseBody{
	Page<AnimalDto> list;
	
	public static AnimalListGetRes of(int statusCode, String message, Page<AnimalDto> list) {
		AnimalListGetRes res = new AnimalListGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setList(list);
		return res;
	}
}
