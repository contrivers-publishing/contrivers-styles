
// TODO use this function to download bigfoot.js (instead of the coffee script via
// bower) directly into the js folder... Right now the file is committed
// in the ./js and ./sass/contrib folders

module.exports = function (grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            compass: {
                files: ['sass/{,**/}*.scss'],
                tasks: ['compass:dev'],
            },

            hologram: {
                files: ['sass/{,**/}*.scss'],
                tasks: ['hologram'],
            },
            livereload: {
                options: { livereload: true },
                files: ['stylesheets/{,**/}*.css', 'hologram/**/*'],
            }
        },

        compass: {
            options: {
                sassDir: 'sass',
                config: 'config.rb',
                bundleExec: true,
                force: true,
            },
            dev: {
                options: {
                    environment: 'development',
                    outputStyle: 'expanded',
                }
            },
            dist: {
                options: {
                    environment: 'production',
                    outputStyle: 'compact',
                }
            },
        },

        hologram: {
            generate: {
                options: {
                    config: './hologram/hologram_config.yml'
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: '.',
                    open: false
                }
            }
        },
        shell: {
            bundler: {
                command: 'bundle'
            },
            bower: {
                command: 'bower install'
            }
        },

        phantomcss: {
            options: {
                mismatchTolerance: 0.05,
                logLevel: 'debug',
                cleanupComparisonImages: true,
            },
            sass: {
                options: {
                    altRunner: true,
                    screenshots: 'phantomcss/baselines',
                    results: 'phantomcss/results',
                    viewportSize: [1024, 800],
                },
                src: ['./sass/**/*.js']
            },
        },
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-hologram');
    grunt.loadNpmTasks('grunt-phantomcss');

    grunt.registerTask('bootstrap', [
        'shell:bundler',
        'shell:bower',
        'compass:dev',
        'hologram',
        'connect',
        'watch'
    ]);

    grunt.registerTask('default', [
        'compass:dev',
        'hologram',
        'connect',
        'watch'
    ]);
};
