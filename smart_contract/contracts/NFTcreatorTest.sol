// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./token/ERC721/ERC721.sol";
import "./token/ERC721/extensions/ERC721Enumerable.sol";
import "./access/Ownable.sol";

/**
 * PJT Ⅰ - 과제 2) NFT Creator 구현
 * 상태 변수나 함수의 시그니처는 구현에 따라 변경할 수 있습니다.
 */
contract NFTcreator is ERC721Enumerable, Ownable {

    uint constant public MAX_TOKEN_COUNT = 1;//동일한 이름과 데이터로는 1개만 생성가능하다.
    uint public mint_price = 0 ether;

    string public metadataURI;

    //contract를 호출할 때 이름과 메타데이터의 주소를 입력받는다.
    constructor(string memory _name,string memory _metadataURI) ERC721(_name, "reth") {
        metadataURI = _metadataURI;
    }

    //해당 함수로 지정된 금액을 입금하고 NFT를 구매한다.(기부와 동일한 개념)
    function mintToken() public payable {
    // mintToken() 을 실행할 때 이더를 지급하게끔 한다. CA에게 이더를 지급해서 NFT를 사는 개념.
 
        require(msg.value >= mint_price,"no");
        require(MAX_TOKEN_COUNT > ERC721Enumerable.totalSupply(),"yes");
 
        uint tokenId = ERC721Enumerable.totalSupply() + 1;
        // 총발행량 + 1 로 tokenId 값 형성
 
        // CA -> 컨트랙트 배포자 계정으로 지급받은 이더 전송
        payable(Ownable.owner()).transfer(msg.value);
 
        // mintToken() 을 호출한 계정에게 NFT 발행
        _mint(msg.sender, tokenId);
        
    }
    
}
