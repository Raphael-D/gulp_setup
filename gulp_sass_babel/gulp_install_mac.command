#!/bin/bash
MY_DIRNAME=$(dirname $0)
cd $MY_DIRNAME
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel/readme.md
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel/package.json
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel/gulpfile.js
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel/gulp_run_mac.command
svn export https://github.com/Raphael-D/gulp_setup/branches/master/gulp_sass_babel/src
mkdir configs
cd configs
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel/configs/mysite_hoge.js
cd ../
npm i -D
npx gulp
