package com.sea.domain.sale.service;

import java.util.List;

import com.sea.domain.sale.db.entity.Sale;
import com.sea.domain.sale.dto.SaleDto;
import com.sea.domain.sale.request.SaleCancleDeleteReq;
import com.sea.domain.sale.request.SaleCompletePutReq;
import com.sea.domain.sale.request.SaleRegisterPostReq;
import com.sea.domain.user.db.entity.User;

public interface SaleService {

	Sale createSale(SaleRegisterPostReq registerInfo);

	boolean deleteSale(SaleCancleDeleteReq cancleInfo);

	List<SaleDto> getSaleList();

	Sale updateSale(SaleCompletePutReq completeInfo);

	SaleDto getSaleDetail(int saleNo);

	List<SaleDto> getMySaleList(String userWalletAddress);
}