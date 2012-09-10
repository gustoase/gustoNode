var Config = require('../Core/Config') 
   ,Helper = require(Config.dirCore+'Helper')
   ,im     = require(Config.dirNodeModules+'imagemagick');
   
// описываем наш контроллер
Config.App.ns('imgController').method({
    get : function(param){

        var img = Config.dirPublic+'module_list.PNG';
        
        im.identify(img, function(err, features){
              if (err) throw err
              console.log(features)
              // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
        });  
    },
    
    resize : function(param){
        var img = Config.dirPublic+'module_list.PNG';
        var outImg = Config.dirPublic+'kittens-small.jpg';
        console.log(param.dataHref);
        im.convert([img, '-resize', param.dataHref.query['s'], outImg], 
        function(err, metadata){
              if (err) throw err;
              var imgBin = Config.fs.readFileSync(outImg);
              param.res.writeHead(200, {'Content-Type': 'image/jpeg' });
              param.res.end(imgBin,'binary');
        })
    },
    
    crop : function(param){
        var img = Config.dirPublic+'module_list.PNG';
        var outImg = Config.dirPublic+'kittens-crop.jpg';
        im.crop({
          srcPath: img,
          dstPath: outImg,
          width: 200,
          height: 200,
          quality: 1
        }, function(err, stdout, stderr){
              var imgBin = Config.fs.readFileSync(outImg);
              param.res.writeHead(200, {'Content-Type': 'image/jpeg' });
              param.res.end(imgBin,'binary');
        })
    },
    
    toPdf : function(param){
        var exec = require('child_process').exec;
        
        var inPdf   = Config.dirPublic+'book.pdf';
        var outDjvu = Config.dirPublic+'book.djvu';
        var outPdf   = Config.dirPublic+'book2.pdf';
         // ddjvu -format=tiff file_name.djvu file_name.tiff
        
       var child = exec('ddjvu -format = pdf '+outDjvu+' '+outPdf , 
          function (error, stdout, stderr) {
            if (error !== null) {
              console.log('exec error: ' + error);
            }
            
            console.log(stdout);
        });
        
        /*
        var child = exec('pdf2djvu -o '+outDjvu+' -d400 -v '+inPdf , 
          function (error, stdout, stderr) {
            if (error !== null) {
              console.log('exec error: ' + error);
            }
            console.log(stdout);
            
        });
        */
        param.res.end('ok');
    },
    
    djvu : function(param){
        var inPdf   = Config.dirPublic+'book.pdf';
        var outDjvu = Config.dirPublic+'book.djvu';
        var outPdf   = Config.dirPublic+'book2.pdf';
        
        var exec = require('child_process').exec;
        var child = exec('ddjvu -format=pdf '+outDjvu+' '+outPdf , 
          function (error, stdout, stderr) {
            if (error !== null) {
              console.log('exec error: ' + error);
            }
            
            console.log(stdout);
        });
        
        param.res.end('ok');
    },
    
    totext : function(param){
       var exec = require('child_process').exec;
        
       var inPdf   = Config.dirPublic+'book.pdf';
       var outDjvu = Config.dirPublic+'book.djvu';
       var outPdf   = Config.dirPublic+'book.txt';
         // ddjvu -format=tiff file_name.djvu file_name.tiff
        
       var child = exec('pdftotext '+inPdf+' '+outPdf , 
          function (error, stdout, stderr) {
            if (error !== null) {
              console.log('exec error: ' + error);
            }
            
            console.log(stdout);
        });
       
        param.res.end('ok');
    },
    
    toJpg : function (param){
        var inPdf   = Config.dirPublic+'book.pdf';
        var outImg = Config.dirPublic+'pdfout.jpg';
        
        console.log(param.dataHref); //convert -density 300 file.pdf file.jpg
        im.convert(['-density', 300, inPdf, outImg], 
        function(err, metadata){
              if (err) throw err;
            //  var imgBin = Config.fs.readFileSync(outImg);
            //  param.res.writeHead(200, {'Content-Type': 'image/jpeg' });
            //  param.res.end(imgBin,'binary');
              console.log('good');
        })
    }
    
});