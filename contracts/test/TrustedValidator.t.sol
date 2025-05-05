// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "forge-std/Test.sol";
import "../src/TrustedValidator.sol";

contract TrustedValidatorTest is Test {
    TrustedValidator validator;
    address trustedAddress;
    address user;
    address nonTrustedAddress;

    bytes32 questId;
    bytes32 submissionId;

    function setUp() public {
        trustedAddress = makeAddr("trusted");
        user = makeAddr("user");
        nonTrustedAddress = makeAddr("nonTrusted");

        questId = keccak256("testQuest");
        submissionId = keccak256("testSubmission");

        validator = new TrustedValidator(trustedAddress);
    }

    function test_InitialTrustedAddress() public {
        assertEq(validator.trustedAddress(), trustedAddress);
    }

    function test_ValidateSubmission() public {
        vm.prank(trustedAddress);
        validator.validateSubmission(questId, submissionId, user);

        assertTrue(validator.validate(questId, submissionId, user));
    }

    function test_NonTrustedCannotValidate() public {
        vm.prank(nonTrustedAddress);
        vm.expectRevert("Only trusted address can call this function");
        validator.validateSubmission(questId, submissionId, user);
    }

    function test_UnvalidatedSubmission() public {
        assertFalse(validator.validate(questId, submissionId, user));
    }

    function test_DifferentSubmissionNotValidated() public {
        vm.prank(trustedAddress);
        validator.validateSubmission(questId, submissionId, user);

        bytes32 differentSubmissionId = keccak256("differentSubmission");
        assertFalse(validator.validate(questId, differentSubmissionId, user));
    }

    function test_DifferentUserNotValidated() public {
        vm.prank(trustedAddress);
        validator.validateSubmission(questId, submissionId, user);

        address differentUser = makeAddr("differentUser");
        assertFalse(validator.validate(questId, submissionId, differentUser));
    }

    function test_DifferentQuestNotValidated() public {
        vm.prank(trustedAddress);
        validator.validateSubmission(questId, submissionId, user);

        bytes32 differentQuestId = keccak256("differentQuest");
        assertFalse(validator.validate(differentQuestId, submissionId, user));
    }
}