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
      url: "https://eth-rinkeby.alchemyapi.io/v2/cK1cPdbVIAv4dDHVmQSERSVmjtv87AdG",
      accounts: ["91b8ec250adc54eff4ace16eee55ed092481d9ec5ab6c54eb3393ac25c88e374"]
    },
  },
  paths: {
    artifacts: "./src/artifacts",
  },
};
