module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      app: {
        files: [
          {expand: true, src: ['app.js', 'config.js', 'config.json', 'package.json',
            'app/**', 'run', 'debug'], dest: 'build/'}
        ]
      }
    },
    clean:{
      build: ['build/']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['clean:build','copy:app']);

  grunt.registerTask('default', ['build']);
};