var http = require('http'),
    auth = require('../../auth.json');

/**
 * @param {Object} o
 * @param {string} o.path
 * @param {string} o.host
 * @param {string} o.data
 * @param {string} [o.method] Defaults to PUT.
 * @param {function()} o.success
 * @param {function(string)} o.error
 */
module.exports = function (o) {
    var req = http.request({
        auth: auth.username + ':' + auth.password,
        method: o.method || 'PUT',
        host: o.host,
        port: '4306',
        path: o.path
    });

    req.on('response', function (res) {
        res.on('aborted', function () {
            o.success(res);
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
