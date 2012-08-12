var Config = require('./Config');
Halper = function(){
    var that = this;
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
    };
    
    // функция перебора директории рекурсивно
    // взято с http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
    this.walk = function(dir, done) {
      var results = [];
      Config.fs.readdir(dir, function(err, list) {
        if (err) return done(err);
        var pending = list.length;
        if (!pending) return done(null, results);
        list.forEach(function(file) {
          file = dir + '/' + file;
          Config.fs.stat(file, function(err, stat) {
            if (stat && stat.isDirectory()) {
              that.walk(file, function(err, res) {
                results = results.concat(res);
                if (!--pending) done(null, results);
              });
            } else {
              results.push(file);
              if (!--pending) done(null, results);
            }
          });
        });
      });
    };
    
    // сделать первую букву заглавной
   this.ucfirst = function(str){
        var first = str.charAt(0).toUpperCase();
        return first + str.substr(1);
    }
        
};

module.exports = new Halper();