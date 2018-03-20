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
		src: ['./mysite_hoge/scss/*.scss'], // sassのディレクトリ
		dest: './mysite_hoge/css/', // scss => cssコンパイル後のディレクトリ
		img: './mysite_hoge/images/' // imagesディレクトリ
	},
	babel: { // Babel
		src: ['./mysite_hoge/js/es6/*.es6.js'], // es6のjavascriptディレクトリ
		dest: './mysite_hoge/js/' // es6 => es5変換後のディレクトリ
	},
	haml: { // Haml
		src: ['./mysite_hoge/haml/*.haml'], // hamlのディレクトリ
		dest: './mysite_hoge/' // haml => html変換後のディレクトリ
	},
	pug: { // Pug
		src: ['./mysite_hoge/pug/*.pug'], // pugのディレクトリ
		dest: './mysite_hoge/' // pug => html変換後のディレクトリ
	},
	uglify: { // JSminify
		src: ['./mysite_hoge/js/*.js'], // 圧縮するjavascriptのディレクトリ
		dest: './mysite_hoge/js/min/' // 圧縮後のJavaScriptのディレクトリ
	}
}
