module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    env : {
      dev: {
          NODE_ENV : 'DEVELOPMENT'
      },
      prod : {
          NODE_ENV : 'PRODUCTION'
      }
    },
    preprocess : {
      layout: {
        src : 'src/layout/index.html',
        dest : 'public/index.html',
        options : {
          context : {
            pkgname : '<%= pkg.name %>',
          }
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'src/js/*.js']
    },
    copy: {
      static: { src: 'static/**/*', dest: 'public/' },
      favicon: { src: 'static/favicon/*', dest: 'public/' , expand: true, flatten: true},
      vendor: { src: 'vendor/**/*', dest: 'public/' }
    },
    jade: {
      compile: {
        options: {
            pretty: true
        },
        files: [ { 
          expand: true, 
          dest: "public/partials",
          src: "**/*.jade", 
          cwd: "src/partials",
          ext: '.html'
        } ]
      }
    },
    sass: {
      dist: {
        options: {
          style: 'expanded'
        },
        files: {
          'public/css/<%= pkg.name %>.css' : 'src/scss/*.scss'
        }
      }
    },
    nggettext_extract: {
      pot: {
        files: {
          'po/template.pot': ['public/partials/home.html', 
                              'public/partials/info.html',
                              'public/partials/map.html', 
                              'public/partials/video.html']
        }
      }
    },
    nggettext_compile: {
      all: {
        files: {
          'po/translations.js': ['po/*.po']
        }
      }
    },
    concat: {
      jsdev: {
        src: ['src/js/*.js', 'po/translations.js'],
        dest: 'public/js/<%= pkg.name %>.js'
      },
    },
    uglify: {
      buildVendorJs: {
        options: {
          banner: '/*! Vendor package <%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'public/vendor/<%= pkg.name %>.min.js' : ['vendor/js/modernizr.js',
                                                    'vendor/js/angular-route.min.js',
                                                    'vendor/js/angular-gettext.min.js',
                                                    'vendor/js/markerwithlabel.js',
                                                    'vendor/js/foundation.min.js']
        }
      },
      buildJs: {
        options: {
          mangle: false,
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'public/js/<%= pkg.name %>.min.js' : ['public/js/<%= pkg.name %>.js']
        }
      },
    },
    cssmin: {
      add_banner: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        files: {
          'public/css/<%= pkg.name %>.min.css': ['public/css/<%= pkg.name %>.css'],
          'public/vendor/css/<%= pkg.name %>.min.css': ['vendor/css/*.css']
        }
      }
    },
    clean: {
      dev: ["public/js/<%= pkg.name %>.js", 
            "public/css/<%= pkg.name %>.css"]
    },
    watch: {
      all: {
        options: { livereload: true },
        files: ['Gruntfile.js', 'src/layout/*', 'src/js/*', 'src/scss/*','src/partials/**/*.jade', 'po/*.po'],
        tasks: ['default']
      },
    },
    connect: {
      server: {
        options: {
          port: 3000,
          base: 'public',
          livereload: true
        }
      }
    }
  });

  // Load the plugin that provides the tasks.
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-preprocess');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-angular-gettext');


  // Default task(s).
  grunt.registerTask('once', ['copy']);
  grunt.registerTask('default', ['env:dev', 'preprocess', 'jshint', 'cssmin', 'sass', 'jade', 'nggettext_extract', 'nggettext_compile', 'concat', 'connect', 'watch']);
  grunt.registerTask('prod', ['env:prod', 'preprocess', 'sass', 'jade', 'concat', 'uglify', 'cssmin', 'clean']);

};
