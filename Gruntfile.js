module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Grunt tasks
    less: {
      development: {
        files: {
          'css/bootstrap.css': ['less/bootstrap.less']
        },
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          sourceMap: true,
          sourceMapFilename: 'css/bootstrap.css.map', // where file is generated and located
          sourceMapURL: '/groepsadmin/css/bootstrap.css.map', // the complete url and filename put in the compiled css file
          //sourceMapBasepath: 'public', // Sets sourcemap base path, defaults to current working directory.
          sourceMapRootpath: '/groepsadmin', // adds this path onto the sourcemap filename and less file paths
        }
      }
    },

    watch: {
      options: {
        livereload: true,
      },
      // Watch for LESS changes and build CSS automatically
      styles: {
        // Which files to watch (all .less files recursively in the less directory)
        files: ['less/**/*.less'],
        tasks: ['less'],
        options: {
          nospaces: true
        }
      },/*
      // Watch for JS changes.
      scripts: {
        files: ['js/*.js'],
        tasks: ['less::development']
      }*/
      // Watch html files, just for LiveReload
      templates: {
        files: ['*.html']
      }
    }

  });

  // Load required modules
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Task definitions
  grunt.registerTask('default', ['watch']);

};