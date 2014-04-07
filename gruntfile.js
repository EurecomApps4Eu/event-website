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
    */
    copy: {
      dev: {
        files: [
          {
            src: 'bower_components/bootstrap/dist/css/bootstrap.min.css',
            dest: 'dist/bootstrap/bootstrap.min.css',
          },
          {
            src: 'bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
            dest: 'dist/bootstrap/bootstrap-theme.min.css',
          },
          {
            src: 'app/styles/app.css',
            dest: 'dist/app.css',
          },
          {
            expand: true,
            cwd: 'bower_components/font-awesome/css/',
            src: '*',
            dest: 'dist/font-awesome/css/',
          },
          {
            expand: true,
            cwd: 'bower_components/font-awesome/fonts/',
            src: '*',
            dest: 'dist/font-awesome/fonts/',
          },
        ]
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['browserify', 'jshint']);
  grunt.registerTask('all', ['browserify', 'jshint', 'copy']);

};
