module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, src: ['bower_components/jquery/dist/*.min.{js,map}'], dest: 'public/js', filter: 'isFile' },
          { expand: true, flatten: true, src: ['bower_components/bootstrap/dist/js/*.min.{js,map}'], dest: 'public/js', filter: 'isFile' },
          { expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: 'public/fonts', filter: 'isFile' },
          { expand: true, flatten: true, src: ['node_modules/socket.io-client/socket.io.js'], dest: 'public/js' },
          { expand: true, flatten: true, src: ['bower_components/react/*.min.{js,map}'], dest: 'public/js', filter: 'isFile' },
          { expand: true, flatten: true, src: ['app/assets/jsx/*.js'], dest: 'public/js', filter: 'isFile' }
        ]
      }
    },

    react: {
      files: {
        expand: true,
        cwd: 'app/assets/jsx',
        src: ['**/*.jsx'],
        dest: 'public/js',
        ext: '.js'
      }
    },

    less: {
      production: {
        options: {
          paths: ['app/assets/less', 'bower_components/bootstrap/less'],
          compress: true
        },
        files: {
          'public/css/style.css': 'app/assets/less/app.less'
        }
      },

      development: {
        options: {
          paths: ['app/assets/less', 'bower_components/bootstrap/less']
        },
        files: {
          'public/css/style.css': 'app/assets/less/app.less'
        }
      }
    },

    watch: {
      less: {
        files: ['app/assets/less/**/*.less'],
        tasks: ['less:development'],
        options: {
          livereload: true
        }
      },

      react: {
        files: ['app/assets/jsx/**/*.jsx'],
        tasks: ['react'],
        options: {
          livereload: true
        }
      },

      copy: {
        files: ['app/assets/jsx/**/*.js'],
        task: ['copy'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('build', ['copy', 'less:production', 'react']);

  grunt.registerTask('default', ['copy', 'less:development', 'react', 'watch']);
};
