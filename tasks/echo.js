module.exports = function (grunt) {
    grunt.config.merge({
        exec: {
            echo: {
                cmd: [
                    'ping www.google.com',
                    'echo hello there'
                ].join('&&'),
                stdout: false,
                stderr: false,
                exitCodes: [0, 1],
                callback: function (exitCode, stdout, stderr) {
                    if (stderr) {
                        grunt.log.error(stderr);
                    }
                    if (stdout) {
                        grunt.log.ok(stdout);
                    }
                }
            }
        }
    });
};
