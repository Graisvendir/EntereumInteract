var App = {
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

		App.initContract();
	},
  
	initContract: function() {
		readTextFile('Entereum.json')
			.then(function(result) {
				var abi = JSON.parse(result);
				App.contracts.Entereum = TruffleContract(abi);
				App.contracts.Entereum.setProvider(App.web3Provider);
				document.getElementById("connection").innerHTML = "yes";
				console.log('Contract ABI was found, start to interact with him');
			});
	},
  
	getTotalSuply: function() {
		var entereumInstance;

		App.contracts.Entereum.deployed()
			.then(function(instance) {
				console.log('something');
				entereum = instance;
				document.getElementById("interact").innerHTML = "yes";
				var result = entereumInstance.totalSupply.call();
				document.getElementById("result").innerHTML = result;
				return result;
			}, function(err) {
				console.log('something');
				console.log(err.message);
				throw err;
			});
		console.log('something');
	},  
};  


function readTextFile(file){
	var promise = new Promise(function(onSuccess, onError){
		var rawFile = new XMLHttpRequest();
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