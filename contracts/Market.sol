//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IMarket} from "../interfaces/IMarket.sol";

contract Market is IMarket {
    uint256 private offerCount;

    //Listing Fees for the Market
    uint256 public listingFee = 0.25 ether;

    //Mapping from itemId to its status
    mapping(uint256 => bool) public idToOnSale;

    //mapping from itemId to its current price
    mapping(uint256 => uint256) public idToPrice;

    //mapping from itemId to its offerIds
    mapping(uint256 => uint256[]) public idToOffers;

    //mapping from offerId to its price
    mapping(uint256 => uint256) public offerIdToPrice;

    //mapping from offerId to the user
    mapping(uint256 => address) public offerIdToUser;

    //mapping from offerId to its current status (active/inactive)
    mapping(uint256 => bool) public offerStatus;

    // mapping(uint256 => mapping(address => uint256[])) public idToUserOffers;

    constructor() {}

    /**
     * @dev Event emitted when '_tokenId' is transfered from '_from' to '_to'
     * @param _from {address} address of the user from where the NFT is transfered
     * @param _to {address} address of the user to whom the NFT is Transfered
     * @param _tokenId {uint256} Token ID of the NFT which is being transfered
     */
    event TransferNFT(address _from, address _to, uint256 _tokenId);

    /**
     * @dev Event emitted when NFT with '_tokenId' is put for Listing
     * @param _tokenId {uint256} Token ID of the NFT which is being Listed
     * @param _price {uint256} The price at which the NFT is being Listed
     */
    event ItemListed(uint256 _tokenId, uint256 _price);

    /**
     * @dev Event emitted when NFT with '_tokenId' is removed from Listing by the owner
     * @param _tokenId {uint256} Token ID of the NFT which is canceled from Listing
     */
    event CancelListing(uint256 _tokenId);

    /**
     * @dev Event emitted when a '_buyer' buys NFT with token ID '_tokenId'
     * @param _tokenId {uint256} Token ID of the NFT which got sold
     * @param _buyer {address} Address of the buyer
     */
    event MarketSaleCreated(uint256 _tokenId, address _buyer);

    /**
     @dev Event emitted when the owner lowers the price to '_loweredPrice' of the NFT with Token ID '_tokenId'
     @param _tokenId {uint256} Token ID of the NFT whose price is lowered
     @param _loweredPrice {uint256} The lowered price set by the owner
     */
    event priceLowered(uint256 _tokenId, uint256 _loweredPrice);

    /**
     * @dev Event emitted when someone offers '_offerPrice' on NFT with ID '_tokenId'
     * @param _tokenId {uint256} Token ID to which the offer is being made
     * @param _offerPrice {uint256} The amount being offered to the NFT
     */
    event OfferSent(uint256 _tokenId, uint256 _offerPrice);

    /**
     * @dev Event emitted when owner accepts offer of '_offerPrice' on NFT with ID '_tokenId'
     * @param _tokenId {uint256} Token ID of the NFT which the owner accepted the offer
     * @param _offerPrice {uint256} The price at which the owner accepted the offer
     */
    event OfferAccepted(uint256 _tokenId, uint256 _offerPrice);

    /**
     * @dev Event Emitted when a user cancels its offer with ID '_offerId' on some NFT with '_tokenId'
     * @param _tokenId {uint256} Token ID of the NFT whose offer got canceled by a user
     * @param _offerId {uint256} Offer ID of the offer which got canceled.
     */
    event OfferCanceled(uint256 _tokenId, uint256 _offerId);

    /**
     * @dev Function to send NFT to someone else
     * @param _tokenId {uint256} Id of the NFT token to be transfered
     * @param _to {address} Address of the person to whom the token is to be transfered
     * @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function sendNFT(
        uint256 _tokenId,
        address _to,
        address _coreCollection
    ) internal {
        address _from = IERC721(_coreCollection).ownerOf(_tokenId);
        IERC721(_coreCollection).transferFrom(_from, _to, _tokenId);
        emit TransferNFT(_from, _to, _tokenId);
    }

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
    ) external payable override {
        require(
            msg.sender == IERC721(_coreCollection).ownerOf(_tokenId),
            "Function can only be called by the owner"
        );
        require(msg.value == listingFee, "Must pay the required Listing Fee");
        idToOnSale[_tokenId] = true;
        idToPrice[_tokenId] = _price;

        emit ItemListed(_tokenId, idToPrice[_tokenId]);
    }

    /**
     * @dev Function to cancel the listing of the NFT from Marketplace
     * @param _tokenId {uint256} Token ID of the NFT
     * @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function cancelListing(uint256 _tokenId, address _coreCollection)
        external
        override
    {
        require(
            msg.sender == IERC721(_coreCollection).ownerOf(_tokenId),
            "Function can only be called by the owner"
        );
        require(
            idToOnSale[_tokenId] == true,
            "The item should be listed for sale"
        );
        idToOnSale[_tokenId] = false;
        idToPrice[_tokenId] = 0;

        emit CancelListing(_tokenId);
    }

    /**
     * @dev Function to Buy NFT
     * @param _tokenId {uint256} Token ID of the NFT
     * @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function buyNFT(uint256 _tokenId, address _coreCollection)
        external
        payable
        override
    {
        uint256 _price = idToPrice[_tokenId];
        require(
            idToOnSale[_tokenId],
            "Cannot buy NFTs which are not listed for sale"
        );
        require(msg.value == _price, "Must pay the listed price");
        require(
            msg.sender != IERC721(_coreCollection).ownerOf(_tokenId),
            "Function cannot be called by the Owner"
        );
        payable(IERC721(_coreCollection).ownerOf(_tokenId)).transfer(msg.value);
        sendNFT(_tokenId, msg.sender, _coreCollection);
        idToOnSale[_tokenId] = false;
        idToPrice[_tokenId] = 0;

        emit MarketSaleCreated(_tokenId, msg.sender);
    }

    /**
     * @dev Function to Make an offer to a NFT
     * @param _tokenId {uint256} Token ID of the NFT
     * @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function makeOffer(
        uint256 _tokenId,
        uint256 _offerPrice,
        address _coreCollection
    ) external payable override {
        require(
            msg.sender != IERC721(_coreCollection).ownerOf(_tokenId),
            "Owner cannot make offers"
        );
        require(
            msg.value == _offerPrice,
            "Must pay the offer price mentioned by you"
        );

        offerCount++;

        idToOffers[_tokenId].push(offerCount);
        offerIdToPrice[offerCount] = _offerPrice;
        // idToUserOffers[_tokenId][msg.sender].push(offerCount);
        offerIdToUser[offerCount] = msg.sender;
        offerStatus[offerCount] = true;

        emit OfferSent(_tokenId, _offerPrice);
    }

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
    ) external override {
        require(
            msg.sender == IERC721(_coreCollection).ownerOf(_tokenId),
            "Only owner can accept the offer"
        );
        uint256 _offerId = idToOffers[_tokenId][_offerIndex];
        address _buyer = offerIdToUser[_offerId];
        payable(msg.sender).transfer(offerIdToPrice[_offerId]);

        //return the remaining offer balance to respective owners
        for (uint256 i = 0; i < idToOffers[_tokenId].length; i++) {
            uint256 offerId = idToOffers[_tokenId][i];
            if (offerId != _offerId) {
                address user = offerIdToUser[offerId];
                payable(user).transfer(offerIdToPrice[offerId]);
            }
            offerStatus[offerId] = false;
        }

        idToOnSale[_tokenId] = false;
        idToPrice[_tokenId] = 0;
        sendNFT(_tokenId, _buyer, _coreCollection);

        emit OfferAccepted(_tokenId, offerIdToPrice[_offerId]);
    }

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
    ) external override {
        require(
            msg.sender != IERC721(_coreCollection).ownerOf(_tokenId),
            "Owner cannot cancel listing of someone's offer"
        );

        uint256 _offerId = idToOffers[_tokenId][_offerIndex];
        require(
            msg.sender == offerIdToUser[_offerId],
            "Unauthorized person trying to cancel the listing"
        );
        offerStatus[_offerId] = false;

        emit OfferCanceled(_tokenId, _offerId);
    }

    /**
     @dev This Function lowers the price of the NFT which is listed for sale
     @param _tokenId {uint256} Token ID of the NFT whose price is lowered
     @param _loweredPrice {uint256} The lowered price set by the owner
     @param _coreCollection {address} Address of the CoreCollection Contract
     */
    function lowerPrice(
        uint256 _tokenId,
        uint256 _loweredPrice,
        address _coreCollection
    ) external override {
        require(
            idToOnSale[_tokenId] == true,
            "The item should be listed for sale"
        );
        require(
            _loweredPrice < idToPrice[_tokenId],
            "Price should be lower than the current price"
        );
        require(
            msg.sender == IERC721(_coreCollection).ownerOf(_tokenId),
            "The price only be lowered by the owner"
        );
        idToPrice[_tokenId] = _loweredPrice;

        emit priceLowered(_tokenId, _loweredPrice);
    }
}
