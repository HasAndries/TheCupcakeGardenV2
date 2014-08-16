module.exports = function (grunt) {
  var config = grunt.file.readJSON('config.json')['all'];
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      css: {
        options: {
          separator: grunt.util.linefeed
        },
        src: config.cssFiles.map(function(file){ return 'app/public'+file;}),
        dest: 'app/public/all.css'
      },
      app: {
        options: {
          separator: grunt.util.linefeed
        },
        src: config.appFiles.map(function(file){ return 'app/public'+file;}),
        dest: 'app/public/app.js'
      },
      lib: {
        options: {
          separator: grunt.util.linefeed
        },
        src: config.libFiles.map(function(file){ return 'app/public'+file;}),
        dest: 'app/public/lib.js'
      }
    },
    ngmin:{
      app: {
        src: ['app/public/app.js'],
        dest: 'app/public/app.js'
      },
      lib: {
        src: ['app/public/lib.js'],
        dest: 'app/public/lib.js'
      }
    },
    uglify: {
      app: {
        options: {
          banner: '/*! <%= pkg.name %> app.js <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          footer: '//@ sourceURL=app.js',
          mangle: true
        },
        files: {
          'app/public/app.js': ['app/public/app.js']
        }
      },
      lib: {
        options: {
          banner: '/*! <%= pkg.name %> lib.js <%= grunt.template.today("dd-mm-yyyy") %> */\n',
          footer: '//@ sourceURL=lib.js',
          mangle: true
        },
        files: {
          'app/public/lib.js': ['app/public/lib.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('concatAll', ['concat:css', 'concat:app', 'concat:lib']);
  grunt.registerTask('ngminAll', ['ngmin:app', 'ngmin:lib']);
  grunt.registerTask('uglifyAll', ['uglify:app', 'uglify:lib']);

  grunt.registerTask('dist', ['concatAll', 'ngminAll', 'uglifyAll']);
  grunt.registerTask('default', ['dist']);
};