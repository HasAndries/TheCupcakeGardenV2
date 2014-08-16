module.exports = function (grunt) {
  var config = grunt.file.readJSON('config.json')['all'];
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less:{
      css:{
        files:{
          "app/public/main.css": "app/public/styles/main.less"
        }
      }
    },
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
    },
    cssmin:{
      all: {
        options: {
          banner: '/*! <%= pkg.name %> all.css <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          'app/public/all.css': ['app/public/all.css']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ngmin');

  grunt.registerTask('lessAll', ['less:css']);
  grunt.registerTask('concatAll', ['concat:css', 'concat:app', 'concat:lib']);
  grunt.registerTask('ngminAll', ['ngmin:app', 'ngmin:lib']);
  grunt.registerTask('uglifyAll', ['uglify:app', 'uglify:lib']);
  grunt.registerTask('cssminAll', ['cssmin:all']);

  grunt.registerTask('dist', ['lessAll', 'concatAll', 'ngminAll', 'uglifyAll', 'cssminAll']);
  grunt.registerTask('default', ['dist']);
};