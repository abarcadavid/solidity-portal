const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContract = await hre.ethers.deployContract("WavePortal");
  await waveContract.waitForDeployment();
  console.log("Contract deployed to:", waveContract.target);
  console.log("Contract deployed by: ", owner.address);

  await waveContract.getTotalWaves();

  const wavetxn = await waveContract.wave();
  await wavetxn.wait();

  await waveContract.getTotalWaves();

  const secondTxn = await waveContract.connect(randomPerson).wave();
  console.log("This is the secondTxn object: ", secondTxn);
  await secondTxn.wait();

  await waveContract.getTotalWaves();

};

main().catch((error) => {
  console.log(error);
  process.exit(1);
})