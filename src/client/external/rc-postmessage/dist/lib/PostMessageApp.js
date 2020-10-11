"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Spike.Yang
 * @Date: 2020-05-14 13:11:26
 * @Last Modified time: 2020-05-14 13:11:26
 */
var PostMessageBase_1 = require("./PostMessageBase");
var PostMessageApp = /** @class */ (function (_super) {
    __extends(PostMessageApp, _super);
    function PostMessageApp(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var baseOptions = __assign({ contentWindow: window.parent ? window.parent : typeof opener === 'object' ? opener : null }, options);
        _this = _super.call(this, baseOptions, "app" /* APP */) || this;
        return _this;
    }
    return PostMessageApp;
}(PostMessageBase_1.default));
exports.default = PostMessageApp;
//# sourceMappingURL=PostMessageApp.js.map