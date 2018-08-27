'use strict';

function getTotalSupply() {
	App.getTotalSuply()
		.then(
			(supply) => {
				document.getElementById("result").innerHTML = supply;
			}
		);
}

function transaction() {
	entereumInstance = instance;
	let to = document.getElementById('to').value;
	let value = parseInt(document.getElementById('value').value);
	App.transaction(to, value)
		.then(
			() => {
				document.getElementById("transactSuccess").innerHTML = 'Success';
			}
		);
}

function balanceOf() {
	let balanceAddress = document.getElementById("balanceOf").value;
	App.balanceOf(balanceAddress)
		.then(
			(balance) => {
				document.getElementById("balance").innerHTML = balance;
			}
		);
}