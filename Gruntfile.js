var postcss = function(){
  return require('poststylus')([
    'autoprefixer',
  // 'rucksack-css'
]);
}

module.exports = function(grunt) {

  grunt.initConfig({

    stylus: {
      compile: {
        options: {
          use: [postcss]
        },
        files: {
          'public/css/main.css': 'public/styl/main.styl'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.registerTask('dev', ['stylus']);
};
