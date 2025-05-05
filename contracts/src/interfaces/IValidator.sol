// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

interface IValidator {
    function validate(bytes32 questId, bytes32 submissionId, address user) external view returns (bool);
}