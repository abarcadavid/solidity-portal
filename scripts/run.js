const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const waveContract = await hre.ethers.deployContract("WavePortal");
  await waveContract.waitForDeployment();

  console.log("Contract deployed to:", waveContract.target);
  console.log("Contract deployed by: ", owner.address);

  // Test getTotalWaves() function
  await waveContract.getTotalWaves();

  // Test wave() function. This should Increase Wave Count by 1,
  // In addition, waves = [{address, timestamp, message}]
  const wavetxn = await waveContract.wave("hello world");
  await wavetxn.wait();

  // Check waves[] to see if wave was successfully stored
  const wavearr = await waveContract.getWaves();
  console.log('ARRAY: ', wavearr);

};

main().catch((error) => {
  console.log(error);
  process.exit(1);
})