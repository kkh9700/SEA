package com.sea.domain.user.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sea.common.model.response.BaseResponseBody;
import com.sea.domain.user.db.entity.User;
import com.sea.domain.user.request.UserLoginPostReq;
import com.sea.domain.user.request.UserUpdateTestResultPutReq;
import com.sea.domain.user.response.UserLoginPostRes;
import com.sea.domain.user.response.UserTestResultGetRes;
import com.sea.domain.user.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/user")
public class UserController {

	@Autowired
	private UserService userService;

	@ApiOperation(value = "로그인")
	@PostMapping("/login")
	@ApiResponses({ @ApiResponse(code = 201, message = "성공", response = UserLoginPostRes.class),
			@ApiResponse(code = 401, message = "Incorrect Wallet") })
	public ResponseEntity<? extends BaseResponseBody> login(@RequestBody UserLoginPostReq loginInfo,
			HttpServletResponse response) {
		log.info("userLogin - Call");

		String userAddress = loginInfo.getWalletAddress();
		Integer addressLength = userAddress.length();

		// 올바른 지갑 주소인지 확인
		if (!addressLength.equals(42)) {
			return ResponseEntity.status(401).body(UserLoginPostRes.of(401, "Incorrect Wallet", null, null));
		} else {
			User user = userService.getUserByAddress(userAddress);
			// 토큰
			return ResponseEntity.status(201)
					.body(UserLoginPostRes.of(201, "Success", user.getUserId(), user.getUserNickname()));
		}
	}

	@ApiOperation(value = "나를 표현하기")
	@PutMapping("/test-result")
	@ApiResponses({ @ApiResponse(code = 204, message = "성공"), @ApiResponse(code = 400, message = "존재하지 않는 유저입니다.") })
	public ResponseEntity<? extends BaseResponseBody> updateTestResult(
			@RequestBody UserUpdateTestResultPutReq updateInfo) {
		User user = userService.updateTestResult(updateInfo);

		if (user == null)
			return ResponseEntity.status(400).body(BaseResponseBody.of(400, "존재하지 않는 유저입니다."));

		return ResponseEntity.status(204).body(BaseResponseBody.of(200, "Success"));
	}

	@ApiOperation(value = "검사 결과 얻기")
	@GetMapping("/test-result")
	@ApiResponses({ @ApiResponse(code = 204, message = "성공"), @ApiResponse(code = 400, message = "존재하지 않는 유저입니다.") })
	public ResponseEntity<? extends BaseResponseBody> getTestResult(
			@RequestParam(value = "walletAddress") String walletAddress) {
		List<String> testResult = userService.getTestResultByUserId(walletAddress);

		if (testResult == null) {
			return ResponseEntity.status(400).body(BaseResponseBody.of(400, "존재하지 않는 유저입니다."));
		}
		return ResponseEntity.status(200).body(UserTestResultGetRes.of(200, "Success", testResult));
	}
}
