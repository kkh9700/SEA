package com.sea.domain.animal.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "ANIMAL")
public class Animal {

	@Id
	@Column(name = "animal_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	int animalId;

	@Column(name = "animal_korean_name", length = 50)
	String animalKoreanName;

	@Column(name = "animal_english_name", length = 100)
	String animalEnglishName;

	@Column(name = "animal_scientific_name", length = 100)
	String animalScientificName;

	@Column(name = "animal_desc", columnDefinition = "TEXT")
	String animalDesc;

	@Column(name = "animal_max_item")
	int animalMaxItem;

	@Column(name = "animal_now_item")
	int animalNowItem;

	// tinyInt 추가
	@Column(name = "animal_yn", columnDefinition = "TINYINT(1)")
	int animalYn;

	@Column(name = "animal_endangered_level")
	int animalEndangeredLevel;

	@Column(name = "animal_type", length = 30)
	String animalType;

	@ElementCollection(fetch = FetchType.LAZY)
	List<String> animalImg = new ArrayList<String>();

	public void updateDesc(String animalDesc) {
		this.animalDesc = animalDesc;
	}
	
	public void addImg(String imgUrl) {
		this.animalImg.add(imgUrl);
	}

	public void addNowItem() {
		animalNowItem++;
	}
}
