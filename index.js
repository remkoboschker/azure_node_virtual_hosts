var express = require('express'),
    vhost = require('vhost'),
    http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    atelierfemkeboschker = require('atelierfemkeboschker'),
    huisjeinegmond = http.createServer(function(req, res) {
        console.log(req.originalUrl);
        if(req.originalUrl === "/"){
            res.writeHead(302, {
                'Location' : '/index.html'
            });
            res.end();
        } else {
            proxy.web(req, res, { target: 'https://huisjeinegmond.blob.core.windows.net' });
        }
    }),
    
    app = express(),
    var port = process.env.PORT || 1337;

    app.enable('trust proxy')
        .use(vhost('*.informatietuin.nl', atelierfemkeboschker))
        .use(vhost('informatietuin.nl', atelierfemkeboschker))
        .use(vhost('*.huisjeinegmond.nl', huisjeinegmond))
        .use(vhost('huisjeinegmond.nl', huisjeinegmond))
        .get('/', function (req, res) {
            res.send(404, 'unknown virtual host');
        })
        .listen(port);
//var http = require('http')
//var port = process.env.PORT || 1337;
//http.createServer(function(req, res) {
//  res.writeHead(200, { 'Content-Type': 'text/plain' });
//  res.end('Hello World\n');
//}).listen(port);