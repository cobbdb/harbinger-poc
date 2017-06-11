module.exports = function (grunt) {
    // Load all tasks.
    require('matchdep').filterDev([
        'grunt-*',
        '!grunt-template-*'
    ]).forEach(grunt.loadNpmTasks);
    grunt.loadTasks('tasks');

    grunt.registerTask('default', 'Build all assets.', [
        'build:js',
        'build:css'
    ]);
    grunt.registerTask('push-all', 'Pushing all assets.', [
        'push:js',
        'push:css'
    ]);
};
