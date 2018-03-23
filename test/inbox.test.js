const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3'); // capitalize because Web3 is a constructor function
const web3 = new Web3(ganache.provider()); // lowercase because its an instance function
const { interface, bytecode } = require('../compile'); // interface = abi, bytecode = raw bytecode


// REAL CODE:
let accounts;
let inbox;


beforeEach(async () => {
	// Get a list of all accounts
	accounts = await web3.eth.getAccounts();

	// Use one of those accounts to deploy the contract
	// inbox is the JAVASCRIPT REPRESENTATION OF THE CONTRACT ON THE BLOCKCHAIN. WHAT WE WILL BE TESTING.
	inbox = await new web3.eth.Contract(JSON.parse(interface)) // teaches web3 about what methods an inbox contract has (has to be json object)
		.deploy({ data: bytecode, arguments: ['Hi there!'] }) // tells web3 that we want to deploy a new copy of this contract (arguments are 1 to 1 connection to Inbox.sol)
		.send({ from: accounts[0], gas: '1000000' }) // instructs web3 to send out a transaction that creates this contract
});


describe('Inbox', () => {
	it('deploys a contract', () => {
		console.log(inbox);
	});
});





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

























