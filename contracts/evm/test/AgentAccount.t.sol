// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {Test} from "forge-std/Test.sol";
import {AgentAccount} from "../src/AgentAccount.sol";

contract Target {
    uint256 public value;

    function set(uint256 next) external payable {
        value = next;
    }
}

contract AgentAccountTest is Test {
    AgentAccount internal account;
    Target internal target;
    address internal owner = makeAddr("owner");
    address internal stranger = makeAddr("stranger");

    function setUp() public {
        account = new AgentAccount(owner);
        target = new Target();
        vm.deal(address(account), 1 ether);
    }

    function test_ownerIsSet() public view {
        assertEq(account.owner(), owner);
    }

    function test_revertOnZeroOwner() public {
        vm.expectRevert(AgentAccount.InvalidOwner.selector);
        new AgentAccount(address(0));
    }

    function test_ownerCanExecute() public {
        vm.prank(owner);
        account.execute(address(target), 0, abi.encodeCall(Target.set, (42)));
        assertEq(target.value(), 42);
    }

    function test_strangerCannotExecute() public {
        vm.prank(stranger);
        vm.expectRevert(AgentAccount.NotOwner.selector);
        account.execute(address(target), 0, abi.encodeCall(Target.set, (1)));
    }

    function test_revertOnZeroTarget() public {
        vm.prank(owner);
        vm.expectRevert(AgentAccount.InvalidTarget.selector);
        account.execute(address(0), 0, "");
    }

    function test_canSendValue() public {
        vm.prank(owner);
        account.execute(address(target), 0.1 ether, abi.encodeCall(Target.set, (7)));
        assertEq(address(target).balance, 0.1 ether);
        assertEq(target.value(), 7);
    }
}
