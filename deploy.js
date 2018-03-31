const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3'); 
const { interface, bytecode } = require('./compile');


const provider = new HDWalletProvider(
	// mnemonic
	'knife tattoo hockey casual tooth pact nerve spawn direct coil ranch there',
	// infura link
	'https://rinkeby.infura.io/iCrFspZKafS0ikzy0a09'
);

const web3 = new Web3(provider); // use this web3 instance to deploy the contract

// wrap deploy inside a function so WE CAN USE ASYNC AWAIT
const deploy = async () => {
	const accounts = await web3.eth.getAccounts();

	console.log('Attempting to deploy from account ' + accounts[0])

	const result = await new web3.eth.Contract(JSON.parse(interface))
		.deploy({ data: bytecode })
		.send({ gas: '1000000', from: accounts[0] });


	console.log('Contract deployed to ', result.options.address); // log the string of the returned address when deployed
};
deploy();





// beforeEach(() => {

// })

