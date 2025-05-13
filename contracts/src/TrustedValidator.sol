// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import {MessageHashUtils} from "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import {SignatureChecker} from "@openzeppelin/contracts/utils/cryptography/SignatureChecker.sol";

import { IValidator } from "./interfaces/IValidator.sol";

contract TrustedValidator is IValidator {
    address public trustedAddress;

    // Mapping to track validated submissions
    // questId => submissionId => user => isValid
    mapping(bytes32 => mapping(bytes32 => mapping(address => bool))) public validatedSubmissions;

    event SubmissionValidated(bytes32 indexed questId, bytes32 indexed submissionId, address indexed user);

    constructor(address _trustedAddress) {
        trustedAddress = _trustedAddress;
    }

    function validate(bytes32 questId, bytes32 submissionId, address user, bytes calldata signature) external view override returns (bool) {
        bytes memory message = abi.encodePacked(questId, submissionId, user);
        bytes32 digest = MessageHashUtils.toEthSignedMessageHash(message);

        return SignatureChecker.isValidSignatureNow(trustedAddress, digest, signature);
    }
}
