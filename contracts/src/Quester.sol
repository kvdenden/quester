// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { IValidator } from "./interfaces/IValidator.sol";

contract Quester {
  struct Quest {
    address creator;
    address validator;
    address rewardToken;
    uint256 rewardAmount;
    uint256 submissionLimit;
    uint256 submissionCount;
  }

  event QuestCreated(address indexed creator, bytes32 questId);
  event RewardClaimed(address indexed user, bytes32 questId, bytes32 submissionId);

  mapping(bytes32 => Quest) public quests;
  mapping(bytes32 => mapping(bytes32 => bool)) public submissions;

  uint256 private _nonce;

  using SafeERC20 for IERC20;

  function createQuest(address validator, address rewardToken, uint256 rewardAmount, uint256 submissionLimit) public returns (bytes32 questId) {
    questId = keccak256(abi.encodePacked(msg.sender, _nonce++));

    quests[questId] = Quest({
      creator: msg.sender,
      validator: validator,
      rewardToken: rewardToken,
      rewardAmount: rewardAmount,
      submissionLimit: submissionLimit,
      submissionCount: 0
    });

    IERC20(rewardToken).safeTransferFrom(msg.sender, address(this), rewardAmount * submissionLimit);

    emit QuestCreated(msg.sender, questId);
  }

  function getQuest(bytes32 questId) public view returns (Quest memory) {
    return quests[questId];
  }

  function claimReward(bytes32 questId, bytes32 submissionId) public {
    Quest storage quest = quests[questId];

    require(quest.creator != address(0), "Quest does not exist");
    require(quest.submissionCount < quest.submissionLimit, "Quest submission limit reached");
    require(!submissions[questId][submissionId], "Submission already claimed");
    require(IValidator(quest.validator).validate(questId, submissionId, msg.sender), "Submission is invalid");

    quest.submissionCount++;
    submissions[questId][submissionId] = true;

    IERC20(quest.rewardToken).safeTransfer(msg.sender, quest.rewardAmount);

    emit RewardClaimed(msg.sender, questId, submissionId);
  }
}
