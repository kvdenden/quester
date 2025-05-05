// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import { Script, console } from "forge-std/Script.sol";
import { Quester } from "../src/Quester.sol";
import { TrustedValidator } from "../src/TrustedValidator.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CreateQuestScript is Script {
    function setUp() public {}

    function run() public {
        // Get the deployed contract addresses from environment variables
        address questerAddress = vm.envAddress("QUESTER_ADDRESS");
        address validatorAddress = vm.envAddress("VALIDATOR_ADDRESS");

        address wethAddress = vm.envAddress("WETH");

        // Get quest parameters from environment variables
        uint256 rewardAmount = vm.envUint("WETH_REWARD_AMOUNT");
        uint256 submissionLimit = vm.envUint("SUBMISSION_LIMIT");

        // Load the deployed contracts
        Quester quester = Quester(questerAddress);
        IERC20 weth = IERC20(wethAddress);

        // Start broadcasting transactions
        vm.startBroadcast();

        uint256 totalRewardAmount = rewardAmount * submissionLimit;

        // Using the WETH contract's deposit function which is payable
        // This is a common pattern for WETH contracts
        (bool success, ) = wethAddress.call{value: totalRewardAmount}("");
        require(success, "ETH to WETH conversion failed");

        weth.approve(address(quester), totalRewardAmount);

        // Create the quest
        bytes32 questId = quester.createQuest(
            validatorAddress,
            wethAddress,
            rewardAmount,
            submissionLimit
        );

        console.log("Created new quest with ID:", uint256(questId));

        vm.stopBroadcast();
    }
}