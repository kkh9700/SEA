package com.sea.domain.item.dto;

import com.sea.domain.item.db.entity.Item;

import io.swagger.annotations.ApiModel;
import lombok.Getter;

@Getter
@ApiModel("ItemDto")
public class ItemDto implements Comparable<ItemDto>{
	int itemId;
	
	String itemImgUrl;
	
	String itemTokenId;
	
	String itemOwnerAddress;
	
	int donationId;
	
	String itemTitle;
	
	double itemPrice;
	int animalEndangeredLevel;

	int animalId;

	String animalKoreanName;
	
	public ItemDto(Item item) {
		this.itemId = item.getItemId();
		this.itemImgUrl = item.getItemImgUrl();
		this.itemTokenId = item.getItemTokenId();
		this.itemOwnerAddress = item.getItemOwnerAddress();
		this.donationId = item.getFkDonationId().getDonationId();
		this.itemTitle = item.getItemTitle();
		this.itemPrice = item.getItemPrice();
		this.animalId = item.getFkDonationId().getFkAnimalId().getAnimalId();
		this.animalKoreanName = item.getFkDonationId().getFkAnimalId().getAnimalKoreanName();
		this.animalEndangeredLevel = item.getFkDonationId().getFkAnimalId().getAnimalEndangeredLevel();
	}

	@Override
	public int compareTo(ItemDto o) {
		return this.animalId - o.animalId;
	}
}
