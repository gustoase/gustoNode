module.exports = function(db){
    var autotable = db.define("autotable", {
        "text"   : "text",
        "name"   : "string",
        "id_cat" : "int"
    });
    
    autotable.sync();
    return autotable;
};