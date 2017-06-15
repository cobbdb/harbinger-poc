var write = require('../http/write.js');

/**
  First pass is always PUT for entire resource path.
    if 201 or 204 or 405:
        return
    else if 409:
        remove right-most chunk from path
        recurse with MKCOL and sub-path
            recurse with original path
 */

/**
 * @param {Object} grunt
 * @param {string} o.host
 * @param {string} o.path
 * @param {string} [o.method] Defaults to PUT.
 * @param {string} [o.data] Unused for MKCOL actions.
 * @param {function} o.success
 * @param {function} o.error
 */
module.exports = function writeFile(grunt, o) {
    write({
        host: o.host,
        path: o.path,
        method: o.method || 'PUT',
        data: o.data,
        success: function (res) {
            if (res.statusCode === 201 || res.statusCode === 204 || res.statusCode === 405) {
                // Resource created/updated successfully or collection already exists.
                // Log the success and unravel the call stack.
                grunt.log.ok(res.statusCode, res.statusMessage, '-', o.path);
                o.success(res);
            } else if (res.statusCode === 409) {
                // Intermediate collections do not exist for this resource or collection.

                // Recurse for the next immediate left-most collection.
                writeFile(grunt, {
                    host: o.host,
                    path: o.path.slice(0, o.path.lastIndexOf('/')),
                    method: 'MKCOL',
                    success: function () {
                        // Try to create this resource again.
                        writeFile(grunt, o);
                    },
                    error: o.error
                });
            } else {
                // Unexpected status code - exit.
                grunt.log.error('Unexpected response status code:', res.statusCode, res.statusMessage, '-', o.path);
                o.error(res.statusMessage);
            }
        },
        error: function (err) {
            grunt.log.error('Request error:', err, '-', o.path);
            o.error(err);
        }
    });
};
