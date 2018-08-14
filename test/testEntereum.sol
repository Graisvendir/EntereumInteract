pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Entereum.sol";

contract testEntereum {
	Entereum entereum = Entereum(DeployedAddresses.Entereum());

	function testUser() public {
		uint returned = entereum.totalSupply();

		uint expected = 500000000e18;

		Assert.equal(returned, expected, "Can take total suply.");
	}

}