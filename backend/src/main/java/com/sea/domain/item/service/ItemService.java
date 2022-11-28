package com.sea.domain.item.service;

import java.util.List;

import com.sea.domain.item.db.entity.Item;
import com.sea.domain.item.dto.ItemDto;
import com.sea.domain.item.request.ItemRegisterPostReq;
import com.sea.domain.item.request.ItemUpdatePutReq;
import com.sea.domain.user.db.entity.User;

public interface ItemService {
	List<ItemDto> getMyItemList(String userWalletAddress);

	List<ItemDto> getItemList();

	Item registerItem(ItemRegisterPostReq registerInfo);

	Item updateItem(ItemUpdatePutReq updateInfo);
}
