// FILE: compileDeploy.js
console.log('Setting up...');
const fs = require ('fs');
const solc = require ('solc');
const Web3 = require ('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://115.159.19.208:32000"));
console.log('Reading Contract...');
const input = fs.readFileSync('./yun_gui.sol');
console.log('Compiling Contract...');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts[':CupboardContract'].bytecode;
const abi = output.contracts[':CupboardContract'].interface;
//Compile contract
console.log('abi=' + ': ' + abi)

var web3_version = "0.20"
console.log(web3_version != '1.0')
if (web3_version != 1.0) {
        //Contract Object for web3.js <1.0
        const helloWorldContract =  web3.eth.contract(JSON.parse(abi));
        console.log('unlocking Coinbase account');
        const password = "abc";
        try {
            web3.personal.unlockAccount("0x5d58e421cac88df5665f27936ccbb5847dc302fd", password, 600);
} catch(e) {
        console.log(e);
        return;
}

console.log("Deploying the contract");
//var contractInstance = MyContract.new([constructorParam1] [, constructorParam2], {data: '0x12345...', from: myAccount, gas: 1000000});
    var helloWorldContractInstance = helloWorldContract.new({
        data: '0x' + bytecode,
        from: "0x5d58e421cac88df5665f27936ccbb5847dc302fd",
        gas: 8000000,
        //gasPrice: "111111111111111111" //For quorum chain the gasPrice must be set 0
    })
//.then(function(newContractInstance){
    console.log(helloWorldContractInstance.transactionHash) // instance with the new contract address
//              });

}else{
        console.log('web version = 1.0')
        //Contract Object for web3js > 1.0

        const helloWorldContract = new web3.eth.Contract(JSON.parse(abi)) //web3.eth.Contract(JSON.parse(abi));
        console.log('unlocking Coinbase account');
        const password = "abc";
        try {
                web3.eth.personal.unlockAccount("0x5d58e421cac88df5665f27936ccbb5847dc302fd", password, 600);
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
gas: 8000000,
//gasPrice: "111111111111111111" //For quorum chain the gasPrice must be set 0
})
.then(function(newContractInstance){
                console.log(newContractInstance.options.address) // instance with the new contract address
                });
}
