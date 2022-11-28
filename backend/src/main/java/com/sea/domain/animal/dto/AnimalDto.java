package com.sea.domain.animal.dto;



import java.util.List;

import com.sea.domain.animal.db.entity.Animal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("AnimalDto")
public class AnimalDto {
	@ApiModelProperty(value = "동물키")
	int animalId;
	
	@ApiModelProperty(value = "동물한글명")
	String animalKoreanName;
	
	@ApiModelProperty(value = "동물영문명")
	String animalEnglishName;
	
	@ApiModelProperty(value = "동물학명")
	String animalScientificName;
	
	@ApiModelProperty(value = "동물설명")
	String animalDesc;
	
	@ApiModelProperty(value = "최대nft수량")
	int animalMaxItem;
	
	@ApiModelProperty(value = "남은nft수량")
	int animalNowItem;
	
	@ApiModelProperty(value = "동물이미지")
	List<String> animalImg;
	
	//tinyInt 추가 
	@ApiModelProperty(value = "기부중 여부")
	int animalYn;
	
	@ApiModelProperty(value = "멸종위기등급")
	int animalEndangeredLevel;
	
	@ApiModelProperty(value = "동물종류")
	String animalType;

	public AnimalDto(Animal animal) {
		this.animalId = animal.getAnimalId();
		this.animalKoreanName = animal.getAnimalKoreanName();
		this.animalEnglishName = animal.getAnimalEnglishName().replace("-", " ");
		this.animalScientificName = animal.getAnimalScientificName();
		this.animalDesc = animal.getAnimalDesc();
		this.animalMaxItem = animal.getAnimalMaxItem();
		this.animalNowItem = animal.getAnimalNowItem();
		this.animalImg = animal.getAnimalImg();
		this.animalYn = animal.getAnimalYn();
		this.animalEndangeredLevel = animal.getAnimalEndangeredLevel();
		this.animalType = animal.getAnimalType();
	}
	
	
}
