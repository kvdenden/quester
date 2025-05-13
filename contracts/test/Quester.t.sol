// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import { Test, console } from "forge-std/Test.sol";
import { Quester } from "../src/Quester.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { MockERC20 } from "./mocks/MockERC20.sol";
import { MockValidator } from "./mocks/MockValidator.sol";

contract QuesterTest is Test {
  Quester public quester;
  MockERC20 public rewardToken;
  MockValidator public validator;
  address public creator;

  function setUp() public {
    quester = new Quester();
    rewardToken = new MockERC20("Test Token", "TEST");
    validator = new MockValidator();
    creator = address(this);
  }

  function test_CreateQuest() public {
    // Setup
    uint256 rewardAmount = 1000;
    uint256 submissionLimit = 10;
    uint256 totalRewardAmount = rewardAmount * submissionLimit;

    // Mint tokens to creator
    rewardToken.mint(creator, totalRewardAmount);
    rewardToken.approve(address(quester), totalRewardAmount);

    // Create quest
    bytes32 questId = quester.createQuest(
      address(validator),
      address(rewardToken),
      rewardAmount,
      submissionLimit
    );

    // Verify quest was created correctly
    Quester.Quest memory quest = quester.getQuest(questId);
    _assertQuestProperties(
      quest,
      creator,
      address(validator),
      address(rewardToken),
      rewardAmount,
      submissionLimit,
      0
    );

    // Verify tokens were transferred to contract
    assertEq(rewardToken.balanceOf(address(quester)), totalRewardAmount, "Contract should hold total reward amount");
    assertEq(rewardToken.balanceOf(creator), 0, "Creator should have no tokens left");
  }

  function test_CreateQuest_InsufficientAllowance() public {
    // Setup
    uint256 rewardAmount = 1000;
    uint256 submissionLimit = 10;

    // Mint tokens but don't approve
    rewardToken.mint(creator, rewardAmount * submissionLimit);

    // Should revert due to insufficient allowance
    vm.expectRevert();
    quester.createQuest(
      address(validator),
      address(rewardToken),
      rewardAmount,
      submissionLimit
    );
  }

  function test_CreateQuest_InsufficientBalance() public {
    // Setup
    uint256 rewardAmount = 1000;
    uint256 submissionLimit = 10;

    // Don't mint any tokens
    rewardToken.approve(address(quester), rewardAmount * submissionLimit);

    // Should revert due to insufficient balance
    vm.expectRevert();
    quester.createQuest(
      address(validator),
      address(rewardToken),
      rewardAmount,
      submissionLimit
    );
  }

  function test_GetQuest() public {
    // Setup
    uint256 rewardAmount = 1000;
    uint256 submissionLimit = 10;

    // Create quest
    bytes32 questId = _createQuest(rewardAmount, submissionLimit);

    // Test successful quest retrieval
    Quester.Quest memory quest = quester.getQuest(questId);
    _assertQuestProperties(
      quest,
      creator,
      address(validator),
      address(rewardToken),
      rewardAmount,
      submissionLimit,
      0
    );
  }

  function test_ClaimReward() public {
    // Setup
    uint256 rewardAmount = 1000;
    uint256 submissionLimit = 2;
    address user = address(0x123);

    // Create quest
    bytes32 questId = _createQuest(rewardAmount, submissionLimit);

    // Setup validator to accept the submission
    bytes32 submissionId = keccak256("valid-submission");
    validator.setValidationResult(true);

    // Claim reward
    vm.prank(user);
    quester.claimReward(questId, submissionId, '');

    // Verify quest state
    Quester.Quest memory quest = quester.getQuest(questId);
    _assertQuestProperties(
      quest,
      creator,
      address(validator),
      address(rewardToken),
      rewardAmount,
      submissionLimit,
      1
    );

    // Verify user received reward
    assertEq(rewardToken.balanceOf(user), rewardAmount, "User should receive reward");
    assertEq(rewardToken.balanceOf(address(quester)), rewardAmount, "Contract should have remaining rewards");
  }

  function test_ClaimReward_NonExistentQuest() public {
    // Setup
    bytes32 nonExistentQuestId = keccak256("non-existent");
    bytes32 submissionId = keccak256("submission");

    // Should revert with "Quest does not exist"
    vm.expectRevert("Quest does not exist");
    quester.claimReward(nonExistentQuestId, submissionId, '');
  }

  function test_ClaimReward_SubmissionLimitReached() public {
    // Setup
    uint256 rewardAmount = 1000;
    uint256 submissionLimit = 1;
    address user1 = address(0x123);
    address user2 = address(0x456);

    // Create quest
    bytes32 questId = _createQuest(rewardAmount, submissionLimit);

    // Setup validator to accept submissions
    validator.setValidationResult(true);

    // First claim should succeed
    vm.prank(user1);
    quester.claimReward(questId, keccak256("submission1"), '');

    // Second claim should fail
    vm.prank(user2);
    vm.expectRevert("Quest submission limit reached");
    quester.claimReward(questId, keccak256("submission2"), '');
  }

  function test_ClaimReward_DuplicateSubmission() public {
    // Setup
    uint256 rewardAmount = 1000;
    uint256 submissionLimit = 2;
    address user = address(0x123);

    // Create quest
    bytes32 questId = _createQuest(rewardAmount, submissionLimit);

    // Setup validator to accept the submission
    bytes32 submissionId = keccak256("submission");
    validator.setValidationResult(true);

    // First claim should succeed
    vm.prank(user);
    quester.claimReward(questId, submissionId, '');

    // Second claim with same submission ID should fail
    vm.prank(user);
    vm.expectRevert("Submission already claimed");
    quester.claimReward(questId, submissionId, '');
  }

  function test_ClaimReward_InvalidSubmission() public {
    // Setup
    uint256 rewardAmount = 1000;
    uint256 submissionLimit = 1;
    address user = address(0x123);

    // Create quest
    bytes32 questId = _createQuest(rewardAmount, submissionLimit);

    // Setup validator to reject the submission
    bytes32 submissionId = keccak256("submission");
    validator.setValidationResult(false);

    // Claim should fail due to invalid submission
    vm.prank(user);
    vm.expectRevert("Submission is invalid");
    quester.claimReward(questId, submissionId, '');
  }

  // Helper functions

  function _setupTokens(uint256 rewardAmount, uint256 submissionLimit) private returns (uint256 totalRewardAmount) {
    totalRewardAmount = rewardAmount * submissionLimit;
    rewardToken.mint(creator, totalRewardAmount);
    rewardToken.approve(address(quester), totalRewardAmount);
  }

  function _createQuest(uint256 rewardAmount, uint256 submissionLimit) private returns (bytes32 questId) {
    _setupTokens(rewardAmount, submissionLimit);

    questId = quester.createQuest(
      address(validator),
      address(rewardToken),
      rewardAmount,
      submissionLimit
    );
  }

  function _assertQuestProperties(
    Quester.Quest memory quest,
    address expectedCreator,
    address expectedValidator,
    address expectedRewardToken,
    uint256 expectedRewardAmount,
    uint256 expectedSubmissionLimit,
    uint256 expectedSubmissionCount
    ) private pure {
    assertEq(quest.creator, expectedCreator, "Creator address mismatch");
    assertEq(quest.validator, expectedValidator, "Validator address mismatch");
    assertEq(quest.rewardToken, expectedRewardToken, "Reward token address mismatch");
    assertEq(quest.rewardAmount, expectedRewardAmount, "Reward amount mismatch");
    assertEq(quest.submissionLimit, expectedSubmissionLimit, "Submission limit mismatch");
    assertEq(quest.submissionCount, expectedSubmissionCount, "Submission count mismatch");
  }
}
