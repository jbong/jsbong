/**
 * Created with JetBrains WebStorm.
 * User: jez
 * Date: 08/05/2013
 * Time: 08:54
 * To change this template use File | Settings | File Templates.
 */

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        jasmine : {
            options : {
                specs : 'spec/*.js'
            },
            src : 'src/*.js'
        },

        concat: {
            dist: {
                src: ['src/*.js'],
                dest: 'dist/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },

        jshint: {
            beforeconcat: ['src/*.js'],
            afterconcat: ['<%= concat.dist.dest %>']
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('test', ['jasmine', 'jshint:beforeconcat']);
    // Default task(s).
    grunt.registerTask('default', ['test','concat','jshint:afterconcat' ,'uglify']);

};