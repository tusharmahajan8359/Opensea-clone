const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CoreCollection & Market", async () => {
  let nft;
  let addr1;
  let addr2;
  let addr3;
  let market;

  //deploying contract
  beforeEach(async () => {
    const Market = await ethers.getContractFactory("Market");
    market = await Market.deploy();

    const NFT = await ethers.getContractFactory("CoreCollection");
    nft = await NFT.deploy(market.address);

    [addr1, addr2, addr3] = await ethers.getSigners();
  });

  it("should deploy contract successfully", async () => {
    await nft.deployed();
  });

  it("should create collection successfully", async () => {
    const name = "collection_1";
    const tx = await nft.createCollection(name);
    const reciept = await tx.wait();
    const events = reciept.events.find(
      (event) => event.event === "CollectionCreated"
    );
    const [_name, _collectionId] = events.args;
    expect(_name).to.equal("collection_1");
    expect(_collectionId).to.equal(1);
  });

  it("should create NFT and add it to the collection", async () => {
    const collectionName = "collection_1";
    await nft.createCollection(collectionName);
    const tx = await nft.createNFT(
      "My NFT",
      0,
      "http://test2.com",
      "http://test.com"
    );
    const reciept = await tx.wait();
    const events = reciept.events.find((event) => event.event === "NFTCreated");
    const [_itemId, _NFTName, _collection] = events.args;
    expect(_itemId).to.equal(1);
    expect(_NFTName).to.equal("My NFT");
  });

  it("should update the owner of the token after sending", async () => {
    const collectionName = "collection_1";
    await nft.createCollection(collectionName);
    await nft.createNFT("My NFT", 0, "http://test2.com", "http://test.com");
    expect(await nft.ownerOf(1)).to.equal(addr1.address);
    await market.sendNFT(1, addr2.address, nft.address);
    expect(await nft.ownerOf(1)).to.equal(addr2.address);
  });

  it("deploys Market Contract successfully", async () => {
    await market.deployed();
  });

  it("lists the NFT for Sale in Marketplace", async () => {
    const collectionName = "collection_1";
    await nft.createCollection(collectionName);
    await nft.createNFT("My NFT", 0, "http://test2.com", "http://test.com");

    await expect(
      market
        .connect(addr2)
        .createMarketItem(
          1,
          ethers.utils.parseUnits("1", "ether"),
          nft.address,
          { value: ethers.utils.parseEther("0.25") }
        )
    ).to.be.revertedWith("Function can only be called by the owner");

    const tx = await market.createMarketItem(
      1,
      ethers.utils.parseUnits("1", "ether"),
      nft.address,
      { value: ethers.utils.parseEther("0.25") }
    );
    const reciept = await tx.wait();
    const events = reciept.events.find((event) => event.event === "ItemListed");
    [_tokenId, _price] = events.args;
    expect(_price).to.equal(ethers.utils.parseUnits("1", "ether"));
  });

  it("Cancels NFT from listing", async () => {
    const collectionName = "collection_1";
    await nft.createCollection(collectionName);
    await nft.createNFT("My NFT", 0, "http://test2.com", "http://test.com");

    await expect(
      market.connect(addr2).cancelListing(1, nft.address)
    ).to.be.revertedWith("Function can only be called by the owner");

    await expect(market.cancelListing(1, nft.address)).to.be.revertedWith(
      "The item should be listed for sale"
    );
    await market.createMarketItem(
      1,
      ethers.utils.parseUnits("1", "ether"),
      nft.address,
      { value: ethers.utils.parseEther("0.25") }
    );
  });

  it("should buy NFT and update the Owner", async () => {
    const collectionName = "collection_1";
    await nft.createCollection(collectionName);
    await nft.createNFT("My NFT", 0, "http://test2.com", "http://test.com");

    await expect(
      market
        .connect(addr2)
        .buyNFT(1, nft.address, { value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("Cannot buy NFTs which are not listed for sale");

    await market.createMarketItem(
      1,
      ethers.utils.parseUnits("1", "ether"),
      nft.address,
      { value: ethers.utils.parseEther("0.25") }
    );

    await expect(
      market.buyNFT(1, nft.address, { value: ethers.utils.parseEther("1") })
    ).to.be.revertedWith("Function cannot be called by the Owner");

    await expect(
      market
        .connect(addr2)
        .buyNFT(1, nft.address, { value: ethers.utils.parseEther("2") })
    ).to.be.revertedWith("Must pay the listed price");

    const tx = await market
      .connect(addr2)
      .buyNFT(1, nft.address, { value: ethers.utils.parseEther("1") });

    const reciept = await tx.wait();
    const events = reciept.events.find(
      (event) => event.event === "MarketSaleCreated"
    );
    [_tokenId, _buyer] = events.args;

    expect(_buyer).to.equal(await nft.ownerOf(1));
  });

  it("creates offer for NFT", async () => {
    const collectionName = "collection_1";
    await nft.createCollection(collectionName);
    await nft.createNFT("My NFT", 0, "http://test2.com", "http://test.com");

    await market.createMarketItem(
      1,
      ethers.utils.parseUnits("1", "ether"),
      nft.address,
      { value: ethers.utils.parseEther("0.25") }
    );

    await expect(
      market.makeOffer(1, ethers.utils.parseUnits("0.5", "ether"), nft.address)
    ).to.be.revertedWith("Owner cannot make offers");

    await expect(
      market
        .connect(addr2)
        .makeOffer(1, ethers.utils.parseUnits("0.5", "ether"), nft.address, {
          value: ethers.utils.parseEther("0.25"),
        })
    ).to.be.revertedWith("Must pay the offer price mentioned by you");

    const tx = await market
      .connect(addr2)
      .makeOffer(1, ethers.utils.parseUnits("0.5", "ether"), nft.address, {
        value: ethers.utils.parseEther("0.5"),
      });
    expect(await market.offerStatus(1)).to.equal(true);
    expect(await market.offerIdToPrice(1)).to.equal(
      ethers.utils.parseUnits("0.5", "ether")
    );

    const reciept = await tx.wait();
    const events = await reciept.events.find(
      (event) => event.event === "OfferSent"
    );
    [_tokenId, _offerPrice] = events.args;
    expect(_tokenId).to.equal(1);
    expect(_offerPrice).to.equal(ethers.utils.parseUnits("0.5", "ether"));
  });

  it("cancels offer", async () => {
    const collectionName = "collection_1";
    await nft.createCollection(collectionName);
    await nft.createNFT("My NFT", 0, "http://test2.com", "http://test.com");

    await market.createMarketItem(
      1,
      ethers.utils.parseUnits("1", "ether"),
      nft.address,
      { value: ethers.utils.parseEther("0.25") }
    );

    await market
      .connect(addr2)
      .makeOffer(1, ethers.utils.parseUnits("0.5", "ether"), nft.address, {
        value: ethers.utils.parseEther("0.5"),
      });

    await expect(market.cancelOffer(1, 0, nft.address)).to.be.revertedWith(
      "Owner cannot cancel listing of someone's offer"
    );

    await expect(
      market.connect(addr3).cancelOffer(1, 0, nft.address)
    ).to.be.revertedWith("Unauthorized person trying to cancel the listing");

    await market.connect(addr2).cancelOffer(1, 0, nft.address);

    expect(await market.offerStatus(1)).to.equal(false);
  });

  it("Accepts offer for NFT", async () => {
    const collectionName = "collection_1";
    await nft.createCollection(collectionName);
    await nft.createNFT("My NFT", 0, "http://test2.com", "http://test.com");

    await market.createMarketItem(
      1,
      ethers.utils.parseUnits("1", "ether"),
      nft.address,
      { value: ethers.utils.parseEther("0.25") }
    );

    await market
      .connect(addr2)
      .makeOffer(1, ethers.utils.parseUnits("0.5", "ether"), nft.address, {
        value: ethers.utils.parseEther("0.5"),
      });

    await market
      .connect(addr3)
      .makeOffer(1, ethers.utils.parseUnits("0.7", "ether"), nft.address, {
        value: ethers.utils.parseEther("0.7"),
      });
    await expect(
      market.connect(addr2).acceptOffer(1, 0, nft.address)
    ).to.be.revertedWith("Only owner can accept the offer");

    await market.acceptOffer(1, 1, nft.address);

    expect(await nft.ownerOf(1)).to.equal(addr3.address);
  });

  it("Lowers the price of the NFT", async () => {
    const collectionName = "collection_1";
    await nft.createCollection(collectionName);
    await nft.createNFT("My NFT", 0, "http://test2.com", "http://test.com");

    await expect(
      market.lowerPrice(1, ethers.utils.parseUnits("0.1", "ether"), nft.address)
    ).to.be.revertedWith("The item should be listed for sale");

    await market.createMarketItem(
      1,
      ethers.utils.parseUnits("1", "ether"),
      nft.address,
      { value: ethers.utils.parseEther("0.25") }
    );

    await expect(
      market
        .connect(addr2)
        .lowerPrice(1, ethers.utils.parseUnits("0.1", "ether"), nft.address)
    ).to.be.revertedWith("The price only be lowered by the owner");

    await expect(
      market.lowerPrice(1, ethers.utils.parseUnits("2", "ether"), nft.address)
    ).to.be.revertedWith("Price should be lower than the current price");

    await market.lowerPrice(
      1,
      ethers.utils.parseUnits("0.5", "ether"),
      nft.address
    );

    expect(await market.idToPrice(1)).to.equal(ethers.utils.parseEther("0.5"));
  });

  // it("test", async () => {
  //   await nft.createCollection("sd");
  //   await nft.createCollection("sds");
  //   await nft.createCollection("sdss");
  //   const x = await nft.getCollectionIds(addr1.address)
  //   console.log(x);
  // })
});