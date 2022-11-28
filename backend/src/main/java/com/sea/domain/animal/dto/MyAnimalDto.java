package com.sea.domain.animal.dto;

import java.util.List;

import com.sea.domain.animal.db.entity.Animal;

import io.swagger.annotations.ApiModel;
import lombok.Getter;

@Getter
@ApiModel("MyAnimalDto")
public class MyAnimalDto implements Comparable<MyAnimalDto> {
	String animalName;

	String animalType;

	List<String> imgList;

	boolean donationYn;

	boolean itemYn;

	public MyAnimalDto(Animal animal) {
		animalName = animal.getAnimalKoreanName();
		animalType = animal.getAnimalType();
		donationYn = false;
		itemYn = false;
		imgList = animal.getAnimalImg();
	}

	public void updateDonation() {
		donationYn = true;
	}

	public void updateItem() {
		itemYn = true;
	}

	@Override
	public int compareTo(MyAnimalDto o) {
		int a = (donationYn ? 2 : 0) + (itemYn ? 1 : 0);
		int b = (o.donationYn ? 2 : 0) + (o.itemYn ? 1 : 0);

		if (a == b)
			return animalType.compareTo(o.animalType);

		return a - b;
	}

}
