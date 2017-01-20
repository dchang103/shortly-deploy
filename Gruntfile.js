module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },
    
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: 'public/client/**/*.js',
        dest: 'public/dist/app.js',
      },
      libs: {
        src: ['public/lib/underscore.js', 'public/lib/jquery.js', 'public/lib/handlebars.js', 'public/lib/backbone.js'],
        dest: 'public/dist/libs.js',
      }
      // css: {
      //   src: ['public/style.css'],
      //   dest: 'public/dist/style.css'
      // }
    },
    // The pattern of /**/ basically mean traverse through all the children levels of the directory 
    // hierarchy, and the *.js means all the file with extension of js
    uglify: {
      my_target: {
        files: {
          'public/dist/app.min.js': 'public/dist/app.js',
          'public/dist/libs.min.js': 'public/dist/libs.js',
          // 'public/dist/style.min.css': 'public/dist/style.css'
        }
      }
    },

    eslint: {
      target: [ 'app/**/*.js', 'lib/**/*.js' ]
        // Add list of files to lint here
    },

    cssmin: {
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      push: {
        command: 'git push live master'
      }
    },
    cssmin: {
      target: {
        files: {
          'public/dist/style.min.css': 'public/style.css',
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [ 'concat', 'uglify', 'cssmin']);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('push')) {
      grunt.task.run(['shell']);
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [ 'build', 'eslint', 'test', 'upload' ]);

};
