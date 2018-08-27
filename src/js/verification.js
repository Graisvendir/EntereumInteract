'use strict';

var BigNumber = require('bignumber.js');

/**
 * then open tab 'Verification'
 * show amount of money and addres for transact money
 */
function tryToOpenTab(){
	if (userSignedIn === undefined) {
		// becouse amount depends on user account 
		alert('Not logined!');
	} else {
		let promise = new Promise(function(onSuccess, onReject){
			openTab(event, 'verification');
			console.log(contractOwner);
			document.getElementById('verificationAmount').value = userSignedIn.id;
			document.getElementById('verificationAddress').value = contractOwner;
			onSuccess();
		}).then(() => {
			let blockNumberNow = 0;
			const onTimeout = function() {
				if(userSignedIn.address) {
					return;
				}
				web3.eth.getBlockNumber((error, result) => {
					blockNumberNow = result;
					getTransactionsOfAccount(contractOwner, blockNumberNow, blockNumberNow)
						.then(
							transactions => {
								for (let i = 0; i < transactions.length; i++) { 
									let bigTransact = (transactions[i].value) / 1000000000000000000; 
									console.log(bigTransact);
									if (bigTransact === userSignedIn.id) {
										userSignedIn.address = transactions[i].from;
										alert('verificated!');
										//App.transaction(userSignedIn.address, userSignedIn.id);
										//onSuccess(userSignedIn.address);
									}
								}
							}
						).then(success => {
							if (!userSignedIn.address)
								setTimeout(onTimeout, 10000);
							return success;
						}, error => {
							setTimeout(onTimeout, 10000);
							throw error;
						});
				});
			};
			onTimeout();
		});
	}
}


/*
		Verification plan
1. user send transaction with 
2. we take her
	1. wait new block
	2. check for amount(id) all transactions
	3. if it is, verificate user
	4. if time out, stop waiting
	5. else 2.1 point again
*/

/**
 * check all blocks from interval [startBlockNumber, endBlockNumber]
 * for transactions to/from account
 * @param {string} account that we reserch 
 * @param {number} startBlockNumber 
 * @param {number} endBlockNumber 
 */
function getTransactionsOfAccount(account, startBlockNumber, endBlockNumber){
	const blockPromises = [];
	//create array of promises, that store every transaction
	for (let i = startBlockNumber; i <= endBlockNumber; i++) {
		console.log("Searching block " + i);
		const blockPromise = new Promise((blockSuccess, blockError) => {
			web3.eth.getBlock(i, true, (error, block) => {
				if (error) {
					blockError(error);
					return;
				}
				if (!block || !block.transactions) {
					blockSuccess([]);
					return;
				}
				const accountTransactions = block.transactions
					.filter(transaction => account == transaction.from || account == transaction.to);
				console.log(accountTransactions);
					
				blockSuccess(accountTransactions);
				return accountTransactions;
			});
		});
		blockPromises.push(blockPromise);
		
	}

	return Promise.all(blockPromises)
		.then(transactions => transactions.reduce((acc, val) => acc.concat(val), []));
}