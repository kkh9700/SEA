package com.sea.domain.animal.response;

import java.util.List;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.animal.dto.MyAnimalDto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AnimalNameListGetRes")
public class MyListGetRes extends BaseResponseBody{
	List<MyAnimalDto> list;
	
	public static MyListGetRes of(int statusCode, String message, List<MyAnimalDto> list) {
		MyListGetRes res = new MyListGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setList(list);
		return res;
	}
}
