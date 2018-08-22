'use strict';

/**
 * 1. registrate new user
 * 2. sign in
 * 3. verification:
 * 		1. generate amount
 * 		2. take transaction, add address to blockchain
 * 		3. bind address to user account
 * 4. deposit
 */


class user{

	constructor(_email, _userName, _password, _id){
		this.email = _email;
		this.userName = _userName;
		this.password = _password;
		this.id = _id;
	}
}

// local base of users
let userBase = [];
//remember signed in user
let userSignedIn;

let contractOwner = web3.eth.accounts[0];

/**
 * get information about new user from inputs
 */
function getUp(){
	let promise = new Promise(function(onSuccess, onReject){
		let _email = document.getElementById('emailUp').value;
		let _userName = document.getElementById('username').value;
		let _password = document.getElementById('passwordUp').value;
		let aPassword = document.getElementById('aPassword').value;
		if (_password === aPassword){
			onSuccess(new user(_email, _userName, _password, userBase.length + 2));
		} else {
			onReject(console.log('not correct password'));
		}
	});
	return promise;
}

/**
 * check input data and data from base
 * if it there, then remember it
 */
function singIn(){
	let _email = document.getElementById('email').value;
	let _password = document.getElementById('password').value;
	let i;
	for (i = 0; i < userBase.length; i++){
		if (userBase[i].email === _email && userBase[i].password === _password)
			break;
	}
	if (i < userBase.length){
		userSignedIn = userBase[i];
		console.log(userSignedIn);
	} else {
		alert('Wrong e-mail or password');
	}
}

/**
 * push new user to base
 */
function singUp(){
	getUp().then(function(_user){
		document.getElementById('signUpSuccess').innerHTML = 'V';
		userBase.push(_user);
		console.log('signed up');
	})
}
