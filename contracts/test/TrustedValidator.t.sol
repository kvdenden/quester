// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import "forge-std/Test.sol";
import "../src/TrustedValidator.sol";

contract TrustedValidatorTest is Test {
    TrustedValidator validator;
    address trustedAddress;
    uint256 trustedKey;

    address user;
    address nonTrustedAddress;

    bytes32 questId;
    bytes32 submissionId;

    function setUp() public {
        (trustedAddress, trustedKey) = makeAddrAndKey("trusted");

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
        bytes memory signature = _generateSignature(questId, submissionId, user);

        assertTrue(validator.validate(questId, submissionId, user, signature));
    }

    function test_UnvalidatedSubmission() public {
        assertFalse(validator.validate(questId, submissionId, user, ''));
    }

    function test_DifferentSubmissionNotValidated() public {
        bytes memory signature = _generateSignature(questId, submissionId, user);

        bytes32 differentSubmissionId = keccak256("differentSubmission");
        assertFalse(validator.validate(questId, differentSubmissionId, user, signature));
    }

    function test_DifferentUserNotValidated() public {
        bytes memory signature = _generateSignature(questId, submissionId, user);

        address differentUser = makeAddr("differentUser");
        assertFalse(validator.validate(questId, submissionId, differentUser, signature));
    }

    function test_DifferentQuestNotValidated() public {
        bytes memory signature = _generateSignature(questId, submissionId, user);

        bytes32 differentQuestId = keccak256("differentQuest");
        assertFalse(validator.validate(differentQuestId, submissionId, user, signature));
    }

    function _generateSignature(bytes32 questId_, bytes32 submissionId_, address user_) public view returns (bytes memory) {
        bytes memory message = abi.encodePacked(questId_, submissionId_, user_);
        bytes32 digest = MessageHashUtils.toEthSignedMessageHash(message);
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(trustedKey, digest);
        bytes memory signature = abi.encodePacked(r, s, v);
        return signature;
    }
}