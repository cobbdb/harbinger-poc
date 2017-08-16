let fs = require('fs'),
    webdav = require('./webdav/client.js');

/**
 * @param {string} env Environment to write to.
 * @param {string} path
 */
module.exports = (env, path) => {
    fs.readFile(path, (err, data) => {
        if (!err) {
            let fout = webdav('dev').createWriteStream(path);
            fout.end(data);
        }
    });
};
