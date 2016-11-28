var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    webpack = require('webpack'),
    config = require('../webpack.config.js'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');
var main     = express();

main.use(compression());
main.use(logger('dev'));
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

var compiler = webpack(config);

main.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath}));
main.use(webpackHotMiddleware(compiler));

main.use(express.static(path.join(__dirname, '../client')));

main.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client', 'index.html'));
});


module.exports = main;