const os = require('os');

function printSystemInfo() {
    console.log('OS Type:', os.type());
    console.log('OS Platform:', os.platform());
    console.log('OS Release:', os.release());
    console.log('CPU Architecture:', os.arch());
    console.log('CPU Cores:', os.cpus().length);
    console.log('Total Memory (GB):', (os.totalmem() / (1024 ** 3)).toFixed(2));
    console.log('Free Memory (GB):', (os.freemem() / (1024 ** 3)).toFixed(2));
    console.log('Home Directory:', os.homedir());
    console.log('System Uptime (seconds):', os.uptime());
}

printSystemInfo();
