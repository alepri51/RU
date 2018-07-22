//process.execArgv[0] = process.execArgv[0].replace('-brk', '');
"use strict";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const https = require('https');
const path = require('path');
const cluster = require('cluster');

const express = require('express');
const staticFileMiddleware = express.static('client/dist', {});
const history = require('connect-history-api-fallback');
const cors = require('cors');

const fs = require('fs');

const key  = fs.readFileSync('ssl/key.pem', 'utf8');
const cert = fs.readFileSync('ssl/cert.pem', 'utf8');
const credentials = {key, cert};

const httpsListenPort = 8000;

const app = express();

app.use(cors());

app.use(staticFileMiddleware);

app.use(history({
    disableDotRule: false,
    verbose: true
}));

app.use(staticFileMiddleware);

let httpsServer = https.createServer(credentials, app);

if(cluster.isMaster) {
    httpsServer.listen(httpsListenPort);

    console.log(`https server listen on ${httpsListenPort} port.`);

    process.on('unhandledRejection', err => {
        console.log('unhandledRejection => ', err);
    });


    app.all('*', function(req, res, next) {
        next();
    });

    app.use('/api', require('./router'));
}

