const { expect } = require("chai");
const { ethers } = require("hardhat");

//uncomment the test function in CoreColletion.sol to test.

describe("NFT", async () => {
    let nft;
    let addr;
    
    //deploying contract
    beforeEach(async () => {
        const NFT = await ethers.getContractFactory("CoreCollection");
        nft = await NFT.deploy();
        addr = await ethers.getSigner();
    })
    it("should deploy contract successfully", async () => {
        await nft.deployed();
    })
    it("should create collection successfully", async () => {
        const name = "collection_1";
        await nft.createCollection(name);

        //checking the collection structure
        console.log(await nft.test());
    })
    it("should add nft token to a particular collection", async () => {
        const name = "collection_1";
        await nft.createCollection(name);
        await nft.createToken("http://test.com", 0);
        await nft.createToken("http://test.com", 0);
        await nft.createToken("http://test.com", 0);

        //checking the nft token ids added in the collection structure
        console.log(await nft.test());
    })
})