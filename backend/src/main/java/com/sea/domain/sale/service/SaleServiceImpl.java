package com.sea.domain.sale.service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sea.domain.item.db.entity.Item;
import com.sea.domain.item.db.repository.ItemRepository;
import com.sea.domain.sale.db.entity.Sale;
import com.sea.domain.sale.db.repository.SaleRepository;
import com.sea.domain.sale.dto.SaleDto;
import com.sea.domain.sale.request.SaleCancleDeleteReq;
import com.sea.domain.sale.request.SaleCompletePutReq;
import com.sea.domain.sale.request.SaleRegisterPostReq;

@Service("saleService")
public class SaleServiceImpl implements SaleService {
	@Autowired
	ItemRepository itemRepository;

	@Autowired
	SaleRepository saleRepository;

	@Override
	public Sale createSale(SaleRegisterPostReq registerInfo) {

		Item item = itemRepository.findById(registerInfo.getItemId()).get();

		Optional<Sale> optional = saleRepository.findByFkItemIdAndSaleSellerAddress(item, registerInfo.getWalletAddress());

		if (optional.isPresent()) {
			saleRepository.delete(optional.get());
		}
		
		Sale sale = Sale.builder().saleContractAddress(registerInfo.getSaleContractAddress())
				.saleSellerAddress(registerInfo.getWalletAddress()).saleStartTime(registerInfo.getSaleStartTime())
				.saleEndTime(registerInfo.getSaleEndTime()).fkItemId(item).salePrice(registerInfo.getSalePrice())
				.build();

		return saleRepository.save(sale);
	}

	@Override
	public boolean deleteSale(SaleCancleDeleteReq cancleInfo) {
		Sale sale = saleRepository.findById(cancleInfo.getSaleId()).get();

		if (!sale.getSaleSellerAddress().equals(cancleInfo.getWalletAddress())) {
			return false;
		}

		saleRepository.delete(sale);

		return true;
	}

	@Override
	public List<SaleDto> getSaleList() {
		long now = Date.valueOf(LocalDate.now()).getTime();
		List<Sale> sales = saleRepository.findBySaleYnAndSaleEndTimeGreaterThanOrderBySaleCreatedAtDesc(0, now).orElse(new ArrayList<>());
		List<SaleDto> list = new ArrayList<SaleDto>();
		for (Sale sale : sales) {
			SaleDto dto = new SaleDto(sale);
			list.add(dto);
		}

		return list;
	}

	@Override
	public Sale updateSale(SaleCompletePutReq completeInfo) {
		Sale sale = saleRepository.findById(completeInfo.getSaleId()).get();

		sale.updateBuyerAddress(completeInfo.getSaleBuyerAddress());

		return saleRepository.save(sale);
	}

	@Override
	public SaleDto getSaleDetail(int saleNo) {
		Sale sale = saleRepository.findById(saleNo).get();

		return new SaleDto(sale);
	}

	@Override
	public List<SaleDto> getMySaleList(String userWalletAddress) {
		long now = Date.valueOf(LocalDate.now()).getTime();

		List<Sale> sales = saleRepository
				.findBySaleSellerAddressAndSaleYnAndSaleEndTimeGreaterThanOrderBySaleCreatedAtDesc(userWalletAddress, 0, now).orElse(null);
		List<SaleDto> list = new ArrayList<SaleDto>();

		for (Sale sale : sales) {
			SaleDto dto = new SaleDto(sale);
			list.add(dto);
		}

		return list;
	}
}
