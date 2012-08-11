var Config = require('../Core/Config') 
   ,Helper = require(Config.dirCore+'Helper');
   
// описываем наш контроллер
Config.App.ns('maneController').method({
    
    index : function(param){
        Config.View.render('index', { }, function(error, html) {
            param.res.writeHead(200);
            param.res.end(html);
        });
    },
    
    about: function(param){
       Config.View.render('page', { title: 'Hello, World!', post: [1,2,3,4,5,6,7] }, function(error, html) {
            param.res.writeHead(200);
            param.res.end(html);
        });
        
    },
    
    newpost: function(param){
       param.res.writeHead(200);
       param.res.end('ok added post');
       // рассылаем всем слушателям событие о новом поступлении
       Config.App.emit('addPost','add post!!!! - '+param.dataHref.query.text);
    }
    
    
});
   
