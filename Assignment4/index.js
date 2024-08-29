const { encryptString, decryptString, generateUUID } = require('./crypto');
const { readFile, readStream } = require('./fileRead');
const printSystemInfo = require('./systemInfo');


const args = process.argv.slice(2);

switch (args[0]) {
    case 'encrypt':
        const text = args[1] || 'Hello, Good Morning';
        const password = args[2] || 'password123';
        const { encrypted, iv } = encryptString(text, password);
        console.log('Encrypted:', encrypted);
        console.log('Decrypted:', decryptString(encrypted, iv, password));
        break;
    case 'uuid':
        console.log('Random UUID:', generateUUID());
        break;
    case 'readfile':
        readFile();
        break;
    case 'readstream':
        readStream();
        break;
    case 'sysinfo':
        printSystemInfo();
        break;
    default:
        console.log('Invalid command');
        console.log('Usage:');
        console.log('  node index.js encrypt [text] [password]');
        console.log('  node index.js uuid');
        console.log('  node index.js readfile');
        console.log('  node index.js readstream');
        console.log('  node index.js sysinfo');
}
