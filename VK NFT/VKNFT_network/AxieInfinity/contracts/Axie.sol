// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Axie is ERC721Enumerable, Ownable {
    using Strings for uint256;

    string public baseURI;
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant PRICE = 0.02 ether;
    bool public saleIsActive = false;

    constructor(string memory _baseURI) ERC721("Axie", "AXIE") {
        baseURI = _baseURI;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _newBaseURI) public onlyOwner {
        baseURI = _newBaseURI;
    }

    function flipSaleState() public onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function mint(uint256 _numberOfTokens) public payable {
        require(saleIsActive, "Sale is not active");
        require(_numberOfTokens <= 20, "Can only mint up to 20 tokens at a time");
        require(totalSupply() + _numberOfTokens <= MAX_SUPPLY, "Exceeds maximum supply");
        require(PRICE * _numberOfTokens == msg.value, "Ether value sent is not correct");

        for (uint256 i = 0; i < _numberOfTokens; i++) {
            uint256 tokenId = totalSupply();
            _safeMint(msg.sender, tokenId);
        }
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }
}
