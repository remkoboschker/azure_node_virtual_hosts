var express = require('express'),
    vhost = require('vhost'),
    http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    atelierfemkeboschker = require('../atelierfemkeboschker/app'),
    huisjeinegmond = http.createServer(function(req, res) {
        if(req.originalUrl === "/"){
            res.writeHead(302, {
                'Location' : '/index.html'
            });
            res.end();
        } else {
            proxy.web(req, res, { target: 'https://huisjeinegmond.blob.core.windows.net' });
        }
    });

    express()
        .use(vhost('informatietuin.nl', atelierfemkeboschker))
        .use(vhost('huisjeinegmond.nl', huisjeinegmond))
        .listen(80);