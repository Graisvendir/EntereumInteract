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

	constructor(_email, _userName, _password){
		this.email = _email;
		this.userName = _userName;
		this.password = _password;
		this.publicKey;
	}

}

let userBase = [];
let userLog;
let userPass;

function getUp(){
	let promise = new Promise(function(onSuccess, onReject){
		let _email = document.getElementById('emailUp').value;
		let _userName = document.getElementById('username').value;
		let _password = document.getElementById('passwordUp').value;
		let aPassword = document.getElementById('aPassword').value;
		if (_password === aPassword){
			onSuccess(new user(_email, _userName, _password));
		} else {
			onReject(console.log('not correct password'));
		}
	});
	return promise;
}

function singIn(){
	let _email = document.getElementById('email').value;
	let _password = document.getElementById('password').value;
	let i;
	for (i = 0; i < userBase.length; i++){
		if (userBase[i].email === _email && userBase[i].password === _password)
			break;
	}
	if (i < userBase.length){
		userLog = userBase[i].email;
		userPass = userBase[i].password;
	} else {
		alert('Wrong e-mail or password');
	}
}

function singUp(){
	getUp().then(function(_user){
		document.getElementById('signUpSuccess').innerHTML = 'V';
		userBase.push(_user);
	})
}
