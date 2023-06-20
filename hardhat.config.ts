import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-ethers";


const config: HardhatUserConfig = {
  solidity: "0.8.18",
};

export default config;