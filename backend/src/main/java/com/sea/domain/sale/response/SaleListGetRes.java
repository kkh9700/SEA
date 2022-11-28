package com.sea.domain.sale.response;

import java.util.List;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.sale.dto.SaleDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleListGetRes extends BaseResponseBody {
	List<SaleDto> list;
	
	public static SaleListGetRes of(int statusCode, String message, List<SaleDto> list) {
		SaleListGetRes res = new SaleListGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setList(list);
		return res;
	}
}
