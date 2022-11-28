package com.sea.domain.user.db.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "USER")
public class User {

	@Id
	@Column(name = "user_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	int userId;

	@Column(name = "user_role", length = 20)
	String userRole;

	@Column(name = "user_nickname", length = 45)
	String userNickname;

	@Column(name = "user_wallet_address", length = 100)
	String userWalletAddress;

	@Column(name = "user_profile_img", length = 200)
	String userProfileImg;

	@ElementCollection(fetch = FetchType.LAZY)
	List<String> userTestResult = new ArrayList<String>();

	public void updateTestResult(List<String> list) {
		this.userTestResult = new ArrayList<>(list);
	}
}
