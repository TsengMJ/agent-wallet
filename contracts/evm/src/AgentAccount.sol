// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title AgentAccount
/// @notice Placeholder smart account for the agentic wallet.
/// @dev Next stage: ERC-4337 `IAccount`, session keys, and spend policy.
contract AgentAccount {
    address public owner;

    error NotOwner();
    error InvalidOwner();
    error InvalidTarget();
    error CallFailed(bytes returnData);

    event OwnerUpdated(address indexed previous, address indexed next);
    event Executed(address indexed target, uint256 value, bytes data);

    modifier onlyOwner() {
        if (msg.sender != owner) revert NotOwner();
        _;
    }

    constructor(address owner_) {
        if (owner_ == address(0)) revert InvalidOwner();
        owner = owner_;
        emit OwnerUpdated(address(0), owner_);
    }

    receive() external payable {}

    function transferOwnership(address next) external onlyOwner {
        if (next == address(0)) revert InvalidOwner();
        emit OwnerUpdated(owner, next);
        owner = next;
    }

    function execute(address target, uint256 value, bytes calldata data)
        external
        onlyOwner
        returns (bytes memory)
    {
        if (target == address(0)) revert InvalidTarget();
        emit Executed(target, value, data);
        (bool ok, bytes memory ret) = target.call{value: value}(data);
        if (!ok) revert CallFailed(ret);
        return ret;
    }
}
