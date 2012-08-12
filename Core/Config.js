/******************************************  Месторасположение  *************************************/
exports.dirBase         = '/srv/';
exports.dirViews        = this.dirBase+'Views/';
exports.dirCore         = this.dirBase+'Core/';
exports.dirModels       = this.dirBase+'Models/';
exports.dirAppDataS     = this.dirBase+'AppData/';
exports.dirAppData      = this.dirBase+'AppData';
exports.dirControllers  = this.dirBase+'Controllers/';
exports.dirPublic       = this.dirBase+'Public/';
exports.dirNodeModules  = '/opt/node/lib/node_modules/';
/******************************************  Подключение нужный модулей сервера  *********************/
exports.server          = require('http').createServer();
exports.io              = require(this.dirNodeModules+'socket.io').listen(this.server);
exports.fs              = require('fs');
exports.util            = require('util');
/******************************************  Шаблонизатор ********************************************/
var JUST                = require(this.dirNodeModules+'just');
exports.View            = new JUST({ root : this.dirViews , useCache : true, ext : '.html' });
//exports.formidable      = require(this.dirNodeModules+'formidable');        // работа с файлами
exports.logFile         = this.dirBase+'log.txt';
exports.eventReturnDataOfCallMethod = true; // при рассылке события отдавать получившиеся данные?

/******************************************  Настройка БД ********************************************/
exports.orm             = require(this.dirNodeModules+"node-orm");
var mysql               = require(this.dirNodeModules+"node-mysql");
exports.clientDbName    = 'mysql';
exports.clientDb        = mysql.createConnection({
                                user     : 'root',
                                password : 'admin123',
                                host     : 'localhost',
                                database : 'test'
                           });
/****************************************** Инициализация ядра ***************************************/                       
var app                 = require(this.dirCore+'App');
exports.App             = new app();                           