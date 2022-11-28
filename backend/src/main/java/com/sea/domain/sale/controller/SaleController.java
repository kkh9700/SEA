package com.sea.domain.sale.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.sale.db.entity.Sale;
import com.sea.domain.sale.dto.SaleDto;
import com.sea.domain.sale.request.SaleCancleDeleteReq;
import com.sea.domain.sale.request.SaleCompletePutReq;
import com.sea.domain.sale.request.SaleRegisterPostReq;
import com.sea.domain.sale.response.SaleDetailGetRes;
import com.sea.domain.sale.response.SaleListGetRes;
import com.sea.domain.sale.service.SaleService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/sale")
public class SaleController {

	@Autowired
	SaleService saleService;

	@ApiOperation(value = "판매 등록하기")
	@PostMapping()
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), })
	public ResponseEntity<? extends BaseResponseBody> registerSale(@RequestBody SaleRegisterPostReq registerInfo) {
		
		Sale sale = saleService.createSale(registerInfo);
		
		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@ApiOperation(value = "판매 등록취소")
	@DeleteMapping("/del")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "실패"), })
	public ResponseEntity<? extends BaseResponseBody> cancleSale(@RequestBody SaleCancleDeleteReq cancleInfo) {

		if (saleService.deleteSale(cancleInfo))
			return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

		return ResponseEntity.status(400).body(BaseResponseBody.of(400, "Failed"));

	}

	@ApiOperation(value = "판매 목록 불러오기")
	@GetMapping()
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "실패"), })
	public ResponseEntity<? extends BaseResponseBody> getSaleList() {

		List<SaleDto> list = saleService.getSaleList();

		return ResponseEntity.status(200).body(SaleListGetRes.of(200, "Success", list));
	}

	@ApiOperation(value = "판매 완료")
	@PutMapping()
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "실패"), })
	public ResponseEntity<? extends BaseResponseBody> completeSale(@RequestBody SaleCompletePutReq completeInfo) {

		Sale sale = saleService.updateSale(completeInfo);

		return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
	}

	@ApiOperation(value = "판매 상세보기")
	@GetMapping("/{saleNo}")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "실패"), })
	public ResponseEntity<? extends BaseResponseBody> getSaleDetail(@PathVariable("saleNo") int saleNo) {

		SaleDto sale = saleService.getSaleDetail(saleNo);

		return ResponseEntity.status(200).body(SaleDetailGetRes.of(200, "Success", sale));
	}

	@ApiOperation(value = "판매내역 불러오기")
	@GetMapping("/ex")
	@ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 400, message = "실패"), })
	public ResponseEntity<? extends BaseResponseBody> cancleSale(@RequestParam(value = "walletAddress") String walletAddress) {
		List<SaleDto> list = saleService.getMySaleList(walletAddress);
		
		return ResponseEntity.status(200).body(SaleListGetRes.of(200, "Success", list));
	}

}
