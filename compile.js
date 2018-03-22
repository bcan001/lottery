const path = require('path'); // path module
const fs = require('fs'); // file sync module
const solc = require('solc'); // solidity compiler module

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'); // bring in files
const source = fs.readFileSync(inboxPath, 'utf8'); // read in contents of the file

// console.log(solc.compile(source, 1)); // log what compiler is doing
module.exports = solc.compile(source, 1).contracts[':Inbox']; // compile the file

