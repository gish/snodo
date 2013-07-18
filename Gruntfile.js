module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	qunit: {
		all : {
			options : {
				urls : ["http://snodo.dev/tests/"]
			}
		}
    },
	watch: {
		files: ['tests/js/*.js', 'tests/*.html', 'js/app/models/*.js', 'js/app/views/*.js', 'js/app/collections/*.js'],
		tasks: ['qunit']
	}
  });
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['qunit']);
};