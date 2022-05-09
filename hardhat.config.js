require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: "https://eth-rinkeby.alchemyapi.io/v2/FSsjOult7gPh332c1a3t620Tk12G5nGG",
      accounts: [
        "76d59038c5927432cf63ba6a8f3e807859042d55e88c8ca79b4a726b37788a34",
      ],
    },
  },
  paths: {
    artifacts: "./src/artifacts",
  },
};
