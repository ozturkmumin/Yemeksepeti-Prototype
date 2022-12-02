var vhost = "";


var server = {
	options: {
		hostname: "localhost",
		port: 3000,
		base: "dev",
		livereload: true,
		open: true
	}
}

if (vhost) {
	server.options.middleware = function (connect, options) {
		return [proxySnippet];
	}

	server.proxies = [{
		context: "/",
		host: vhost,
		port: 80,
		headers: {
			"host": vhost
		}
	}];
}

module.exports = function(grunt) {

	

    require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		connect: {
			server: server
		},
		sass: {
			dev: {
				files: {
					"dev/assets/css/core.css": "dev/assets/scss/core.scss"
				},
				options: {
					sourceComments: true
				}
			}
		},
		
		uglify: {
			jsFile: {
				options: {
					beautify: true
				},
				files: {
					'dev/assets/js/core.min.js': ['dev/assets/js/core.js']
				}
			}
		},
		cssmin: {
			cssFile: {
				files: {
					'dev/assets/css/core.min.css': ['dev/assets/css/core.css']
				}
			}
		},
	    watch: {
			files: {
				files: "dev/**/*.{html,css,js}",
				options: {
					livereload: true
				}
			},
			scss: {
				files: "dev/**/*.scss",
				tasks: ["sass","cssmin"]
			},
			corejs: {
				files: ["dev/assets/js/lib/*.js", "dev/assets/js/core.js"]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('default', ['configureProxies:server', 'connect','uglify:jsFile','sass', 'cssmin:cssFile','watch']);

};