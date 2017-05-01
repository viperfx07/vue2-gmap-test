webpackJsonp([0],{

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function ($) {
	console.log('this comes from partial.js example');

	// $ is injected jQuery
	var arrayTest = [1, 2, 4];
	$.each(arrayTest, function (i, val) {
		console.log(val);
	});
};

module.exports = exports['default'];

/***/ })

});