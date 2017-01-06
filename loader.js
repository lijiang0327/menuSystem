'use strict';

var path = require('path'),
    fs = require('fs'),
    url = require('url'),
    cproc = require('child_process'),
    fork = cproc.fork,

    async = require('async'),
    nconf = require('nconf'),
    logrotate = require('logrotate-stream'),

    pkg = require('./package.json');

nconf.argv().env().file({
    file: path.join(__dirname, '/config.json')
});

var silent = nconf.get('silent') === 'false' ? false : nconf.get('silent') != false,
    output = logrotate({ file: __dirname + '/logs/output.log', size: '1m', keep: 3, compress: true}),
    pidFilePath = __dirname + '/pidfile',
    numProcs,
    workers = [],

    Loader = {
        timesStarted: 0
    }

Loader.init = function(callback) {
    callback = typeof callback === 'function' ? callback : function() {};
    if (silent) {
        console.log = function() {
            var args = Array.prototype.slice.call(arguments);
            output.write(args.join(' ') + '\n');
        };
    }

    process.on('SIGHUP', Loader.restart);
    process.on('SIGTERM', Loader.stop);
    callback();
}

Loader.start = function(callback) {
    numProcs = getPorts().length;
    console.log('Clustering enable: Spinning up ' + numProcs + ' process(es).\n');
    
    for(var i = 0; i < numProcs; i++) {
        forkWorker(i, i === 0);
    }

    if(callback) {
        callback();
    }
}

Loader.addWorkerEvents = function(worker) {
    worker.on('exit', (code, signal) => {
        if (code !== 0) {
            if (Loader.timesStarted < numProcs * 3) {
                Loader.timesStarted ++;
                if (Loader.crashTimer) {
                    clearTimeout(Loader.crashTimer);
                }
                Loader.crashTimer = setTimeout(function() {
                    Loader.timesStarted = 0;
                }, 10000);
            }
            else {
                console.log(numProcs * 3 + ' restarts in 10 seconds, most likely an error on startup. Halting.');
                process.exit();
            }
        }

        console.log('[cluster] Child process (' + worker.pid + ') has exited (code: ' + code + ', signal: ' + signal + ')');

        if (!(worker.suicide || code === 0)) {
            console.log('[cluster] Spinning up another process...');
            forkWorker(worker.index, worker.isPrimary);
        }
    });

    worker.on('message', (message) => {
        if (message && typeof message === 'object' && message.action ) {
            switch( message.action ) {
                case 'restart':
                    console.log('[cluster] Restarting ...');
                    Loader.restart();
                    break;
                case 'reload':
                    console.log('[cluster] Reloading ...');
                    Loader.reload();
                    break;
            }
        }
    })
}

Loader.restart = function() {
    killWorkers();
    console.log('Menu system is restarting...');
    nconf.remove('file');
    nconf.use('file', {file: path.join(__dirname, '/config.json')});
    Loader.start();
}

Loader.stop = function() {
    killWorkers();
    fs.unlinkSync(__dirname + '/pidfile');
}

Loader.reload = function() {
    workers.foeEach((worker) => {
        worker.send({
            action: 'reload'
        })
    })
}

Loader.displayStartupMessage = function(callback) {
    callback = typeof callback === 'function' ? callback : function() {};
    console.log('\n');
    console.log('Starting Menu system...');
    callback();
}
function getPorts() {
    var _url = nconf.get('url');
    if(!_url) {
        console.log('[cluster] url is undefined, please check your config.json');
        process.exit();
    }
    var urlObject = url.parse(_url);
    var port = nconf.get('port') || nconf.get('PORT') || urlObject.port || 8000;

    if(!Array.isArray(port)) {
        port = [port];
    }
    return port;
}

function forkWorker(index, isPrimary) {
    var ports = getPorts();
    var args = [];

    if(!ports[index]) {
        return console.log('[cluster] invalid port for worker : ' + index + ' ports: ' + ports.length);
    }

    process.env.isPrimary = isPrimary;
    process.env.isCluster = ports.length > 1 ? true : false;
    process.env.port = ports[index];

    var worker = fork('app.js', args, {
        silent: silent,
        env: process.env
    });

    worker.index = index;
    worker.isPrimary = isPrimary;

    workers[index] = worker;

    Loader.addWorkerEvents(worker);

    if(silent) {
        var output = logrotate({ file: __dirname + '/logs/output.log', size: '1m', keep: 3, compress: true});
        worker.stdout.pipe(output);
        worker.stderr.pipe(output);
    }
}

function killWorkers() {
    workers.forEach((worker, index) => {
        worker.suicide = true;
        worker.exit();
    }) 
}

fs.open(path.join(__dirname, 'config.json'), 'r', (err) => {
    if(!err) {
        if (nconf.get('daemon') !== 'false' && nconf.get('daemon') !== false) {
            if (fs.existsSync(pidFilePath)) {
                try {
                    var pid = fs.readFileSync(pidFilePath, {encoding: 'utf-8'});
                    process.kill(pid, 0);
                    process.exit();
                }
                catch(e) {
                    fs.unlinkSync(pidFilePath);
                }
            }

            require('daemon')({
                stdout: process.stdout,
                stderr: process.stderr
            });

            fs.writeFile(__dirname + '/pidfile', process.pid);
        }

        async.series([
            Loader.init,
            Loader.displayStartupMessage,
            Loader.start
        ], (err) => {
            if (err) {
                console.log('[loader] Error during startup' + err.message);
            }
        })
    }
    else {
        var child = fork('app.js');
    }
});