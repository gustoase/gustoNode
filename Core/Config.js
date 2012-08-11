Config = function(){
    this.dirViews        = '/srv/Views/';
    this.dirCore         = '/srv/Core/';
    this.dirModels       = '/srv/Models/';
    this.dirControllers  = '/srv/Controllers/';
    this.dirPublic       = '/srv/Public/';
    this.dirBase         = '/srv/';
    this.dirNodeModules  = '/opt/node/lib/node_modules/';
    this.server          = require('http').createServer();
    this.io              = require(this.dirNodeModules+'socket.io').listen(this.server);
    this.fs              = require('fs');
    this.util            = require('util');
    var JUST             = require(this.dirNodeModules+'just');
    this.View            = new JUST({ root : this.dirViews , useCache : true, ext : '.html' });
    this.formidable      = require(this.dirNodeModules+'formidable');        // работа с файлами
    this.logFile         = this.dirBase+'log.txt';
};

module.exports = new Config();