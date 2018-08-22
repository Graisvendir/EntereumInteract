'use strict';

/**
 * then open tab 'Verification'
 * show amount of money and addres for transact money
 */
function tryToOpenTab(){
	if (userSignedIn === undefined){
		// becouse amount depends on user account 
		alert('Not logined!');
	} else {
		openTab(event, 'verification');
		document.getElementById('verificationAmount').value = userSignedIn.id;
		let accountOwner = document.getElementById('verificationAddress').value = web3.eth.accounts[0];
		let transactions = []; 
		transactions = getTransactionsByAccount(accountOwner)
		.then(
			(transactions) =>{
				for (let i = 0; i < transactions.length; i++){
					console.log("  tx hash          : " + transactions[i].hash + "\n"
						+ "   from            : " + transactions[i].from + "\n" 
						+ "   to              : " + transactions[i].to + "\n"
						+ "   value           : " + transactions[i].value + "\n");
				}
			}
		);
	}
}

/**
 * that show all transactions in interval
 * @param {string} account we are looking for
 */
function getTransactionsByAccount(account) {
	let promise = new Promise(function(onSuccess, onReject){
		
		let startBlockNumber;
		web3.eth.getBlockNumber((error, endBlockNumber) => {
			console.log("Using endBlockNumber: " + endBlockNumber);
			if (startBlockNumber == null) {
				startBlockNumber = endBlockNumber - 1000;
				if (startBlockNumber < 0)
					startBlockNumber = 0;
				console.log("Using startBlockNumber: " + startBlockNumber);
			}
			console.log("Searching for transactions to/from account \"" + account + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

			checkBlocks(account, startBlockNumber, endBlockNumber)
			.then(
				transactions => {
					onSuccess(transactions);
				}
			);
		});
	});
	return promise;
}

/**
 * check all blocks from interval [startBlockNumber, endBlockNumber]
 * for transactions to/from account
 * @param {string} account that we reserch 
 * @param {number} startBlockNumber 
 * @param {number} endBlockNumber 
 */
function checkBlocks(account, startBlockNumber, endBlockNumber){
	const blockPromises = [];
	//create array of promises, that store every transaction
	for (let i = startBlockNumber; i <= endBlockNumber; i++) {
		console.log("Searching block " + i);
		const blockPromise = new Promise((blockSuccess, blockError) => {
			web3.eth.getBlock(i, true, (error, block) => {
				if(error) {
					blockError(error);
					return;
				}

				if(!block || !block.transactions) {
					blockSuccess([]);
					return;
				}
				const accountTransactions = block.transactions
					.filter(transaction => account == transaction.from || account == transaction.to);
				blockSuccess(accountTransactions);
			});
		});
		blockPromises.push(blockPromise);
	}

	return Promise.all(blockPromises)
		.then(transactions => transactions.reduce((acc, val) => acc.concat(val), []));
}