var express = require('express'),
    request = require('request'),
    vhost = require('vhost'),
    http = require('http'),
    httpProxy = require('http-proxy'),
    proxy = httpProxy.createProxyServer({}),
    huisjeBlob = 'https://huisjeinegmond.blob.core.windows.net',
    atelierfemkeboschker = require('atelierfemkeboschker'),
    huisjeinegmond = http.createServer(function(req, res) {
        
        if(req.originalUrl === "/"){
            res.writeHead(302, {
                'Location' : '/index.html'
            });
            res.end();
        } else {
            req.pipe(request(huisjeBlob + req.url)).pipe(res);
        }
    }),
    app = express(),
    port = process.env.PORT || 1337;

    app.enable('trust proxy')
        .use(vhost('*.informatietuin.nl', atelierfemkeboschker))
        .use(vhost('informatietuin.nl', atelierfemkeboschker))
        .use(vhost('huisjeinegmond.nl', huisjeinegmond))
        .use(vhost('*.huisjeinegmond.nl', huisjeinegmond))
        
        .get('/', function (req, res) {
            res.send(404, 'unknown virtual host');
        })
        .listen(port);
