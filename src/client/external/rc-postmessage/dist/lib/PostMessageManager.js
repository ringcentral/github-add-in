"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var PostMessageHost_1 = require("./PostMessageHost");
var constants_1 = require("./constants");
var PostMessageManager = /** @class */ (function () {
    function PostMessageManager() {
        this.create = function (options) {
            var errorTag = "[" + constants_1.TAG + "-Host]:";
            if (!options.contentWindow) {
                throw new Error(errorTag + " Missing required parameters contentWindow");
            }
            if (!options.targetOrigin) {
                throw new Error(errorTag + " Missing required parameters targetOrigin");
            }
            var id = utils_1.default();
            var instance = new PostMessageHost_1.default(options, id);
            PostMessageManager.addPostMessageHost(id, instance);
            return instance;
        };
        this.destroy = function (id) {
            PostMessageManager._postMessageHostMaps.delete(id);
        };
        this.broadcast = function (channel, payload) {
            var e_1, _a;
            try {
                for (var _b = __values(PostMessageManager._postMessageHostMaps.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var instance = _c.value;
                    // @ts-ignore
                    if (instance && instance instanceof PostMessageHost_1.default) {
                        instance.send(channel, payload);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
    }
    PostMessageManager._postMessageHostMaps = new Map();
    PostMessageManager.addPostMessageHost = function (id, instance) {
        PostMessageManager._postMessageHostMaps.set(id, instance);
    };
    return PostMessageManager;
}());
exports.default = PostMessageManager;
//# sourceMappingURL=PostMessageManager.js.map