const fs = require('fs');
const path = require('path');
const https = require('https');
const request = require('request');
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('../config/env.config');

const Private_key = fs.readFileSync(path.resolve(__dirname, '../certificate/private.pem'), 'utf-8');
const Cert = fs.readFileSync(path.resolve(__dirname, '../certificate/ca.cer'), 'utf-8');
const credentials = { key: Private_key, cert: Cert};

module.exports = {
  createServer: () => {
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.all('*', (req, res, next) => {
      // TODO 支持跨域访问
      // const allowOrigins = ['http://localhost:8080', 'http://localhost:8082'];
      // if (allowOrigins.includes(req.headers.origin)) {
      //   res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
      // }
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', config.allowHeaders.join(','));
      res.setHeader('Access-Control-Expose-Headers', '*');
      next();
    });
    app.use('/proxy', (req,res) =>{
      //拿到请求的路径来代理请求，并把响应的结果传给request客户端然后将目标的服务器响应的数据传回浏览器； 
      const url = decodeURIComponent(req.query.url);
      console.log(url)
      req.pipe(request(url)).pipe(res);
    });
    app.get('/app', (req,res) =>{
      //拿到请求的路径来代理请求，并把响应的结果传给request客户端然后将目标的服务器响应的数据传回浏览器； 
      res.send({name: 'alan'});
    });
    app.use('/', require('../routes'));
    app.use(express.static('public'));
    app.use('/*', (req,res,next) => {
      res.sendFile(path.resolve(__dirname, '../public/index.html'));
    });
    // const httpsServer = https.createServer(credentials, app);
    const httpsServer = http.createServer(credentials, app);
    httpsServer.listen(config.port, config.ip, () => {
      console.log(`https server started at port -- ${config.port}`);
    });
  }
}
