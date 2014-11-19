var through = require("through2");
var gutil = require("gulp-util");
var PluginError = gutil.PluginError;
var File = gutil.File;
var Buffer = require("buffer").Buffer;
var path = require("path");

module.exports = function(outputFile, options){
    if(!options){ options = {}; }
    var files = [];

    return through.obj(function(chunk, enc, callback){
        var file = new File(chunk);
        if(options.cwd){
            file.path = file.path.replace(options.cwd, ""); // FIXME, should use proper path resolution
        }
        files.push(file.path);
        return callback();
    }, function(callback){
        var js = "(function(){var scripts=[";
        js += "\"" + files.join("\",\"")     + "\"];";
        js += "for(var s in scripts){document.write(\"<script src='\" + scripts[s] + \"'></script>\");}})();";
        
        var file = new File(outputFile);
        if(typeof outputFile === "string"){
            file.path = path.join("", outputFile);
        }
        file.contents = new Buffer(js);
        this.push(file);
        
        return callback();
    });
};