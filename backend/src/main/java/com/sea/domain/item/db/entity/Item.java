package com.sea.domain.item.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.sea.domain.animal.db.entity.Animal;
import com.sea.domain.donation.db.entity.Donation;
import com.sea.domain.item.request.ItemUpdatePutReq;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ITEM")
public class Item {
	
	@Id
	@Column(name = "item_id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	int itemId;
	
	@Column(name = "item_img_url", length = 1000)
	String itemImgUrl;
	
	@Column(name = "item_token_id", length = 200)
	String itemTokenId;
	
	@Column(name = "item_owner_address", length = 200)
	String itemOwnerAddress;
	
	@OneToOne
	@JoinColumn(name = "fk_donation_id")
	Donation fkDonationId;
	
	@Column(name = "item_title", length = 100)
	String itemTitle;
	
	@Column(name = "item_price")
	double itemPrice;

	public void update(ItemUpdatePutReq updateInfo) {
		this.itemPrice = updateInfo.getItemPrice();
		this.itemOwnerAddress = updateInfo.getItemOwnerAddress();
	}
}
