package com.sea.domain.animal.dto;

import com.sea.domain.animal.db.entity.Animal;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;

@Getter
@ApiModel("AnimalNameDto")
public class AnimalNameDto {
	@ApiModelProperty(value = "동물키")
	int animalId;

	@ApiModelProperty(value = "동물명")
	String animalName;

	public AnimalNameDto(Animal animal) {
		this.animalId = animal.getAnimalId();
		this.animalName = animal.getAnimalKoreanName();
	}
}
