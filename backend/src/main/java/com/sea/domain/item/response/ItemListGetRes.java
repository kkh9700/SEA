package com.sea.domain.item.response;

import java.util.List;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.item.dto.ItemDto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ItemListGetRes")
public class ItemListGetRes extends BaseResponseBody {
	
	List<ItemDto> list;
	
	public static ItemListGetRes of(int statusCode, String message, List<ItemDto> list) {
		ItemListGetRes res = new ItemListGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setList(list);
		return res;
	}
}
