var  Config = require(__dirname+'/Config');
Halper = function(){
    this.log = function(str){
          Config.fs.open(Config.logFile, 'a', '0777', function(err, file_handle){
            if (!err) {
                // ���������� � ����� ����� log.txt ����� "Copyrighted by Me"
                // ��� �������� � ������ "a" ��������� ��� � ����� �����, � �� ������� null
                // � �������� �������
                var dateObj = new Date();
                tmpStr = "\n\r#" + dateObj.toString() + "_______________________________________________#\n\r"+str;
                
                Config.fs.write(file_handle, tmpStr, null, null, function(err, written) {
                    if (!err) {
                        // �� ������ ������
                    } else {
                        // ��������� ������ ��� ������
                        console.log('Error write from log file');
                    }
                });
            } else {
                // ��������� ������ ��� ��������
                console.log('Error open log file');
            }
        });
    }
};

module.exports = new Halper();