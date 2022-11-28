package com.sea.domain.sale.response;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.sale.dto.SaleDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SaleDetailGetRes extends BaseResponseBody {
	SaleDto sale;

	public static SaleDetailGetRes of(int statusCode, String message, SaleDto sale) {
		SaleDetailGetRes res = new SaleDetailGetRes();
		res.setStatusCode(statusCode);
		res.setMessage(message);
		res.setSale(sale);
		return res;
	}
}