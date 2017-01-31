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
          'js/sources.js',
          'js/main.js',
          'Gruntfile.js'
        ],
        tasks: ['jshint', 'concat','notify:successJs']
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
          'stylesheets/style.css': ['stylesheets/style-prefixed.css']
        },
      },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['Gruntfile.js', 'js/main.js']
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['js/sources.js','js/main.js'],
        dest: 'js/scripts-concat.js',
      },
    },
    uglify: {
      my_target: {
        files: {
          'js/scripts-min.js': ['js/scripts-concat.js']
        },
      },
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
  grunt.loadNpmTasks('grunt-notify');
  // Register the default tasks.
  grunt.registerTask('default', ['watch', 'notify']);
  grunt.registerTask('prod', ['sass:dist', 'autoprefixer', 'cssmin', 'jshint', 'concat','uglify', 'notify:successProduction']);
};