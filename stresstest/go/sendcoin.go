package main

import (
	"context"
	"crypto/ecdsa"
	"fmt"
	"strconv"
	"math/big"
	//"math/rand"
	//"sync"
	"io/ioutil"
        "os"
        "path/filepath"
	"time"

	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/core/types"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/ethclient"
	"github.com/ethereum/go-ethereum/accounts/keystore"
)


type accountS struct {
	key     *ecdsa.PrivateKey
	address common.Address
	nonce   uint64
	amount  *big.Int
        echoClient *ethclient.Client
	no	int
}

type goldMaster struct {
	address  *ecdsa.PrivateKey
	private  common.Address
	nonce   uint64
        echoClient *ethclient.Client
	no	int
}


var accountArray [10]common.Address

var ether = new(big.Int).Exp(big.NewInt(10), big.NewInt(18), nil)
var masterAddress = common.HexToAddress("0x5d58e421cac88df5665f27936ccbb5847dc302fd")
var masterPrivateKey, _= crypto.HexToECDSA("03809f2b28584a96d3f62d90bfb3ee7e0a71c0daaf8f68100158a4c4dfbe8ec0")

func (a *accountS) run(to common.Address) {
    nonce, _ := a.echoClient.PendingNonceAt(context.Background(), a.address)
    chainID := big.NewInt(5)
    coin := (big.NewInt)(1)
    coin.Mul(coin, ether)
    gasPrice, _ := a.echoClient.SuggestGasPrice(context.Background())
    for {
	tx := types.NewTransaction(nonce, to, ether, 37800, gasPrice, nil)
	signed, _ := types.SignTx(tx, types.NewEIP155Signer(chainID), a.key)
	err := a.echoClient.SendTransaction(context.Background(), signed)
	if err != nil {
	    fmt.Println("transactionStatus:  ", a.no, err, coin)
	    break
	}
    fmt.Println("transactionStatus:  ", a.no, coin)
	nonce++
    }
}

func (a *accountS)initAccount(no int) {
    var err error
    // Create ethclient
    a.no = no
    a.echoClient, err = ethclient.Dial("http://115.159.19.208:32000")
    if err != nil {
        panic(err)
        return
    }

    // Create a account
    workdir, err := ioutil.TempDir("", "")
    if err != nil {
        fmt.Println("Failed to create temporary work dir: %v", err)
    }
    defer os.RemoveAll(workdir)
    // Create an encrypted keystore with standard crypto parameters
    ks := keystore.NewKeyStore(filepath.Join(workdir, "keystore"), keystore.StandardScryptN, keystore.StandardScryptP)

    newAcc, err := ks.NewAccount("abc")
    if err != nil {
        fmt.Println("Failed to create new account: %v", err)
    }

    if err != nil {
            fmt.Println("Failed to export account: %v", err)
    }

    keyjson, err := ioutil.ReadFile(newAcc.URL.Path)
    if err != nil {
            fmt.Println("Failed to export account: %v", err)
    }

    key, err := keystore.DecryptKey(keyjson, "abc")
    if err != nil {
            fmt.Println("Failed to export account: %v", err)
    }
/*
    fmt.Println("DIR: ", newAcc.URL.Path)
    fmt.Println("address:", key.Address)
    fmt.Println("key:", key.PrivateKey)
*/
    a.key = key.PrivateKey
    a.address = key.Address



}

func (a *accountS)showMeTheMoney() {
    var err error
    nonce, _ := a.echoClient.PendingNonceAt(context.Background(), masterAddress)
    coin := a.amount
    coin.Mul(coin, ether)
    chainID := big.NewInt(5)
    gasPrice, _ := a.echoClient.SuggestGasPrice(context.Background())
    //gasPrice = big.NewInt(0)
    tx := types.NewTransaction(nonce, a.address, coin, 37800, gasPrice, nil)
    signed, _ := types.SignTx(tx, types.NewEIP155Signer(chainID), masterPrivateKey)
    err = a.echoClient.SendTransaction(context.Background(), signed)
    if err != nil {
	fmt.Println("Master account transactionStatus:", err)
	fmt.Println("Master account transactionStatus:  nonce1=", nonce)
    }else{
	fmt.Println("Show me the money sucessfully!\n", a.address)
    }
}

func main() {
    var i int
    var account [1000]accountS
    accountNum, _ := strconv.Atoi(os.Args[1])
    for i = 0; i < accountNum; i++ {
        account[i].initAccount(i)
	account[i].amount = big.NewInt(100)
	account[i].showMeTheMoney()
	time.Sleep(6 * time.Second)
    }
    time.Sleep (time.Duration(2)*time.Second)
    for i = 0; i < accountNum; i++ {
        go account[i].run(account[accountNum - i -1].address)
    }
    select{}
}

