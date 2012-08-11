var  Config = require('./Config') 
   , url = require('url')
   , path = require('path');
   
   
/**
  Данная функция отвечает за ручной роутинг, 
  что позволяет указывать на нужный адрес нужный метод.
  В таком случае требуется самому подключать контроллеры и создать их экземпляры
  
  пример:
    var maneController = require(cfg.dirControllers+'maneController');
    
    route.get('/', function(req, res) {
          var a = new maneController.Mane();
          a.index();
    });
  
*/
exports.mapRouter = function (route){
    var maneController = require(Config.dirControllers+'maneController');
    
    route.get('/', function(req, res) {
          var a = new maneController.mane();
          a.index(req, res);
    });
}
/**
  Данная функция отвечает за автоматический роутинг, 
  сопоставляя первый эл-т пути к названию контроллера, второй эл-т к его методу
  остальные параметры адресной строки доступны в глобальных переменных
  
  пример: http://www.site.ru/mane/index
  mane == maneController
  index == new maneController.index();
*/
exports.autoRouter = function (req,res){
    var hrefObj  = url.parse(req.url)
    , pathname   = hrefObj.pathname
    , href       = hrefObj.href;
    
    // стандартный контроллер и его метод, 
    // на случай если не найден ни один контроллер по запросу
    var defaultAction = {
       controller : 'mane',
       action     : 'index'
    };
    
    
    var tmpArrParamPath = pathname.split('/');
    // разделяем по сепаратору адресную строку для получения имен конроллера и метода
    var ArrParamPath = [];
    for(var i=0; i < tmpArrParamPath.length; i++ ){
        if(tmpArrParamPath[i]=='') continue;
        
        ArrParamPath.push(tmpArrParamPath[i]);
    }
    
    // дефоултные настройки, если ничего не передано    
    if(ArrParamPath[0]==undefined){
        ArrParamPath[0] = defaultAction.controller;
    }
    if(ArrParamPath[1]==undefined){
        ArrParamPath[1] = defaultAction.action;
    }
    
    Config.fs.stat(Config.dirControllers+ArrParamPath[0]+'Controller.js', function(err, stat) {
        if(err == null) {
           var tmpControllerLink = require(Config.dirControllers+ArrParamPath[0]+'Controller');
           var tmpController = new tmpControllerLink[ArrParamPath[0]]();
           
           var dataHref = {
              path : ArrParamPath,
              query: getUrlVars(href)
           };
           tmpController[ArrParamPath[1]](req,res,dataHref);
           
        } else {
            res.writeHead(500);
            res.end('Error loading '+ArrParamPath[0]+'Controller.js see file from Router.js');
        }
    });
    
}

var getUrlVars = function (href) {
    var vars = {};
    var parts = href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

exports.getUrlVars = getUrlVars;
