'use strict';

var hoge = 'fujio';
var hoga = 'egawa';
setTimeout(function () {
        var hoge = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "ほげ";

        console.log(hoge);
}, 500);