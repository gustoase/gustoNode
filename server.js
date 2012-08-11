var Config = require(__dirname+'/Core/Config')
  , router = require('router')  // роутер по жестким путям Config.dirNodeModules+
  , Router = require(Config.dirCore+'Router')  // роутер системы
  , Sync   = require('sync')
  , maneSocket = require(Config.dirControllers+'maneSocket'); // для последовательного выполнения функций
  
Config.server.listen(8000);

// если хотим распределять всё вручную
// подключаем ручной роутер
//var route = router();
//Router.mapRouter(route);
//Config.server.on('request',route);
// если хотим распределять автоматически
// по адресам контроллером и методов
Config.server.on('request',Router.autoRouter);

// далее сокеты
Config.io.sockets.on('connection', function (socket) {
    // перенаправляем всю работу на контроллер сокетов
    maneSocket(socket);
});







