#!/bin/bash
MY_DIRNAME=$(dirname $0)
cd $MY_DIRNAME
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/package.json
npm i -D
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulpfile.js
mkdir configs
cd configs
curl -O https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/configs/mysite_hoge.js
cd ../
npx gulp
