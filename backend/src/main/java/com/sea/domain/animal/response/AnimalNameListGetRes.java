package com.sea.domain.animal.response;

import java.util.List;

import org.springframework.data.domain.Page;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.animal.dto.AnimalNameDto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AnimalNameListGetRes")
public class AnimalNameListGetRes extends BaseResponseBody {
	List<AnimalNameDto> list;

	public static AnimalNameListGetRes of(int statusCode, String message, List<AnimalNameDto> list) {
		AnimalNameListGetRes res = new AnimalNameListGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setList(list);
		return res;
	}
}
