
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
                tasks: ['compass:dist', 'shell:copy'],
            },

            js: {
                files: ['js/{,**/}*.js'],
                tasks: ['uglify'],
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
            },
            rm_map: {
                command: 'rm stylesheets/*.map'
            },
            copy: {
                command: [
                    'cp -R stylesheets/ ../contrivers/static/css/',
                    'cp -R images/      ../contrivers/static/images/',
                    'cp -R fonts/       ../contrivers/static/fonts/'
                ].join(' && ')
            }
        },

        uglify: {
            options: { mangle: false, beautify: true },
            all: {
                files: {
                    // NOTE destination is in the Python app folder
                    '../contrivers/static/js/contrivers.js': [
                    ]
                }
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
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('bootstrap', [
        'shell:bundler',
        'shell:bower',
    ]);

    grunt.registerTask('make-and-copy', [
        'bootstrap',
        'shell:bundler',
        'shell:bower',
        'compass:dist',
        'uglify',
        'shell:copy'
    ]);

    grunt.registerTask('default', [
        'bootstrap',
        'compass:dev',
        'hologram',
        'connect',
        'watch'
    ]);

    grunt.registerTask('dist', [
        // 'shell:rm_map',
        'compass:dist',
        'shell:copy'
    ]);
};
