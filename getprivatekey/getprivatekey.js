// npm install keythereum
// node getprivatekey.js
// datadir 是keystore的上一层目录， address是公钥地址， password是keystore的密码
var keythereum = require("keythereum");
 
var datadir = "./key";

var address= "0x90cf9d8ac4213a5d76e60d0a7adaf3870140e184";//要小写
const password = "123";
var keyObject = keythereum.importFromFile(address, datadir);
var privateKey = keythereum.recover(password, keyObject);
console.log(privateKey.toString('hex'));

