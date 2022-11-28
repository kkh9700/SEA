package com.sea.domain.item.request;

import lombok.Getter;

@Getter
public class ItemUpdatePutReq {
	int itemId;
	double itemPrice;
	String itemOwnerAddress;
}
