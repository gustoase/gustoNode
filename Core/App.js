var  Config = require(__dirname+'/Config')
    ,Helper = require(__dirname+'/Helper')
    ,events = require('events')
    ,util   = require('util');
    
App = function(){
    // регистрируем событийную модель
    // при вызове call генерится одноименное событие методу 
    events.EventEmitter.call(this);
    // Ссылка на ресурс бд
    this.dbLink = null;
    // коллекция объектов БД
    this.objects = {};
    // статус загрузки БД
    this.isDbLoad = false;
    // собираем все добавленные в систему методы
    this.listMethod = {};
    // определяем нужный нам неймспейс
    this.currentNs = 'default';
    this.ns = function(name_ns){
        this.currentNs = name_ns;
        return this;
    };
    
    // добавить в систему методы, для последующего контроля
    this.method  = function(obj){
        for (var m in obj){
          if(this.listMethod[this.currentNs]==undefined){
            this.listMethod[this.currentNs] = {};
          }
          this.listMethod[this.currentNs][m] = obj[m];
        }
        return this;
    };
    
    // вызывать метод и передать объект с параметрами
    this.call = function(nameMethod,paramObj,callbackFnc){
        if(typeof(paramObj) == "function"){
            callbackFnc = paramObj; 
            paramObj = false;
        }
        
        // проверяем на наличие кодбек функции иначе просто не вызываем ее
        var isCallbackFnc = false;
        if(typeof(callbackFnc) == "function"){
            isCallbackFnc = true;
        }
         
        var returnData = null;
        // если метод не вызывается, записываем в лог и вызываем коллбек, если имеется
        try{
            // делаем проверки на наличие передаваемых параметров
            if(paramObj===false){
                returnData = this.listMethod[this.currentNs][nameMethod]();
                if(isCallbackFnc){
                    callbackFnc(false,returnData);
                }
            }else{
                returnData = this.listMethod[this.currentNs][nameMethod](paramObj);
                if(isCallbackFnc){
                    callbackFnc(false,returnData);
                }
            }
        }catch(e){
            var errorMsg = 'Error call method '+nameMethod+' from '+this.currentNs+' name space. Throw name: '+e.name;
            Helper.log(errorMsg);
            if(isCallbackFnc)
                callbackFnc(errorMsg)
        } 
        
        if(!Config.eventReturnDataOfCallMethod)
            returnData = null;
            
        // раздаем событие: вызывался такой то метод и отдаем его возвращаемые данные
        // controller:index
        this.emit(this.currentNs+":"+nameMethod,''+nameMethod,returnData);
            
            
        return this;   
    };
    
    var selfApp = this;
    // работа с БД, подключаемся
    var db = Config.orm.connect(Config.clientDbName, Config.clientDb, function (success, db) {
        if (!success) {
            var errorMsg = "Could not connect to database!";
            Helper.log(errorMsg);
            return;
        }
        
        selfApp.dbLink = db;
        selfApp.emit('dbConnect',selfApp.dbLink);
        
        
        // сканируем имеющиеся модели данных описывающих БД
        Helper.walk(Config.dirAppData,function(err,resultFiles){
            // сканим получившиеся результат, и подключаем каждую модель, передавая ей ссылку на бд
            for(var file in resultFiles){
                var nameObject = resultFiles[file].split("/").pop().split(".")[0];
                // Для красоты делаем первую букву в названии объекта заглавной
                selfApp.objects[Helper.ucfirst(nameObject)] = (require(Config.dirAppDataS+nameObject))(db);
            }
            
            selfApp.isDbLoad = true;
            selfApp.emit('dbReady',selfApp.objects);
        });
                
    });
    
    this.getDbLink = function(){
        return this.dbLink;
    }
    
    // получить все объекты БД
    this.getObjects = function(){
        return this.objects;
    }
    
    // получить один объект БД
    this.getOneObject = function(nameObject){
        return this.objects[nameObject];
    }
    
    // Проверяет статус загрузки бд, если всё загружено, 
    // то выполняем функцию, и работаем с БД
    this.isReadyDb = function(callbackFnc){
        if(selfApp.isDbLoad){
           callbackFnc(selfApp.objects); 
           return;
        }
        selfApp.on('dbReady',callbackFnc);
    }
    
};
// наследуемся от событийной модели, чтобы можно было раздавать события
util.inherits(App, events.EventEmitter);

module.exports = App; 