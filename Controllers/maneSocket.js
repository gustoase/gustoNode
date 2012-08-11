var Config = require('../Core/Config') 
   ,Helper = require(Config.dirCore+'Helper');

var Run = function(socket){
   
   
    socket.emit('goConsole', 'one');
    
    socket.on('isClient', function(data){
       socket.emit('goConsole', 'two');
   });
   
   
};

module.exports = Run;