// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract WavePortal {
    uint256 totalWaves;

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

        // After changing the blockchain, we will emit a signal to our frontend
        // and let it know that the smart contract has updated it's state
        emit newWave(msg.sender, block.timestamp, _message);

        // Everyone who waves will receieve a prize amount of eth
        uint256 prizeAmount = 0.0001 ether;

        // We must require that the balance of the contract is > than prize amount
        // If contract has less than prize amount, print error message.
        require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
        );

        // Require that the user who made wave() call is successful in receiving prize
        (bool success, ) = (msg.sender).call{value: prizeAmount}("");
        require(success, "Failed to withdraw money from the contract.");
    }

    function getWaves() public view returns (Wave[] memory) {
        return waves;
    }

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }
}
