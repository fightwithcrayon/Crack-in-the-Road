module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: 'sass/style.scss',
        tasks: ['sass:dev', 'notify:successCss'],
      },
      js: {
        files: [
          'js/src/sources.js',
          'js/src/main.js',
          'Gruntfile.js'
        ],
        tasks: ['jshint','babel','concat','uglify:scripts','notify:successJs']
      }
    },
    sass: {
        options: {
            sourceMap: false
        },
        dev: {
            files: {
              //We fake the minified version here, which is produced properly by prod chain
              'stylesheets/style-min.css': 'sass/style.scss'
            }
        },
        dist: {
            files: {
              'stylesheets/src/style.css': 'sass/style.scss'
            }
        }
    },
    autoprefixer: {
      dist: {
        options: {
          browsers: ['last 1 version', '> 1%', 'ie 8']
        },
        files: {
          'stylesheets/style-prefixed.css': ['stylesheets/src/style.css']
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'stylesheets/style-min.css': ['stylesheets/style-prefixed.css']
        },
      },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'js/src/main.js']
    },
    babel: {
        options: {
            presets: ['es2015']
        },
        dist: {
            files: {
                'js/src/main-babel.js': 'js/src/main.js'
            }
        }
    },
    concat: {
      options: {
        separator: ';',
        stripBanners: true
      },
      dist: {
        src: ['js/src/sources.js','js/src/main-babel.js'],
        dest: 'js/scripts-concat.js',
      },
    },
    uglify: {
      scripts: {
        files: {
          'js/scripts-min.js': ['js/scripts-concat.js']
        },
      },
    },
    browserSync: {
      files: {
        src : [
          'stylesheets/*.css',
          'js/*.js',
          '**/*.php'
        ],
      },
      options: {
        watchTask: true,
        proxy: 'localhost:8888'
      }
    },
//Notification toasts
    notify: {
      options: {
        enabled: true,
        max_jshint_notifications: 5,
        success: true,
        duration: 3
      },
      successCss: {
          options:{
              title: "Grunt successful",
              message: "All CSS tasks complete"
          }
      },
      successJs: {
          options:{
              title: "Grunt successful",
              message: "All JS tasks complete"
          }
      },
      successProduction: {
          options:{
              title: "Grunt successful",
              message: "Project prepared for production"
          }
      }
    }
  });

  // Load the Grunt plugins.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-babel');
  // Register the default tasks.
  grunt.registerTask('default', ['browserSync', 'watch', 'notify']);
  grunt.registerTask('prod', ['sass:dist', 'autoprefixer', 'cssmin', 'jshint','babel','concat','uglify', 'notify:successProduction']);
};