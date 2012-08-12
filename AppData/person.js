module.exports = function(db){
    var person = db.define("person", {
        "text"   : "text",
        "name"   : "string"
    });
    
    person.sync();
    return person;
};