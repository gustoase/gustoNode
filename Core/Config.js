/******************************************  Месторасположение  *************************************/
exports.dirViews        = '/srv/Views/';
exports.dirCore         = '/srv/Core/';
exports.dirModels       = '/srv/Models/';
exports.dirAppDataS     = '/srv/AppData/';
exports.dirAppData     = '/srv/AppData';
exports.dirControllers  = '/srv/Controllers/';
exports.dirPublic       = '/srv/Public/';
exports.dirBase         = '/srv/';
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