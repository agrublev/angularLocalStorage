module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': 'src/<%= pkg.name %>.js'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: 'test'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');

//    grunt.registerTask('test', ['jshint', 'qunit']);  //TODO add karma tests

    grunt.registerTask('default', ['uglify']);
}