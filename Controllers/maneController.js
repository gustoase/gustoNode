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
    
    mysql : function(param){
        
        // если БД готова, работаем с ней
        Config.App.isReadyDb(function(objects){
            
            
            objects.Posts.find(function (items) {
                console.log(items);
    			if (items === null) {
    				param.res.end('Нету ниче');
    			} else {
    			     var str = "";
        			 for(var i in items){
        			     str += items[i].text+"<br/>";
        			 }
                     param.res.end(str);
    			}
    		});
            
            
            
        });
        
    },
    
    newpost: function(param){
       param.res.writeHead(200);
       param.res.end('ok added post');
       // рассылаем всем слушателям событие о новом поступлении
       Config.App.emit('addPost','add post!!!! - '+decodeURIComponent(param.dataHref.query.text));
    },
    
    mysqlAdd : function(param){
        
        // если БД готова, работаем с ней
        Config.App.isReadyDb(function(objects){
            
             var test = new objects.Autotable({
                "name"      : "John",
                "text"      : "Dtexttexttextoe",
                "id_cat"    : 123
            });
            
            test.save(function (err, Copytable) {
                if (!err) {
                    param.res.end("Saved! ID=" + Copytable.id); 
                } else {
                    param.res.end("Something went wrong..."+err);
               }
            });
            
            
        });
        
    },
    
    
});
   
