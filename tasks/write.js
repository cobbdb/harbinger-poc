var webdav = require('./webdav/client.js');

module.exports = function (path, env) {
    var fout = webdav(env).createWriteStream(path);
};
