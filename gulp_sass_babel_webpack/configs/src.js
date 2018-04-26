/* *********************
 gulpfile.jsを起点としたプロジェクトへのパス
******************** */
const rootPath = './src/';

/* *********************
 各タスク機能の有効、無効を設定
******************** */
const enable = {
	sass: true, // SASS
	uglify: true, // JS圧縮
	babel: true, // ECMASCRIPT
	webpack: true, // ESモジュール
	pug: false, // Pugテンプレートエンジン
	haml: false // Hamlテンプレートエンジン
}

/* *********************
 webpack使用時に設定
******************** */
const ESmoduleFileName = {
	entry: 'index.js', // webpackのエントリーポイント
	bandle: 'bandle.js' // バンドル後のファイル名
}

/* *********************
 各ディレクトリの名前※構造通りであれば変更不要
******************** */
const dirNames = {
	sass: 'scss',
	css: 'css',
	images: 'images',
	js: 'js',
	jsmin: 'min',
	es6: 'es6',
	esm: 'esm',
	pug: 'pug',
	haml: 'haml'
}

/* *********************
 変更不要エリア
******************** */
const value = {
	sass: {
		src: [rootPath + dirNames.sass + '/' + '*.scss'],
		dest: rootPath + dirNames.css + '/',
		img: rootPath + dirNames.images + '/'
	},
	uglify: {
		src: [rootPath + dirNames.js + '/' + '*.js'],
		dest: rootPath + dirNames.js + '/' + dirNames.jsmin + '/'
	},
	babel: {
		src: [rootPath + dirNames.es6 + '/' + '*.es6.js'],
		dest: rootPath + dirNames.js + '/'
	},
	webpack: {
		src: [rootPath + dirNames.js + '/' + dirNames.esm + '/' + ESmoduleFileName.entry],
		dest: rootPath + dirNames.js + '/',
		afterName: ESmoduleFileName.bandle
	},
	pug: {
		src: [rootPath + dirNames.pug + '/' + '*.pug'],
		dest: rootPath
	},
	haml: {
		src: [rootPath + dirNames.haml],
		dest: rootPath + dirNames
	}
}

let checkEnable = (value) => {
	for(let i in value) {
		if(enable[i]) {
			module.exports[i] = value[i];
		}
	}
}
checkEnable(value);
console.log('module.exports = ', module.exports);
