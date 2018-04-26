/* ==============================================
*
* gulpfile.jsを起点とした相対パスをご記入ください。
*
* 使用するタスクのみ記入し、
*
* 使用しないタスクはコメントアウトしてください
*
* プロジェクト毎に複製してファイル名とパスを編集してご利用ください。
*
============================================== */
module.exports = {
	sass: { // SCSS
		src: ['./src/scss/*.scss'], // sassのディレクトリ
		dest: './src/css/dest/', // scss => cssコンパイル後のディレクトリ
		img: './src/images/' // imagesディレクトリ
	},
	babel: { // Babel
		src: ['./src/js/es6/*.es6.js'], // es6のjavascriptディレクトリ
		dest: './src/js/' // es6 => es5変換後のディレクトリ
	},
	haml: { // Haml
		src: ['./src/haml/*.haml'], // hamlのディレクトリ
		dest: './src/' // haml => html変換後のディレクトリ
	},
	pug: { // Pug
		src: ['./src/pug/*.pug'], // pugのディレクトリ
		dest: './src/' // pug => html変換後のディレクトリ
	},
	uglify: { // JSminify
		src: ['./src/js/*.js'], // 圧縮するjavascriptのディレクトリ
		dest: './src/js/min/' // 圧縮後のJavaScriptのディレクトリ
	}
}
