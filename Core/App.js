var  Config = require(__dirname+'/Config')
    ,Halper = require(__dirname+'/Helper')
    ,events = require('events')
    ,util   = require('util');
    
App = function(){
    // регистрируем событийную модель
    // при вызове call генерится одноименное событие методу 
    events.EventEmitter.call(this);
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
            Halper.log(errorMsg);
            if(isCallbackFnc)
                callbackFnc(errorMsg)
        } 
        
        if(!Config.eventReturnDataOfCallMethod)
            returnData = null;
            
        // раздаем событие: вызывался такой то метод и отдаем его возвращаемые данные
        this.emit(this.currentNs+":"+nameMethod,''+nameMethod,returnData);
            
            
        return this;   
    };
};
// наследуемся от событийной модели, чтобы можно было раздавать события
util.inherits(App, events.EventEmitter);

module.exports = App; 