
var Config = require(__dirname+'/Core/Config')
  , router = require(Config.dirNodeModules+'router')  // роутер по жестким путям
  , Router = require(Config.dirCore+'Router');        // роутер системы
  
Config.server.listen(8000);

// если хотим распределять всё вручную
// подключаем ручной роутер
var route = router();
Router.mapRouter(route);
Config.server.on('request',route);
// если хотим распределять автоматически
// по адресам контроллером и методов
//Config.server.on('request',Router.autoRouter);







/*
function handler(req,res){
     if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        // parse a file upload
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
          res.writeHead(200, {'content-type': 'text/plain'});
          res.write('received upload:\n\n');
          res.end(util.inspect({fields: fields, files: files}));
        });
        return;
      }
    
      console.log(req.url);
      console.log(req.method);
      
      fs.readFile(__dirname + '/index.html',
      function (err, data) {
        if (err) {
          res.writeHead(500);
          return res.end('Error loading index.html');
        }
    
        res.writeHead(200);
        res.end(data);
      });
}
*/

Config.io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  
    setTimeout(function(){
        socket.emit('goConsole', 'Новое сообщение с севера');
    },4000);
    
    setTimeout(function(){
        socket.emit('goConsole', 'Новое сообщение с севера');
    },9000);

});

