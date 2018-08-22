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
		let promise = new Promise(function(onSuccess, onReject){
			openTab(event, 'verification');
			
			document.getElementById('verificationAmount').value = userSignedIn.id;
			let accountOwner = document.getElementById('verificationAddress').value = contractOwner;
			onSuccess();
		}).then(() => {
			let blockNumberNow = 0;
			while (!userSignedIn.address) {
				setTimeout(function(){
					web3.eth.getBlockNumber((error, result) => {
						blockNumberNow = result;
						getTransactionsOfAccount(account, blockNumberNow, blockNumberNow)
							.then(
								transactions => {
									for (let i = 0; i < transactions.length; i++){
										if (transactions[i].value === userSignedIn.id){
											userSignedIn.address = transactions[i].from;
											alert('verificated!');
											onSuccess(userSignedIn.address);
										}
									}
								}
							);
						console.log(blockNumberNow);
					});
				}, 10000);
			}
		});
	}
}

/*
1. user send transaction
2. we take her
	1. wait new transaction
	2. check for amount(id)
	3. if it is, verificate user
*/

/**
 * that show all transactions in interval from the end block
 * @param {string} account we are looking for
 * @param {number} interval count of blocks from end block
 */
function searchInInterval(account, interval) {
	let promise = new Promise(function(onSuccess, onReject){
		
		let startBlockNumber;
		web3.eth.getBlockNumber((error, endBlockNumber) => {
			startBlockNumber = endBlockNumber - interval;
			if (startBlockNumber < 0)
				startBlockNumber = 0;
			
			console.log("Searching for transactions to/from account \"" + account + "\" within blocks "  + startBlockNumber + " and " + endBlockNumber);

			getTransactionsOfAccount(account, startBlockNumber, endBlockNumber)
				.then(
					transactions => {
						onSuccess(transactions);
					}
				).catch(
					error => {
						onReject(error);
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
function getTransactionsOfAccount(account, startBlockNumber, endBlockNumber){
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