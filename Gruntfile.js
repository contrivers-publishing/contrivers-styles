'use strict';

module.exports = function(grunt) {
  var target = grunt.option('target') || '*';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    shell: {
      bundler: {
        command: 'bundle'
      },
      bower: {
        command: 'bower install'
      },
      copy: {
        command: [
          'cp -R stylesheets/ ../contrivers/static/css/',
          'cp -R images/      ../contrivers/static/images/',
          'cp -R fonts/       ../contrivers/static/fonts/',
          'cp stylesheets/marked.css ~/Dropbox/Mergner-Sinnott\ Shares/Journal/contrivers-marked.css'
        ].join(' && ')
      }
    },
    watch: {
      compass: {
        files: ['sass/{,**/}*.scss'],
        tasks: ['compass:dev']
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

    // Grunt Contrib Compass
    // https://github.com/gruntjs/grunt-contrib-compass
    compass: {
      options: {
        sassDir: 'sass',
        config: 'config.rb',
        bundleExec: true,
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

    // Grunt connect
    // https://github.com/gruntjs/grunt-contrib-connect
    connect: {
      server: {
        options: {
          livereload: 1337,
          port: 9001,
          base: './',
          open: false
        }
      },
      test: {
        options: {
          livereload: 1337,
          port: 9001,
          base: './',
        }
      }
    },

    phantomcss: {
      options: {
        mismatchTolerance: 0.05,
        logLevel: 'info',
        cleanupComparisonImages: true,
      },
      sass: {
        options: {
          screenshots: 'phantomcss/baselines',
          results: 'phantomcss/results',
          viewportSize: [1280, 800],
        },
        src: [
          // 'phantomcss.js'
          './sass/**/' + target + '-test.js'
        ]
      },
    },
  });

  grunt.loadNpmTasks('grunt-aws-s3');
  grunt.loadNpmTasks('grunt-phantomcss');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-hologram');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
      'shell:bundler',
      'shell:bower',
      'compass:dev',
      'hologram',
      'connect:server',
      'watch'
  ]);

  grunt.registerTask('test', function(tests, isNew) {
    if (tests === undefined) {
      grunt.config.set('phantomcss.sass.src', 'sass/**/*-test.js');
    } else if (tests === 'new') {
      grunt.task.run('_testClean:' + '*');
      grunt.config.set('phantomcss.sass.src', 'sass/**/*-test.js');
    } else if (tests === 'clean') {
      grunt.task.run('_testClean:' + '*');
      return;
    } else {
      if (isNew === 'new') {
        grunt.task.run('_testClean:' + tests);
      }
      grunt.config.set('phantomcss.sass.src', 'sass/**/' + tests + '-test.js');
    }
    grunt.task.run('phantomcss');
  });

  // testClean is a private method that will wipe out the baseline folder
  // adjacent to the test file you pass in via the param
  // grunt testClean:featured-item will remove the baseline folder adjacent to
  // featured-item-test.js
  grunt.registerTask('_testClean', function(option) {
    if (option === undefined) {
      grunt.fail.fatal('A test file must be specified for testClean. You can also pass \'*\' to remove all baselines ');
    }
    grunt.file.expand(['sass/**/' + option + '-test.js']).forEach(function(filepath) {
      var directory;
      directory = require('path').dirname(filepath);
      grunt.file.delete(directory + '/baseline');
    });
  });
};

