const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();

  const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
  const waveContract = await waveContractFactory.deploy({value: hre.ethers.parseEther("0.1")});
  await waveContract.waitForDeployment();

  const contractBalance = await hre.ethers.provider.getBalance(waveContract.target);
  console.log('Contract Balance: ', hre.ethers.formatEther(contractBalance));

  console.log("Contract deployed to:", waveContract.target);
  // console.log("Contract has balance: ", hre.ethers.provider.getBalance(waveContract.target));
  console.log("Contract deployed by: ", owner.address);

  // Test getTotalWaves() function
  await waveContract.getTotalWaves();

  // Test wave() function. This should Increase Wave Count by 1,
  // In addition, waves = [{address, timestamp, message}]
  const wavetxn = await waveContract.wave("hello world");
  await wavetxn.wait();
  const updatedContractBalance = await hre.ethers.provider.getBalance(waveContract.target);
  console.log('Contract Balance After Txn: ', hre.ethers.formatEther(updatedContractBalance));

  // Check waves[] to see if wave was successfully stored
  const wavearr = await waveContract.getWaves();
  console.log('ARRAY: ', wavearr);

  const secondtxn = await waveContract.connect(randomPerson).wave("Bonjour!");
  await secondtxn.wait();

  const newWaveArray = await waveContract.getWaves();
  console.log('UPDATED ARRAY: ', newWaveArray);
};

main().catch((error) => {
  console.log(error);
  process.exit(1);
})