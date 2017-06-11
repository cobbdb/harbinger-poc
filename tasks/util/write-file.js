var http = require('http'),
    auth = require('../../auth.json');

/**
 * @param {Object} o
 * @param {string} o.path
 * @param {string} o.host
 * @param {string} o.data
 * @param {function()} o.success
 * @param {function(string)} o.error
 */
module.exports = function (o) {
    var req = http.request({
        auth: auth.username + ':' + auth.password,
        method: 'PUT',
        host: o.host,
        port: '4306',
        path: o.path
    });

    req.on('response', function (res) {
        console.log(res.statusCode, res.statusMessage, o.path);

        res.on('end', function (chunk) {
            o.success();
        });

        res.on('error', function (err) {
            o.error('Problem with response: ' + err.message);
        });
    });

    req.on('error', function (err) {
        o.error('Problem with request: ' + err.message);
    });

    req.end(o.data);
};
