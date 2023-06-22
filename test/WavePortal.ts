import { expect } from "chai";
import { ethers } from "hardhat";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";

describe("WavePortal Contract Tests", function() {
  // A fixture allows us to reuse the same contract setup in every test.
  // We run the contract setup once, snapshot the state,
  // and then reset Hardhat Network to that snapshot in every test
  async function deployWavePortalFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const wavePortalContract: any = await ethers.deployContract("WavePortal");
    await wavePortalContract.waitForDeployment();

    return { wavePortalContract, owner, otherAccount }
  }

  describe("Deployment", function() {
    it("Should set the right owner", async function() {
      const { wavePortalContract, owner } = await loadFixture(deployWavePortalFixture);
      expect(wavePortalContract.runner!.address).to.equal(owner.address);
    })
  });

  describe("Correct Data", function() {
    it("Should Increase the Number of Waves", async function() {
      const { wavePortalContract } = await loadFixture(deployWavePortalFixture);

      expect(await wavePortalContract.getTotalWaves()).to.equal(0);
      await wavePortalContract.wave("Hello");
      expect(await wavePortalContract.getTotalWaves()).to.equal(1);
    });

    it("Should return the waves array", async function() {
      const { wavePortalContract } = await loadFixture(deployWavePortalFixture);
      expect(await wavePortalContract.getWaves()).to.have.lengthOf(0);
      await wavePortalContract.wave("Stored messaged");
      expect(await wavePortalContract.getWaves()).to.have.lengthOf(1);
    })
  })

  describe("Emit Events", function() {
    it("Should emit the Wave event triggered by Owner", async function() {
      const { wavePortalContract, owner } = await loadFixture(deployWavePortalFixture);
      const message = 'Hello';
      await expect(wavePortalContract.wave(message))
        .to.emit(wavePortalContract, "newWave")
        .withArgs(owner.address, time.latest, message);
    });

    it("Should emit the Wave event triggered by random person", async function() {
      const { wavePortalContract, otherAccount } = await loadFixture(deployWavePortalFixture);
      const message = "Test String";
      await expect(wavePortalContract.connect(otherAccount).wave(message))
        .to.emit(wavePortalContract, "newWave")
        .withArgs(otherAccount.address, time.latest, message);
    });
    
  });

})