module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    sass: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'dist/css/main.css': 'src/sass/main.scss'
            }
        }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'dist/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css',
          ext: '.min.css'
        }]
      }
    },
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({browsers: ['last 1 version']}),
          require('cssnext')()
        ]
      },
      dist: {
        src: 'dist/css/main.css',
        dest: 'dist/css/main.css'
      }
    }
  });

  //css
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-postcss');

  //JS
  grunt.loadNpmTasks('grunt-contrib-uglify');


  // this would be run by typing 'grunt runSass' on the command line
  grunt.registerTask('runSass', ['sass']);
  grunt.registerTask('postItCss', ['postcss']);
  grunt.registerTask('minCss', ['cssmin']);
  grunt.registerTask('distroCss', ['sass', 'postcss', 'cssmin']);


  // the default task can be run just by typing 'grunt' on the command line
  grunt.registerTask('default', ['browserSync','watch']);

};