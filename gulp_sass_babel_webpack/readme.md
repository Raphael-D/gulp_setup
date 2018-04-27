# プロジェクトが増える度に煩わしいインストールや設定不要！複数のプロジェクトやサイト開発に対応するGulpのセットアップツールです。
## Every time the number of projects increases, annoying installation or setup is unnecessary! Gulp setup tool that supports multiple projects and site development.

プロジェクトが増えても、プロジェクトへのパスを設定するだけでGulpが使える、簡単設定仕様です。
gulpのインストールから業務でよく使うパッケージのインストールまで一括で行います。
インストールにはwindows, macそれぞれのバッチファイルをご使用ください。
※注意！node.js及びnpmはインストール済みでご使用ください。また、windowsは別途wgetをインストールしてください。

configsディレクトリ直下のJavaScriptには各プロジェクトへのパスを記述していますので任意に変更してください。
また、gulpを使用するプロジェクトを増やす場合は、configsディレクトリ直下にあるjsファイルを複製し、リネームして相対パスを編集してお使いください。

開発するプロジェクトのディレクトリ構造についてはsrcを参照してください。



= ファイル一覧 ===========================

	gulp_install_mac.command
	- MAC用の最初に実行するファイル

	gulp_install_win.bat
	- WIN用の最初に実行するファイル

	src
	- SCSSやJSのディレクトリ構造の見本

	gulp_run_mac.command
	- MAC用のgulp実行ファイル

	gule_run_win.bat
	- WIN用のgulp実行ファイル

	package.json
	- 使用するgulpパッケージモジュールを記述したファイル

	configs
	- 各プロジェクトへの相対パスを記述するファイル

	readme.md
	- このファイルの説明書



= コア機能一覧 ===========================

	常時監視
	複数のプロジェクトに対し単一のgulpで処理
	gulpローカル化



= SCSS機能一覧 ==========================

	SASSコンパイル
	CSS圧縮
	CSSメディアクエリ統一
	SCSSインポートファイル簡略
	SCSSソースマップ
	CSSベンダープレフィックス
	SMACSSに並び替え



= JS機能一覧 ==========================

	JS圧縮
	ES6 => ES5変換
	JSソースマップ
	ESモジュールのバンドル（※webpack）



= 実装方法 macの場合 ==========================

	①gulp_install_mac.commandをgulpを使用するディレクトリに移動し、実行してください。実行できない場合はターミナルからchmod u+x gulp_install_mac.command と入力して再度実行。
	②configsディレクトリ直下のsrc.jsを開発中プロジェクトと関連する名前にリネーム。(例：example_corpration.js)
	③　②のjsファイルを開いて開発するプロジェクトへの相対パスへ編集。
	④gulp_run_mac.commandを実行し、gulpを起動。



= 実装方法 windowsの場合 ==========================

	①事前準備として、wgetをインストールし、環境変数の設定しておく。
	②gulp_install_win.batをgulpを使用するディレクトリに移動し、実行してください。
	③configsディレクトリ直下のexample_src.jsを開発中プロジェクトと関連する名前にリネーム。
	④　③のjsファイルを開いて開発するプロジェクトへの相対パスへ編集。
	⑤gulp_run_win.batを実行し、gulpを起動。
