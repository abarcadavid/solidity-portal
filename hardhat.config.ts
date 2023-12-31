import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";
require("dotenv").config();

task("accounts", "Prints the list of accounts", async (taskargs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
})

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: process.env.STAGING_ALCHEMY_KEY!,
      accounts: [process.env.PRIVATE_KEY!],
    },
  }
};

export default config;
