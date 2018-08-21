'use strict';

function tryToOpenTab(){
	if (userSignedIn === undefined){
		alert('Not logined!');
	} else {
		openTab(event, 'verification');
		document.getElementById('verificationAmount').value = userSignedIn.id;
		let accountOwner = document.getElementById('verificationAddress').value = web3.eth.accounts[0];
		getTransactionsByAccount(accountOwner);
	}
}

function getTransactionsByAccount(myaccount, startBlockNumber, endBlockNumber) {
	if (endBlockNumber == null) {
		endBlockNumber = web3.eth.getBlockNumber((error, endBlockNumber) => {

	
			console.log("Using endBlockNumber: " + endBlockNumber);
			if (startBlockNumber == null) {
				startBlockNumber = endBlockNumber - 1000;
				if (startBlockNumber < 0)
					startBlockNumber = 0;
				console.log("Using startBlockNumber: " + startBlockNumber);
			}
			console.log("Searching for transactions to/from account \"" + myaccount + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

			for (let i = startBlockNumber; i <= endBlockNumber; i++) {
				if (i % 1000 == 0) {
					console.log("Searching block " + i);
				}
				let block = web3.eth.getBlock(i, true, (error, block) => {
					if (block != null && block.transactions != null) {
						block.transactions.forEach( function(e) {
							if (myaccount == "*" || myaccount == e.from || myaccount == e.to) {
								console.log("  tx hash          : " + e.hash + "\n"
									+ "   nonce           : " + e.nonce + "\n"
									+ "   blockHash       : " + e.blockHash + "\n"
									+ "   blockNumber     : " + e.blockNumber + "\n"
									+ "   transactionIndex: " + e.transactionIndex + "\n"
									+ "   from            : " + e.from + "\n" 
									+ "   to              : " + e.to + "\n"
									+ "   value           : " + e.value + "\n"
									+ "   time            : " + block.timestamp + " " + new Date(block.timestamp * 1000).toGMTString() + "\n"
									+ "   gasPrice        : " + e.gasPrice + "\n"
									+ "   gas             : " + e.gas + "\n"
									+ "   input           : " + e.input);
							}
						})
					}
				});
			}

		});
	}
}