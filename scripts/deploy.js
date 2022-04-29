const hre = require("hardhat");
// let corecollectionAddress;
async function main() {
  const NFT = await hre.ethers.getContractFactory("CoreCollection");
  const Market = await hre.ethers.getContractFactory("Market");

  const market = await Market.deploy();
  const nft = await NFT.deploy(market.address);

  await nft.deployed();

  console.log("Market deployed to:", market.address);
  console.log("CoreCollection deployed to:", nft.address);
  // corecollectionAddress = nft.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
// export { corecollectionAddress };
