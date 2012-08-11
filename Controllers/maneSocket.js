var Config = require('../Core/Config');

var Run = function(socket){
   
   // ждем нового добавления поста пользователем, 
   // и отсылаем остальным сообщение о обновлении
   Config.App.on('addPost',function(data){
       socket.emit('str', data);
   });
    
};

module.exports = Run;