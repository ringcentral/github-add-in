(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.RcPostMessage = {})));
}(this, (function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /*
     * @Author: Spike.Yang
     * @Date: 2020-05-14 13:01:04
     * @Last Modified time: 2020-05-14 13:01:04
     */
    var INIT_CHANNEL = 'get-host-origin';
    var TAG = 'RC-PostMessage';
    var INIT_TARGET_ORIGIN = '*';
    var DEFAULT_TIMEOUT = 5000;

    var PostMessageBase = /** @class */ (function () {
        function PostMessageBase(options, role) {
            var _this = this;
            this.options = options;
            this._targetOrigin = INIT_TARGET_ORIGIN;
            this._timeout = DEFAULT_TIMEOUT;
            this._handleMaps = new Map();
            this._eventMaps = new Map();
            this._role = "host" /* HOST */;
            this._getTargetOrigin = function () { return __awaiter(_this, void 0, void 0, function () {
                var result, payload, e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.invoke(INIT_CHANNEL)];
                        case 1:
                            result = _a.sent();
                            payload = result.payload;
                            payload && (this._targetOrigin = payload);
                            this._debug("_targetOrigin: " + payload);
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); };
            this._receiveMessage = function (messageEvent) { return __awaiter(_this, void 0, void 0, function () {
                var data, ports, origin, payload, type, channel, func_1, port, func, result, _a, e_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            data = messageEvent.data, ports = messageEvent.ports, origin = messageEvent.origin;
                            payload = data.payload, type = data.type, channel = data.channel;
                            this._debug("_receiveMessage type: " + type + ", channel: " + channel + ", payload: " + JSON.stringify(payload));
                            if (!type || !["event" /* EVENT */, "handle" /* HANDLE */].includes(type))
                                return [2 /*return*/];
                            if (type === "event" /* EVENT */) {
                                func_1 = this._eventMaps.get(channel);
                                if (!func_1 || typeof func_1 !== 'function')
                                    return [2 /*return*/];
                                this._debug("_receiveMessage type: " + "event" /* EVENT */);
                                func_1(payload, messageEvent);
                                return [2 /*return*/];
                            }
                            port = ports[0];
                            this._debug("_receiveMessage origin: " + origin + ", targetOrigin: " + this.targetOrigin);
                            if (origin && this._targetOrigin !== '*' && origin !== this.targetOrigin) {
                                return [2 /*return*/];
                            }
                            func = this._handleMaps.get(channel);
                            if (!func || typeof func !== 'function')
                                return [2 /*return*/];
                            result = {};
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            _a = result;
                            return [4 /*yield*/, func(payload, messageEvent)];
                        case 2:
                            _a.payload = _b.sent();
                            result.code = 200 /* SUCCESS */;
                            return [3 /*break*/, 4];
                        case 3:
                            e_2 = _b.sent();
                            result.code = 400 /* ERROR */;
                            result.error = this._formatMsg(channel + " " + e_2.message);
                            return [3 /*break*/, 4];
                        case 4:
                            this._debug("_receiveMessage result: " + JSON.stringify(result));
                            port.postMessage(result);
                            return [2 /*return*/];
                    }
                });
            }); };
            this._formatMsg = function (msg) {
                return "[" + TAG + "-" + _this._role + "]: " + msg;
            };
            this._wait = function (channel, msgChannel, timeout) {
                var time = timeout || _this._timeout;
                var timeoutResponse = {
                    code: 500 /* TIMEOUT */,
                    error: _this._formatMsg(channel + " is timeout."),
                    payload: null,
                };
                return new Promise(function (resolve, reject) { return setTimeout(function () {
                    msgChannel.port1.close();
                    reject(timeoutResponse);
                }, time); });
            };
            this._debug = function (msg) {
                _this.options.debug && console.info(_this._formatMsg(msg));
            };
            this.invoke = function (channel, payload, timeout) {
                var contentWindow = _this.options.contentWindow;
                if (!contentWindow) {
                    return Promise.reject({
                        code: 400 /* ERROR */,
                        error: _this._formatMsg(channel + " contentWindow is undefined"),
                    });
                }
                var msgChannel = new MessageChannel();
                _this._debug("invoke " + channel);
                return Promise.race([
                    new Promise(function (resolve, reject) {
                        contentWindow.postMessage({
                            type: "handle" /* HANDLE */,
                            channel: channel,
                            payload: payload
                        }, _this._targetOrigin, [msgChannel.port2]);
                        msgChannel.port1.onmessage = function (messageEvent) {
                            var result = messageEvent.data;
                            if (result.code !== 200 /* SUCCESS */) {
                                reject(result);
                                return;
                            }
                            resolve(result);
                            msgChannel.port1.close();
                        };
                        msgChannel.port1.onmessageerror = function (messageEvent) {
                            var error = {
                                code: 400 /* ERROR */,
                                error: _this._formatMsg(channel + " onmessageerror"),
                            };
                            reject(__assign(__assign({}, messageEvent.data), error));
                            msgChannel.port1.close();
                        };
                    }),
                    _this._wait(channel, msgChannel, timeout),
                ]);
            };
            this.handle = function (channel, listener) {
                _this._debug("handle " + channel);
                _this._handleMaps.set(channel, listener);
            };
            this.handleOnce = function (channel, listener) {
                _this._handleMaps.set(channel, function (payload, event) {
                    _this.removeHandler(channel);
                    return listener(payload, event);
                });
            };
            this.removeHandler = function (channel) {
                _this._handleMaps.delete(channel);
            };
            this.removeAllHandler = function () {
                _this._handleMaps.clear();
            };
            this.send = function (channel, payload) {
                var contentWindow = _this.options.contentWindow;
                if (!contentWindow)
                    return;
                _this._debug("send " + channel + " " + _this._targetOrigin);
                contentWindow.postMessage({
                    type: "event" /* EVENT */,
                    channel: channel,
                    payload: payload
                }, _this._targetOrigin);
            };
            this.on = function (channel, listener) {
                _this._debug("on " + channel);
                _this._eventMaps.set(channel, listener);
            };
            this.once = function (channel, listener) {
                _this._eventMaps.set(channel, function (payload, event) {
                    _this.removeListener(channel);
                    return listener(payload, event);
                });
            };
            this.removeListener = function (channel) {
                _this._eventMaps.delete(channel);
            };
            this.removeAllListeners = function () {
                _this._eventMaps.clear();
            };
            this.dispose = function () {
                window.removeEventListener('message', _this._receiveMessage);
                _this.removeAllListeners();
                _this.removeAllHandler();
            };
            window.addEventListener('message', this._receiveMessage);
            this._role = role;
            var targetOrigin = options.targetOrigin, timeout = options.timeout;
            if (targetOrigin) {
                this._targetOrigin = targetOrigin;
                this.handle(INIT_CHANNEL, function () { return window.location.origin; });
            }
            else {
                this._getTargetOrigin();
            }
            if (timeout)
                this._timeout = timeout;
        }
        Object.defineProperty(PostMessageBase.prototype, "targetOrigin", {
            get: function () {
                return this._targetOrigin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PostMessageBase.prototype, "role", {
            get: function () {
                return this._role;
            },
            enumerable: true,
            configurable: true
        });
        return PostMessageBase;
    }());

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
    }(PostMessageBase));

    /*
     * @Author: Spike.Yang
     * @Date: 2020-05-14 13:06:28
     * @Last Modified time: 2020-05-14 13:06:28
     */
    var uuid = function () {
        // @ts-ignore
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
            return (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16);
        });
    };

    var PostMessageHost = /** @class */ (function (_super) {
        __extends(PostMessageHost, _super);
        function PostMessageHost(options, id) {
            var _this = _super.call(this, options, "host" /* HOST */) || this;
            _this.id = id;
            return _this;
        }
        return PostMessageHost;
    }(PostMessageBase));

    var PostMessageManager = /** @class */ (function () {
        function PostMessageManager() {
            this.create = function (options) {
                var errorTag = "[" + TAG + "-Host]:";
                if (!options.contentWindow) {
                    throw new Error(errorTag + " Missing required parameters contentWindow");
                }
                if (!options.targetOrigin) {
                    throw new Error(errorTag + " Missing required parameters targetOrigin");
                }
                var id = uuid();
                var instance = new PostMessageHost(options, id);
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
                        if (instance && instance instanceof PostMessageHost) {
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

    /*
     * @Author: Spike.Yang
     * @Date: 2020-05-14 13:15:06
     * @Last Modified time: 2020-05-14 13:15:06
     */

    exports.PostMessageApp = PostMessageApp;
    exports.PostMessageManager = PostMessageManager;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=RcPostMessage.umd.js.map
