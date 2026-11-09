// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {AgentAccount} from "../src/AgentAccount.sol";

contract DeployAgentAccount is Script {
    function run() external returns (AgentAccount account) {
        address owner = vm.envOr("ACCOUNT_OWNER", msg.sender);
        vm.startBroadcast();
        account = new AgentAccount(owner);
        vm.stopBroadcast();
    }
}
