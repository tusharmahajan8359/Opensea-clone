//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface ICoreCollection {
    /**
     * @dev function to mint NFT Token
     * @param _tokenURI {string} IPFS URI
     */
    // function createToken(string memory _tokenURI, address _creator) external returns (uint256);

    /**
     * @dev function to create a new collection
     * @param _name {string} name of the collection
     */
    function createCollection(string memory _name) external;

    /**
     * @dev function to create a new NFT and add it to the collection
     * @param _NFTName {string} name for the NFT
     * @param _collectionId {uint256} id of the user's collections
     * @param _externalLink {string} link to view NFT image
     * @param _tokenURI {string} tokenURI of the NFT token
     */
    function createNFT(
        string memory _NFTName,
        uint256 _collectionId,
        string memory _externalLink,
        string memory _tokenURI
    ) external;
}