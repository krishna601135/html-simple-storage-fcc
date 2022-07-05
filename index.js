// In nodejs we are going to use "require" keyword to import the dependencies
// In frontend javascript we don't use "require" keyword
// using "import" keyword is much better than using "require" keyword in frontend
import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

// import Web3 from "web3";
// import Web3 from ethers;

const connectButton = document.getElementById("connectButton");
const storeButton = document.getElementById("storeButton");
const retrieveButton = document.getElementById("retrieveButton");
const storeValue = document.getElementById("storeValue");
const finalValue = document.getElementById("finalValue");

connectButton.onclick = connect;
//storeButton.onclick = store(favouriteNumber);
//retrieveButton.onclick = retrieve;

//console.log(ethers);

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        console.log("I see a metamask");
        await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        document.getElementById("connectButton").textContent = "Connected!";
    } else {
        document.getElementById("connectButton").textContent =
            "Please Install Metamask";
    }
}

// store function
let favouriteNumber;

storeButton.onclick = function getValue() {
    favouriteNumber = storeValue.value;
    store(favouriteNumber);
    console.log(favouriteNumber);
};

async function store(favouriteNumber) {
    if (typeof window.ethereum !== undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //console.log(signer);
        //await provider.send("eth_requestAccounts", []);
        const contract = new ethers.Contract(contractAddress, abi, signer);

        await contract.store(favouriteNumber);
        console.log(contract);
        console.log("this is working");
        //console.log(signer);

        //let favouriteNumber = storeValue.value;
        //console.log(favouriteNumber);
    }
    //provider / connection to the blockchain
    // signer / wallet / someone with some gas
    // contract that we are interacting with
    // ^ ABI Address
}

// retrieve function
retrieveButton.onclick = async function retrieve() {
    let favouriteNumber = storeValue.value;
    console.log(favouriteNumber);
    finalValue.textContent = favouriteNumber;
};