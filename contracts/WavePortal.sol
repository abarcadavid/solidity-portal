// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;

    constructor() payable {
        console.log("Contract was built...");
    }

    // Event will store arguements into transaction log. This notifies
    // external users(frontend) that a change has occured on the blockchain
    // when we decided to 'emit' this event
    event newWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; // Address of the person who waved
        uint256 timestamp; // Timestamp of transaction
        string message; // Message the waver included
    }

    // Store all of Waves in our contract
    Wave[] waves;

    function wave(string memory _message) public {
        // Increase total number of waves
        totalWaves += 1;

        // Store the Wave into the Wave array
        waves.push((Wave(msg.sender, block.timestamp, _message)));

        // There's a chance for a user that waved to receive some ether
        // Generate a seed to determine if user gets a prize
        seed = (block.timestamp * block.prevrandao) % 100;
        if (seed <= 90) {
            uint256 prizeAmount = 0.0001 ether;
            // Check if we have enough funds to give out prize money
            require(
                address(this).balance >= prizeAmount,
                "Contract balance too low to give prize amount"
            );

            // Attempt to give prize amount
            (bool success, ) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        // After changing the blockchain, we will emit a signal to our frontend
        // and let it know that the smart contract has updated it's state
        emit newWave(msg.sender, block.timestamp, _message);
    }

    function getWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }
}
