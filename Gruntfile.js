'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Watch for changes and trigger compass
        watch: {
            sass: {
                files: ['sass/**/*.{scss,sass}','sass/partials/**/*.{scss,sass}'],
                tasks: ['sass:dist', 'postcss']
            },
            js: {
                files: ['js/src/**/*.js', 'bower_components/**/*.js'],
                tasks: ['bower_concat', 'uglify']
            }
        },

        scsslint: {
            allFiles: [
              'sass/**/*.scss',
            ],
            options: {
              config: '.scss-lint.yml',
              reporterOutput: 'scss-lint-report.xml',
              colorizeOutput: true
            },
        },

        postcss: {
            options: {
              map: true,
              processors: [
                require('autoprefixer-core')({browsers: 'last 2 versions'}).postcss
              ]
            },
            dist: {
              src: 'css/*.css'
            }
        },

        // Compass and scss
        sass: {
            options: {
                sourceMap: true,
                outputStyle: 'nested'
            },
            dist: {
                files: {
                    'css/styles.css': 'sass/styles.scss'
                }
            },
            prod: {
                options: {
                  outputStyle: 'compressed'
                },
                files: {
                    'css/styles.css': 'sass/styles.scss'
                }
            }
        },

        browserSync: {
            bsFiles: {
                src : ['css/**/*.css', 'js/*.js', '*.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        },

        bower_concat: {
          vendors: {
            dest: 'js/src/vendors.js'
          }
        },

        uglify: {
            all: {
                options: {
                    sourceMap: true
                },
                files: {
                    'js/vendors.min.js': ['js/src/vendors.js'],
                    'js/script.min.js': ['js/src/script.js']
                }
            }
        }
    });

    grunt.registerTask('default', ['bower_concat', 'uglify', 'browserSync', 'sass:dist', 'watch']);
    grunt.registerTask('prod', ['sass:prod', 'postcss']);
};