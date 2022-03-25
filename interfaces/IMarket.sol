//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

interface IMarket {
    /**
     * @dev Function to List NFT for sale
     * @param _tokenId {uint256} Token ID of the NFT
     * @param _price {uint256} Price to be set for the NFT
     * @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function createMarketItem(
        uint256 _tokenId,
        uint256 _price,
        address _coreCollection
    ) external payable;

    /**
     * @dev Function to cancel the listing of the NFT from Marketplace
     * @param _tokenId {uint256} Token ID of the NFT
     * @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function cancelListing(uint256 _tokenId, address _coreCollection) external;

    /**
     * @dev Function to Buy NFT
     * @param _tokenId {uint256} Token ID of the NFT
     * @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function buyNFT(uint256 _tokenId, address _coreCollection) external payable;

    /**
     * @dev Function to Make an offer to a NFT
     * @param _tokenId {uint256} Token ID of the NFT
     * @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function makeOffer(
        uint256 _tokenId,
        uint256 _offerPrice,
        address _coreCollection
    ) external payable;

    /**
     * @dev Function to accept the offer on a NFT owned
     * @param _tokenId {uint256} Token ID of the NFT
     * @param _offerIndex {uint256} Index of offers array returned from the mapping
     * @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function acceptOffer(
        uint256 _tokenId,
        uint256 _offerIndex,
        address _coreCollection
    ) external;

    /**
     * @dev This function cancels an offer provided to some NFT by the user.
     * @param _tokenId {uint256} Token ID of the NFT
     * @param _offerIndex {uint256} Index of offers array returned from the mapping
     * @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function cancelOffer(
        uint256 _tokenId,
        uint256 _offerIndex,
        address _coreCollection
    ) external;

    /**
     @dev This Function lowers the price of the NFT which is listed for sale
     @param _tokenId {uint256} Token ID of the NFT
     @param _loweredPrice {uint256} The lowered price set by the owner
     @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function lowerPrice(
        uint256 _tokenId,
        uint256 _loweredPrice,
        address _coreCollection
    ) external;
}
