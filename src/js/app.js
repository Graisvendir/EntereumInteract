let App = {
	web3Provider: null,
	contracts: {},

	initWeb3: function() {
		// Is there an injected web3 instance?
		if (typeof web3 !== 'undefined') {
			App.web3Provider = web3.currentProvider;
			console.log('Web3 Provider was found, take him');
		} else {
			// If no injected web3 instance is detected, fall back to Ganache
			App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
			console.log('Web3 Provider was not found, create Http Provider on http://127.0.0.1:8545');
		}
		web3 = new Web3(App.web3Provider);
		document.getElementById("connection").innerHTML = "yes";
		App.initContract();
	},
  
	initContract: function() {
		readTextFile('Entereum.json')
			.then(function(result) {
				let abi = JSON.parse(result);
				App.contracts.Entereum = TruffleContract(abi);
				App.contracts.Entereum.setProvider(App.web3Provider);
				document.getElementById("interact").innerHTML = "yes";
				console.log('Contract ABI was found, start to interact with him');
			});
	},
  
	/**
	 * get total suply of coin
	 */
	getTotalSuply: function() {
		let entereumInstance;
		App.contracts.Entereum.deployed()
			.then(function(instance) {
				entereumInstance = instance;
				return entereumInstance.totalSupply.call();
			}).then(function(enter) {
				let entCoin = enter;
				document.getElementById("result").innerHTML = entCoin;
				console.log(entCoin);
			}), function(err) {
				console.log('something wrong(');
				console.log(err.message);
				throw err;
			};
	},

	/**
	 * make transaction
	 */
	transaction: function() {
		let entereumInstance;
		//console.log(App.contracts.Entereum);
		App.contracts.Entereum.deployed()
			.then(function(instance) {
				entereumInstance = instance;
				let to = document.getElementById('to').value;
				let value = parseInt(document.getElementById('value').value);
				return entereumInstance.transfer(to, value);
			}).then(function(enter) {
				document.getElementById("transactSuccess").innerHTML = 'Success';
				console.log('Transaction Success');
			}), function(err) {
				console.log(err.message);
				throw err;
			};
	}
};  


function readTextFile(file){
	let promise = new Promise(function(onSuccess, onError){
		let rawFile = new XMLHttpRequest();
		rawFile.open("GET", file, true);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4){
				onSuccess(rawFile.responseText);
			}
		}
		rawFile.send();
	});

	return promise;
}