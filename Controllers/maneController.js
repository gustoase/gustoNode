var Config = require('../Core/Config') 
   ,controller = require(Config.dirCore+'Controller')
   ,Helper     = require(Config.dirCore+'Helper');
   
exports.mane = controller.Controller.prototype =  function () {
    
    this.index = function(req,res,hrefData){
        var Sync = require('sync');
        Sync(function(){
            Config.fs.readFile(Config.dirViews + 'index.html',
              function (err, data) {
                if (err) {
                  res.writeHead(500);
                  return res.end('Error loading index.html');
                }
            
                res.writeHead(200);
                res.end(data);
              });
               
       });
    };
    
    this.about = function(req,res,hrefData){
         res.end("hello im contact of defaultController");  
         Helper.log('Open about controller ');
    };
    
    this.contact = function(req,res,hrefData){
        Config.View.render('page', { title: 'Hello, World!', post: [1,2,3,4,5,6,7] }, function(error, html) {
            res.writeHead(200);
            res.end(html);
        });
    };    
    
};
