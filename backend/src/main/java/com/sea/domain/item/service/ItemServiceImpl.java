package com.sea.domain.item.service;

import java.util.ArrayList;
import java.util.List;

import com.sea.domain.animal.db.entity.Animal;
import com.sea.domain.animal.db.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sea.domain.donation.db.entity.Donation;
import com.sea.domain.donation.db.repository.DonationRepository;
import com.sea.domain.item.db.entity.Item;
import com.sea.domain.item.db.repository.ItemRepository;
import com.sea.domain.item.dto.ItemDto;
import com.sea.domain.item.request.ItemRegisterPostReq;
import com.sea.domain.item.request.ItemUpdatePutReq;
import com.sea.domain.user.db.entity.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class ItemServiceImpl implements ItemService {

	@Autowired
	ItemRepository itemRepository;
	
	@Autowired
	DonationRepository donationRepository;

	@Autowired
	AnimalRepository animalRepository;

	@Override
	public List<ItemDto> getMyItemList(String userWalletAddress) {
		List<Item> items = itemRepository.findByItemOwnerAddress(userWalletAddress).get();

		List<ItemDto> list = new ArrayList<>();

		for (Item item : items) {
			ItemDto itemDto = new ItemDto(item);
			list.add(itemDto);
		}

		return list;
	}

	@Override
	public List<ItemDto> getItemList() {
		List<Item> items = itemRepository.findAll();

		List<ItemDto> list = new ArrayList<>();

		for (Item item : items) {
			ItemDto itemDto = new ItemDto(item);
			list.add(itemDto);
		}

		return list;
	}

	@Override
	public Item registerItem(ItemRegisterPostReq registerInfo) {
		
		Donation donation = donationRepository.findById(registerInfo.getDonationId()).get();

		Animal animal = donation.getFkAnimalId();

		String title = animal.getAnimalKoreanName() + "#" + (animal.getAnimalNowItem() + 1);
				
		Item item = Item.builder().itemImgUrl(registerInfo.getItemImgUrl()).itemTokenId(registerInfo.getItemTokenId())
				.itemOwnerAddress(registerInfo.getWalletAddress()).itemTitle(title)
				.itemPrice(donation.getDonationAmount()).fkDonationId(donation)
				.build();

		donation.getFkAnimalId().addNowItem();

		return itemRepository.save(item);
	}

	@Override
	public Item updateItem(ItemUpdatePutReq updateInfo) {
		Item item = itemRepository.findById(updateInfo.getItemId()).get();
		
		item.update(updateInfo);
		
		return itemRepository.save(item);
	}
}
