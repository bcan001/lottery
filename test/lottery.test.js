const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // capitalize because Web3 is a constructor function
const provider = ganache.provider();
const web3 = new Web3(provider);

const { interface, bytecode } = require('../compile'); // interface = abi, bytecode = raw bytecode

// LOTTERY CONTRACT CODE BELOW:

// initialize variables
let lottery;
let accounts;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	lottery = await new web3.eth.Contract(JSON.parse(interface)) // teaches web3 about what methods a lottery contract has (has to be json object)
		.deploy({ 
			data: bytecode
		}).send({
			from: accounts[0],
			gas: '1000000'
		});
});

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  });

  // what to test? what behavior do you really care about in this contract?
  // test whether an account is allowed to enter the lottery
	it ('allows one account to enter', async () => {
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei('0.02', 'ether') // returns equivalent amount of wei
		});

		const players = await lottery.methods.getPlayers().call({
			from: accounts[0]
		});

		assert.equal(accounts[0], players[0]);
		assert.equal(1, players.length);
	});


	it ('allows multiple accounts to enter', async () => {
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei('0.02', 'ether') // returns equivalent amount of wei
		});
		await lottery.methods.enter().send({
			from: accounts[1],
			value: web3.utils.toWei('0.02', 'ether') // returns equivalent amount of wei
		});
		await lottery.methods.enter().send({
			from: accounts[2],
			value: web3.utils.toWei('0.02', 'ether') // returns equivalent amount of wei
		});

		const players = await lottery.methods.getPlayers().call({
			from: accounts[0]
		});

		assert.equal(accounts[0], players[0]);
		assert.equal(accounts[1], players[1]);
		assert.equal(accounts[2], players[2]);
		assert.equal(3, players.length);
	});

	it('requires a minimum amount of ether to enter', async () => {
		try {
			await lottery.methods.enter().send({
				from: accounts[0],
				value: 0
			});
			assert(false); // always fails the test no matter what
		} catch (err) {
			assert(err);
		}
	});

	it('only manager can call pickWinner', async () => {
		try {
			await lottery.methods.pickWinner().send({
				from: accounts[1]
			});
			assert(false);
		} catch (err) {
			assert(err);
		}
	});

	it('sends money to the winner and resets the players array', async () => {
		await lottery.methods.enter().send({
			from: accounts[0],
			value: web3.utils.toWei('2','ether')
		});

		const initialBalance = await web3.eth.getBalance(accounts[0]);

		await lottery.methods.pickWinner().send({ from: accounts[0] });

		const finalBalance = await web3.eth.getBalance(accounts[0]);

		const difference = finalBalance - initialBalance;
		console.log(finalBalance - initialBalance);
		assert(difference > web3.utils.toWei('1.8', 'ether'));

	});

});


























// // INBOX TESTS BELOW:
// // REAL CODE:
// let accounts;
// let inbox;


// beforeEach(async () => {
// 	// Get a list of all accounts
// 	accounts = await web3.eth.getAccounts();

// 	// Use one of those accounts to deploy the contract
// 	// inbox is the JAVASCRIPT REPRESENTATION OF THE CONTRACT ON THE BLOCKCHAIN. WHAT WE WILL BE TESTING.
// 	inbox = await new web3.eth.Contract(JSON.parse(interface)) // teaches web3 about what methods an inbox contract has (has to be json object)
// 		.deploy({ 
// 			data: bytecode, 
// 			arguments: ['Hi there!'] 
// 		}) // tells web3 that we want to deploy a new copy of this contract (arguments are 1 to 1 connection to Inbox.sol)
// 		.send({ from: accounts[0], gas: '1000000' }) // instructs web3 to send out a transaction that creates this contract


// 	// ADD THIS ONE LINE RIGHT HERE!!!!! <---------------------
//   inbox.setProvider(provider);
// });


// describe('Inbox', () => {
// 	it('deploys a contract', () => {
// 		// console.log(inbox);
// 		assert.ok(inbox.options.address); // if inbox.options.address is a truthy value (a string), it will pass
// 	});

// 	it('has a default message', async () => {
// 		// call a method to our ibox function. methods.message() calls the message function of the inbox instance
// 		const message = await inbox.methods.message().call();
// 		assert.equal(message, 'Hi there!');
// 	});

// 	// test if we can change the message
// 	it('can change the message', async () => {
// 		await inbox.methods.setMessage('changed message').send({ from: accounts[0] }); // .send() the transaction to the network
// 		const message = await inbox.methods.message().call();
// 		assert.equal(message, 'changed message');
// 	});
// });





// logged out inbox js object:
// Inbox
// (node:70368) MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 data listeners added. Use emitter.setMaxListeners() to increase limit
// Contract {
//   currentProvider: [Getter/Setter],
//   _requestManager: 
//    RequestManager {
//      provider: 
//       l {
//         domain: null,
//         _events: [Object],
//         _eventsCount: 1,
//         _maxListeners: undefined,
//         options: [Object],
//         engine: [s],
//         manager: [s],
//         sendAsync: [Function: bound ],
//         send: [Function: bound ],
//         close: [Function: bound ],
//         _queueRequest: [Function: bound ],
//         _processRequestQueue: [Function: bound ],
//         _requestQueue: [],
//         _requestInProgress: false },
//      providers: 
//       { WebsocketProvider: [Function: WebsocketProvider],
//         HttpProvider: [Function: HttpProvider],
//         IpcProvider: [Function: IpcProvider] },
//      subscriptions: {} },
//   givenProvider: null,
//   providers: 
//    { WebsocketProvider: [Function: WebsocketProvider],
//      HttpProvider: [Function: HttpProvider],
//      IpcProvider: [Function: IpcProvider] },
//   _provider: 
//    l {
//      domain: null,
//      _events: { data: [Array] },
//      _eventsCount: 1,
//      _maxListeners: undefined,
//      options: 
//       { vmErrorsOnRPCResponse: true,
//         verbose: false,
//         asyncRequestProcessing: false,
//         logger: [Object],
//         seed: '6e6AIC5CcD',
//         mnemonic: 'calm stamp dirt hard glimpse wrong anchor keep unique velvet again organ',
//         network_id: 1521820717109,
//         total_accounts: 10,
//         gasPrice: '0x4A817C800',
//         default_balance_ether: 100,
//         unlocked_accounts: [],
//         hdPath: 'm/44\'/60\'/0\'/0/',
//         gasLimit: '0x6691b7',
//         defaultTransactionGasLimit: '0x15f90',
//         time: null,
//         debug: false },
//      engine: 
//       s {
//         domain: null,
//         _events: [Object],
//         _eventsCount: 1,
//         _maxListeners: 100,
//         _blockTracker: [c],
//         _ready: [c],
//         currentBlock: [Object],
//         _providers: [Array],
//         manager: [s] },
//      manager: 
//       s {
//         state: [StateManager],
//         options: [Object],
//         initialized: true,
//         initialization_error: null,
//         post_initialization_callbacks: [],
//         engine: [s],
//         currentBlock: [Object] },
//      sendAsync: [Function: bound ],
//      send: [Function: bound ],
//      close: [Function: bound ],
//      _queueRequest: [Function: bound ],
//      _processRequestQueue: [Function: bound ],
//      _requestQueue: [],
//      _requestInProgress: false },
//   setProvider: [Function],
//   BatchRequest: [Function: bound Batch],
//   extend: 
//    { [Function: ex]
//      formatters: 
//       { inputDefaultBlockNumberFormatter: [Function: inputDefaultBlockNumberFormatter],
//         inputBlockNumberFormatter: [Function: inputBlockNumberFormatter],
//         inputCallFormatter: [Function: inputCallFormatter],
//         inputTransactionFormatter: [Function: inputTransactionFormatter],
//         inputAddressFormatter: [Function: inputAddressFormatter],
//         inputPostFormatter: [Function: inputPostFormatter],
//         inputLogFormatter: [Function: inputLogFormatter],
//         inputSignFormatter: [Function: inputSignFormatter],
//         outputBigNumberFormatter: [Function: outputBigNumberFormatter],
//         outputTransactionFormatter: [Function: outputTransactionFormatter],
//         outputTransactionReceiptFormatter: [Function: outputTransactionReceiptFormatter],
//         outputBlockFormatter: [Function: outputBlockFormatter],
//         outputLogFormatter: [Function: outputLogFormatter],
//         outputPostFormatter: [Function: outputPostFormatter],
//         outputSyncingFormatter: [Function: outputSyncingFormatter] },
//      utils: 
//       { _fireError: [Function: _fireError],
//         _jsonInterfaceMethodToString: [Function: _jsonInterfaceMethodToString],
//         randomHex: [Function: randomHex],
//         _: [Function],
//         BN: [Function],
//         isBN: [Function: isBN],
//         isBigNumber: [Function: isBigNumber],
//         isHex: [Function: isHex],
//         isHexStrict: [Function: isHexStrict],
//         sha3: [Function],
//         keccak256: [Function],
//         soliditySha3: [Function: soliditySha3],
//         isAddress: [Function: isAddress],
//         checkAddressChecksum: [Function: checkAddressChecksum],
//         toChecksumAddress: [Function: toChecksumAddress],
//         toHex: [Function: toHex],
//         toBN: [Function: toBN],
//         bytesToHex: [Function: bytesToHex],
//         hexToBytes: [Function: hexToBytes],
//         hexToNumberString: [Function: hexToNumberString],
//         hexToNumber: [Function: hexToNumber],
//         toDecimal: [Function: hexToNumber],
//         numberToHex: [Function: numberToHex],
//         fromDecimal: [Function: numberToHex],
//         hexToUtf8: [Function: hexToUtf8],
//         hexToString: [Function: hexToUtf8],
//         toUtf8: [Function: hexToUtf8],
//         utf8ToHex: [Function: utf8ToHex],
//         stringToHex: [Function: utf8ToHex],
//         fromUtf8: [Function: utf8ToHex],
//         hexToAscii: [Function: hexToAscii],
//         toAscii: [Function: hexToAscii],
//         asciiToHex: [Function: asciiToHex],
//         fromAscii: [Function: asciiToHex],
//         unitMap: [Object],
//         toWei: [Function: toWei],
//         fromWei: [Function: fromWei],
//         padLeft: [Function: leftPad],
//         leftPad: [Function: leftPad],
//         padRight: [Function: rightPad],
//         rightPad: [Function: rightPad],
//         toTwosComplement: [Function: toTwosComplement] },
//      Method: [Function: Method] },
//   clearSubscriptions: [Function],
//   options: 
//    { address: [Getter/Setter],
//      jsonInterface: [Getter/Setter],
//      data: undefined,
//      from: undefined,
//      gasPrice: undefined,
//      gas: undefined },
//   defaultAccount: [Getter/Setter],
//   defaultBlock: [Getter/Setter],
//   methods: 
//    { setMessage: [Function: bound _createTxObject],
//      '0x368b8772': [Function: bound _createTxObject],
//      'setMessage(string)': [Function: bound _createTxObject],
//      message: [Function: bound _createTxObject],
//      '0xe21f37ce': [Function: bound _createTxObject],
//      'message()': [Function: bound _createTxObject] },
//   events: { allEvents: [Function: bound ] },
//   _address: '0x4F70E680bB1652d138a53Dc04A990e3D3122c960',
//   _jsonInterface: 
//    [ { constant: false,
//        inputs: [Array],
//        name: 'setMessage',
//        outputs: [],
//        payable: false,
//        stateMutability: 'nonpayable',
//        type: 'function',
//        signature: '0x368b8772' },
//      { constant: true,
//        inputs: [],
//        name: 'message',
//        outputs: [Array],
//        payable: false,
//        stateMutability: 'view',
//        type: 'function',
//        signature: '0xe21f37ce' },
//      { inputs: [Array],
//        payable: false,
//        stateMutability: 'nonpayable',
//        type: 'constructor',
//        signature: 'constructor' } ] }








// EXAMPLES FOR USING MOCHA JS TESTING FRAMEWORK:

// class Car {
// 	park() {
// 		return 'stopped';
// 	}

// 	drive() {
// 		return 'vroom';
// 	}
// }


// let car;

// beforeEach(() => {
// 	car = new Car();
// });

// describe('Car', () => {
// 	it('can park', () => {
// 		assert.equal(car.park(), 'stopped');
// 	});

// 	it('can drive', () => {
// 		assert.equal(car.drive(), 'vroom');
// 	});
// });

























