package com.sea.domain.animal.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sea.domain.animal.db.entity.Animal;
import com.sea.domain.animal.db.repository.AnimalRepository;
import com.sea.domain.animal.dto.AnimalDto;
import com.sea.domain.animal.dto.AnimalNameDto;
import com.sea.domain.animal.dto.MyAnimalDto;
import com.sea.domain.animal.request.AnimalRegisterPostReq;
import com.sea.domain.animal.request.ImageRegisterPutReq;
import com.sea.domain.donation.db.entity.Donation;
import com.sea.domain.donation.db.repository.DonationRepository;
import com.sea.domain.donation.dto.DonationDto;
import com.sea.domain.item.db.entity.Item;
import com.sea.domain.item.db.repository.ItemRepository;
import com.sea.domain.item.dto.ItemDto;
import com.sea.domain.user.db.entity.User;
import com.sea.domain.user.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@Service
public class AnimalServiceImpl implements AnimalService {

	@Autowired
	AnimalRepository animalRepository;

	@Autowired
	DonationRepository donationRepository;

	@Autowired
	ItemRepository itemRepository;

	@Autowired
	UserRepository userRepository;
	
	@Value("${default.imageFolder}")
	String defaultImgPath;

	@Override
	public Page<AnimalDto> getAnimalList(Pageable pageable) {
		List<Animal> animals = animalRepository
				.findAll(Sort.by(Sort.Direction.DESC, "animalType").by(Sort.Direction.ASC, "animalId"));
		List<AnimalDto> list = new ArrayList<>();

		long total = animals.size();

		for (Animal aniaml : animals) {
			AnimalDto dto = new AnimalDto(aniaml);

			list.add(dto);
		}

		Page<AnimalDto> page = new PageImpl<>(list, pageable, total);

		return page;
	}

	@Override
	public Animal registerAnimalImage(ImageRegisterPutReq registerInfo, MultipartFile file) {
		log.info("file is empty : {}", file.isEmpty());

		if(!file.isEmpty()) {
			Animal animal = animalRepository.findByAnimalId(registerInfo.getAnimalId()).get();
			String folderPath = defaultImgPath + "animal/" + animal.getAnimalEnglishName();

			log.info("폴더 경로 : {}", folderPath);

			String fileName = "animal/" + animal.getAnimalEnglishName() + "/" + file.getOriginalFilename();

			File Folder = new File(folderPath);

			if (!Folder.exists()) {
				try{
					Folder.mkdir(); //폴더 생성합니다.
					log.info("폴더가 생성되었습니다. {}", Folder.getPath());
				}
				catch(Exception e){
					e.getStackTrace();
				}
			}else {
				log.info("이미 폴더가 생성되어 있습니다.");
			}

			try {
				File newFile = new File(fileName);
				file.transferTo(newFile);
				log.info("파일이 생성되었습니다. {}", newFile.getPath());
			} catch (Exception e) {
				log.info("에러발생");
				e.printStackTrace();
				return null;
			}

			String filePath = "/images/" + fileName;

			animal.addImg(filePath);
			log.info("이미지가 등록되었습니다. {}", filePath);

			return animalRepository.save(animal);
		}

		return null;
	}

	// 동물 상세보기
	@Override
	public AnimalDto animalDetail(int animalId) {
		Animal animal = animalRepository.findById(animalId).get();

		AnimalDto newAnimal = new AnimalDto(animal);

		return newAnimal;
	}

	// 동물 이름
	@Override
	public List<AnimalNameDto> getAnimalListByName() {
		List<Animal> animals = animalRepository
				.findAll(Sort.by(Sort.Direction.DESC, "animalType").by(Sort.Direction.ASC, "animalId"));
		List<AnimalNameDto> list = new ArrayList<>();

		for (Animal animal : animals) {

			AnimalNameDto dto = new AnimalNameDto(animal);

			list.add(dto);
		}

		return list;
	}

	@Override
	public List<MyAnimalDto> getMyAnimalListByWalletAddress(String walletAddress) {

		User user = userRepository.findUserByUserWalletAddress(walletAddress).orElse(null);
		
		List<Animal> animals = animalRepository
				.findAll(Sort.by(Sort.Direction.DESC, "animalType").by(Sort.Direction.ASC, "animalId"));

		List<Donation> donations = donationRepository.findByFkUserId(user).get();
		List<DonationDto> donationList = new ArrayList<>();

		for (Donation donation : donations) {
			DonationDto donationDto = new DonationDto(donation);
			donationList.add(donationDto);
		}

		Collections.sort(donationList);

		List<Item> items = itemRepository.findByItemOwnerAddress(user.getUserWalletAddress()).get();
		List<ItemDto> itemList = new ArrayList<>();

		for (Item item : items) {
			ItemDto itemDto = new ItemDto(item);
			itemList.add(itemDto);
		}

		Collections.sort(itemList);

		int donationIdx = 0;
		int itemIdx = 0;

		List<MyAnimalDto> list = new ArrayList<>();

		for (Animal animal : animals) {
			MyAnimalDto dto = new MyAnimalDto(animal);

			if (donationIdx < donationList.size()
					&& animal.getAnimalId() == donationList.get(donationIdx).getAnimalId()) {
				dto.updateDonation();
				donationIdx++;
			}

			if (itemIdx < itemList.size() && animal.getAnimalId() == itemList.get(itemIdx).getAnimalId()) {
				dto.updateItem();
				itemIdx++;
			}

			list.add(dto);
		}

		Collections.sort(list);

		return list;
	}

	@Override
	public Animal registerAnimal(AnimalRegisterPostReq registerInfo) {
		int maxItem = 100;

		switch (registerInfo.getAnimalEndangeredLevel()) {
		case 2:
			maxItem = 300;
			break;
		case 3:
			maxItem = 1000;
		}
		String animalEnglishName = registerInfo.getAnimalEnglishName().replace(" ", "-");

		Animal animal = Animal.builder().animalKoreanName(registerInfo.getAnimalKoreanName())
				.animalEnglishName(animalEnglishName)
				.animalScientificName(registerInfo.getAnimalScientificName()).animalDesc(registerInfo.getAnimalDesc())
				.animalType(registerInfo.getAnimalType()).animalEndangeredLevel(registerInfo.getAnimalEndangeredLevel())
				.animalMaxItem(maxItem).animalNowItem(0).animalYn(1).build();
		
		return animalRepository.save(animal);
	}
}
