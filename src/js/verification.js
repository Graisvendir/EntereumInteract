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

function findTrasaction(){
    //wait new transaction on our address
    let subscription = web3.eth.subscribe('pendingTransactions', function(error, result){
        if (!error){
            console.log(result);
        }
    })
    .on("data", function(transaction){
        console.log(transaction);
        
    });
    
    // unsubscribes the subscription
    subscription.unsubscribe(function(error, success){
        if(success)
            console.log('Successfully unsubscribed!');
    });
}