var Config = require(__dirname+'/Core/Config')
  , router = require(Config.dirNodeModules+'router')  // роутер по жестким путям
  , Router = require(Config.dirCore+'Router')  // роутер системы
  , maneSocket = require(Config.dirControllers+'maneSocket'); // контроллер соккетов
  
Config.server.listen(8000);

// если хотим распределять всё вручную
// подключаем ручной роутер
//var route = router();
//Router.mapRouter(route);
//Config.server.on('request',route);




// если хотим распределять автоматически
// по адресам контроллером и методов
// слушаем сервер и атороутим

// если хотим распределять автоматически
// по адресам контроллером и методов
Config.server.on('request',Router.autoRouter);

// далее сокеты
Config.io.sockets.on('connection', function (socket) {
    // перенаправляем всю работу на контроллер сокетов
    maneSocket(socket);
});







