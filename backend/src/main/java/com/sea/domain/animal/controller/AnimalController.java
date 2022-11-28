package com.sea.domain.animal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.animal.db.entity.Animal;
import com.sea.domain.animal.dto.AnimalDto;
import com.sea.domain.animal.dto.AnimalNameDto;
import com.sea.domain.animal.dto.MyAnimalDto;
import com.sea.domain.animal.request.AnimalRegisterPostReq;
import com.sea.domain.animal.request.ImageRegisterPutReq;
import com.sea.domain.animal.response.AnimalDetailGetRes;
import com.sea.domain.animal.response.AnimalListGetRes;
import com.sea.domain.animal.response.AnimalNameListGetRes;
import com.sea.domain.animal.response.MyListGetRes;
import com.sea.domain.animal.service.AnimalService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/animal")
public class AnimalController {

	@Autowired
	AnimalService animalService;

	@ApiOperation(value = "동물생성")
	@PostMapping()
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
			@ApiResponse(code = 400, message = "실패", response = BaseResponseBody.class), })
	public ResponseEntity<? extends BaseResponseBody> registerAnimal(@RequestBody AnimalRegisterPostReq registerInfo) {
		log.info("registerAnimal - 호출");
		try {
			Animal animal = animalService.registerAnimal(registerInfo);
		} catch (Exception e) {
			return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Failed"));
		}

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@ApiOperation(value = "동물 이미지 등록")
	@PutMapping(path = "/image", value = "/image", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = BaseResponseBody.class),
			@ApiResponse(code = 400, message = "실패", response = BaseResponseBody.class), })
	public ResponseEntity<? extends BaseResponseBody> registerAnimalImage(@RequestPart ImageRegisterPutReq registerInfo, @RequestPart MultipartFile file) {
		log.info("registerAnimalImage - 호출");
		log.info("동물키 : {}, 파일 : {}", registerInfo.getAnimalId(), file);

		try {
			Animal animal = animalService.registerAnimalImage(registerInfo, file);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Failed"));
		}

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	// READ
	@ApiOperation(value = "동물조회")
	@GetMapping()
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = AnimalListGetRes.class), })
	public ResponseEntity<? extends BaseResponseBody> getProductList(
			@PageableDefault(page = 0, size = 10) Pageable pageable) {
		log.info("getProductList - 호출");

		Page<AnimalDto> animals = animalService.getAnimalList(pageable);

		return ResponseEntity.status(200).body(AnimalListGetRes.of(200, "Success", animals));
	}

	@ApiOperation(value = "동물 상세보기")
	@GetMapping("/detail/{animalNo}")
	public ResponseEntity<? extends BaseResponseBody> animalDetail(
			@ApiParam(value = "동물키") @PathVariable("animalNo") int animalNo) {
		log.info("animalDetail - 호출");

		AnimalDto dto = animalService.animalDetail(animalNo);

		return ResponseEntity.status(200).body(AnimalDetailGetRes.of(200, "Success", dto));
	}

	// /name-list
	@GetMapping("/name-list")
	@ApiOperation(value = "동물 이름 리스트")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = AnimalNameListGetRes.class),

	})
	public ResponseEntity<? extends BaseResponseBody> getAnimalListByName() {
		log.info("getAnimalListByName - 호출");
		List<AnimalNameDto> list = animalService.getAnimalListByName();

		return ResponseEntity.status(200).body(AnimalNameListGetRes.of(200, "Success", list));
	}

	// /my-list
	@GetMapping("/my-list")
	@ApiOperation(value = "내가 기부한 동물 리스트")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공", response = AnimalDto.class),

	})
	public ResponseEntity<? extends BaseResponseBody> getMyList(@RequestParam(value = "walletAddress") String walletAddress) {
		log.info("getMyList - 호출");

		List<MyAnimalDto> list = animalService.getMyAnimalListByWalletAddress(walletAddress);

		return ResponseEntity.status(200).body(MyListGetRes.of(200, "Success", list));
	}
}
