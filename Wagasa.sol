// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

event FishMinted(address indexed owner, uint256 indexed tokenId, string tokenURI);

contract FISH is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;
    bool public hasSaleStarted = true;
    uint public constant MAX_FISH = 1024;
    mapping(uint256 => bytes32) private _tokenHashes;

    constructor()
        ERC721("Bok", "BOK")
        Ownable(msg.sender)
    {}

    function calculatePrice() public pure returns (uint256) {
        return 0.000001 ether; // Price is set to 0.000001 ether per fish
    }

    function mintFish(uint256 tokenId, string memory uri, bytes32 tokenHash) public payable {
        require(hasSaleStarted, "Sale has not started yet");
        require(totalSupply() < MAX_FISH, "Sale has already ended");
        require(msg.value == calculatePrice(), "Ether value sent is below the price");
        require(tokenId == _nextTokenId, "Token ID does not match the expected next token ID");
        
        _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        _tokenHashes[tokenId] = tokenHash;
        emit FishMinted(msg.sender, tokenId, uri);
    }

    function getTokenHash(uint256 tokenId) public view returns (bytes32) {
    require(tokenId <= totalSupply(), "Token ID does not exist");
    return _tokenHashes[tokenId];
}


    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // VIEW Functions

    // OnlyOwner Functions

    function startDrop() public onlyOwner {
        hasSaleStarted = true;
    }

    function pauseDrop() public onlyOwner {
        hasSaleStarted = false;
    }

    function withdrawAll() public onlyOwner {
        (bool success, ) = msg.sender.call{value: address(this).balance}("");
        require(success, "Withdrawal failed");
    }
}


