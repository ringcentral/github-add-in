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
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Author: Spike.Yang
 * @Date: 2020-05-14 13:10:02
 * @Last Modified time: 2020-05-14 13:10:02
 */
var PostMessageBase_1 = require("./PostMessageBase");
var PostMessageHost = /** @class */ (function (_super) {
    __extends(PostMessageHost, _super);
    function PostMessageHost(options, id) {
        var _this = _super.call(this, options, "host" /* HOST */) || this;
        _this.id = id;
        return _this;
    }
    return PostMessageHost;
}(PostMessageBase_1.default));
exports.default = PostMessageHost;
//# sourceMappingURL=PostMessageHost.js.map