var path = require('path');

module.exports = function(grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    includePaths: require('node-foundation-sass').includePaths
                },
                files: {
                    'assets/stylesheets/css/application.css': 'assets/stylesheets/sass/application.sass'
                }
            }
        },
        express: {
            options: {
                port: 3000,
                hostname: '*'
            },
            livereload: {
                options: {
                    server: path.resolve('./app.js'),
                    livereload: true,
                    serverreload: true,
                    bases: [path.resolve('./public')]
                }
            }
        },
        watch: {
            css: {
                files: ['**/*.sass'],
                tasks: ['sass', 'concat', 'cssmin']
            },
            js: {
                files: ['assets/javascripts/*.js'],
                tasks: ['concat', 'uglify', 'jshint']
            }
        },
        jshint: {
            all: {
                src: 'public/dist/main.js'
            }
        },
        concat: {
            js: {
                src: 'assets/javascripts/*.js',
                dest: 'public/dist/main.js'
            },
            css: {
                src: 'assets/stylesheets/css/*.css',
                dest: 'public/dist/main.css'
            }
        },
        uglify: {
            dist: {
                src: 'public/dist/main.js',
                dest: 'public/dist/main.min.js'
            }
        },
        cssmin: {
            css: {
                src: 'public/dist/main.css',
                dest: 'public/dist/main.min.css'
            }
        },
        concurrent: {
            default: ['express', 'watch', 'jshint'],
            options: {
                logConcurrentOutput: true,
                limit: 4
            }
        }
    });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['sass', 'concat', 'uglify', 'cssmin', 'concurrent:default'])
}