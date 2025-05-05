// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

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

    modifier onlyTrusted() {
        require(msg.sender == trustedAddress, "Only trusted address can call this function");
        _;
    }

    function validateSubmission(bytes32 questId, bytes32 submissionId, address user) external onlyTrusted {
        validatedSubmissions[questId][submissionId][user] = true;
        emit SubmissionValidated(questId, submissionId, user);
    }

    function validate(bytes32 questId, bytes32 submissionId, address user) external view override returns (bool) {
        return validatedSubmissions[questId][submissionId][user];
    }
}
