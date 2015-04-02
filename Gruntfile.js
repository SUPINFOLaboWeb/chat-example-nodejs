module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    copy: {
      main: {
        files: [
          { expand: true, flatten: true, src: ['bower_components/jquery/dist/*.min.{js,map}'], dest: 'public/js', filter: 'isFile' },
          { expand: true, flatten: true, src: ['bower_components/bootstrap/dist/js/*.min.{js,map}'], dest: 'public/js', filter: 'isFile' },
          { expand: true, flatten: true, src: ['bower_components/bootstrap/dist/css/*.min.css'], dest: 'public/css', filter: 'isFile' },
          { expand: true, flatten: true, src: ['bower_components/bootstrap/dist/fonts/*'], dest: 'public/fonts', filter: 'isFile' }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['copy']);
};
