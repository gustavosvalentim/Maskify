module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'dist/js/maskify.min.js': 'dist/js/maskify.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-babel');
    grunt.registerTask('minify', ['babel']);
};