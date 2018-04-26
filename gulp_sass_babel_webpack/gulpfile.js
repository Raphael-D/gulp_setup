var gulp = require('gulp'),
	glob = require('glob'),
	merge = require('merge-stream'),
	changed = require('gulp-changed'),
	plumber = require('gulp-plumber'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	pleeease = require('gulp-pleeease'),
	haml = require('gulp-ruby-haml'),
	pug = require('gulp-pug'),
	babel = require('gulp-babel'),
	sourcemaps = require('gulp-sourcemaps'),
	sassGlob = require('gulp-sass-glob'),
	notifier = require('node-notifier'),
	postcss = require('gulp-postcss'),
	assets = require('postcss-assets'),
	css_sort = require('css-declaration-sorter'),
	ESmodule = require('webpack'),
	webpackStream = require('webpack-stream');
const CONFIGS = [];
glob.sync('./configs/*.js').forEach(function(filePath) {
	CONFIGS.push(require(filePath));
});
var errorLog = error => {
	notifier.notify({
		message: error.message,
		title: error.plugin
	});
}
//Sassコンパイル
gulp.task('sass', function() {
	var tasks = CONFIGS.map(config => {
		if (config.sass) {
			return gulp.src(config.sass.src)
				.pipe(plumber())
				.pipe(changed(config.sass.dest))
				.pipe(sourcemaps.init())
				.pipe(sassGlob())
				.pipe(sass({
					outputStyle: 'expanded',
					sourcemap: true
				}))
				.on('error', errorLog)
				.pipe(postcss([css_sort({
					order: 'smacss'
				})]))
				.pipe(postcss([assets({
					loadPaths: [config.sass.img],
					relative: true
				})]))
				.pipe(pleeease({
					autoprefixer: true,
					mqpacker: true,
					minifier: false
				}))
				.pipe(sourcemaps.write('./maps/'))
				.pipe(gulp.dest(config.sass.dest));
		} else {
			return gulp.src('./');
		}
	});
	return merge(tasks);
});
gulp.task('cssmin', function() {
	var tasks = CONFIGS.map(config => {
		if (config.sass) {
			return gulp.src(config.sass.src)
				.pipe(plumber())
				.on('error', function(err) {
					console.log(err.message);
				})
				.pipe(changed(config.sass.dest))
				.pipe(sourcemaps.init())
				.pipe(sassGlob())
				.pipe(sass({
					outputStyle: 'expanded',
					sourcemap: true
				}))
				.on('error', errorLog)
				.pipe(postcss([css_sort({
					order: 'smacss'
				})]))
				.pipe(postcss([assets({
					loadPaths: [config.sass.img],
					relative: true
				})]))
				.pipe(pleeease({
					autoprefixer: true,
					mqpacker: true,
					minifier: true
				}))
				.pipe(sourcemaps.write())
				.pipe(rename({
					extname: '.min.css'
				}))
				.pipe(gulp.dest(config.sass.dest));
		} else {
			return gulp.src('./');
		}
	});
	return merge(tasks);
});
//ES6用babel
gulp.task('babel', function() {
	var tasks = CONFIGS.map(config => {
		if (config.babel) {
			return gulp.src(config.babel.src)
				.pipe(plumber())
				.pipe(changed(config.babel.dest))
				.pipe(babel({
					presets: ['es2015']
				}))
				.on('error', errorLog)
				.pipe(rename(function(path) {
					var cutLength = path.basename.length - 4;
					path.basename = path.basename.slice(0, cutLength);
				}))
				.pipe(gulp.dest(config.babel.dest));
		} else {
			return gulp.src('./');
		}
	});
	return merge(tasks);
});
// ESモジュールバンドラー
gulp.task('ESmodule', function() {
	var tasks = CONFIGS.map(config => {
		if (config.webpack) {
			const webpackConfig = () => {
				return module.exports = {
					mode: 'development',
					// devtool: 'source-map',
					entry: config.webpack.src,
					module: {
						rules: [{
							test: /\.js$/,
							use: [{
								loader: 'babel-loader',
								options: {
									presets: [
										['env', {
											"targets": {
												"ie": "11"
											}
										}]
									]
								}
							}]
						}]
					},
					output: {
						filename: config.webpack.afterName
					}
				}
			}
			return webpackStream(webpackConfig(), ESmodule)
				.pipe(gulp.dest(config.webpack.dest));
		} else {
			return gulp.src('./');
		}
	});
	return merge(tasks);
})
//JSファイル軽量化
gulp.task('jsmin', function() {
	var tasks = CONFIGS.map(config => {
		if (config.uglify) {
			return gulp.src(config.uglify.src)
				.pipe(plumber())
				.pipe(changed(config.uglify.dest))
				.pipe(sourcemaps.init())
				.pipe(uglify())
				.on('error', errorLog)
				.pipe(rename({
					extname: '.min.js'
				}))
				.pipe(sourcemaps.write('../maps/'))
				.pipe(gulp.dest(config.uglify.dest));
		} else {
			return gulp.src('./');
		}
	});
	return merge(tasks);
});
//HAMLコンパイル
gulp.task('haml', function() {
	var tasks = CONFIGS.map(config => {
		if (config.haml) {
			return gulp.src(config.haml.src)
				.pipe(changed(config.haml.dest))
				.pipe(haml({
					encodings: "UTF-8"
				}).on('error', errorLog))
				.pipe(rename({
					extname: '.html'
				}))
				.pipe(gulp.dest(config.haml.dest));
		} else {
			return gulp.src('./');
		}
	});
	return merge(tasks);
});
//PUGコンパイル
gulp.task('pug', function() {
	var tasks = CONFIGS.map(config => {
		if (config.pug) {
			return gulp.src(config.pug.src)
				.pipe(plumber())
				.pipe(changed(config.pug.dest))
				.pipe(pug({
					pretty: true
				}))
				.on('error', errorLog)
				.pipe(rename({
					extname: '.html'
				}))
				.pipe(gulp.dest(config.pug.dest));
		} else {
			return gulp.src('./');
		}
	});
	return merge(tasks);
})
//ファイル監視
gulp.task('watch', () => {
	var jsminSrc = [];
	var cssminSrc = [];
	var sassSrc = [];
	var hamlSrc = [];
	var pugSrc = [];
	var babelSrc = [];
	var webpackSrc = [];
	CONFIGS.forEach(config => {
		if (config.sass) {
			sassSrc.push(config.sass.src);
			cssminSrc.push(config.sass.src);
		}
		if (config.babel) {
			babelSrc.push(config.babel.src);
		}
		if (config.uglify) {
			jsminSrc.push(config.uglify.src);
		}
		if (config.haml) {
			hamlSrc.push(config.haml.src);
		}
		if (config.pug) {
			pugSrc.push(config.pug.src);
		}
		if (config.webpack) {
			webpackSrc.push(config.webpack.src);
		}
	});
	gulp.watch(sassSrc, gulp.parallel('sass'));
	gulp.watch(babelSrc, gulp.parallel('babel'));
	gulp.watch(jsminSrc, gulp.parallel('jsmin'));
	gulp.watch(cssminSrc, gulp.parallel('cssmin'));
	gulp.watch(hamlSrc, gulp.parallel('haml'));
	gulp.watch(pugSrc, gulp.parallel('pug'));
	gulp.watch(webpackSrc, gulp.parallel('ESmodule'));
	console.log("\n" +
		" __  __              ___       ___                          __      __                    ___        __ \n" +
		"/\\ \\/\\ \\            /\\_ \\     /\\_ \\                        /\\ \\  __/\\ \\                  /\\_ \\      /\\ \\ \n" +
		"\\ \\ \\_\\ \\      __   \\//\\ \\    \\//\\ \\      ___              \\ \\ \\/\\ \\ \\ \\    ___    _ __  \\//\\ \\     \\_\\ \\ \n" +
		" \\ \\  _  \\   /'__`\\   \\ \\ \\     \\ \\ \\    / __`\\             \\ \\ \\ \\ \\ \\ \\  / __`\\ /\\`'__\\  \\ \\ \\    /'_` \\ \n" +
		"  \\ \\ \\ \\ \\ /\\  __/    \\_\\ \\_    \\_\\ \\_ /\\ \\L\\ \\             \\ \\ \\_/ \\_\\ \\/\\ \\L\\ \\\\ \\ \\/    \\_\\ \\_ /\\ \\L\\ \\ \n" +
		"   \\ \\_\\ \\_\\\\ \\____\\   /\\____\\   /\\____\\\\ \\____/              \\ `\\___x___/\\ \\____/ \\ \\_\\    /\\____\\\\ \\___,_\\ \n" +
		"    \\/_/\\/_/ \\/____/   \\/____/   \\/____/ \\/___/                '\\/__//__/  \\/___/   \\/_/    \\/____/ \\/__,_ / \n")
});
console.log("＼( 'ω')／ウオオオオオオアアアアアアアアアアーーーーーッッッッ！！！！");

const defaultTask = gulp.series('watch');
gulp.task('default', defaultTask);
