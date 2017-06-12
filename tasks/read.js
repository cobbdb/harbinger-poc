module.exports = function (grunt) {
    grunt.registerTask('build', function (type, option) {
        if (type in build) {
            build[type](grunt, option);
        } else if (!type) {
            for (type in build) {
                build[type](grunt, option);
            }
        } else {
            grunt.fail.fatal('Unknown build type. Exiting without building.');
        }
    });
};
