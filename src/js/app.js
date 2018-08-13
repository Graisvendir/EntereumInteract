var web3Provider = null;
var contracts = {};

function work() {	

	initWeb3()

	if (web3 != undefined) {
		document.getElementById("connection").innerHTML = "yes";
	}
	// Read JSON contract ABI
	readTextFile('/js/Entereum.json')
		.then(function(result){
			var EntereumArtifact = result;
			contracts.Entereum = TruffleContract(EntereumArtifact);
			contracts.Entereum.setProvider(web3Provider);
			// Work with him
			var entereumInstance;

			contracts.Entereum.deployed().then(function(instance) {
				document.getElementById("deploying").innerHTML = "yes";
				entereumInstance = instance;
				return entereumInstance.totalSupply.call();
			}, function(err){
				console.log(err.message);
				throw err;
			});
		});
}

function initWeb3(){
	// Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
		web3Provider = web3.currentProvider;
	} else {
		// If no injected web3 instance is detected, fall back to Ganache
		web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545');
	}
	web3 = new Web3(web3Provider);
}


function readTextFile(file){
	var promise = new Promise(function(onSuccess, onError){
		var rawFile = new XMLHttpRequest();
		var json;
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