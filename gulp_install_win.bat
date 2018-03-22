cd /d %~dp0
wget https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/package.json --no-check-certificate
npm i -D
wget https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulpfile.js --no-check-certificate
mkdir configs
cd configs
wget https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/configs/mysite_hoge.js --no-check-certificate
cd ../
npx gulp
cmd /k
