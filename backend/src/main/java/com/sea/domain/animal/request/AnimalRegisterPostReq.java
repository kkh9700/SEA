package com.sea.domain.animal.request;

import lombok.Getter;

@Getter
public class AnimalRegisterPostReq {
	String animalKoreanName;
	String animalEnglishName;
	String animalScientificName;
	String animalDesc;
	String animalType;
	int animalEndangeredLevel;
}
