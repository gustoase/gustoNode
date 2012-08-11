var Config = require('./Config');
Halper = function(){
    this.log = function(str){
          Config.fs.open(Config.logFile, 'a', '0777', function(err, file_handle){
            if (!err) {
                // Записываем в конец файла log.txt фразу "Copyrighted by Me"
                // при открытии в режиме "a" указатель уже в конце файла, и мы передаём null
                // в качестве позиции
                var dateObj = new Date();
                tmpStr = "\n\r#" + dateObj.toString() + "_______________________________________________#\n\r"+str;
                
                Config.fs.write(file_handle, tmpStr, null, null, function(err, written) {
                    if (!err) {
                        // Всё прошло хорошо
                    } else {
                        // Произошла ошибка при записи
                        console.log('Error write from log file');
                    }
                });
            } else {
                // Обработка ошибок при открытии
                console.log('Error open log file');
            }
        });
    }
};

module.exports = new Halper();