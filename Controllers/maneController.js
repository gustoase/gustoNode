var Config = require('../Core/Config') 
   ,controller = require(Config.dirCore+'Controller');
   
exports.mane = controller.Controller.prototype =  function () {
    
    this.index = function(req,res,hrefData){
        Config.fs.readFile(Config.dirViews + 'index.html',
          function (err, data) {
            if (err) {
              res.writeHead(500);
              return res.end('Error loading index.html');
            }
        
            res.writeHead(200);
            res.end(data);
          });
    };
    
    this.about = function(req,res,hrefData){
        console.log("hello im about of defaultController");
    };
    
    this.contact = function(req,res,hrefData){
        console.log("hello im contact of defaultController");
    };    
    
};
