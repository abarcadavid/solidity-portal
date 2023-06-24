const main = async () => {
  const [deployer] = await hre.ethers.getSigners();

  console.log("This is the deployer of the contract: ", deployer);
  const deployerAddress = await deployer.getAddress();

  const balance = await deployer.provider.getBalance(deployerAddress);
  console.log("This is the balance on the deployer: ", balance.toString());

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({value: hre.ethers.parseEther("0.1")});
  await waveContract.waitForDeployment();
  console.log("WavePortal Contract Address: ", waveContract.target);
}

main().catch((error) => {
  console.log(error);
  process.exit(1);
})