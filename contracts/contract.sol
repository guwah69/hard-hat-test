// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

// WhiteListing is a contract to set addess for whitelist purposes.
contract WhiteListing {
    address public owner;

    mapping(address => bool) public isWhiteListed;

    event memberAdded(address user, bool status);
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );
    
    constructor() {
        owner = msg.sender;
    } 

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    function addWhiteListMember(address _user) public onlyOwner {
        isWhiteListed[_user] = true;
        emit memberAdded(_user, true);
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        address oldOwner = owner;
        owner = _newOwner;
        emit OwnershipTransferred(oldOwner, _newOwner);
    }
}
