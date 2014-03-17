module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        files: {
          'dist/app.bundle.js': ['app.js']
        },
        options: {
          transform: ['hbsfy']
        },
      }
    },
    jshint: {
      files: ['gruntfile.js', 'js/modules/*.js', 'js/*.js'],
    },
    /*
    sass: {
      dist: {
        files: {
          'phonegap/www/css/main.css': 'sass/main.scss'
        }
      }
    },
    copy: {
      dev: {
        files: [
          {
            src: 'bower_components/jquery-hammerjs/jquery.hammer.min.js',
            dest: 'phonegap/www/js/jquery.hammer.min.js',
          },
          {
            src: 'bower_components/hammerjs/hammer.min.js',
            dest: 'phonegap/www/js/hammer.min.js',
          },
          {
            src: 'bower_components/jquery/dist/jquery.min.js',
            dest: 'phonegap/www/js/jquery.min.js',
          },
        ]
      }
    },
    */
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['browserify', 'jshint']);
  grunt.registerTask('all', ['browserify', 'jshint', 'sass', 'copy']);

};
