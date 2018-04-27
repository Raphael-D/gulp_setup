cd /d %~dp0
wget https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel/readme.md --no-check-certificate
wget https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel/package.json --no-check-certificate
wget https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel/gulpfile.js --no-check-certificate
wget https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel/gulp_run_win.bat --no-check-certificate
git svn clone https://github.com/Raphael-D/gulp_setup/trunk/gulp_sass_babel/src
cd src
rd /S /Q .git
cd ../
mkdir configs
cd configs
wget https://raw.githubusercontent.com/Raphael-D/gulp_setup/master/gulp_sass_babel/configs/src.js --no-check-certificate
cd ../
npm i -D
npx gulp
