var fs = require('fs'),
    glob = require('glob'),
    hosts = require('./util/hosts.json'),
    writeFile = require('./util/write-file.js');

module.exports = function (grunt) {
    grunt.registerTask('write', function (type, option) {
        var done = this.async();

        if (type === 'methode') {
            glob('**/*', {
                cwd: 'src/methode',
                nodir: true
            }, function (err, files) {
                if (err) {
                    console.error(err);
                    grunt.fail.fatal('Error in glob src/methode/**/*. Exiting without changes.');
                    done();
                } else {
                    var count = files.length;
                    function checkComplete() {
                        count -= 1;
                        if (count === 0) {
                            done();
                        }
                    }

                    /*writeFile({
                        host: hosts.dev.address,
                        path: '/PortalConfig/ci-test',
                        method: 'MKCOL',
                        success: function (res) {
                            grunt.log.ok(res.statusCode, res.statusMessage, '-', '/PortalConfig/ci-test');
                            done();
                        },
                        error: function (err) {
                            grunt.log.error(err);
                            done();
                        }
                    });*/

                    files.forEach(function (path) {
                        path = '/' + path;
                        writeFile({
                            host: hosts.dev.address,
                            path: path,
                            data: grunt.file.read('src/methode/' + path),
                            success: function (res) {
                                grunt.log.ok(res.statusCode, res.statusMessage, '-', path);
                                checkComplete();
                            },
                            error: function (err) {
                                grunt.log.error(err);
                                checkComplete();
                            }
                        });
                    });
                }
            });
        } else {
            grunt.fail.fatal('Unknown build type. Exiting without changes.');
        }
    });
};
