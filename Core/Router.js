var  Config = require('./Config') 
   , url = require('url')
   , path = require('path');
   
   
/**
  ������ ������� �������� �� ������ �������, 
  ��� ��������� ��������� �� ������ ����� ������ �����.
  � ����� ������ ��������� ������ ���������� ����������� � ������� �� ����������
  
  ������:
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
  ������ ������� �������� �� �������������� �������, 
  ����������� ������ ��-� ���� � �������� �����������, ������ ��-� � ��� ������
  ��������� ��������� �������� ������ �������� � ���������� ����������
  
  ������: http://www.site.ru/mane/index
  mane == maneController
  index == new maneController.index();
*/
exports.autoRouter = function (req,res){
    var hrefObj  = url.parse(req.url)
    , pathname   = hrefObj.pathname
    , href       = hrefObj.href;
    
    // ����������� ���������� � ��� �����, 
    // �� ������ ���� �� ������ �� ���� ���������� �� �������
    var defaultAction = {
       'controller' : 'maneController',
       'action'     : 'index'
    };
    
    
    var tmpArrParamPath = pathname.split('/');
    // ��������� �� ���������� �������� ������ ��� ��������� ���� ���������� � ������
    var ArrParamPath = [];
    for(var i=0; i < tmpArrParamPath.length; i++ ){
        if(tmpArrParamPath[i]=='') continue;
        
        ArrParamPath.push(tmpArrParamPath[i]);
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
           
        } else if(err.code == 'ENOENT') {
           // fs.writeFile('log.txt', 'Some log\n');
        } else {
            console.log('Some other error: ', err.code);
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
