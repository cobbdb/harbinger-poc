var http = require('http'),
    auth = require('../../auth.json');

/**
 * @param {Object} o
 * @param {string} o.path
 * @param {string} o.host
 * @param {function(string)} o.success
 * @param {function(string)} o.error
 */
module.exports = function (o) {
    var req = http.request({
        auth: auth.username + ':' + auth.password,
        method: 'GET',
        host: o.host,
        port: '4306',
        path: o.path
    });

    req.on('response', function (res) {
        var file = '';
        console.log(res.statusCode, res.statusMessage, o.path);

        if (res.statusCode === 200) {
            res.on('data', function (chunk) {
                file += chunk;
            });
            res.on('end', function () {
                o.success(file);
            });
        } else {
            o.error('Problem with response: ' + res.statusCode + ' ' + res.statusMessage);
        }

        res.on('error', function (err) {
            o.error('Problem with response: ' + err.message);
        });
    });

    req.on('error', function (err) {
        o.error('Problem with request: ' + err.message);
    });

    req.end();
};
