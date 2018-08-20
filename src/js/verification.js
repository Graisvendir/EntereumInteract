'use strict';

function tryToOpenTab(){
    if (userSignedIn === undefined){
        alert('Not logined!');
    } else {
        openTab(event, 'verification');
        document.getElementById('verificationAmount').value = userSignedIn.id;
        document.getElementById('verificationAddress').value = web3.eth.accounts[0];
        
    }
}