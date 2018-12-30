// FILE: compileDeploy.js
console.log('Setting up...');
const fs = require ('fs');
const solc = require ('solc');
const Web3 = require ('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://115.159.19.208:32000"));
console.log('Reading Contract...');
const input = fs.readFileSync('./cupboard.sol');
console.log('Compiling Contract...');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':CupboardContract'].bytecode;
const abi = output.contracts[':CupboardContract'].interface;
//Compile contract
console.log('enb' + ': ' + abi)


//Contract Object
/*
const helloWorldContract = new web3.eth.Contract(JSON.parse(abi)) //web3.eth.Contract(JSON.parse(abi));
console.log('unlocking Coinbase account');
const password = "abc";
try {
	web3.eth.personal.unlockAccount("0xd0120b7710aff606ff4e240059cd6b224bf07496", password, 100);
} catch(e) {
	console.log(e);
	return;
}
*/
var privateKey = new Buffer('5fc4469528d3b8a9fb50a1294624b08513dea8064cfec17ef8c853eff5bb6b8a', 'hex')

console.log("Deploying the contract");
var rawTx = {
  nonce: '0x00',
  gasLimit: '0x271000',
  data: '0x' + bytecode
}
var Tx = require('ethereumjs-tx');
var tx = new Tx(rawTx);
tx.sign(privateKey);
console.log("Singed the contract");

var serializedTx = tx.serialize();
console.log("serializedTx  the contract");

//console.log("serializedTx  the contract", serializedTx.toString('hex'));
web3.eth.sendRawTransaction('0x'+serializedTx.toString('hex'), function(err, hash) {
  if (!err)
    console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385" 
  else
    console.log(err);
});
/*
const helloWorldContractInstance = helloWorldContract.deploy({
    data: '0x' + bytecode,
})
.send({
    from: "0x3f1d095f1293d5b2a14ee5c885984779b01a1052",
    gas: 2000000, 
    gasPrice: "111111111111111111"
})
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
});
*/
