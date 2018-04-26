#!/bin/bash
MY_DIRNAME=$(dirname $0)
cd $MY_DIRNAME
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/readme.md
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/package.json
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulpfile.js
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_run_mac.command
svn export https://github.com/Raphael-D/gulp_setup/branches/master/src
mkdir configs
cd configs
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/configs/mysite_hoge.js
cd ../
npm i -D
npx gulp
