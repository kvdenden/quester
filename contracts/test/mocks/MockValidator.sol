// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import { IValidator } from "../../src/interfaces/IValidator.sol";

contract MockValidator is IValidator {
    bool public validationResult = true;

    function setValidationResult(bool _validationResult) public {
        validationResult = _validationResult;
    }

    function validate(bytes32 /* questId */, bytes32 /* submissionId */, address /* user */) external view returns (bool) {
        return validationResult;
    }
}