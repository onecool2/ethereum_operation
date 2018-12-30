// FILE: compileDeploy.js
console.log('Setting up...');
const fs = require ('fs');
const solc = require ('solc');
const Web3 = require ('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://115.159.19.208:32000"));
console.log('Reading Contract...');
const input = fs.readFileSync('./enb.sol');
console.log('Compiling Contract...');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':ENBToken'].bytecode;
const abi = output.contracts[':ENBToken'].interface;
//Compile contract
console.log('enb' + ': ' + bytecode)


//Contract Object
const helloWorldContract = new web3.eth.Contract(JSON.parse(abi)) //web3.eth.Contract(JSON.parse(abi));
console.log('unlocking Coinbase account');
const password = "abc";
try {
	web3.eth.personal.unlockAccount("0x5d58e421cac88df5665f27936ccbb5847dc302fd", password);
} catch(e) {
	console.log(e);
	return;
}

console.log("Deploying the contract");
const helloWorldContractInstance = helloWorldContract.deploy({
    data: '0x' + bytecode,
})
.send({
    from: "0x5d58e421cac88df5665f27936ccbb5847dc302fd",
    gas: 2000000, 
    //gasPrice: "111111111111111111" //For quorum chain the gasPrice must be set 0
})
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
});
