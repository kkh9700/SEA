package com.sea.domain.item.request;

import lombok.Getter;

@Getter
public class ItemRegisterPostReq {
	String walletAddress;
	String itemImgUrl;
	String itemTokenId;
	int donationId;
}
