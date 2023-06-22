// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

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
