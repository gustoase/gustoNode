module.exports = function(db){
    var posts = db.define("posts", {
        "text"   : "text",
        "name"   : "string"
    });
    
    posts.sync();
    return posts;
};