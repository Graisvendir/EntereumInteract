'use strict';

class user{

	constructor(_email, _userName, _password){
		this.email = _email;
		this.userName = _userName;
		this.password = _password;
		this.publicKey;
	}

}

let userBase;

function getElements(){
	_email = document.getElementById('email').value;
	_userName = document.getElementById('username').value;
	_password = document.getElementById('password').value;
	aPassword = document.getElementById('aPassword').value;
}

function singIn(){

}

function singUp(){
	getElements().then(function(){
		if (_password === aPassword){
			document.getElementById('signUpSuccess').innerHTML = V;
		}
	})
}
