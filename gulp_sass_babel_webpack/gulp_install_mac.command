#!/bin/bash
MY_DIRNAME=$(dirname $0)
cd $MY_DIRNAME
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel_webpack/readme.md
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel_webpack/package.json
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel_webpack/gulpfile.js
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel_webpack/gulp_run_mac.command
svn export https://github.com/Raphael-D/gulp_setup/branches/master/gulp_sass_babel_webpack/src
mkdir configs
cd configs
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel_webpack/configs/mysite_hoge.js
cd ../
npm i -D
npx gulp
