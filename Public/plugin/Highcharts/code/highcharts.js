/*
 Highcharts JS v7.0.3 (2019-02-06)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (N, I) {
    "object" === typeof module && module.exports ? (I["default"] = I, module.exports = N.document ? I(N) : I) : "function" === typeof define && define.amd ? define(function () {
        return I(N)
    }) : N.Highcharts = I(N)
})("undefined" !== typeof window ? window : this, function (N) {
    var I = function () {
        var a = "undefined" === typeof N ? "undefined" !== typeof window ? window : {} : N, y = a.document,
            F = a.navigator && a.navigator.userAgent || "",
            G = y && y.createElementNS && !!y.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            k = /(edge|msie|trident)/i.test(F) &&
                !a.opera, c = -1 !== F.indexOf("Firefox"), p = -1 !== F.indexOf("Chrome"),
            t = c && 4 > parseInt(F.split("Firefox/")[1], 10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "7.0.3",
            deg2rad: 2 * Math.PI / 360,
            doc: y,
            hasBidiBug: t,
            hasTouch: y && void 0 !== y.documentElement.ontouchstart,
            isMS: k,
            isWebKit: -1 !== F.indexOf("AppleWebKit"),
            isFirefox: c,
            isChrome: p,
            isSafari: !p && -1 !== F.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(F),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: G,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {
            },
            charts: []
        }
    }();
    (function (a) {
        a.timers = [];
        var y = a.charts, F = a.doc, G = a.win;
        a.error = function (k, c, p) {
            var t = a.isNumber(k) ? "Highcharts error #" + k + ": www.highcharts.com/errors/" + k : k;
            p && a.fireEvent(p, "displayError", {code: k});
            if (c) throw Error(t);
            G.console && console.log(t)
        };
        a.Fx = function (a, c, p) {
            this.options = c;
            this.elem = a;
            this.prop = p
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0], c = this.paths[1],
                    p = [], t = this.now, v = a.length, w;
                if (1 === t) p = this.toD; else if (v === c.length && 1 > t) for (; v--;) w = parseFloat(a[v]), p[v] = isNaN(w) ? c[v] : t * parseFloat(c[v] - w) + w; else p = c;
                this.elem.attr("d", p, null, !0)
            }, update: function () {
                var a = this.elem, c = this.prop, p = this.now, t = this.options.step;
                if (this[c + "Setter"]) this[c + "Setter"](); else a.attr ? a.element && a.attr(c, p, null, !0) : a.style[c] = p + this.unit;
                t && t.call(a, p, this)
            }, run: function (k, c, p) {
                var t = this, v = t.options, w = function (a) {
                    return w.stopped ? !1 : t.step(a)
                }, r = G.requestAnimationFrame ||
                    function (a) {
                        setTimeout(a, 13)
                    }, h = function () {
                    for (var e = 0; e < a.timers.length; e++) a.timers[e]() || a.timers.splice(e--, 1);
                    a.timers.length && r(h)
                };
                k !== c || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = k, this.end = c, this.unit = p, this.now = this.start, this.pos = 0, w.elem = this.elem, w.prop = this.prop, w() && 1 === a.timers.push(w) && r(h)) : (delete v.curAnim[this.prop], v.complete && 0 === Object.keys(v.curAnim).length && v.complete.call(this.elem))
            }, step: function (k) {
                var c = +new Date, p, t = this.options, v = this.elem,
                    w = t.complete, r = t.duration, h = t.curAnim;
                v.attr && !v.element ? k = !1 : k || c >= r + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), p = h[this.prop] = !0, a.objectEach(h, function (a) {
                    !0 !== a && (p = !1)
                }), p && w && w.call(v), k = !1) : (this.pos = t.easing((c - this.startTime) / r), this.now = this.start + (this.end - this.start) * this.pos, this.update(), k = !0);
                return k
            }, initPath: function (k, c, p) {
                function t(a) {
                    var d, g;
                    for (b = a.length; b--;) d = "M" === a[b] || "L" === a[b], g = /[a-zA-Z]/.test(a[b + 3]), d && g && a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b + 2])
                }

                function v(a, g) {
                    for (; a.length < d;) {
                        a[0] = g[d - a.length];
                        var e = a.slice(0, n);
                        [].splice.apply(a, [0, 0].concat(e));
                        x && (e = a.slice(a.length - n), [].splice.apply(a, [a.length, 0].concat(e)), b--)
                    }
                    a[0] = "M"
                }

                function w(a, b) {
                    for (var e = (d - a.length) / n; 0 < e && e--;) g = a.slice().splice(a.length / u - n, n * u), g[0] = b[d - n - e * n], l && (g[n - 6] = g[n - 2], g[n - 5] = g[n - 1]), [].splice.apply(a, [a.length / u, 0].concat(g)), x && e--
                }

                c = c || "";
                var r, h = k.startX, e = k.endX, l = -1 < c.indexOf("C"), n = l ? 7 : 3, d, g, b;
                c = c.split(" ");
                p = p.slice();
                var x = k.isArea, u = x ? 2 : 1, H;
                l && (t(c),
                    t(p));
                if (h && e) {
                    for (b = 0; b < h.length; b++) if (h[b] === e[0]) {
                        r = b;
                        break
                    } else if (h[0] === e[e.length - h.length + b]) {
                        r = b;
                        H = !0;
                        break
                    }
                    void 0 === r && (c = [])
                }
                c.length && a.isNumber(r) && (d = p.length + r * u * n, H ? (v(c, p), w(p, c)) : (v(p, c), w(c, p)));
                return [c, p]
            }, fillSetter: function () {
                a.Fx.prototype.strokeSetter.apply(this, arguments)
            }, strokeSetter: function () {
                this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
            }
        };
        a.merge = function () {
            var k, c = arguments, p, t = {}, v = function (c, r) {
                "object" !== typeof c && (c =
                    {});
                a.objectEach(r, function (h, e) {
                    !a.isObject(h, !0) || a.isClass(h) || a.isDOMElement(h) ? c[e] = r[e] : c[e] = v(c[e] || {}, h)
                });
                return c
            };
            !0 === c[0] && (t = c[1], c = Array.prototype.slice.call(c, 2));
            p = c.length;
            for (k = 0; k < p; k++) t = v(t, c[k]);
            return t
        };
        a.pInt = function (a, c) {
            return parseInt(a, c || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (k, c) {
            return !!k && "object" === typeof k && (!c ||
                !a.isArray(k))
        };
        a.isDOMElement = function (k) {
            return a.isObject(k) && "number" === typeof k.nodeType
        };
        a.isClass = function (k) {
            var c = k && k.constructor;
            return !(!a.isObject(k, !0) || a.isDOMElement(k) || !c || !c.name || "Object" === c.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function (a, c) {
            for (var k = a.length; k--;) if (a[k] === c) {
                a.splice(k, 1);
                break
            }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (k, c, p) {
            var t;
            a.isString(c) ? a.defined(p) ? k.setAttribute(c,
                p) : k && k.getAttribute && ((t = k.getAttribute(c)) || "class" !== c || (t = k.getAttribute(c + "Name"))) : a.defined(c) && a.isObject(c) && a.objectEach(c, function (a, c) {
                k.setAttribute(c, a)
            });
            return t
        };
        a.splat = function (k) {
            return a.isArray(k) ? k : [k]
        };
        a.syncTimeout = function (a, c, p) {
            if (c) return setTimeout(a, c, p);
            a.call(0, p)
        };
        a.clearTimeout = function (k) {
            a.defined(k) && clearTimeout(k)
        };
        a.extend = function (a, c) {
            var k;
            a || (a = {});
            for (k in c) a[k] = c[k];
            return a
        };
        a.pick = function () {
            var a = arguments, c, p, t = a.length;
            for (c = 0; c < t; c++) if (p = a[c],
                void 0 !== p && null !== p) return p
        };
        a.css = function (k, c) {
            a.isMS && !a.svg && c && void 0 !== c.opacity && (c.filter = "alpha(opacity\x3d" + 100 * c.opacity + ")");
            a.extend(k.style, c)
        };
        a.createElement = function (k, c, p, t, v) {
            k = F.createElement(k);
            var w = a.css;
            c && a.extend(k, c);
            v && w(k, {padding: 0, border: "none", margin: 0});
            p && w(k, p);
            t && t.appendChild(k);
            return k
        };
        a.extendClass = function (k, c) {
            var p = function () {
            };
            p.prototype = new k;
            a.extend(p.prototype, c);
            return p
        };
        a.pad = function (a, c, p) {
            return Array((c || 2) + 1 - String(a).replace("-", "").length).join(p ||
                0) + a
        };
        a.relativeLength = function (a, c, p) {
            return /%$/.test(a) ? c * parseFloat(a) / 100 + (p || 0) : parseFloat(a)
        };
        a.wrap = function (a, c, p) {
            var k = a[c];
            a[c] = function () {
                var a = Array.prototype.slice.call(arguments), c = arguments, r = this;
                r.proceed = function () {
                    k.apply(r, arguments.length ? arguments : c)
                };
                a.unshift(k);
                a = p.apply(this, a);
                r.proceed = null;
                return a
            }
        };
        a.datePropsToTimestamps = function (k) {
            a.objectEach(k, function (c, p) {
                a.isObject(c) && "function" === typeof c.getTime ? k[p] = c.getTime() : (a.isObject(c) || a.isArray(c)) && a.datePropsToTimestamps(c)
            })
        };
        a.formatSingle = function (k, c, p) {
            var t = /\.([0-9])/, v = a.defaultOptions.lang;
            /f$/.test(k) ? (p = (p = k.match(t)) ? p[1] : -1, null !== c && (c = a.numberFormat(c, p, v.decimalPoint, -1 < k.indexOf(",") ? v.thousandsSep : ""))) : c = (p || a.time).dateFormat(k, c);
            return c
        };
        a.format = function (k, c, p) {
            for (var t = "{", v = !1, w, r, h, e, l = [], n; k;) {
                t = k.indexOf(t);
                if (-1 === t) break;
                w = k.slice(0, t);
                if (v) {
                    w = w.split(":");
                    r = w.shift().split(".");
                    e = r.length;
                    n = c;
                    for (h = 0; h < e; h++) n && (n = n[r[h]]);
                    w.length && (n = a.formatSingle(w.join(":"), n, p));
                    l.push(n)
                } else l.push(w);
                k = k.slice(t + 1);
                t = (v = !v) ? "}" : "{"
            }
            l.push(k);
            return l.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (k, c, p, t, v) {
            var w, r = k;
            p = a.pick(p, 1);
            w = k / p;
            c || (c = v ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 === p ? c = c.filter(function (a) {
                return 0 === a % 1
            }) : .1 >= p && (c = [1 / p])));
            for (t = 0; t < c.length && !(r = c[t], v && r * p >= k || !v && w <= (c[t] + (c[t + 1] || c[t])) / 2); t++) ;
            return r = a.correctFloat(r * p, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort =
            function (a, c) {
                var k = a.length, t, v;
                for (v = 0; v < k; v++) a[v].safeI = v;
                a.sort(function (a, r) {
                    t = c(a, r);
                    return 0 === t ? a.safeI - r.safeI : t
                });
                for (v = 0; v < k; v++) delete a[v].safeI
            };
        a.arrayMin = function (a) {
            for (var c = a.length, k = a[0]; c--;) a[c] < k && (k = a[c]);
            return k
        };
        a.arrayMax = function (a) {
            for (var c = a.length, k = a[0]; c--;) a[c] > k && (k = a[c]);
            return k
        };
        a.destroyObjectProperties = function (k, c) {
            a.objectEach(k, function (a, t) {
                a && a !== c && a.destroy && a.destroy();
                delete k[t]
            })
        };
        a.discardElement = function (k) {
            var c = a.garbageBin;
            c || (c = a.createElement("div"));
            k && c.appendChild(k);
            c.innerHTML = ""
        };
        a.correctFloat = function (a, c) {
            return parseFloat(a.toPrecision(c || 14))
        };
        a.setAnimation = function (k, c) {
            c.renderer.globalAnimation = a.pick(k, c.options.chart.animation, !0)
        };
        a.animObject = function (k) {
            return a.isObject(k) ? a.merge(k) : {duration: k ? 500 : 0}
        };
        a.timeUnits = {
            millisecond: 1,
            second: 1E3,
            minute: 6E4,
            hour: 36E5,
            day: 864E5,
            week: 6048E5,
            month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (k, c, p, t) {
            k = +k || 0;
            c = +c;
            var v = a.defaultOptions.lang, w = (k.toString().split(".")[1] || "").split("e")[0].length,
                r, h, e = k.toString().split("e");
            -1 === c ? c = Math.min(w, 20) : a.isNumber(c) ? c && e[1] && 0 > e[1] && (r = c + +e[1], 0 <= r ? (e[0] = (+e[0]).toExponential(r).split("e")[0], c = r) : (e[0] = e[0].split(".")[0] || 0, k = 20 > c ? (e[0] * Math.pow(10, e[1])).toFixed(c) : 0, e[1] = 0)) : c = 2;
            h = (Math.abs(e[1] ? e[0] : k) + Math.pow(10, -Math.max(c, w) - 1)).toFixed(c);
            w = String(a.pInt(h));
            r = 3 < w.length ? w.length % 3 : 0;
            p = a.pick(p, v.decimalPoint);
            t = a.pick(t, v.thousandsSep);
            k = (0 > k ? "-" : "") + (r ? w.substr(0, r) + t : "");
            k += w.substr(r).replace(/(\d{3})(?=\d)/g, "$1" + t);
            c && (k += p + h.slice(-c));
            e[1] && 0 !== +k && (k += "e" + e[1]);
            return k
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (k, c, p) {
            if ("width" === c) return Math.max(0, Math.min(k.offsetWidth, k.scrollWidth, k.getBoundingClientRect && "none" === a.getStyle(k, "transform", !1) ? Math.floor(k.getBoundingClientRect().width) : Infinity) - a.getStyle(k, "padding-left") - a.getStyle(k, "padding-right"));
            if ("height" === c) return Math.max(0, Math.min(k.offsetHeight, k.scrollHeight) - a.getStyle(k, "padding-top") - a.getStyle(k, "padding-bottom"));
            G.getComputedStyle || a.error(27, !0);
            if (k = G.getComputedStyle(k, void 0)) k = k.getPropertyValue(c), a.pick(p, "opacity" !== c) && (k = a.pInt(k));
            return k
        };
        a.inArray = function (a, c, p) {
            return c.indexOf(a, p)
        };
        a.find = Array.prototype.find ? function (a, c) {
            return a.find(c)
        } : function (a, c) {
            var k, t = a.length;
            for (k = 0; k < t; k++) if (c(a[k], k)) return a[k]
        };
        a.keys = Object.keys;
        a.offset = function (a) {
            var c = F.documentElement;
            a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : {top: 0, left: 0};
            return {
                top: a.top + (G.pageYOffset || c.scrollTop) -
                (c.clientTop || 0), left: a.left + (G.pageXOffset || c.scrollLeft) - (c.clientLeft || 0)
            }
        };
        a.stop = function (k, c) {
            for (var p = a.timers.length; p--;) a.timers[p].elem !== k || c && c !== a.timers[p].prop || (a.timers[p].stopped = !0)
        };
        a.objectEach = function (a, c, p) {
            for (var k in a) a.hasOwnProperty(k) && c.call(p || a[k], a[k], k, a)
        };
        a.objectEach({map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some"}, function (k, c) {
            a[c] = function (a) {
                return Array.prototype[k].apply(a, [].slice.call(arguments, 1))
            }
        });
        a.addEvent = function (k, c, p, t) {
            var v,
                w = k.addEventListener || a.addEventListenerPolyfill;
            v = "function" === typeof k && k.prototype ? k.prototype.protoEvents = k.prototype.protoEvents || {} : k.hcEvents = k.hcEvents || {};
            a.Point && k instanceof a.Point && k.series && k.series.chart && (k.series.chart.runTrackerClick = !0);
            w && w.call(k, c, p, !1);
            v[c] || (v[c] = []);
            v[c].push(p);
            t && a.isNumber(t.order) && (p.order = t.order, v[c].sort(function (a, h) {
                return a.order - h.order
            }));
            return function () {
                a.removeEvent(k, c, p)
            }
        };
        a.removeEvent = function (k, c, p) {
            function t(h, e) {
                var l = k.removeEventListener ||
                    a.removeEventListenerPolyfill;
                l && l.call(k, h, e, !1)
            }

            function v(h) {
                var e, l;
                k.nodeName && (c ? (e = {}, e[c] = !0) : e = h, a.objectEach(e, function (a, d) {
                    if (h[d]) for (l = h[d].length; l--;) t(d, h[d][l])
                }))
            }

            var w, r;
            ["protoEvents", "hcEvents"].forEach(function (a) {
                var e = k[a];
                e && (c ? (w = e[c] || [], p ? (r = w.indexOf(p), -1 < r && (w.splice(r, 1), e[c] = w), t(c, p)) : (v(e), e[c] = [])) : (v(e), k[a] = {}))
            })
        };
        a.fireEvent = function (k, c, p, t) {
            var v, w, r, h, e;
            p = p || {};
            F.createEvent && (k.dispatchEvent || k.fireEvent) ? (v = F.createEvent("Events"), v.initEvent(c, !0, !0),
                a.extend(v, p), k.dispatchEvent ? k.dispatchEvent(v) : k.fireEvent(c, v)) : ["protoEvents", "hcEvents"].forEach(function (l) {
                if (k[l]) for (w = k[l][c] || [], r = w.length, p.target || a.extend(p, {
                    preventDefault: function () {
                        p.defaultPrevented = !0
                    }, target: k, type: c
                }), h = 0; h < r; h++) (e = w[h]) && !1 === e.call(k, p) && p.preventDefault()
            });
            t && !p.defaultPrevented && t.call(k, p)
        };
        a.animate = function (k, c, p) {
            var t, v = "", w, r, h;
            a.isObject(p) || (h = arguments, p = {duration: h[2], easing: h[3], complete: h[4]});
            a.isNumber(p.duration) || (p.duration = 400);
            p.easing =
                "function" === typeof p.easing ? p.easing : Math[p.easing] || Math.easeInOutSine;
            p.curAnim = a.merge(c);
            a.objectEach(c, function (e, h) {
                a.stop(k, h);
                r = new a.Fx(k, p, h);
                w = null;
                "d" === h ? (r.paths = r.initPath(k, k.d, c.d), r.toD = c.d, t = 0, w = 1) : k.attr ? t = k.attr(h) : (t = parseFloat(a.getStyle(k, h)) || 0, "opacity" !== h && (v = "px"));
                w || (w = e);
                w && w.match && w.match("px") && (w = w.replace(/px/g, ""));
                r.run(t, w, v)
            })
        };
        a.seriesType = function (k, c, p, t, v) {
            var w = a.getOptions(), r = a.seriesTypes;
            w.plotOptions[k] = a.merge(w.plotOptions[c], p);
            r[k] = a.extendClass(r[c] ||
                function () {
                }, t);
            r[k].prototype.type = k;
            v && (r[k].prototype.pointClass = a.extendClass(a.Point, v));
            return r[k]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9), c = 0;
            return function () {
                return "highcharts-" + a + "-" + c++
            }
        }();
        a.isFunction = function (a) {
            return "function" === typeof a
        };
        G.jQuery && (G.jQuery.fn.highcharts = function () {
            var k = [].slice.call(arguments);
            if (this[0]) return k[0] ? (new (a[a.isString(k[0]) ? k.shift() : "Chart"])(this[0], k[0], k[1]), this) : y[a.attr(this[0], "data-highcharts-chart")]
        })
    })(I);
    (function (a) {
        var y = a.isNumber, F = a.merge, G = a.pInt;
        a.Color = function (k) {
            if (!(this instanceof a.Color)) return new a.Color(k);
            this.init(k)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [G(a[1]), G(a[2]), G(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (a) {
                    return [G(a[1]), G(a[2]), G(a[3]), 1]
                }
            }], names: {white: "#ffffff", black: "#000000"},
            init: function (k) {
                var c, p, t, v;
                if ((this.input = k = this.names[k && k.toLowerCase ? k.toLowerCase() : ""] || k) && k.stops) this.stops = k.stops.map(function (c) {
                    return new a.Color(c[1])
                }); else if (k && k.charAt && "#" === k.charAt() && (c = k.length, k = parseInt(k.substr(1), 16), 7 === c ? p = [(k & 16711680) >> 16, (k & 65280) >> 8, k & 255, 1] : 4 === c && (p = [(k & 3840) >> 4 | (k & 3840) >> 8, (k & 240) >> 4 | k & 240, (k & 15) << 4 | k & 15, 1])), !p) for (t = this.parsers.length; t-- && !p;) v = this.parsers[t], (c = v.regex.exec(k)) && (p = v.parse(c));
                this.rgba = p || []
            }, get: function (a) {
                var c = this.input,
                    k = this.rgba, t;
                this.stops ? (t = F(c), t.stops = [].concat(t.stops), this.stops.forEach(function (c, k) {
                    t.stops[k] = [t.stops[k][0], c.get(a)]
                })) : t = k && y(k[0]) ? "rgb" === a || !a && 1 === k[3] ? "rgb(" + k[0] + "," + k[1] + "," + k[2] + ")" : "a" === a ? k[3] : "rgba(" + k.join(",") + ")" : c;
                return t
            }, brighten: function (a) {
                var c, k = this.rgba;
                if (this.stops) this.stops.forEach(function (c) {
                    c.brighten(a)
                }); else if (y(a) && 0 !== a) for (c = 0; 3 > c; c++) k[c] += G(255 * a), 0 > k[c] && (k[c] = 0), 255 < k[c] && (k[c] = 255);
                return this
            }, setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            },
            tweenTo: function (a, c) {
                var k = this.rgba, t = a.rgba;
                t.length && k && k.length ? (a = 1 !== t[3] || 1 !== k[3], c = (a ? "rgba(" : "rgb(") + Math.round(t[0] + (k[0] - t[0]) * (1 - c)) + "," + Math.round(t[1] + (k[1] - t[1]) * (1 - c)) + "," + Math.round(t[2] + (k[2] - t[2]) * (1 - c)) + (a ? "," + (t[3] + (k[3] - t[3]) * (1 - c)) : "") + ")") : c = a.input || "none";
                return c
            }
        };
        a.color = function (k) {
            return new a.Color(k)
        }
    })(I);
    (function (a) {
        var y, F, G = a.addEvent, k = a.animate, c = a.attr, p = a.charts, t = a.color, v = a.css, w = a.createElement,
            r = a.defined, h = a.deg2rad, e = a.destroyObjectProperties, l = a.doc,
            n = a.extend, d = a.erase, g = a.hasTouch, b = a.isArray, x = a.isFirefox, u = a.isMS, H = a.isObject,
            E = a.isString, B = a.isWebKit, m = a.merge, z = a.noop, D = a.objectEach, A = a.pick, f = a.pInt,
            q = a.removeEvent, L = a.splat, K = a.stop, T = a.svg, J = a.SVG_NS, M = a.symbolSizes, R = a.win;
        y = a.SVGElement = function () {
            return this
        };
        n(y.prototype, {
            opacity: 1,
            SVG_NS: J,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
            init: function (f, q) {
                this.element = "span" ===
                q ? w(q) : l.createElementNS(this.SVG_NS, q);
                this.renderer = f;
                a.fireEvent(this, "afterInit")
            },
            animate: function (f, q, d) {
                var C = a.animObject(A(q, this.renderer.globalAnimation, !0));
                A(l.hidden, l.msHidden, l.webkitHidden, !1) && (C.duration = 0);
                0 !== C.duration ? (d && (C.complete = d), k(this, f, C)) : (this.attr(f, null, d), a.objectEach(f, function (a, f) {
                    C.step && C.step.call(this, a, {prop: f, pos: 1})
                }, this));
                return this
            },
            complexColor: function (f, q, d) {
                var C = this.renderer, g, e, n, h, J, z, l, P, x, c, u, K = [], L;
                a.fireEvent(this.renderer, "complexColor",
                    {args: arguments}, function () {
                        f.radialGradient ? e = "radialGradient" : f.linearGradient && (e = "linearGradient");
                        e && (n = f[e], J = C.gradients, l = f.stops, c = d.radialReference, b(n) && (f[e] = n = {
                            x1: n[0],
                            y1: n[1],
                            x2: n[2],
                            y2: n[3],
                            gradientUnits: "userSpaceOnUse"
                        }), "radialGradient" === e && c && !r(n.gradientUnits) && (h = n, n = m(n, C.getRadialAttr(c, h), {gradientUnits: "userSpaceOnUse"})), D(n, function (a, f) {
                            "id" !== f && K.push(f, a)
                        }), D(l, function (a) {
                            K.push(a)
                        }), K = K.join(","), J[K] ? u = J[K].attr("id") : (n.id = u = a.uniqueKey(), J[K] = z = C.createElement(e).attr(n).add(C.defs),
                            z.radAttr = h, z.stops = [], l.forEach(function (f) {
                            0 === f[1].indexOf("rgba") ? (g = a.color(f[1]), P = g.get("rgb"), x = g.get("a")) : (P = f[1], x = 1);
                            f = C.createElement("stop").attr({offset: f[0], "stop-color": P, "stop-opacity": x}).add(z);
                            z.stops.push(f)
                        })), L = "url(" + C.url + "#" + u + ")", d.setAttribute(q, L), d.gradient = K, f.toString = function () {
                            return L
                        })
                    })
            },
            applyTextOutline: function (f) {
                var C = this.element, q, b, g, e, m;
                -1 !== f.indexOf("contrast") && (f = f.replace(/contrast/g, this.renderer.getContrast(C.style.fill)));
                f = f.split(" ");
                b = f[f.length -
                1];
                if ((g = f[0]) && "none" !== g && a.svg) {
                    this.fakeTS = !0;
                    f = [].slice.call(C.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    g = g.replace(/(^[\d\.]+)(.*?)$/g, function (a, f, C) {
                        return 2 * f + C
                    });
                    for (m = f.length; m--;) q = f[m], "highcharts-text-outline" === q.getAttribute("class") && d(f, C.removeChild(q));
                    e = C.firstChild;
                    f.forEach(function (a, f) {
                        0 === f && (a.setAttribute("x", C.getAttribute("x")), f = C.getAttribute("y"), a.setAttribute("y", f || 0), null === f && C.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        c(a, {
                            "class": "highcharts-text-outline",
                            fill: b, stroke: b, "stroke-width": g, "stroke-linejoin": "round"
                        });
                        C.insertBefore(a, e)
                    })
                }
            },
            symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "),
            attr: function (f, q, d, b) {
                var C, g = this.element, e, m = this, n, h, J = this.symbolCustomAttribs;
                "string" === typeof f && void 0 !== q && (C = f, f = {}, f[C] = q);
                "string" === typeof f ? m = (this[f + "Getter"] || this._defaultGetter).call(this, f, g) : (D(f, function (C, q) {
                    n = !1;
                    b || K(this, q);
                    this.symbolName && -1 !== a.inArray(q, J) && (e || (this.symbolAttr(f), e = !0), n = !0);
                    !this.rotation || "x" !== q && "y" !== q || (this.doTransform = !0);
                    n || (h = this[q + "Setter"] || this._defaultSetter, h.call(this, C, q, g), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(q) && this.updateShadows(q, C, h))
                }, this), this.afterSetters());
                d && d.call(this);
                return m
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function (a, f, q) {
                for (var C = this.shadows, d = C.length; d--;) q.call(C[d], "height" === a ? Math.max(f - (C[d].cutHeight ||
                    0), 0) : "d" === a ? this.d : f, a, C[d])
            },
            addClass: function (a, f) {
                var C = this.attr("class") || "";
                -1 === C.indexOf(a) && (f || (a = (C + (C ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !== (this.attr("class") || "").split(" ").indexOf(a)
            },
            removeClass: function (a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function (a) {
                var f = this;
                "x y r start end width height innerR anchorX anchorY".split(" ").forEach(function (C) {
                    f[C] = A(a[C], f[C])
                });
                f.attr({
                    d: f.renderer.symbols[f.symbolName](f.x,
                        f.y, f.width, f.height, f)
                })
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, f) {
                var C;
                f = f || a.strokeWidth || 0;
                C = Math.round(f) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + C;
                a.y = Math.floor(a.y || this.y || 0) + C;
                a.width = Math.floor((a.width || this.width || 0) - 2 * C);
                a.height = Math.floor((a.height || this.height || 0) - 2 * C);
                r(a.strokeWidth) && (a.strokeWidth = f);
                return a
            },
            css: function (a) {
                var C = this.styles, q = {}, d = this.element, b, g = "", e, m = !C, h = ["textOutline", "textOverflow",
                    "width"];
                a && a.color && (a.fill = a.color);
                C && D(a, function (a, f) {
                    a !== C[f] && (q[f] = a, m = !0)
                });
                m && (C && (a = n(C, q)), a && (null === a.width || "auto" === a.width ? delete this.textWidth : "text" === d.nodeName.toLowerCase() && a.width && (b = this.textWidth = f(a.width))), this.styles = a, b && !T && this.renderer.forExport && delete a.width, d.namespaceURI === this.SVG_NS ? (e = function (a, f) {
                    return "-" + f.toLowerCase()
                }, D(a, function (a, f) {
                    -1 === h.indexOf(f) && (g += f.replace(/([A-Z])/g, e) + ":" + a + ";")
                }), g && c(d, "style", g)) : v(d, a), this.added && ("text" === this.element.nodeName &&
                this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            getStyle: function (a) {
                return R.getComputedStyle(this.element || this, "").getPropertyValue(a)
            },
            strokeWidth: function () {
                if (!this.renderer.styledMode) return this["stroke-width"] || 0;
                var a = this.getStyle("stroke-width"), q;
                a.indexOf("px") === a.length - 2 ? a = f(a) : (q = l.createElementNS(J, "rect"), c(q, {
                    width: a,
                    "stroke-width": 0
                }), this.element.parentNode.appendChild(q), a = q.getBBox().width, q.parentNode.removeChild(q));
                return a
            },
            on: function (a, f) {
                var C = this, q = C.element;
                g && "click" === a ? (q.ontouchstart = function (a) {
                    C.touchEventFired = Date.now();
                    a.preventDefault();
                    f.call(q, a)
                }, q.onclick = function (a) {
                    (-1 === R.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (C.touchEventFired || 0)) && f.call(q, a)
                }) : q["on" + a] = f;
                return this
            },
            setRadialReference: function (a) {
                var f = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                f && f.radAttr && f.animate(this.renderer.getRadialAttr(a, f.radAttr));
                return this
            },
            translate: function (a,
                                 f) {
                return this.attr({translateX: a, translateY: f})
            },
            invert: function (a) {
                this.inverted = a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0, f = this.translateY || 0, q = this.scaleX, d = this.scaleY,
                    b = this.inverted, g = this.rotation, e = this.matrix, m = this.element;
                b && (a += this.width, f += this.height);
                a = ["translate(" + a + "," + f + ")"];
                r(e) && a.push("matrix(" + e.join(",") + ")");
                b ? a.push("rotate(90) scale(-1,1)") : g && a.push("rotate(" + g + " " + A(this.rotationOriginX, m.getAttribute("x"), 0) + " " + A(this.rotationOriginY,
                    m.getAttribute("y") || 0) + ")");
                (r(q) || r(d)) && a.push("scale(" + A(q, 1) + " " + A(d, 1) + ")");
                a.length && m.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, f, q) {
                var C, b, g, e, m = {};
                b = this.renderer;
                g = b.alignedObjects;
                var n, h;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = f, !q || E(q)) this.alignTo = C = q || "renderer", d(g, this), g.push(this), q = null
                } else a = this.alignOptions, f = this.alignByTranslate, C = this.alignTo;
                q = A(q, b[C], b);
                C = a.align;
                b = a.verticalAlign;
                g = (q.x || 0) + (a.x || 0);
                e = (q.y || 0) + (a.y || 0);
                "right" === C ? n = 1 : "center" === C && (n = 2);
                n && (g += (q.width - (a.width || 0)) / n);
                m[f ? "translateX" : "x"] = Math.round(g);
                "bottom" === b ? h = 1 : "middle" === b && (h = 2);
                h && (e += (q.height - (a.height || 0)) / h);
                m[f ? "translateY" : "y"] = Math.round(e);
                this[this.placed ? "animate" : "attr"](m);
                this.placed = !0;
                this.alignAttr = m;
                return this
            },
            getBBox: function (a, f) {
                var q, C = this.renderer, d, b = this.element, g = this.styles, e, m = this.textStr, J, z = C.cache,
                    l = C.cacheKeys, x = b.namespaceURI === this.SVG_NS,
                    c;
                f = A(f, this.rotation);
                d = f * h;
                e = C.styledMode ? b && y.prototype.getStyle.call(b, "font-size") : g && g.fontSize;
                r(m) && (c = m.toString(), -1 === c.indexOf("\x3c") && (c = c.replace(/[0-9]/g, "0")), c += ["", f || 0, e, this.textWidth, g && g.textOverflow].join());
                c && !a && (q = z[c]);
                if (!q) {
                    if (x || C.forExport) {
                        try {
                            (J = this.fakeTS && function (a) {
                                [].forEach.call(b.querySelectorAll(".highcharts-text-outline"), function (f) {
                                    f.style.display = a
                                })
                            }) && J("none"), q = b.getBBox ? n({}, b.getBBox()) : {
                                width: b.offsetWidth,
                                height: b.offsetHeight
                            }, J && J("")
                        } catch (Y) {
                        }
                        if (!q ||
                            0 > q.width) q = {width: 0, height: 0}
                    } else q = this.htmlGetBBox();
                    C.isSVG && (a = q.width, C = q.height, x && (q.height = C = {
                        "11px,17": 14,
                        "13px,20": 16
                    }[g && g.fontSize + "," + Math.round(C)] || C), f && (q.width = Math.abs(C * Math.sin(d)) + Math.abs(a * Math.cos(d)), q.height = Math.abs(C * Math.cos(d)) + Math.abs(a * Math.sin(d))));
                    if (c && 0 < q.height) {
                        for (; 250 < l.length;) delete z[l.shift()];
                        z[c] || l.push(c);
                        z[c] = q
                    }
                }
                return q
            },
            show: function (a) {
                return this.attr({visibility: a ? "inherit" : "visible"})
            },
            hide: function () {
                return this.attr({visibility: "hidden"})
            },
            fadeOut: function (a) {
                var f = this;
                f.animate({opacity: 0}, {
                    duration: a || 150, complete: function () {
                        f.attr({y: -9999})
                    }
                })
            },
            add: function (a) {
                var f = this.renderer, q = this.element, C;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && f.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) C = this.zIndexSetter();
                C || (a ? a.element : f.box).appendChild(q);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var f = a.parentNode;
                f && f.removeChild(a)
            },
            destroy: function () {
                var a =
                        this, f = a.element || {}, q = a.renderer, b = q.isSVG && "SPAN" === f.nodeName && a.parentGroup,
                    g = f.ownerSVGElement, e = a.clipPath;
                f.onclick = f.onmouseout = f.onmouseover = f.onmousemove = f.point = null;
                K(a);
                e && g && ([].forEach.call(g.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
                    var f = a.getAttribute("clip-path"), q = e.element.id;
                    (-1 < f.indexOf("(#" + q + ")") || -1 < f.indexOf('("#' + q + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = e.destroy());
                if (a.stops) {
                    for (g = 0; g < a.stops.length; g++) a.stops[g] = a.stops[g].destroy();
                    a.stops =
                        null
                }
                a.safeRemoveChild(f);
                for (q.styledMode || a.destroyShadows(); b && b.div && 0 === b.div.childNodes.length;) f = b.parentGroup, a.safeRemoveChild(b.div), delete b.div, b = f;
                a.alignTo && d(q.alignedObjects, a);
                D(a, function (f, q) {
                    delete a[q]
                });
                return null
            },
            shadow: function (a, f, q) {
                var d = [], C, b, g = this.element, e, m, n, h;
                if (!a) this.destroyShadows(); else if (!this.shadows) {
                    m = A(a.width, 3);
                    n = (a.opacity || .15) / m;
                    h = this.parentInverted ? "(-1,-1)" : "(" + A(a.offsetX, 1) + ", " + A(a.offsetY, 1) + ")";
                    for (C = 1; C <= m; C++) b = g.cloneNode(0), e = 2 * m + 1 -
                        2 * C, c(b, {
                        stroke: a.color || "#000000",
                        "stroke-opacity": n * C,
                        "stroke-width": e,
                        transform: "translate" + h,
                        fill: "none"
                    }), b.setAttribute("class", (b.getAttribute("class") || "") + " highcharts-shadow"), q && (c(b, "height", Math.max(c(b, "height") - e, 0)), b.cutHeight = e), f ? f.element.appendChild(b) : g.parentNode && g.parentNode.insertBefore(b, g), d.push(b);
                    this.shadows = d
                }
                return this
            },
            destroyShadows: function () {
                (this.shadows || []).forEach(function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" ===
                this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = A(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a, f, q) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[f] !== a && (q.setAttribute(f, a), this[f] = a)
            },
            dashstyleSetter: function (a) {
                var q, b = this["stroke-width"];
                "inherit" === b && (b = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot",
                        "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (q = a.length; q--;) a[q] = f(a[q]) * b;
                    a = a.join(",").replace(/NaN/g, "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function (a) {
                var f = {left: "start", center: "middle", right: "end"};
                f[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", f[a]))
            },
            opacitySetter: function (a, f,
                                     q) {
                this[f] = a;
                q.setAttribute(f, a)
            },
            titleSetter: function (a) {
                var f = this.element.getElementsByTagName("title")[0];
                f || (f = l.createElementNS(this.SVG_NS, "title"), this.element.appendChild(f));
                f.firstChild && f.removeChild(f.firstChild);
                f.appendChild(l.createTextNode(String(A(a), "").replace(/<[^>]*>/g, "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, f, q) {
                "string" ===
                typeof a ? q.setAttribute(f, a) : a && this.complexColor(a, f, q)
            },
            visibilitySetter: function (a, f, q) {
                "inherit" === a ? q.removeAttribute(f) : this[f] !== a && q.setAttribute(f, a);
                this[f] = a
            },
            zIndexSetter: function (a, q) {
                var b = this.renderer, d = this.parentGroup, g = (d || b).element || b.box, e, m = this.element, C, n,
                    b = g === b.box;
                e = this.added;
                var h;
                r(a) ? (m.setAttribute("data-z-index", a), a = +a, this[q] === a && (e = !1)) : r(this[q]) && m.removeAttribute("data-z-index");
                this[q] = a;
                if (e) {
                    (a = this.zIndex) && d && (d.handleZ = !0);
                    q = g.childNodes;
                    for (h = q.length -
                        1; 0 <= h && !C; h--) if (d = q[h], e = d.getAttribute("data-z-index"), n = !r(e), d !== m) if (0 > a && n && !b && !h) g.insertBefore(m, q[h]), C = !0; else if (f(e) <= a || n && (!r(a) || 0 <= a)) g.insertBefore(m, q[h + 1] || null), C = !0;
                    C || (g.insertBefore(m, q[b ? 3 : 0] || null), C = !0)
                }
                return C
            },
            _defaultSetter: function (a, f, q) {
                q.setAttribute(f, a)
            }
        });
        y.prototype.yGetter = y.prototype.xGetter;
        y.prototype.translateXSetter = y.prototype.translateYSetter = y.prototype.rotationSetter = y.prototype.verticalAlignSetter = y.prototype.rotationOriginXSetter = y.prototype.rotationOriginYSetter =
            y.prototype.scaleXSetter = y.prototype.scaleYSetter = y.prototype.matrixSetter = function (a, f) {
                this[f] = a;
                this.doTransform = !0
            };
        y.prototype["stroke-widthSetter"] = y.prototype.strokeSetter = function (a, f, q) {
            this[f] = a;
            this.stroke && this["stroke-width"] ? (y.prototype.fillSetter.call(this, this.stroke, "stroke", q), q.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === f && 0 === a && this.hasStroke && (q.removeAttribute("stroke"), this.hasStroke = !1)
        };
        F = a.SVGRenderer = function () {
            this.init.apply(this,
                arguments)
        };
        n(F.prototype, {
            Element: y,
            SVG_NS: J,
            init: function (a, f, q, b, d, g, e) {
                var m;
                m = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"});
                e || m.css(this.getStyle(b));
                b = m.element;
                a.appendChild(b);
                c(a, "dir", "ltr");
                -1 === a.innerHTML.indexOf("xmlns") && c(b, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = b;
                this.boxWrapper = m;
                this.alignedObjects = [];
                this.url = (x || B) && l.getElementsByTagName("base").length ? R.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g,
                    "%20") : "";
                this.createElement("desc").add().element.appendChild(l.createTextNode("Created with Highcharts 7.0.3"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = g;
                this.forExport = d;
                this.styledMode = e;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(f, q, !1);
                var n;
                x && a.getBoundingClientRect && (f = function () {
                    v(a, {left: 0, top: 0});
                    n = a.getBoundingClientRect();
                    v(a, {left: Math.ceil(n.left) - n.left + "px", top: Math.ceil(n.top) - n.top + "px"})
                }, f(), this.unSubPixelFix = G(R, "resize",
                    f))
            },
            definition: function (a) {
                function f(a, b) {
                    var d;
                    L(a).forEach(function (a) {
                        var g = q.createElement(a.tagName), e = {};
                        D(a, function (a, f) {
                            "tagName" !== f && "children" !== f && "textContent" !== f && (e[f] = a)
                        });
                        g.attr(e);
                        g.add(b || q.defs);
                        a.textContent && g.element.appendChild(l.createTextNode(a.textContent));
                        f(a.children || [], g);
                        d = g
                    });
                    return d
                }

                var q = this;
                return f(a)
            },
            getStyle: function (a) {
                return this.style = n({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                e(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function (a) {
                var f = new this.Element;
                f.init(this, a);
                return f
            },
            draw: z,
            getRadialAttr: function (a, f) {
                return {cx: a[0] - a[2] / 2 + f.cx * a[2], cy: a[1] - a[2] / 2 + f.cy * a[2], r: f.r * a[2]}
            },
            truncate: function (a, f, q, b, d,
                                g, e) {
                var m = this, n = a.rotation, h, C = b ? 1 : 0, J = (q || b).length, z = J, c = [], r = function (a) {
                    f.firstChild && f.removeChild(f.firstChild);
                    a && f.appendChild(l.createTextNode(a))
                }, x = function (g, n) {
                    n = n || g;
                    if (void 0 === c[n]) if (f.getSubStringLength) try {
                        c[n] = d + f.getSubStringLength(0, b ? n + 1 : n)
                    } catch (Z) {
                    } else m.getSpanWidth && (r(e(q || b, g)), c[n] = d + m.getSpanWidth(a, f));
                    return c[n]
                }, u, D;
                a.rotation = 0;
                u = x(f.textContent.length);
                if (D = d + u > g) {
                    for (; C <= J;) z = Math.ceil((C + J) / 2), b && (h = e(b, z)), u = x(z, h && h.length - 1), C === J ? C = J + 1 : u > g ? J = z - 1 : C = z;
                    0 ===
                    J ? r("") : q && J === q.length - 1 || r(h || e(q || b, z))
                }
                b && b.splice(0, z);
                a.actualWidth = u;
                a.rotation = n;
                return D
            },
            escapes: {"\x26": "\x26amp;", "\x3c": "\x26lt;", "\x3e": "\x26gt;", "'": "\x26#39;", '"': "\x26quot;"},
            buildText: function (a) {
                var q = a.element, b = this, d = b.forExport, g = A(a.textStr, "").toString(),
                    e = -1 !== g.indexOf("\x3c"), m = q.childNodes, n, h = c(q, "x"), C = a.styles, z = a.textWidth,
                    r = C && C.lineHeight, x = C && C.textOutline, u = C && "ellipsis" === C.textOverflow,
                    K = C && "nowrap" === C.whiteSpace, L = C && C.fontSize, B, M, k = m.length, C = z && !a.added &&
                    this.box, H = function (a) {
                        var g;
                        b.styledMode || (g = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : L || b.style.fontSize || 12);
                        return r ? f(r) : b.fontMetrics(g, a.getAttribute("style") ? a : q).h
                    }, E = function (a, f) {
                        D(b.escapes, function (q, b) {
                            f && -1 !== f.indexOf(q) || (a = a.toString().replace(new RegExp(q, "g"), b))
                        });
                        return a
                    }, w = function (a, f) {
                        var q;
                        q = a.indexOf("\x3c");
                        a = a.substring(q, a.indexOf("\x3e") - q);
                        q = a.indexOf(f + "\x3d");
                        if (-1 !== q && (q = q + f.length + 1, f = a.charAt(q), '"' === f || "'" === f)) return a = a.substring(q + 1), a.substring(0,
                            a.indexOf(f))
                    };
                B = [g, u, K, r, x, L, z].join();
                if (B !== a.textCache) {
                    for (a.textCache = B; k--;) q.removeChild(m[k]);
                    e || x || u || z || -1 !== g.indexOf(" ") ? (C && C.appendChild(q), e ? (g = b.styledMode ? g.replace(/<(b|strong)>/g, '\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g, '\x3cspan class\x3d"highcharts-emphasized"\x3e') : g.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e'), g = g.replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,
                        "\x3c/span\x3e").split(/<br.*?>/g)) : g = [g], g = g.filter(function (a) {
                        return "" !== a
                    }), g.forEach(function (f, g) {
                        var e, m = 0, C = 0;
                        f = f.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        e = f.split("|||");
                        e.forEach(function (f) {
                            if ("" !== f || 1 === e.length) {
                                var r = {}, x = l.createElementNS(b.SVG_NS, "tspan"), D, A;
                                (D = w(f, "class")) && c(x, "class", D);
                                if (D = w(f, "style")) D = D.replace(/(;| |^)color([ :])/, "$1fill$2"), c(x, "style", D);
                                (A = w(f, "href")) && !d && (c(x, "onclick", 'location.href\x3d"' +
                                    A + '"'), c(x, "class", "highcharts-anchor"), b.styledMode || v(x, {cursor: "pointer"}));
                                f = E(f.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== f) {
                                    x.appendChild(l.createTextNode(f));
                                    m ? r.dx = 0 : g && null !== h && (r.x = h);
                                    c(x, r);
                                    q.appendChild(x);
                                    !m && M && (!T && d && v(x, {display: "block"}), c(x, "dy", H(x)));
                                    if (z) {
                                        var B = f.replace(/([^\^])-/g, "$1- ").split(" "),
                                            r = !K && (1 < e.length || g || 1 < B.length);
                                        A = 0;
                                        var k = H(x);
                                        if (u) n = b.truncate(a, x, f, void 0, 0, Math.max(0, z - parseInt(L || 12, 10)), function (a, f) {
                                            return a.substring(0, f) + "\u2026"
                                        }); else if (r) for (; B.length;) B.length &&
                                        !K && 0 < A && (x = l.createElementNS(J, "tspan"), c(x, {
                                            dy: k,
                                            x: h
                                        }), D && c(x, "style", D), x.appendChild(l.createTextNode(B.join(" ").replace(/- /g, "-"))), q.appendChild(x)), b.truncate(a, x, null, B, 0 === A ? C : 0, z, function (a, f) {
                                            return B.slice(0, f).join(" ").replace(/- /g, "-")
                                        }), C = a.actualWidth, A++
                                    }
                                    m++
                                }
                            }
                        });
                        M = M || q.childNodes.length
                    }), u && n && a.attr("title", E(a.textStr, ["\x26lt;", "\x26gt;"])), C && C.removeChild(q), x && a.applyTextOutline && a.applyTextOutline(x)) : q.appendChild(l.createTextNode(E(g)))
                }
            },
            getContrast: function (a) {
                a = t(a).rgba;
                a[0] *= 1;
                a[1] *= 1.2;
                a[2] *= .5;
                return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function (a, f, q, b, g, d, e, h, z) {
                var C = this.label(a, f, q, z, null, null, null, null, "button"), J = 0, x = this.styledMode;
                C.attr(m({padding: 8, r: 2}, g));
                if (!x) {
                    var l, r, c, D;
                    g = m({
                        fill: "#f7f7f7",
                        stroke: "#cccccc",
                        "stroke-width": 1,
                        style: {color: "#333333", cursor: "pointer", fontWeight: "normal"}
                    }, g);
                    l = g.style;
                    delete g.style;
                    d = m(g, {fill: "#e6e6e6"}, d);
                    r = d.style;
                    delete d.style;
                    e = m(g, {fill: "#e6ebf5", style: {color: "#000000", fontWeight: "bold"}}, e);
                    c = e.style;
                    delete e.style;
                    h = m(g, {style: {color: "#cccccc"}}, h);
                    D = h.style;
                    delete h.style
                }
                G(C.element, u ? "mouseover" : "mouseenter", function () {
                    3 !== J && C.setState(1)
                });
                G(C.element, u ? "mouseout" : "mouseleave", function () {
                    3 !== J && C.setState(J)
                });
                C.setState = function (a) {
                    1 !== a && (C.state = J = a);
                    C.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                    x || C.attr([g, d, e, h][a || 0]).css([l, r, c, D][a || 0])
                };
                x || C.attr(g).css(n({cursor: "default"}, l));
                return C.on("click",
                    function (a) {
                        3 !== J && b.call(C, a)
                    })
            },
            crispLine: function (a, f) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - f % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + f % 2 / 2);
                return a
            },
            path: function (a) {
                var f = this.styledMode ? {} : {fill: "none"};
                b(a) ? f.d = a : H(a) && n(f, a);
                return this.createElement("path").attr(f)
            },
            circle: function (a, f, q) {
                a = H(a) ? a : void 0 === a ? {} : {x: a, y: f, r: q};
                f = this.createElement("circle");
                f.xSetter = f.ySetter = function (a, f, q) {
                    q.setAttribute("c" + f, a)
                };
                return f.attr(a)
            },
            arc: function (a, f, q, b, g, d) {
                H(a) ? (b = a, f = b.y, q =
                    b.r, a = b.x) : b = {innerR: b, start: g, end: d};
                a = this.symbol("arc", a, f, q, q, b);
                a.r = q;
                return a
            },
            rect: function (a, f, q, b, g, d) {
                g = H(a) ? a.r : g;
                var e = this.createElement("rect");
                a = H(a) ? a : void 0 === a ? {} : {x: a, y: f, width: Math.max(q, 0), height: Math.max(b, 0)};
                this.styledMode || (void 0 !== d && (a.strokeWidth = d, a = e.crisp(a)), a.fill = "none");
                g && (a.r = g);
                e.rSetter = function (a, f, q) {
                    c(q, {rx: a, ry: a})
                };
                return e.attr(a)
            },
            setSize: function (a, f, q) {
                var b = this.alignedObjects, g = b.length;
                this.width = a;
                this.height = f;
                for (this.boxWrapper.animate({
                    width: a,
                    height: f
                }, {
                    step: function () {
                        this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
                    }, duration: A(q, !0) ? void 0 : 0
                }); g--;) b[g].align()
            },
            g: function (a) {
                var f = this.createElement("g");
                return a ? f.attr({"class": "highcharts-" + a}) : f
            },
            image: function (a, f, q, b, g, d) {
                var e = {preserveAspectRatio: "none"}, m, h = function (a, f) {
                    a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", f) : a.setAttribute("hc-svg-href", f)
                }, J = function (f) {
                    h(m.element, a);
                    d.call(m, f)
                };
                1 < arguments.length && n(e, {
                    x: f, y: q, width: b,
                    height: g
                });
                m = this.createElement("image").attr(e);
                d ? (h(m.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), e = new R.Image, G(e, "load", J), e.src = a, e.complete && J({})) : h(m.element, a);
                return m
            },
            symbol: function (a, f, q, b, g, d) {
                var e = this, m, h = /^url\((.*?)\)$/, J = h.test(a), z = !J && (this.symbols[a] ? a : "circle"),
                    x = z && this.symbols[z],
                    c = r(f) && x && x.call(this.symbols, Math.round(f), Math.round(q), b, g, d), C, u;
                x ? (m = this.path(c), e.styledMode || m.attr("fill", "none"), n(m, {
                    symbolName: z, x: f,
                    y: q, width: b, height: g
                }), d && n(m, d)) : J && (C = a.match(h)[1], m = this.image(C), m.imgwidth = A(M[C] && M[C].width, d && d.width), m.imgheight = A(M[C] && M[C].height, d && d.height), u = function () {
                    m.attr({width: m.width, height: m.height})
                }, ["width", "height"].forEach(function (a) {
                    m[a + "Setter"] = function (a, f) {
                        var q = {}, b = this["img" + f], g = "width" === f ? "translateX" : "translateY";
                        this[f] = a;
                        r(b) && (this.element && this.element.setAttribute(f, b), this.alignByTranslate || (q[g] = ((this[f] || 0) - b) / 2, this.attr(q)))
                    }
                }), r(f) && m.attr({x: f, y: q}), m.isImg =
                    !0, r(m.imgwidth) && r(m.imgheight) ? u() : (m.attr({
                    width: 0,
                    height: 0
                }), w("img", {
                    onload: function () {
                        var a = p[e.chartIndex];
                        0 === this.width && (v(this, {position: "absolute", top: "-999em"}), l.body.appendChild(this));
                        M[C] = {width: this.width, height: this.height};
                        m.imgwidth = this.width;
                        m.imgheight = this.height;
                        m.element && u();
                        this.parentNode && this.parentNode.removeChild(this);
                        e.imgCount--;
                        if (!e.imgCount && a && a.onload) a.onload()
                    }, src: C
                }), this.imgCount++));
                return m
            },
            symbols: {
                circle: function (a, f, q, b) {
                    return this.arc(a + q / 2, f +
                        b / 2, q / 2, b / 2, {start: 0, end: 2 * Math.PI, open: !1})
                }, square: function (a, f, q, b) {
                    return ["M", a, f, "L", a + q, f, a + q, f + b, a, f + b, "Z"]
                }, triangle: function (a, f, q, b) {
                    return ["M", a + q / 2, f, "L", a + q, f + b, a, f + b, "Z"]
                }, "triangle-down": function (a, f, q, b) {
                    return ["M", a, f, "L", a + q, f, a + q / 2, f + b, "Z"]
                }, diamond: function (a, f, q, b) {
                    return ["M", a + q / 2, f, "L", a + q, f + b / 2, a + q / 2, f + b, a, f + b / 2, "Z"]
                }, arc: function (a, f, q, b, g) {
                    var d = g.start, e = g.r || q, m = g.r || b || q, n = g.end - .001;
                    q = g.innerR;
                    b = A(g.open, .001 > Math.abs(g.end - g.start - 2 * Math.PI));
                    var h = Math.cos(d), J = Math.sin(d),
                        z = Math.cos(n), n = Math.sin(n);
                    g = .001 > g.end - d - Math.PI ? 0 : 1;
                    e = ["M", a + e * h, f + m * J, "A", e, m, 0, g, 1, a + e * z, f + m * n];
                    r(q) && e.push(b ? "M" : "L", a + q * z, f + q * n, "A", q, q, 0, g, 0, a + q * h, f + q * J);
                    e.push(b ? "" : "Z");
                    return e
                }, callout: function (a, f, q, b, g) {
                    var d = Math.min(g && g.r || 0, q, b), e = d + 6, m = g && g.anchorX;
                    g = g && g.anchorY;
                    var n;
                    n = ["M", a + d, f, "L", a + q - d, f, "C", a + q, f, a + q, f, a + q, f + d, "L", a + q, f + b - d, "C", a + q, f + b, a + q, f + b, a + q - d, f + b, "L", a + d, f + b, "C", a, f + b, a, f + b, a, f + b - d, "L", a, f + d, "C", a, f, a, f, a + d, f];
                    m && m > q ? g > f + e && g < f + b - e ? n.splice(13, 3, "L", a + q, g - 6, a + q + 6,
                        g, a + q, g + 6, a + q, f + b - d) : n.splice(13, 3, "L", a + q, b / 2, m, g, a + q, b / 2, a + q, f + b - d) : m && 0 > m ? g > f + e && g < f + b - e ? n.splice(33, 3, "L", a, g + 6, a - 6, g, a, g - 6, a, f + d) : n.splice(33, 3, "L", a, b / 2, m, g, a, b / 2, a, f + d) : g && g > b && m > a + e && m < a + q - e ? n.splice(23, 3, "L", m + 6, f + b, m, f + b + 6, m - 6, f + b, a + d, f + b) : g && 0 > g && m > a + e && m < a + q - e && n.splice(3, 3, "L", m - 6, f, m, f - 6, m + 6, f, q - d, f);
                    return n
                }
            },
            clipRect: function (f, q, b, g) {
                var d = a.uniqueKey(), e = this.createElement("clipPath").attr({id: d}).add(this.defs);
                f = this.rect(f, q, b, g, 0).add(e);
                f.id = d;
                f.clipPath = e;
                f.count = 0;
                return f
            },
            text: function (a, f, q, b) {
                var g = {};
                if (b && (this.allowHTML || !this.forExport)) return this.html(a, f, q);
                g.x = Math.round(f || 0);
                q && (g.y = Math.round(q));
                r(a) && (g.text = a);
                a = this.createElement("text").attr(g);
                b || (a.xSetter = function (a, f, q) {
                    var b = q.getElementsByTagName("tspan"), g, d = q.getAttribute(f), e;
                    for (e = 0; e < b.length; e++) g = b[e], g.getAttribute(f) === d && g.setAttribute(f, a);
                    q.setAttribute(f, a)
                });
                return a
            },
            fontMetrics: function (a, q) {
                a = !this.styledMode && /px/.test(a) || !R.getComputedStyle ? a || q && q.style && q.style.fontSize ||
                    this.style && this.style.fontSize : q && y.prototype.getStyle.call(q, "font-size");
                a = /px/.test(a) ? f(a) : 12;
                q = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {h: q, b: Math.round(.8 * q), f: a}
            },
            rotCorr: function (a, f, q) {
                var b = a;
                f && q && (b = Math.max(b * Math.cos(f * h), 4));
                return {x: -a / 3 * Math.sin(f * h), y: b}
            },
            label: function (f, b, g, d, e, h, J, z, x) {
                var l = this, c = l.styledMode, u = l.g("button" !== x && "label"),
                    D = u.text = l.text("", 0, 0, J).attr({zIndex: 1}), K, L, C = 0, A = 3, B = 0, M, k, E, H, T,
                    w = {}, p, t, R = /^url\((.*?)\)$/.test(d), v = c || R, P = function () {
                        return c ? K.strokeWidth() %
                            2 / 2 : (p ? parseInt(p, 10) : 0) % 2 / 2
                    }, U, O, S;
                x && u.addClass("highcharts-" + x);
                U = function () {
                    var a = D.element.style, f = {};
                    L = (void 0 === M || void 0 === k || T) && r(D.textStr) && D.getBBox();
                    u.width = (M || L.width || 0) + 2 * A + B;
                    u.height = (k || L.height || 0) + 2 * A;
                    t = A + Math.min(l.fontMetrics(a && a.fontSize, D).b, L ? L.height : Infinity);
                    v && (K || (u.box = K = l.symbols[d] || R ? l.symbol(d) : l.rect(), K.addClass(("button" === x ? "" : "highcharts-label-box") + (x ? " highcharts-" + x + "-box" : "")), K.add(u), a = P(), f.x = a, f.y = (z ? -t : 0) + a), f.width = Math.round(u.width), f.height =
                        Math.round(u.height), K.attr(n(f, w)), w = {})
                };
                O = function () {
                    var a = B + A, f;
                    f = z ? 0 : t;
                    r(M) && L && ("center" === T || "right" === T) && (a += {center: .5, right: 1}[T] * (M - L.width));
                    if (a !== D.x || f !== D.y) D.attr("x", a), D.hasBoxWidthChanged && (L = D.getBBox(!0), U()), void 0 !== f && D.attr("y", f);
                    D.x = a;
                    D.y = f
                };
                S = function (a, f) {
                    K ? K.attr(a, f) : w[a] = f
                };
                u.onAdd = function () {
                    D.add(u);
                    u.attr({text: f || 0 === f ? f : "", x: b, y: g});
                    K && r(e) && u.attr({anchorX: e, anchorY: h})
                };
                u.widthSetter = function (f) {
                    M = a.isNumber(f) ? f : null
                };
                u.heightSetter = function (a) {
                    k = a
                };
                u["text-alignSetter"] =
                    function (a) {
                        T = a
                    };
                u.paddingSetter = function (a) {
                    r(a) && a !== A && (A = u.padding = a, O())
                };
                u.paddingLeftSetter = function (a) {
                    r(a) && a !== B && (B = a, O())
                };
                u.alignSetter = function (a) {
                    a = {left: 0, center: .5, right: 1}[a];
                    a !== C && (C = a, L && u.attr({x: E}))
                };
                u.textSetter = function (a) {
                    void 0 !== a && D.textSetter(a);
                    U();
                    O()
                };
                u["stroke-widthSetter"] = function (a, f) {
                    a && (v = !0);
                    p = this["stroke-width"] = a;
                    S(f, a)
                };
                c ? u.rSetter = function (a, f) {
                    S(f, a)
                } : u.strokeSetter = u.fillSetter = u.rSetter = function (a, f) {
                    "r" !== f && ("fill" === f && a && (v = !0), u[f] = a);
                    S(f, a)
                };
                u.anchorXSetter = function (a, f) {
                    e = u.anchorX = a;
                    S(f, Math.round(a) - P() - E)
                };
                u.anchorYSetter = function (a, f) {
                    h = u.anchorY = a;
                    S(f, a - H)
                };
                u.xSetter = function (a) {
                    u.x = a;
                    C && (a -= C * ((M || L.width) + 2 * A), u["forceAnimate:x"] = !0);
                    E = Math.round(a);
                    u.attr("translateX", E)
                };
                u.ySetter = function (a) {
                    H = u.y = Math.round(a);
                    u.attr("translateY", H)
                };
                var G = u.css;
                J = {
                    css: function (a) {
                        if (a) {
                            var f = {};
                            a = m(a);
                            u.textProps.forEach(function (q) {
                                void 0 !== a[q] && (f[q] = a[q], delete a[q])
                            });
                            D.css(f);
                            "width" in f && U();
                            "fontSize" in f && (U(), O())
                        }
                        return G.call(u,
                            a)
                    }, getBBox: function () {
                        return {width: L.width + 2 * A, height: L.height + 2 * A, x: L.x - A, y: L.y - A}
                    }, destroy: function () {
                        q(u.element, "mouseenter");
                        q(u.element, "mouseleave");
                        D && (D = D.destroy());
                        K && (K = K.destroy());
                        y.prototype.destroy.call(u);
                        u = l = U = O = S = null
                    }
                };
                c || (J.shadow = function (a) {
                    a && (U(), K && K.shadow(a));
                    return u
                });
                return n(u, J)
            }
        });
        a.Renderer = F
    })(I);
    (function (a) {
        var y = a.attr, F = a.createElement, G = a.css, k = a.defined, c = a.extend, p = a.isFirefox, t = a.isMS,
            v = a.isWebKit, w = a.pick, r = a.pInt, h = a.SVGElement, e = a.SVGRenderer, l = a.win;
        c(h.prototype, {
            htmlCss: function (a) {
                var d = "SPAN" === this.element.tagName && a && "width" in a, g = w(d && a.width, void 0), b;
                d && (delete a.width, this.textWidth = g, b = !0);
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = c(this.styles, a);
                G(this.element, a);
                b && this.htmlUpdateTransform();
                return this
            }, htmlGetBBox: function () {
                var a = this.element;
                return {x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight}
            }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer,
                        d = this.element, g = this.translateX || 0, b = this.translateY || 0, e = this.x || 0,
                        h = this.y || 0, l = this.textAlign || "left", c = {left: 0, center: .5, right: 1}[l],
                        B = this.styles, m = B && B.whiteSpace;
                    G(d, {marginLeft: g, marginTop: b});
                    !a.styledMode && this.shadows && this.shadows.forEach(function (a) {
                        G(a, {marginLeft: g + 1, marginTop: b + 1})
                    });
                    this.inverted && [].forEach.call(d.childNodes, function (f) {
                        a.invertChild(f, d)
                    });
                    if ("SPAN" === d.tagName) {
                        var B = this.rotation, z = this.textWidth && r(this.textWidth),
                            D = [B, l, d.innerHTML, this.textWidth, this.textAlign].join(),
                            A;
                        (A = z !== this.oldTextWidth) && !(A = z > this.oldTextWidth) && ((A = this.textPxLength) || (G(d, {
                            width: "",
                            whiteSpace: m || "nowrap"
                        }), A = d.offsetWidth), A = A > z);
                        A && (/[ \-]/.test(d.textContent || d.innerText) || "ellipsis" === d.style.textOverflow) ? (G(d, {
                            width: z + "px",
                            display: "block",
                            whiteSpace: m || "normal"
                        }), this.oldTextWidth = z, this.hasBoxWidthChanged = !0) : this.hasBoxWidthChanged = !1;
                        D !== this.cTT && (m = a.fontMetrics(d.style.fontSize, d).b, !k(B) || B === (this.oldRotation || 0) && l === this.oldAlign || this.setSpanRotation(B, c, m), this.getSpanCorrection(!k(B) &&
                            this.textPxLength || d.offsetWidth, m, c, B, l));
                        G(d, {left: e + (this.xCorr || 0) + "px", top: h + (this.yCorr || 0) + "px"});
                        this.cTT = D;
                        this.oldRotation = B;
                        this.oldAlign = l
                    }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (a, d, g) {
                var b = {}, e = this.renderer.getTransformKey();
                b[e] = b.transform = "rotate(" + a + "deg)";
                b[e + (p ? "Origin" : "-origin")] = b.transformOrigin = 100 * d + "% " + g + "px";
                G(this.element, b)
            }, getSpanCorrection: function (a, d, g) {
                this.xCorr = -a * g;
                this.yCorr = -d
            }
        });
        c(e.prototype, {
            getTransformKey: function () {
                return t && !/Edge/.test(l.navigator.userAgent) ?
                    "-ms-transform" : v ? "-webkit-transform" : p ? "MozTransform" : l.opera ? "-o-transform" : ""
            }, html: function (e, d, g) {
                var b = this.createElement("span"), n = b.element, u = b.renderer, l = u.isSVG, r = function (a, b) {
                    ["opacity", "visibility"].forEach(function (g) {
                        a[g + "Setter"] = function (a, f, q) {
                            h.prototype[g + "Setter"].call(this, a, f, q);
                            b[f] = a
                        }
                    });
                    a.addedSetters = !0
                }, B = a.charts[u.chartIndex], B = B && B.styledMode;
                b.textSetter = function (a) {
                    a !== n.innerHTML && delete this.bBox;
                    this.textStr = a;
                    n.innerHTML = w(a, "");
                    b.doTransform = !0
                };
                l && r(b, b.element.style);
                b.xSetter = b.ySetter = b.alignSetter = b.rotationSetter = function (a, g) {
                    "align" === g && (g = "textAlign");
                    b[g] = a;
                    b.doTransform = !0
                };
                b.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                b.attr({text: e, x: Math.round(d), y: Math.round(g)}).css({position: "absolute"});
                B || b.css({fontFamily: this.style.fontFamily, fontSize: this.style.fontSize});
                n.style.whiteSpace = "nowrap";
                b.css = b.htmlCss;
                l && (b.add = function (a) {
                    var g, d = u.box.parentNode, e = [];
                    if (this.parentGroup = a) {
                        if (g = a.div, !g) {
                            for (; a;) e.push(a),
                                a = a.parentGroup;
                            e.reverse().forEach(function (a) {
                                function f(f, q) {
                                    a[q] = f;
                                    "translateX" === q ? m.left = f + "px" : m.top = f + "px";
                                    a.doTransform = !0
                                }

                                var m, h = y(a.element, "class");
                                h && (h = {className: h});
                                g = a.div = a.div || F("div", h, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, g || d);
                                m = g.style;
                                c(a, {
                                    classSetter: function (a) {
                                        return function (f) {
                                            this.element.setAttribute("class", f);
                                            a.className = f
                                        }
                                    }(g), on: function () {
                                        e[0].div &&
                                        b.on.apply({element: e[0].div}, arguments);
                                        return a
                                    }, translateXSetter: f, translateYSetter: f
                                });
                                a.addedSetters || r(a, m)
                            })
                        }
                    } else g = d;
                    g.appendChild(n);
                    b.added = !0;
                    b.alignOnAdd && b.htmlUpdateTransform();
                    return b
                });
                return b
            }
        })
    })(I);
    (function (a) {
        var y = a.defined, F = a.extend, G = a.merge, k = a.pick, c = a.timeUnits, p = a.win;
        a.Time = function (a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {}, update: function (a) {
                var c = k(a && a.useUTC, !0), w = this;
                this.options = a = G(!0, this.options || {}, a);
                this.Date = a.Date || p.Date || Date;
                this.timezoneOffset =
                    (this.useUTC = c) && a.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(c && !a.getTimezoneOffset && !a.timezone)) || this.timezoneOffset ? (this.get = function (a, h) {
                    var e = h.getTime(), l = e - w.getTimezoneOffset(h);
                    h.setTime(l);
                    a = h["getUTC" + a]();
                    h.setTime(e);
                    return a
                }, this.set = function (a, h, e) {
                    var l;
                    if ("Milliseconds" === a || "Seconds" === a || "Minutes" === a && 0 === h.getTimezoneOffset() % 60) h["set" + a](e); else l = w.getTimezoneOffset(h), l = h.getTime() - l, h.setTime(l), h["setUTC" + a](e), a = w.getTimezoneOffset(h),
                        l = h.getTime() + a, h.setTime(l)
                }) : c ? (this.get = function (a, h) {
                    return h["getUTC" + a]()
                }, this.set = function (a, h, e) {
                    return h["setUTC" + a](e)
                }) : (this.get = function (a, h) {
                    return h["get" + a]()
                }, this.set = function (a, h, e) {
                    return h["set" + a](e)
                })
            }, makeTime: function (c, p, w, r, h, e) {
                var l, n, d;
                this.useUTC ? (l = this.Date.UTC.apply(0, arguments), n = this.getTimezoneOffset(l), l += n, d = this.getTimezoneOffset(l), n !== d ? l += d - n : n - 36E5 !== this.getTimezoneOffset(l - 36E5) || a.isSafari || (l -= 36E5)) : l = (new this.Date(c, p, k(w, 1), k(r, 0), k(h, 0), k(e, 0))).getTime();
                return l
            }, timezoneOffsetFunction: function () {
                var c = this, k = this.options, w = p.moment;
                if (!this.useUTC) return function (a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (k.timezone) {
                    if (w) return function (a) {
                        return 6E4 * -w.tz(a, k.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && k.getTimezoneOffset ? function (a) {
                    return 6E4 * k.getTimezoneOffset(a)
                } : function () {
                    return 6E4 * (c.timezoneOffset || 0)
                }
            }, dateFormat: function (c, k, w) {
                if (!a.defined(k) || isNaN(k)) return a.defaultOptions.lang.invalidDate || "";
                c = a.pick(c, "%Y-%m-%d %H:%M:%S");
                var r = this, h = new this.Date(k), e = this.get("Hours", h), l = this.get("Day", h),
                    n = this.get("Date", h), d = this.get("Month", h), g = this.get("FullYear", h),
                    b = a.defaultOptions.lang, x = b.weekdays, u = b.shortWeekdays, H = a.pad, h = a.extend({
                        a: u ? u[l] : x[l].substr(0, 3),
                        A: x[l],
                        d: H(n),
                        e: H(n, 2, " "),
                        w: l,
                        b: b.shortMonths[d],
                        B: b.months[d],
                        m: H(d + 1),
                        o: d + 1,
                        y: g.toString().substr(2, 2),
                        Y: g,
                        H: H(e),
                        k: e,
                        I: H(e % 12 || 12),
                        l: e % 12 || 12,
                        M: H(r.get("Minutes", h)),
                        p: 12 > e ? "AM" : "PM",
                        P: 12 > e ? "am" : "pm",
                        S: H(h.getSeconds()),
                        L: H(Math.floor(k % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(h, function (a, b) {
                    for (; -1 !== c.indexOf("%" + b);) c = c.replace("%" + b, "function" === typeof a ? a.call(r, k) : a)
                });
                return w ? c.substr(0, 1).toUpperCase() + c.substr(1) : c
            }, resolveDTLFormat: function (c) {
                return a.isObject(c, !0) ? c : (c = a.splat(c), {main: c[0], from: c[1], to: c[2]})
            }, getTimeTicks: function (a, p, w, r) {
                var h = this, e = [], l, n = {}, d;
                l = new h.Date(p);
                var g = a.unitRange, b = a.count || 1, x;
                r = k(r, 1);
                if (y(p)) {
                    h.set("Milliseconds", l, g >= c.second ? 0 : b * Math.floor(h.get("Milliseconds", l) / b));
                    g >= c.second && h.set("Seconds", l, g >=
                    c.minute ? 0 : b * Math.floor(h.get("Seconds", l) / b));
                    g >= c.minute && h.set("Minutes", l, g >= c.hour ? 0 : b * Math.floor(h.get("Minutes", l) / b));
                    g >= c.hour && h.set("Hours", l, g >= c.day ? 0 : b * Math.floor(h.get("Hours", l) / b));
                    g >= c.day && h.set("Date", l, g >= c.month ? 1 : Math.max(1, b * Math.floor(h.get("Date", l) / b)));
                    g >= c.month && (h.set("Month", l, g >= c.year ? 0 : b * Math.floor(h.get("Month", l) / b)), d = h.get("FullYear", l));
                    g >= c.year && h.set("FullYear", l, d - d % b);
                    g === c.week && (d = h.get("Day", l), h.set("Date", l, h.get("Date", l) - d + r + (d < r ? -7 : 0)));
                    d = h.get("FullYear",
                        l);
                    r = h.get("Month", l);
                    var u = h.get("Date", l), H = h.get("Hours", l);
                    p = l.getTime();
                    h.variableTimezone && (x = w - p > 4 * c.month || h.getTimezoneOffset(p) !== h.getTimezoneOffset(w));
                    p = l.getTime();
                    for (l = 1; p < w;) e.push(p), p = g === c.year ? h.makeTime(d + l * b, 0) : g === c.month ? h.makeTime(d, r + l * b) : !x || g !== c.day && g !== c.week ? x && g === c.hour && 1 < b ? h.makeTime(d, r, u, H + l * b) : p + g * b : h.makeTime(d, r, u + l * b * (g === c.day ? 1 : 7)), l++;
                    e.push(p);
                    g <= c.hour && 1E4 > e.length && e.forEach(function (a) {
                        0 === a % 18E5 && "000000000" === h.dateFormat("%H%M%S%L", a) && (n[a] = "day")
                    })
                }
                e.info =
                    F(a, {higherRanks: n, totalRange: g * b});
                return e
            }
        }
    })(I);
    (function (a) {
        var y = a.color, F = a.merge;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                styledMode: !1,
                borderRadius: 0,
                colorCount: 10,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {theme: {zIndex: 6}, position: {align: "right", x: -10, y: 10}},
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {
                text: "Chart title", align: "center",
                margin: 15, widthAdjust: -44
            },
            subtitle: {text: "", align: "center", widthAdjust: -44},
            plotOptions: {},
            labels: {style: {position: "absolute", color: "#333333"}},
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {activeColor: "#003399", inactiveColor: "#cccccc"},
                itemStyle: {
                    color: "#333333",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "bold",
                    textOverflow: "ellipsis"
                },
                itemHoverStyle: {color: "#000000"},
                itemHiddenStyle: {color: "#cccccc"},
                shadow: !1,
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {style: {fontWeight: "bold"}}
            },
            loading: {
                labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
                style: {position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"}
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                backgroundColor: y("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                shadow: !0,
                style: {
                    color: "#333333", cursor: "default", fontSize: "12px", pointerEvents: "none",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "https://www.highcharts.com?credits",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                style: {cursor: "pointer", color: "#999999", fontSize: "9px"},
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (y) {
            a.defaultOptions = F(!0, a.defaultOptions, y);
            a.time.update(F(a.defaultOptions.global, a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(F(a.defaultOptions.global,
            a.defaultOptions.time));
        a.dateFormat = function (y, k, c) {
            return a.time.dateFormat(y, k, c)
        }
    })(I);
    (function (a) {
        var y = a.correctFloat, F = a.defined, G = a.destroyObjectProperties, k = a.fireEvent, c = a.isNumber,
            p = a.merge, t = a.pick, v = a.deg2rad;
        a.Tick = function (a, c, h, e, l) {
            this.axis = a;
            this.pos = c;
            this.type = h || "";
            this.isNewLabel = this.isNew = !0;
            this.parameters = l || {};
            this.tickmarkOffset = this.parameters.tickmarkOffset;
            this.options = this.parameters.options;
            h || e || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var c = this,
                    r = c.axis, h = r.options, e = r.chart, l = r.categories, n = r.names, d = c.pos,
                    g = t(c.options && c.options.labels, h.labels), b = r.tickPositions, x = d === b[0],
                    u = d === b[b.length - 1], l = this.parameters.category || (l ? t(l[d], n[d], d) : d), k = c.label,
                    b = b.info, E, B, m, z;
                r.isDatetimeAxis && b && (B = e.time.resolveDTLFormat(h.dateTimeLabelFormats[!h.grid && b.higherRanks[d] || b.unitName]), E = B.main);
                c.isFirst = x;
                c.isLast = u;
                c.formatCtx = {
                    axis: r,
                    chart: e,
                    isFirst: x,
                    isLast: u,
                    dateTimeLabelFormat: E,
                    tickPositionInfo: b,
                    value: r.isLog ? y(r.lin2log(l)) : l,
                    pos: d
                };
                h = r.labelFormatter.call(c.formatCtx, this.formatCtx);
                if (z = B && B.list) c.shortenLabel = function () {
                    for (m = 0; m < z.length; m++) if (k.attr({text: r.labelFormatter.call(a.extend(c.formatCtx, {dateTimeLabelFormat: z[m]}))}), k.getBBox().width < r.getSlotWidth(c) - 2 * t(g.padding, 5)) return;
                    k.attr({text: ""})
                };
                if (F(k)) k && k.textStr !== h && (!k.textWidth || g.style && g.style.width || k.styles.width || k.css({width: null}), k.attr({text: h})); else {
                    if (c.label = k = F(h) && g.enabled ? e.renderer.text(h, 0, 0, g.useHTML).add(r.labelGroup) : null) e.styledMode ||
                    k.css(p(g.style)), k.textPxLength = k.getBBox().width;
                    c.rotation = 0
                }
            }, getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }, handleOverflow: function (a) {
                var c = this.axis, h = c.options.labels, e = a.x, l = c.chart.chartWidth, n = c.chart.spacing,
                    d = t(c.labelLeft, Math.min(c.pos, n[3])),
                    n = t(c.labelRight, Math.max(c.isRadial ? 0 : c.pos + c.len, l - n[1])), g = this.label,
                    b = this.rotation, x = {left: 0, center: .5, right: 1}[c.labelAlign || g.attr("align")],
                    u = g.getBBox().width, k = c.getSlotWidth(this),
                    E = k, B = 1, m, z = {};
                if (b || "justify" !== t(h.overflow, "justify")) 0 > b && e - x * u < d ? m = Math.round(e / Math.cos(b * v) - d) : 0 < b && e + x * u > n && (m = Math.round((l - e) / Math.cos(b * v))); else if (l = e + (1 - x) * u, e - x * u < d ? E = a.x + E * (1 - x) - d : l > n && (E = n - a.x + E * x, B = -1), E = Math.min(k, E), E < k && "center" === c.labelAlign && (a.x += B * (k - E - x * (k - Math.min(u, E)))), u > E || c.autoRotation && (g.styles || {}).width) m = E;
                m && (this.shortenLabel ? this.shortenLabel() : (z.width = Math.floor(m), (h.style || {}).textOverflow || (z.textOverflow = "ellipsis"), g.css(z)))
            }, getPosition: function (c,
                                      r, h, e) {
                var l = this.axis, n = l.chart, d = e && n.oldChartHeight || n.chartHeight;
                c = {
                    x: c ? a.correctFloat(l.translate(r + h, null, null, e) + l.transB) : l.left + l.offset + (l.opposite ? (e && n.oldChartWidth || n.chartWidth) - l.right - l.left : 0),
                    y: c ? d - l.bottom + l.offset - (l.opposite ? l.height : 0) : a.correctFloat(d - l.translate(r + h, null, null, e) - l.transB)
                };
                k(this, "afterGetPosition", {pos: c});
                return c
            }, getLabelPosition: function (a, c, h, e, l, n, d, g) {
                var b = this.axis, x = b.transA, u = b.reversed, r = b.staggerLines, E = b.tickRotCorr || {x: 0, y: 0},
                    B = l.y, m = e || b.reserveSpaceDefault ?
                    0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1), z = {};
                F(B) || (B = 0 === b.side ? h.rotation ? -8 : -h.getBBox().height : 2 === b.side ? E.y + 8 : Math.cos(h.rotation * v) * (E.y - h.getBBox(!1, 0).height / 2));
                a = a + l.x + m + E.x - (n && e ? n * x * (u ? -1 : 1) : 0);
                c = c + B - (n && !e ? n * x * (u ? 1 : -1) : 0);
                r && (h = d / (g || 1) % r, b.opposite && (h = r - h - 1), c += b.labelOffset / r * h);
                z.x = a;
                z.y = Math.round(c);
                k(this, "afterGetLabelPosition", {pos: z, tickmarkOffset: n, index: d});
                return z
            }, getMarkPath: function (a, c, h, e, l, n) {
                return n.crispLine(["M", a, c, "L", a + (l ? 0 : -h), c + (l ? h : 0)], e)
            }, renderGridLine: function (a,
                                         c, h) {
                var e = this.axis, l = e.options, n = this.gridLine, d = {}, g = this.pos, b = this.type,
                    x = t(this.tickmarkOffset, e.tickmarkOffset), u = e.chart.renderer, r = b ? b + "Grid" : "grid",
                    k = l[r + "LineWidth"], B = l[r + "LineColor"], l = l[r + "LineDashStyle"];
                n || (e.chart.styledMode || (d.stroke = B, d["stroke-width"] = k, l && (d.dashstyle = l)), b || (d.zIndex = 1), a && (c = 0), this.gridLine = n = u.path().attr(d).addClass("highcharts-" + (b ? b + "-" : "") + "grid-line").add(e.gridGroup));
                if (n && (h = e.getPlotLinePath(g + x, n.strokeWidth() * h, a, "pass"))) n[a || this.isNew ? "attr" :
                    "animate"]({d: h, opacity: c})
            }, renderMark: function (a, c, h) {
                var e = this.axis, l = e.options, n = e.chart.renderer, d = this.type, g = d ? d + "Tick" : "tick",
                    b = e.tickSize(g), x = this.mark, u = !x, r = a.x;
                a = a.y;
                var k = t(l[g + "Width"], !d && e.isXAxis ? 1 : 0), l = l[g + "Color"];
                b && (e.opposite && (b[0] = -b[0]), u && (this.mark = x = n.path().addClass("highcharts-" + (d ? d + "-" : "") + "tick").add(e.axisGroup), e.chart.styledMode || x.attr({
                    stroke: l,
                    "stroke-width": k
                })), x[u ? "attr" : "animate"]({
                    d: this.getMarkPath(r, a, b[0], x.strokeWidth() * h, e.horiz, n),
                    opacity: c
                }))
            },
            renderLabel: function (a, r, h, e) {
                var l = this.axis, n = l.horiz, d = l.options, g = this.label, b = d.labels, x = b.step,
                    l = t(this.tickmarkOffset, l.tickmarkOffset), u = !0, k = a.x;
                a = a.y;
                g && c(k) && (g.xy = a = this.getLabelPosition(k, a, g, n, b, l, e, x), this.isFirst && !this.isLast && !t(d.showFirstLabel, 1) || this.isLast && !this.isFirst && !t(d.showLastLabel, 1) ? u = !1 : !n || b.step || b.rotation || r || 0 === h || this.handleOverflow(a), x && e % x && (u = !1), u && c(a.y) ? (a.opacity = h, g[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (g.attr("y", -9999), this.isNewLabel =
                    !0))
            }, render: function (c, r, h) {
                var e = this.axis, l = e.horiz, n = this.pos, d = t(this.tickmarkOffset, e.tickmarkOffset),
                    n = this.getPosition(l, n, d, r), d = n.x, g = n.y,
                    e = l && d === e.pos + e.len || !l && g === e.pos ? -1 : 1;
                h = t(h, 1);
                this.isActive = !0;
                this.renderGridLine(r, h, e);
                this.renderMark(n, h, e);
                this.renderLabel(n, r, h, c);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            }, destroy: function () {
                G(this, this.axis)
            }
        }
    })(I);
    var X = function (a) {
        var y = a.addEvent, F = a.animObject, G = a.arrayMax, k = a.arrayMin, c = a.color, p = a.correctFloat,
            t = a.defaultOptions,
            v = a.defined, w = a.deg2rad, r = a.destroyObjectProperties, h = a.extend, e = a.fireEvent, l = a.format,
            n = a.getMagnitude, d = a.isArray, g = a.isNumber, b = a.isString, x = a.merge, u = a.normalizeTickInterval,
            H = a.objectEach, E = a.pick, B = a.removeEvent, m = a.splat, z = a.syncTimeout, D = a.Tick,
            A = function () {
                this.init.apply(this, arguments)
            };
        a.extend(A.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: {main: "%H:%M:%S.%L", range: !1},
                    second: {main: "%H:%M:%S", range: !1},
                    minute: {main: "%H:%M", range: !1},
                    hour: {main: "%H:%M", range: !1},
                    day: {main: "%e. %b"},
                    week: {main: "%e. %b"},
                    month: {main: "%b '%y"},
                    year: {main: "%Y"}
                },
                endOnTick: !1,
                labels: {
                    enabled: !0,
                    indentation: 10,
                    x: 0,
                    style: {color: "#666666", cursor: "default", fontSize: "11px"}
                },
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickPixelInterval: 100,
                tickmarkPlacement: "between",
                tickPosition: "outside",
                title: {align: "middle", style: {color: "#666666"}},
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                maxPadding: .05,
                minPadding: .05,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {x: -8},
                startOnTick: !0,
                title: {rotation: 270, text: "Values"},
                stackLabels: {
                    allowOverlap: !1, enabled: !1, formatter: function () {
                        return a.numberFormat(this.total, -1)
                    }, style: {color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast"}
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {labels: {x: -15}, title: {rotation: 270}},
            defaultRightAxisOptions: {
                labels: {x: 15},
                title: {rotation: 90}
            },
            defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, margin: 15, title: {rotation: 0}},
            defaultTopAxisOptions: {labels: {autoRotation: [-45], x: 0}, margin: 15, title: {rotation: 0}},
            init: function (a, q) {
                var f = q.isX, b = this;
                b.chart = a;
                b.horiz = a.inverted && !b.isZAxis ? !f : f;
                b.isXAxis = f;
                b.coll = b.coll || (f ? "xAxis" : "yAxis");
                e(this, "init", {userOptions: q});
                b.opposite = q.opposite;
                b.side = q.side || (b.horiz ? b.opposite ? 0 : 2 : b.opposite ? 1 : 3);
                b.setOptions(q);
                var g = this.options, d = g.type;
                b.labelFormatter = g.labels.formatter ||
                    b.defaultLabelFormatter;
                b.userOptions = q;
                b.minPixelPadding = 0;
                b.reversed = g.reversed;
                b.visible = !1 !== g.visible;
                b.zoomEnabled = !1 !== g.zoomEnabled;
                b.hasNames = "category" === d || !0 === g.categories;
                b.categories = g.categories || b.hasNames;
                b.names || (b.names = [], b.names.keys = {});
                b.plotLinesAndBandsGroups = {};
                b.isLog = "logarithmic" === d;
                b.isDatetimeAxis = "datetime" === d;
                b.positiveValuesOnly = b.isLog && !b.allowNegativeLog;
                b.isLinked = v(g.linkedTo);
                b.ticks = {};
                b.labelEdge = [];
                b.minorTicks = {};
                b.plotLinesAndBands = [];
                b.alternateBands =
                    {};
                b.len = 0;
                b.minRange = b.userMinRange = g.minRange || g.maxZoom;
                b.range = g.range;
                b.offset = g.offset || 0;
                b.stacks = {};
                b.oldStacks = {};
                b.stacksTouched = 0;
                b.max = null;
                b.min = null;
                b.crosshair = E(g.crosshair, m(a.options.tooltip.crosshairs)[f ? 0 : 1], !1);
                q = b.options.events;
                -1 === a.axes.indexOf(b) && (f ? a.axes.splice(a.xAxis.length, 0, b) : a.axes.push(b), a[b.coll].push(b));
                b.series = b.series || [];
                a.inverted && !b.isZAxis && f && void 0 === b.reversed && (b.reversed = !0);
                H(q, function (a, f) {
                    y(b, f, a)
                });
                b.lin2log = g.linearToLogConverter || b.lin2log;
                b.isLog && (b.val2lin = b.log2lin, b.lin2val = b.lin2log);
                e(this, "afterInit")
            },
            setOptions: function (a) {
                this.options = x(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], x(t[this.coll], a));
                e(this, "afterSetOptions", {userOptions: a})
            },
            defaultLabelFormatter: function () {
                var f = this.axis, q = this.value, b = f.chart.time, g = f.categories, d = this.dateTimeLabelFormat,
                    e = t.lang, m = e.numericSymbols,
                    e = e.numericSymbolMagnitude || 1E3, h = m && m.length, n, c = f.options.labels.format,
                    f = f.isLog ? Math.abs(q) : f.tickInterval;
                if (c) n = l(c, this, b); else if (g) n = q; else if (d) n = b.dateFormat(d, q); else if (h && 1E3 <= f) for (; h-- && void 0 === n;) b = Math.pow(e, h + 1), f >= b && 0 === 10 * q % b && null !== m[h] && 0 !== q && (n = a.numberFormat(q / b, -1) + m[h]);
                void 0 === n && (n = 1E4 <= Math.abs(q) ? a.numberFormat(q, -1) : a.numberFormat(q, -1, void 0, ""));
                return n
            },
            getSeriesExtremes: function () {
                var a = this, q = a.chart;
                e(this, "getSeriesExtremes", null, function () {
                    a.hasVisibleSeries =
                        !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    a.series.forEach(function (f) {
                        if (f.visible || !q.options.chart.ignoreHiddenSeries) {
                            var b = f.options, d = b.threshold, e;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= d && (d = null);
                            if (a.isXAxis) b = f.xData, b.length && (f = k(b), e = G(b), g(f) || f instanceof Date || (b = b.filter(g), f = k(b), e = G(b)), b.length && (a.dataMin = Math.min(E(a.dataMin, b[0], f), f), a.dataMax = Math.max(E(a.dataMax, b[0], e), e))); else if (f.getExtremes(), e = f.dataMax,
                                    f = f.dataMin, v(f) && v(e) && (a.dataMin = Math.min(E(a.dataMin, f), f), a.dataMax = Math.max(E(a.dataMax, e), e)), v(d) && (a.threshold = d), !b.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                e(this, "afterGetSeriesExtremes")
            },
            translate: function (a, q, b, d, e, m) {
                var f = this.linkedParent || this, h = 1, n = 0, c = d ? f.oldTransA : f.transA;
                d = d ? f.oldMin : f.min;
                var u = f.minPixelPadding;
                e = (f.isOrdinal || f.isBroken || f.isLog && e) && f.lin2val;
                c || (c = f.transA);
                b && (h *= -1, n = f.len);
                f.reversed && (h *= -1, n -= h * (f.sector || f.len));
                q ? (a = (a * h + n - u) /
                    c + d, e && (a = f.lin2val(a))) : (e && (a = f.val2lin(a)), a = g(d) ? h * (a - d) * c + n + h * u + (g(m) ? c * m : 0) : void 0);
                return a
            },
            toPixels: function (a, q) {
                return this.translate(a, !1, !this.horiz, null, !0) + (q ? 0 : this.pos)
            },
            toValue: function (a, q) {
                return this.translate(a - (q ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a, q, b, d, m) {
                var f = this, h = f.chart, n = f.left, c = f.top, u, l, z, x,
                    D = b && h.oldChartHeight || h.chartHeight, r = b && h.oldChartWidth || h.chartWidth, k,
                    L = f.transB, A, B = function (a, f, q) {
                        if ("pass" !== d && a < f || a > q) d ? a = Math.min(Math.max(f,
                            a), q) : k = !0;
                        return a
                    };
                A = {value: a, lineWidth: q, old: b, force: d, translatedValue: m};
                e(this, "getPlotLinePath", A, function (e) {
                    m = E(m, f.translate(a, null, null, b));
                    m = Math.min(Math.max(-1E5, m), 1E5);
                    u = z = Math.round(m + L);
                    l = x = Math.round(D - m - L);
                    g(m) ? f.horiz ? (l = c, x = D - f.bottom, u = z = B(u, n, n + f.width)) : (u = n, z = r - f.right, l = x = B(l, c, c + f.height)) : (k = !0, d = !1);
                    e.path = k && !d ? null : h.renderer.crispLine(["M", u, l, "L", z, x], q || 1)
                });
                return A.path
            },
            getLinearTickPositions: function (a, q, b) {
                var f, g = p(Math.floor(q / a) * a);
                b = p(Math.ceil(b / a) * a);
                var d =
                    [], e;
                p(g + a) === g && (e = 20);
                if (this.single) return [q];
                for (q = g; q <= b;) {
                    d.push(q);
                    q = p(q + a, e);
                    if (q === f) break;
                    f = q
                }
                return d
            },
            getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks ? E(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function () {
                var a = this, q = a.options, b = a.tickPositions, g = a.minorTickInterval, d = [],
                    e = a.pointRangePadding || 0, m = a.min - e, e = a.max + e, h = e - m;
                if (h && h / g < a.len / 3) if (a.isLog) this.paddedTicks.forEach(function (f, q, b) {
                    q && d.push.apply(d,
                        a.getLogTickPositions(g, b[q - 1], b[q], !0))
                }); else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) d = d.concat(a.getTimeTicks(a.normalizeTimeTickInterval(g), m, e, q.startOfWeek)); else for (q = m + (b[0] - m) % g; q <= e && q !== d[0]; q += g) d.push(q);
                0 !== d.length && a.trimTicks(d);
                return d
            },
            adjustForMinRange: function () {
                var a = this.options, q = this.min, b = this.max, g, d, e, m, h, n, c, u;
                this.isXAxis && void 0 === this.minRange && !this.isLog && (v(a.min) || v(a.max) ? this.minRange = null : (this.series.forEach(function (a) {
                    n = a.xData;
                    for (m =
                             c = a.xIncrement ? 1 : n.length - 1; 0 < m; m--) if (h = n[m] - n[m - 1], void 0 === e || h < e) e = h
                }), this.minRange = Math.min(5 * e, this.dataMax - this.dataMin)));
                b - q < this.minRange && (d = this.dataMax - this.dataMin >= this.minRange, u = this.minRange, g = (u - b + q) / 2, g = [q - g, E(a.min, q - g)], d && (g[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), q = G(g), b = [q + u, E(a.max, q + u)], d && (b[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), b = k(b), b - q < u && (g[0] = b - u, g[1] = E(a.min, b - u), q = G(g)));
                this.min = q;
                this.max = b
            },
            getClosest: function () {
                var a;
                this.categories ?
                    a = 1 : this.series.forEach(function (f) {
                        var q = f.closestPointRange, b = f.visible || !f.chart.options.chart.ignoreHiddenSeries;
                        !f.noSharedTooltip && v(q) && b && (a = v(a) ? Math.min(a, q) : q)
                    });
                return a
            },
            nameToX: function (a) {
                var f = d(this.categories), b = f ? this.categories : this.names, g = a.options.x, e;
                a.series.requireSorting = !1;
                v(g) || (g = !1 === this.options.uniqueNames ? a.series.autoIncrement() : f ? b.indexOf(a.name) : E(b.keys[a.name], -1));
                -1 === g ? f || (e = b.length) : e = g;
                void 0 !== e && (this.names[e] = a.name, this.names.keys[a.name] = e);
                return e
            },
            updateNames: function () {
                var a = this, q = this.names;
                0 < q.length && (Object.keys(q.keys).forEach(function (a) {
                    delete q.keys[a]
                }), q.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (f) {
                    f.xIncrement = null;
                    if (!f.points || f.isDirtyData) a.max = Math.max(a.max, f.xData.length - 1), f.processData(), f.generatePoints();
                    f.data.forEach(function (q, b) {
                        var g;
                        q && q.options && void 0 !== q.name && (g = a.nameToX(q), void 0 !== g && g !== q.x && (q.x = g, f.xData[b] = g))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var f = this, g = f.max -
                    f.min, d = f.axisPointRange || 0, m, h = 0, n = 0, c = f.linkedParent, u = !!f.categories,
                    l = f.transA, z = f.isXAxis;
                if (z || u || d) m = f.getClosest(), c ? (h = c.minPointOffset, n = c.pointRangePadding) : f.series.forEach(function (a) {
                    var q = u ? 1 : z ? E(a.options.pointRange, m, 0) : f.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    d = Math.max(d, q);
                    f.single || (h = Math.max(h, z && b(a) ? 0 : q / 2), n = Math.max(n, z && "on" === a ? 0 : q))
                }), c = f.ordinalSlope && m ? f.ordinalSlope / m : 1, f.minPointOffset = h *= c, f.pointRangePadding = n *= c, f.pointRange = Math.min(d, g), z && (f.closestPointRange =
                    m);
                a && (f.oldTransA = l);
                f.translationSlope = f.transA = l = f.staticScale || f.len / (g + n || 1);
                f.transB = f.horiz ? f.left : f.bottom;
                f.minPixelPadding = l * h;
                e(this, "afterSetAxisTranslation")
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (f) {
                var b = this, d = b.chart, m = b.options, h = b.isLog, c = b.isDatetimeAxis, l = b.isXAxis,
                    z = b.isLinked, x = m.maxPadding, D = m.minPadding, r, k = m.tickInterval, A = m.tickPixelInterval,
                    B = b.categories, H = g(b.threshold) ? b.threshold : null, w = b.softThreshold, t, y, G;
                c || B || z || this.getTickAmount();
                y = E(b.userMin, m.min);
                G = E(b.userMax, m.max);
                z ? (b.linkedParent = d[b.coll][m.linkedTo], r = b.linkedParent.getExtremes(), b.min = E(r.min, r.dataMin), b.max = E(r.max, r.dataMax), m.type !== b.linkedParent.options.type && a.error(11, 1, d)) : (!w && v(H) && (b.dataMin >= H ? (r = H, D = 0) : b.dataMax <= H && (t = H, x = 0)), b.min = E(y, r, b.dataMin), b.max = E(G, t, b.dataMax));
                h && (b.positiveValuesOnly && !f && 0 >= Math.min(b.min, E(b.dataMin, b.min)) && a.error(10, 1, d), b.min = p(b.log2lin(b.min), 15), b.max = p(b.log2lin(b.max), 15));
                b.range && v(b.max) && (b.userMin = b.min =
                    y = Math.max(b.dataMin, b.minFromRange()), b.userMax = G = b.max, b.range = null);
                e(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(B || b.axisPointRange || b.usePercentage || z) && v(b.min) && v(b.max) && (d = b.max - b.min) && (!v(y) && D && (b.min -= d * D), !v(G) && x && (b.max += d * x));
                g(m.softMin) && !g(b.userMin) && (b.min = Math.min(b.min, m.softMin));
                g(m.softMax) && !g(b.userMax) && (b.max = Math.max(b.max, m.softMax));
                g(m.floor) && (b.min = Math.min(Math.max(b.min, m.floor), Number.MAX_VALUE));
                g(m.ceiling) && (b.max = Math.max(Math.min(b.max,
                    m.ceiling), E(b.userMax, -Number.MAX_VALUE)));
                w && v(b.dataMin) && (H = H || 0, !v(y) && b.min < H && b.dataMin >= H ? b.min = H : !v(G) && b.max > H && b.dataMax <= H && (b.max = H));
                b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : z && !k && A === b.linkedParent.options.tickPixelInterval ? k = b.linkedParent.tickInterval : E(k, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, B ? 1 : (b.max - b.min) * A / Math.max(b.len, A));
                l && !f && b.series.forEach(function (a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !k && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                f = E(m.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !k && b.tickInterval < f && (b.tickInterval = f);
                c || h || k || (b.tickInterval = u(b.tickInterval, null, n(b.tickInterval), E(m.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval =
                    b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var f = this.options, b, g = f.tickPositions;
                b = this.getMinorTickInterval();
                var d = f.tickPositioner, m = f.startOnTick, h = f.endOnTick;
                this.tickmarkOffset = this.categories && "between" === f.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && v(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== f.allowDecimals);
                this.tickPositions =
                    b = g && g.slice();
                !b && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (b = [this.min, this.max], a.error(19, !1, this.chart)) : b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, f.units), this.min, this.max, f.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0],
                    b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = b = d);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, m, h);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), g || d || this.adjustTickAmount());
                e(this, "afterSetTickPositions")
            },
            trimTicks: function (a, b, g) {
                var f = a[0], d = a[a.length - 1], q = this.minPointOffset || 0;
                e(this, "trimTicks");
                if (!this.isLinked) {
                    if (b && -Infinity !== f) this.min = f; else for (; this.min - q > a[0];) a.shift();
                    if (g) this.max =
                        d; else for (; this.max + q < a[a.length - 1];) a.pop();
                    0 === a.length && v(f) && !this.options.tickPositions && a.push((d + f) / 2)
                }
            },
            alignToOthers: function () {
                var a = {}, b, g = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === g.alignTicks || !1 === g.startOnTick || !1 === g.endOnTick || this.isLog || this.chart[this.coll].forEach(function (f) {
                    var g = f.options, g = [f.horiz ? g.left : g.top, g.width, g.height, g.pane].join();
                    f.series.length && (a[g] ? b = !0 : a[g] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options, b = a.tickAmount, g = a.tickPixelInterval;
                !v(a.tickInterval) && this.len < g && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / g) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.options, b = this.tickInterval, g = this.tickPositions, d = this.tickAmount,
                    e = this.finalTickAmt, m = g && g.length, h = E(this.threshold, this.softThreshold ? 0 : null), n;
                if (this.hasData()) {
                    if (m < d) {
                        for (n = this.min; g.length < d;) g.length % 2 || n === h ? g.push(p(g[g.length - 1] + b)) : g.unshift(p(g[0] -
                            b));
                        this.transA *= (m - 1) / (d - 1);
                        this.min = a.startOnTick ? g[0] : Math.min(this.min, g[0]);
                        this.max = a.endOnTick ? g[g.length - 1] : Math.max(this.max, g[g.length - 1])
                    } else m > d && (this.tickInterval *= 2, this.setTickPositions());
                    if (v(e)) {
                        for (b = a = g.length; b--;) (3 === e && 1 === b % 2 || 2 >= e && 0 < b && b < a - 1) && g.splice(b, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function () {
                var a = this.series.some(function (a) {
                    return a.isDirtyData || a.isDirty || a.xAxis.isDirty
                }), b;
                this.oldMin = this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                (b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                e(this, "afterSetScale")
            },
            setExtremes: function (a, b, g, d, m) {
                var f = this,
                    q = f.chart;
                g = E(g, !0);
                f.series.forEach(function (a) {
                    delete a.kdTree
                });
                m = h(m, {min: a, max: b});
                e(f, "setExtremes", m, function () {
                    f.userMin = a;
                    f.userMax = b;
                    f.eventArgs = m;
                    g && q.redraw(d)
                })
            },
            zoom: function (a, b) {
                var f = this.dataMin, g = this.dataMax, d = this.options, q = Math.min(f, E(d.min, f)),
                    m = Math.max(g, E(d.max, g));
                a = {newMin: a, newMax: b};
                e(this, "zoom", a, function (a) {
                    var b = a.newMin, d = a.newMax;
                    if (b !== this.min || d !== this.max) this.allowZoomOutside || (v(f) && (b < q && (b = q), b > m && (b = m)), v(g) && (d < q && (d = q), d > m && (d = m))), this.displayBtn = void 0 !==
                        b || void 0 !== d, this.setExtremes(b, d, !1, void 0, {trigger: "zoom"});
                    a.zoomed = !0
                });
                return a.zoomed
            },
            setAxisSize: function () {
                var f = this.chart, b = this.options, g = b.offsets || [0, 0, 0, 0], d = this.horiz,
                    e = this.width = Math.round(a.relativeLength(E(b.width, f.plotWidth - g[3] + g[1]), f.plotWidth)),
                    m = this.height = Math.round(a.relativeLength(E(b.height, f.plotHeight - g[0] + g[2]), f.plotHeight)),
                    h = this.top = Math.round(a.relativeLength(E(b.top, f.plotTop + g[0]), f.plotHeight, f.plotTop)),
                    b = this.left = Math.round(a.relativeLength(E(b.left,
                        f.plotLeft + g[3]), f.plotWidth, f.plotLeft));
                this.bottom = f.chartHeight - m - h;
                this.right = f.chartWidth - e - b;
                this.len = Math.max(d ? e : m, 0);
                this.pos = d ? b : h
            },
            getExtremes: function () {
                var a = this.isLog;
                return {
                    min: a ? p(this.lin2log(this.min)) : this.min,
                    max: a ? p(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var f = this.isLog, b = f ? this.lin2log(this.min) : this.min,
                    f = f ? this.lin2log(this.max) : this.max;
                null === a || -Infinity === a ? a = b : Infinity ===
                a ? a = f : b > a ? a = b : f < a && (a = f);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                var f = (E(a, 0) - 90 * this.side + 720) % 360;
                a = {align: "center"};
                e(this, "autoLabelAlign", a, function (a) {
                    15 < f && 165 > f ? a.align = "right" : 195 < f && 345 > f && (a.align = "left")
                });
                return a.align
            },
            tickSize: function (a) {
                var f = this.options, b = f[a + "Length"], g = E(f[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0),
                    d;
                g && b && ("inside" === f[a + "Position"] && (b = -b), d = [b, g]);
                a = {tickSize: d};
                e(this, "afterTickSize", a);
                return a.tickSize
            },
            labelMetrics: function () {
                var a =
                    this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function () {
                var a = this.options.labels, b = this.horiz, g = this.tickInterval, d = g,
                    e = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / g), m, h = a.rotation,
                    n = this.labelMetrics(), c, u = Number.MAX_VALUE, z, l = this.max - this.min, x = function (a) {
                        var f = a / (e || 1), f = 1 < f ? Math.ceil(f) : 1;
                        f * g > l && Infinity !== a && Infinity !== e && (f = Math.ceil(l /
                            g));
                        return p(f * g)
                    };
                b ? (z = !a.staggerLines && !a.step && (v(h) ? [h] : e < E(a.autoRotationLimit, 80) && a.autoRotation)) && z.forEach(function (a) {
                    var f;
                    if (a === h || a && -90 <= a && 90 >= a) c = x(Math.abs(n.h / Math.sin(w * a))), f = c + Math.abs(a / 360), f < u && (u = f, m = a, d = c)
                }) : a.step || (d = x(n.h));
                this.autoRotation = z;
                this.labelRotation = E(m, h);
                return d
            },
            getSlotWidth: function (a) {
                var f = this.chart, b = this.horiz, g = this.options.labels,
                    d = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), e = f.margin[3];
                return a && a.slotWidth || b && 2 > (g.step ||
                    0) && !g.rotation && (this.staggerLines || 1) * this.len / d || !b && (g.style && parseInt(g.style.width, 10) || e && e - f.spacing[3] || .33 * f.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart, g = a.renderer, d = this.tickPositions, e = this.ticks, m = this.options.labels,
                    h = m && m.style || {}, n = this.horiz, c = this.getSlotWidth(),
                    u = Math.max(1, Math.round(c - 2 * (m.padding || 5))), z = {}, l = this.labelMetrics(),
                    x = m.style && m.style.textOverflow, D, r, k = 0, A;
                b(m.rotation) || (z.rotation = m.rotation || 0);
                d.forEach(function (a) {
                    (a = e[a]) && a.label && a.label.textPxLength >
                    k && (k = a.label.textPxLength)
                });
                this.maxLabelLength = k;
                if (this.autoRotation) k > u && k > l.h ? z.rotation = this.labelRotation : this.labelRotation = 0; else if (c && (D = u, !x)) for (r = "clip", u = d.length; !n && u--;) if (A = d[u], A = e[A].label) A.styles && "ellipsis" === A.styles.textOverflow ? A.css({textOverflow: "clip"}) : A.textPxLength > c && A.css({width: c + "px"}), A.getBBox().height > this.len / d.length - (l.h - l.f) && (A.specificTextOverflow = "ellipsis");
                z.rotation && (D = k > .5 * a.chartHeight ? .33 * a.chartHeight : k, x || (r = "ellipsis"));
                if (this.labelAlign =
                        m.align || this.autoLabelAlign(this.labelRotation)) z.align = this.labelAlign;
                d.forEach(function (a) {
                    var f = (a = e[a]) && a.label, b = h.width, g = {};
                    f && (f.attr(z), a.shortenLabel ? a.shortenLabel() : D && !b && "nowrap" !== h.whiteSpace && (D < f.textPxLength || "SPAN" === f.element.tagName) ? (g.width = D, x || (g.textOverflow = f.specificTextOverflow || r), f.css(g)) : f.styles && f.styles.width && !g.width && !b && f.css({width: null}), delete f.specificTextOverflow, a.rotation = z.rotation)
                }, this);
                this.tickRotCorr = g.rotCorr(l.b, this.labelRotation || 0, 0 !==
                    this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || v(this.min) && v(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function (a) {
                var f = this.chart.renderer, b = this.horiz, g = this.opposite, d = this.options.title, e,
                    m = this.chart.styledMode;
                this.axisTitle || ((e = d.textAlign) || (e = (b ? {
                    low: "left",
                    middle: "center",
                    high: "right"
                } : {
                    low: g ? "right" : "left",
                    middle: "center",
                    high: g ? "left" : "right"
                })[d.align]), this.axisTitle = f.text(d.text, 0, 0, d.useHTML).attr({
                    zIndex: 7,
                    rotation: d.rotation || 0,
                    align: e
                }).addClass("highcharts-axis-title"),
                m || this.axisTitle.css(x(d.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0);
                m || d.style.width || this.isRadial || this.axisTitle.css({width: this.len});
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var f = this.ticks;
                f[a] ? f[a].addLabel() : f[a] = new D(this, a)
            },
            getOffset: function () {
                var a = this, b = a.chart, g = b.renderer, d = a.options, m = a.tickPositions, h = a.ticks, n = a.horiz,
                    c = a.side, u = b.inverted && !a.isZAxis ? [1, 0, 3, 2][c] : c, z, l, x = 0, D, r = 0, k = d.title,
                    A = d.labels, B = 0, p = b.axisOffset, b = b.clipOffset,
                    w = [-1, 1, 1, -1][c], t = d.className, y = a.axisParent;
                z = a.hasData();
                a.showAxis = l = z || E(d.showEmpty, !0);
                a.staggerLines = a.horiz && A.staggerLines;
                a.axisGroup || (a.gridGroup = g.g("grid").attr({zIndex: d.gridZIndex || 1}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (t || "")).add(y), a.axisGroup = g.g("axis").attr({zIndex: d.zIndex || 2}).addClass("highcharts-" + this.coll.toLowerCase() + " " + (t || "")).add(y), a.labelGroup = g.g("axis-labels").attr({zIndex: A.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " +
                    (t || "")).add(y));
                z || a.isLinked ? (m.forEach(function (b, f) {
                    a.generateTick(b, f)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === c || 2 === c || {
                    1: "left",
                    3: "right"
                }[c] === a.labelAlign, E(A.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && m.forEach(function (a) {
                    B = Math.max(h[a].getLabelSize(), B)
                }), a.staggerLines && (B *= a.staggerLines), a.labelOffset = B * (a.opposite ? -1 : 1)) : H(h, function (a, b) {
                    a.destroy();
                    delete h[b]
                });
                k && k.text && !1 !== k.enabled && (a.addTitle(l), l && !1 !== k.reserveSpace && (a.titleOffset = x =
                    a.axisTitle.getBBox()[n ? "height" : "width"], D = k.offset, r = v(D) ? 0 : E(k.margin, n ? 5 : 10)));
                a.renderLine();
                a.offset = w * E(d.offset, p[c] ? p[c] + (d.margin || 0) : 0);
                a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
                g = 0 === c ? -a.labelMetrics().h : 2 === c ? a.tickRotCorr.y : 0;
                r = Math.abs(B) + r;
                B && (r = r - g + w * (n ? E(A.y, a.tickRotCorr.y + 8 * w) : A.x));
                a.axisTitleMargin = E(D, r);
                a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(h, m));
                n = this.tickSize("tick");
                p[c] = Math.max(p[c], a.axisTitleMargin + x + w * a.offset, r, z && m.length && n ? n[0] + w *
                    a.offset : 0);
                d = d.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[u] = Math.max(b[u], d);
                e(this, "afterGetOffset")
            },
            getLinePath: function (a) {
                var b = this.chart, f = this.opposite, g = this.offset, d = this.horiz,
                    e = this.left + (f ? this.width : 0) + g,
                    g = b.chartHeight - this.bottom - (f ? this.height : 0) + g;
                f && (a *= -1);
                return b.renderer.crispLine(["M", d ? this.left : e, d ? g : this.top, "L", d ? b.chartWidth - this.right : e, d ? g : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                this.chart.styledMode || this.axisLine.attr({
                    stroke: this.options.lineColor,
                    "stroke-width": this.options.lineWidth,
                    zIndex: 7
                }))
            },
            getTitlePosition: function () {
                var a = this.horiz, b = this.left, g = this.top, d = this.len, m = this.options.title, h = a ? b : g,
                    n = this.opposite, c = this.offset, u = m.x || 0, z = m.y || 0, l = this.axisTitle,
                    x = this.chart.renderer.fontMetrics(m.style && m.style.fontSize, l),
                    l = Math.max(l.getBBox(null, 0).height - x.h - 1, 0),
                    d = {low: h + (a ? 0 : d), middle: h + d / 2, high: h + (a ? d : 0)}[m.align],
                    b = (a ? g + this.height : b) + (a ? 1 : -1) * (n ? -1 : 1) * this.axisTitleMargin +
                        [-l, l, x.f, -l][this.side], a = {
                        x: a ? d + u : b + (n ? this.width : 0) + c + u,
                        y: a ? b + z - (n ? this.height : 0) + c : d + z
                    };
                e(this, "afterGetTitlePosition", {titlePosition: a});
                return a
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && g(this.oldMin), f = this.minorTicks;
                f[a] || (f[a] = new D(this, a, "minor"));
                b && f[a].isNew && f[a].render(null, !0);
                f[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var f = this.isLinked, d = this.ticks, e = this.chart.hasRendered && g(this.oldMin);
                if (!f || a >= this.min && a <= this.max) d[a] || (d[a] = new D(this, a)), e && d[a].isNew &&
                d[a].render(b, !0, -1), d[a].render(b)
            },
            render: function () {
                var b = this, d = b.chart, m = b.options, h = b.isLog, n = b.isLinked, c = b.tickPositions,
                    u = b.axisTitle, l = b.ticks, x = b.minorTicks, r = b.alternateBands, k = m.stackLabels,
                    A = m.alternateGridColor, B = b.tickmarkOffset, E = b.axisLine, p = b.showAxis,
                    w = F(d.renderer.globalAnimation), t, v;
                b.labelEdge.length = 0;
                b.overlap = !1;
                [l, x, r].forEach(function (a) {
                    H(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || n) b.minorTickInterval && !b.categories && b.getMinorTickPositions().forEach(function (a) {
                    b.renderMinorTick(a)
                }),
                c.length && (c.forEach(function (a, f) {
                    b.renderTick(a, f)
                }), B && (0 === b.min || b.single) && (l[-1] || (l[-1] = new D(b, -1, null, !0)), l[-1].render(-1))), A && c.forEach(function (f, g) {
                    v = void 0 !== c[g + 1] ? c[g + 1] + B : b.max - B;
                    0 === g % 2 && f < b.max && v <= b.max + (d.polar ? -B : B) && (r[f] || (r[f] = new a.PlotLineOrBand(b)), t = f + B, r[f].options = {
                        from: h ? b.lin2log(t) : t,
                        to: h ? b.lin2log(v) : v,
                        color: A
                    }, r[f].render(), r[f].isActive = !0)
                }), b._addedPlotLB || ((m.plotLines || []).concat(m.plotBands || []).forEach(function (a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB =
                    !0);
                [l, x, r].forEach(function (a) {
                    var b, f = [], g = w.duration;
                    H(a, function (a, b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, f.push(b))
                    });
                    z(function () {
                        for (b = f.length; b--;) a[f[b]] && !a[f[b]].isActive && (a[f[b]].destroy(), delete a[f[b]])
                    }, a !== r && d.hasRendered && g ? g : 0)
                });
                E && (E[E.isPlaced ? "animate" : "attr"]({d: this.getLinePath(E.strokeWidth())}), E.isPlaced = !0, E[p ? "show" : "hide"](!0));
                u && p && (m = b.getTitlePosition(), g(m.y) ? (u[u.isNew ? "attr" : "animate"](m), u.isNew = !1) : (u.attr("y", -9999), u.isNew = !0));
                k && k.enabled && b.renderStackTotals();
                b.isDirty = !1;
                e(this, "afterRender")
            },
            redraw: function () {
                this.visible && (this.render(), this.plotLinesAndBands.forEach(function (a) {
                    a.render()
                }));
                this.series.forEach(function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var b = this, f = b.stacks, g = b.plotLinesAndBands, d;
                e(this, "destroy", {keepEvents: a});
                a || B(b);
                H(f, function (a, b) {
                    r(a);
                    f[b] = null
                });
                [b.ticks, b.minorTicks, b.alternateBands].forEach(function (a) {
                    r(a)
                });
                if (g) for (a = g.length; a--;) g[a].destroy();
                "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (a) {
                    b[a] && (b[a] = b[a].destroy())
                });
                for (d in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[d] = b.plotLinesAndBandsGroups[d].destroy();
                H(b, function (a, f) {
                    -1 === b.keepProps.indexOf(f) && delete b[f]
                })
            },
            drawCrosshair: function (a, b) {
                var f, g = this.crosshair, d = E(g.snap, !0), m, h = this.cross;
                e(this, "drawCrosshair", {e: a, point: b});
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (v(b) || !d)) {
                    d ? v(b) &&
                        (m = E(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : m = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos);
                    v(m) && (f = this.getPlotLinePath(b && (this.isXAxis ? b.x : E(b.stackY, b.y)), null, null, null, m) || null);
                    if (!v(f)) {
                        this.hideCrosshair();
                        return
                    }
                    d = this.categories && !this.isRadial;
                    h || (this.cross = h = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (d ? "category " : "thin ") + g.className).attr({zIndex: E(g.zIndex, 2)}).add(), this.chart.styledMode || (h.attr({
                        stroke: g.color ||
                        (d ? c("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": E(g.width, 1)
                    }).css({"pointer-events": "none"}), g.dashStyle && h.attr({dashstyle: g.dashStyle})));
                    h.show().attr({d: f});
                    d && !g.width && h.attr({"stroke-width": this.transA});
                    this.cross.e = a
                } else this.hideCrosshair();
                e(this, "afterDrawCrosshair", {e: a, point: b})
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide();
                e(this, "afterHideCrosshair")
            }
        });
        return a.Axis = A
    }(I);
    (function (a) {
        var y = a.Axis, F = a.getMagnitude, G = a.normalizeTickInterval, k = a.timeUnits;
        y.prototype.getTimeTicks = function () {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        y.prototype.normalizeTimeTickInterval = function (a, p) {
            var c = p || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            p = c[c.length - 1];
            var v = k[p[0]], w = p[1], r;
            for (r = 0; r < c.length && !(p = c[r], v = k[p[0]], w = p[1], c[r + 1] && a <= (v * w[w.length - 1] + k[c[r + 1][0]]) / 2); r++) ;
            v ===
            k.year && a < 5 * v && (w = [1, 2, 5]);
            a = G(a / v, w, "year" === p[0] ? Math.max(F(a / v), 1) : 1);
            return {unitRange: v, count: a, unitName: p[0]}
        }
    })(I);
    (function (a) {
        var y = a.Axis, F = a.getMagnitude, G = a.normalizeTickInterval, k = a.pick;
        y.prototype.getLogTickPositions = function (a, p, t, v) {
            var c = this.options, r = this.len, h = [];
            v || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), h = this.getLinearTickPositions(a, p, t); else if (.08 <= a) for (var r = Math.floor(p), e, l, n, d, g, c = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; r < t + 1 && !g; r++) for (l =
                                                                                                                                                                                                                                                                     c.length, e = 0; e < l && !g; e++) n = this.log2lin(this.lin2log(r) * c[e]), n > p && (!v || d <= t) && void 0 !== d && h.push(d), d > t && (g = !0), d = n; else p = this.lin2log(p), t = this.lin2log(t), a = v ? this.getMinorTickInterval() : c.tickInterval, a = k("auto" === a ? null : a, this._minorAutoInterval, c.tickPixelInterval / (v ? 5 : 1) * (t - p) / ((v ? r / this.tickPositions.length : r) || 1)), a = G(a, null, F(a)), h = this.getLinearTickPositions(a, p, t).map(this.log2lin), v || (this._minorAutoInterval = a / 5);
            v || (this.tickInterval = a);
            return h
        };
        y.prototype.log2lin = function (a) {
            return Math.log(a) /
                Math.LN10
        };
        y.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(I);
    (function (a, y) {
        var F = a.arrayMax, G = a.arrayMin, k = a.defined, c = a.destroyObjectProperties, p = a.erase, t = a.merge,
            v = a.pick;
        a.PlotLineOrBand = function (a, c) {
            this.axis = a;
            c && (this.options = c, this.id = c.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                a.fireEvent(this, "render");
                var c = this, r = c.axis, h = r.horiz, e = c.options, l = e.label, n = c.label, d = e.to, g = e.from,
                    b = e.value, x = k(g) && k(d), u = k(b), p = c.svgElem, E = !p, B = [], m = e.color,
                    z = v(e.zIndex, 0), D = e.events,
                    B = {"class": "highcharts-plot-" + (x ? "band " : "line ") + (e.className || "")}, A = {},
                    f = r.chart.renderer, q = x ? "bands" : "lines";
                r.isLog && (g = r.log2lin(g), d = r.log2lin(d), b = r.log2lin(b));
                r.chart.styledMode || (u ? (B.stroke = m, B["stroke-width"] = e.width, e.dashStyle && (B.dashstyle = e.dashStyle)) : x && (m && (B.fill = m), e.borderWidth && (B.stroke = e.borderColor, B["stroke-width"] = e.borderWidth)));
                A.zIndex = z;
                q += "-" + z;
                (m = r.plotLinesAndBandsGroups[q]) || (r.plotLinesAndBandsGroups[q] = m = f.g("plot-" + q).attr(A).add());
                E && (c.svgElem = p = f.path().attr(B).add(m));
                if (u) B = r.getPlotLinePath(b, p.strokeWidth()); else if (x) B = r.getPlotBandPath(g, d, e); else return;
                E && B && B.length ? (p.attr({d: B}), D && a.objectEach(D, function (a, b) {
                    p.on(b, function (a) {
                        D[b].apply(c, [a])
                    })
                })) : p && (B ? (p.show(), p.animate({d: B})) : (p.hide(), n && (c.label = n = n.destroy())));
                l && k(l.text) && B && B.length && 0 < r.width && 0 < r.height && !B.isFlat ? (l = t({
                    align: h && x && "center",
                    x: h ? !x && 4 : 10,
                    verticalAlign: !h && x && "middle",
                    y: h ? x ? 16 : 10 : x ? 6 : -4,
                    rotation: h && !x && 90
                }, l), this.renderLabel(l, B, x, z)) : n && n.hide();
                return c
            }, renderLabel: function (a,
                                      c, h, e) {
                var l = this.label, n = this.axis.chart.renderer;
                l || (l = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (h ? "band" : "line") + "-label " + (a.className || "")
                }, l.zIndex = e, this.label = l = n.text(a.text, 0, 0, a.useHTML).attr(l).add(), this.axis.chart.styledMode || l.css(a.style));
                e = c.xBounds || [c[1], c[4], h ? c[6] : c[1]];
                c = c.yBounds || [c[2], c[5], h ? c[7] : c[2]];
                h = G(e);
                n = G(c);
                l.align(a, !1, {x: h, y: n, width: F(e) - h, height: F(c) - n});
                l.show()
            }, destroy: function () {
                p(this.axis.plotLinesAndBands, this);
                delete this.axis;
                c(this)
            }
        };
        a.extend(y.prototype, {
            getPlotBandPath: function (a, c) {
                var h = this.getPlotLinePath(c, null, null, !0), e = this.getPlotLinePath(a, null, null, !0), l = [],
                    n = this.horiz, d = 1, g;
                a = a < this.min && c < this.min || a > this.max && c > this.max;
                if (e && h) for (a && (g = e.toString() === h.toString(), d = 0), a = 0; a < e.length; a += 6) n && h[a + 1] === e[a + 1] ? (h[a + 1] += d, h[a + 4] += d) : n || h[a + 2] !== e[a + 2] || (h[a + 2] += d, h[a + 5] += d), l.push("M", e[a + 1], e[a + 2], "L", e[a + 4], e[a + 5], h[a + 4], h[a + 5], h[a + 1], h[a + 2], "z"), l.isFlat = g;
                return l
            }, addPlotBand: function (a) {
                return this.addPlotBandOrLine(a,
                    "plotBands")
            }, addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            }, addPlotBandOrLine: function (c, r) {
                var h = (new a.PlotLineOrBand(this, c)).render(), e = this.userOptions;
                h && (r && (e[r] = e[r] || [], e[r].push(c)), this.plotLinesAndBands.push(h));
                return h
            }, removePlotBandOrLine: function (a) {
                for (var c = this.plotLinesAndBands, h = this.options, e = this.userOptions, l = c.length; l--;) c[l].id === a && c[l].destroy();
                [h.plotLines || [], e.plotLines || [], h.plotBands || [], e.plotBands || []].forEach(function (e) {
                    for (l = e.length; l--;) e[l].id ===
                    a && p(e, e[l])
                })
            }, removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            }, removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(I, X);
    (function (a) {
        var y = a.doc, F = a.extend, G = a.format, k = a.isNumber, c = a.merge, p = a.pick, t = a.splat,
            v = a.syncTimeout, w = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, h) {
                this.chart = a;
                this.options = h;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = h.split && !a.inverted;
                this.shared = h.shared || this.split;
                this.outside =
                    h.outside && !this.split
            }, cleanSplit: function (a) {
                this.chart.series.forEach(function (h) {
                    var e = h && h.tt;
                    e && (!e.isActive || a ? h.tt = e.destroy() : e.isActive = !1)
                })
            }, applyFilter: function () {
                var a = this.chart;
                a.renderer.definition({
                    tagName: "filter",
                    id: "drop-shadow-" + a.index,
                    opacity: .5,
                    children: [{tagName: "feGaussianBlur", "in": "SourceAlpha", stdDeviation: 1}, {
                        tagName: "feOffset",
                        dx: 1,
                        dy: 1
                    }, {tagName: "feComponentTransfer", children: [{tagName: "feFuncA", type: "linear", slope: .3}]}, {
                        tagName: "feMerge", children: [{tagName: "feMergeNode"},
                            {tagName: "feMergeNode", "in": "SourceGraphic"}]
                    }]
                });
                a.renderer.definition({
                    tagName: "style",
                    textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}"
                })
            }, getLabel: function () {
                var c = this, h = this.chart.renderer, e = this.chart.styledMode, l = this.options, n, d;
                this.label || (this.outside && (this.container = n = a.doc.createElement("div"), n.className = "highcharts-tooltip-container", a.css(n, {
                    position: "absolute",
                    top: "1px",
                    pointerEvents: l.style && l.style.pointerEvents
                }), a.doc.body.appendChild(n), this.renderer =
                    h = new a.Renderer(n, 0, 0)), this.split ? this.label = h.g("tooltip") : (this.label = h.label("", 0, 0, l.shape || "callout", null, null, l.useHTML, null, "tooltip").attr({
                    padding: l.padding,
                    r: l.borderRadius
                }), e || this.label.attr({
                    fill: l.backgroundColor,
                    "stroke-width": l.borderWidth
                }).css(l.style).shadow(l.shadow)), e && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index)), this.outside && (d = {
                    x: this.label.xSetter,
                    y: this.label.ySetter
                }, this.label.xSetter = function (a, b) {
                    d[b].call(this.label, c.distance);
                    n.style.left = a + "px"
                }, this.label.ySetter = function (a, b) {
                    d[b].call(this.label, c.distance);
                    n.style.top = a + "px"
                }), this.label.attr({zIndex: 8}).add());
                return this.label
            }, update: function (a) {
                this.destroy();
                c(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, c(!0, this.options, a))
            }, destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                this.renderer && (this.renderer = this.renderer.destroy(), a.discardElement(this.container));
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            }, move: function (c, h, e, l) {
                var n = this, d = n.now,
                    g = !1 !== n.options.animation && !n.isHidden && (1 < Math.abs(c - d.x) || 1 < Math.abs(h - d.y)),
                    b = n.followPointer || 1 < n.len;
                F(d, {
                    x: g ? (2 * d.x + c) / 3 : c,
                    y: g ? (d.y + h) / 2 : h,
                    anchorX: b ? void 0 : g ? (2 * d.anchorX + e) / 3 : e,
                    anchorY: b ? void 0 : g ? (d.anchorY + l) / 2 : l
                });
                n.getLabel().attr(d);
                g && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    n && n.move(c, h, e, l)
                }, 32))
            }, hide: function (c) {
                var h = this;
                a.clearTimeout(this.hideTimer);
                c = p(c, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = v(function () {
                    h.getLabel()[c ? "fadeOut" : "hide"]();
                    h.isHidden = !0
                }, c))
            }, getAnchor: function (a, c) {
                var e = this.chart, h = e.pointer, n = e.inverted, d = e.plotTop, g = e.plotLeft, b = 0, x = 0, u, k;
                a = t(a);
                this.followPointer && c ? (void 0 === c.chartX && (c = h.normalize(c)), a = [c.chartX - e.plotLeft, c.chartY - d]) : a[0].tooltipPos ? a = a[0].tooltipPos : (a.forEach(function (a) {
                    u = a.series.yAxis;
                    k = a.series.xAxis;
                    b += a.plotX + (!n && k ? k.left - g : 0);
                    x += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) +
                        (!n && u ? u.top - d : 0)
                }), b /= a.length, x /= a.length, a = [n ? e.plotWidth - x : b, this.shared && !n && 1 < a.length && c ? c.chartY - d : n ? e.plotHeight - b : x]);
                return a.map(Math.round)
            }, getPosition: function (a, c, e) {
                var h = this.chart, n = this.distance, d = {}, g = h.inverted && e.h || 0, b, x = this.outside,
                    u = x ? y.documentElement.clientWidth - 2 * n : h.chartWidth,
                    k = x ? Math.max(y.body.scrollHeight, y.documentElement.scrollHeight, y.body.offsetHeight, y.documentElement.offsetHeight, y.documentElement.clientHeight) : h.chartHeight,
                    r = h.pointer.chartPosition, B = ["y",
                        k, c, (x ? r.top - n : 0) + e.plotY + h.plotTop, x ? 0 : h.plotTop, x ? k : h.plotTop + h.plotHeight],
                    m = ["x", u, a, (x ? r.left - n : 0) + e.plotX + h.plotLeft, x ? 0 : h.plotLeft, x ? u : h.plotLeft + h.plotWidth],
                    z = !this.followPointer && p(e.ttBelow, !h.inverted === !!e.negative),
                    D = function (a, b, f, e, m, c) {
                        var h = f < e - n, q = e + n + f < b, u = e - n - f;
                        e += n;
                        if (z && q) d[a] = e; else if (!z && h) d[a] = u; else if (h) d[a] = Math.min(c - f, 0 > u - g ? u : u - g); else if (q) d[a] = Math.max(m, e + g + f > b ? e : e + g); else return !1
                    }, A = function (a, b, f, g) {
                        var e;
                        g < n || g > b - n ? e = !1 : d[a] = g < f / 2 ? 1 : g > b - f / 2 ? b - f - 2 : g - f / 2;
                        return e
                    },
                    f = function (a) {
                        var f = B;
                        B = m;
                        m = f;
                        b = a
                    }, q = function () {
                        !1 !== D.apply(0, B) ? !1 !== A.apply(0, m) || b || (f(!0), q()) : b ? d.x = d.y = 0 : (f(!0), q())
                    };
                (h.inverted || 1 < this.len) && f();
                q();
                return d
            }, defaultFormatter: function (a) {
                var c = this.points || t(this), e;
                e = [a.tooltipFooterHeaderFormatter(c[0])];
                e = e.concat(a.bodyFormatter(c));
                e.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return e
            }, refresh: function (c, h) {
                var e, l = this.options, n, d = c, g, b = {}, x = [];
                e = l.formatter || this.defaultFormatter;
                var b = this.shared, u, k = this.chart.styledMode;
                l.enabled &&
                (a.clearTimeout(this.hideTimer), this.followPointer = t(d)[0].series.tooltipOptions.followPointer, g = this.getAnchor(d, h), h = g[0], n = g[1], !b || d.series && d.series.noSharedTooltip ? b = d.getLabelConfig() : (d.forEach(function (a) {
                    a.setState("hover");
                    x.push(a.getLabelConfig())
                }), b = {
                    x: d[0].category,
                    y: d[0].y
                }, b.points = x, d = d[0]), this.len = x.length, b = e.call(b, this), u = d.series, this.distance = p(u.tooltipOptions.distance, 16), !1 === b ? this.hide() : (e = this.getLabel(), this.isHidden && e.attr({opacity: 1}).show(), this.split ? this.renderSplit(b,
                    t(c)) : (l.style.width && !k || e.css({width: this.chart.spacingBox.width}), e.attr({text: b && b.join ? b.join("") : b}), e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + p(d.colorIndex, u.colorIndex)), k || e.attr({stroke: l.borderColor || d.color || u.color || "#666666"}), this.updatePosition({
                    plotX: h,
                    plotY: n,
                    negative: d.negative,
                    ttBelow: d.ttBelow,
                    h: g[2] || 0
                })), this.isHidden = !1))
            }, renderSplit: function (c, h) {
                var e = this, l = [], n = this.chart, d = n.renderer, g = !0, b = this.options, x = 0, u,
                    k = this.getLabel(), r = n.plotTop;
                a.isString(c) && (c = [!1, c]);
                c.slice(0, h.length + 1).forEach(function (a, m) {
                    if (!1 !== a && "" !== a) {
                        m = h[m - 1] || {isHeader: !0, plotX: h[0].plotX, plotY: n.plotHeight};
                        var c = m.series || e, D = c.tt, A = m.series || {},
                            f = "highcharts-color-" + p(m.colorIndex, A.colorIndex, "none");
                        D || (D = {
                            padding: b.padding,
                            r: b.borderRadius
                        }, n.styledMode || (D.fill = b.backgroundColor, D.stroke = b.borderColor || m.color || A.color || "#333333", D["stroke-width"] = b.borderWidth), c.tt = D = d.label(null, null, null, (m.isHeader ? b.headerShape : b.shape) || "callout", null, null,
                            b.useHTML).addClass("highcharts-tooltip-box " + f).attr(D).add(k));
                        D.isActive = !0;
                        D.attr({text: a});
                        n.styledMode || D.css(b.style).shadow(b.shadow);
                        a = D.getBBox();
                        A = a.width + D.strokeWidth();
                        m.isHeader ? (x = a.height, n.xAxis[0].opposite && (u = !0, r -= x), A = Math.max(0, Math.min(m.plotX + n.plotLeft - A / 2, n.chartWidth + (n.scrollablePixels ? n.scrollablePixels - n.marginRight : 0) - A))) : A = m.plotX + n.plotLeft - p(b.distance, 16) - A;
                        0 > A && (g = !1);
                        a = (m.series && m.series.yAxis && m.series.yAxis.pos) + (m.plotY || 0);
                        a -= r;
                        m.isHeader && (a = u ? -x : n.plotHeight +
                            x);
                        l.push({
                            target: a,
                            rank: m.isHeader ? 1 : 0,
                            size: c.tt.getBBox().height + 1,
                            point: m,
                            x: A,
                            tt: D
                        })
                    }
                });
                this.cleanSplit();
                b.positioner && l.forEach(function (a) {
                    var g = b.positioner.call(e, a.tt.getBBox().width, a.size, a.point);
                    a.x = g.x;
                    a.align = 0;
                    a.target = g.y;
                    a.rank = p(g.rank, a.rank)
                });
                a.distribute(l, n.plotHeight + x);
                l.forEach(function (a) {
                    var d = a.point, c = d.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: g || d.isHeader || b.positioner ? a.x : d.plotX + n.plotLeft + e.distance,
                        y: a.pos + r,
                        anchorX: d.isHeader ? d.plotX + n.plotLeft :
                            d.plotX + c.xAxis.pos,
                        anchorY: d.isHeader ? n.plotTop + n.plotHeight / 2 : d.plotY + c.yAxis.pos
                    })
                })
            }, updatePosition: function (a) {
                var c = this.chart, e = this.getLabel(),
                    l = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a),
                    n = a.plotX + c.plotLeft;
                a = a.plotY + c.plotTop;
                var d;
                this.outside && (d = (this.options.borderWidth || 0) + 2 * this.distance, this.renderer.setSize(e.width + d, e.height + d, !1), n += c.pointer.chartPosition.left - l.x, a += c.pointer.chartPosition.top - l.y);
                this.move(Math.round(l.x), Math.round(l.y || 0),
                    n, a)
            }, getDateFormat: function (a, c, e, l) {
                var h = this.chart.time, d = h.dateFormat("%m-%d %H:%M:%S.%L", c), g, b,
                    x = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3}, u = "millisecond";
                for (b in w) {
                    if (a === w.week && +h.dateFormat("%w", c) === e && "00:00:00.000" === d.substr(6)) {
                        b = "week";
                        break
                    }
                    if (w[b] > a) {
                        b = u;
                        break
                    }
                    if (x[b] && d.substr(x[b]) !== "01-01 00:00:00.000".substr(x[b])) break;
                    "week" !== b && (u = b)
                }
                b && (g = h.resolveDTLFormat(l[b]).main);
                return g
            }, getXDateFormat: function (a, c, e) {
                c = c.dateTimeLabelFormats;
                var h = e && e.closestPointRange;
                return (h ? this.getDateFormat(h, a.x, e.options.startOfWeek, c) : c.day) || c.year
            }, tooltipFooterHeaderFormatter: function (c, h) {
                var e = h ? "footer" : "header", l = c.series, n = l.tooltipOptions, d = n.xDateFormat, g = l.xAxis,
                    b = g && "datetime" === g.options.type && k(c.key), x = n[e + "Format"];
                h = {isFooter: h, labelConfig: c};
                a.fireEvent(this, "headerFormatter", h, function (a) {
                    b && !d && (d = this.getXDateFormat(c, n, g));
                    b && d && (c.point && c.point.tooltipDateKeys || ["key"]).forEach(function (a) {
                        x = x.replace("{point." + a + "}", "{point." + a + ":" + d + "}")
                    });
                    l.chart.styledMode &&
                    (x = this.styledModeFormat(x));
                    a.text = G(x, {point: c, series: l}, this.chart.time)
                });
                return h.text
            }, bodyFormatter: function (a) {
                return a.map(function (a) {
                    var e = a.series.tooltipOptions;
                    return (e[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, e[(a.point.formatPrefix || "point") + "Format"] || "")
                })
            }, styledModeFormat: function (a) {
                return a.replace('style\x3d"font-size: 10px"', 'class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class\x3d"highcharts-color-{$1.colorIndex}"')
            }
        }
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.attr, G = a.charts, k = a.color, c = a.css, p = a.defined, t = a.extend, v = a.find,
            w = a.fireEvent, r = a.isNumber, h = a.isObject, e = a.offset, l = a.pick, n = a.splat, d = a.Tooltip;
        a.Pointer = function (a, b) {
            this.init(a, b)
        };
        a.Pointer.prototype = {
            init: function (a, b) {
                this.options = b;
                this.chart = a;
                this.runChartClick = b.chart.events && !!b.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                d && (a.tooltip = new d(a, b.tooltip), this.followTouchMove = l(b.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            }, zoomOption: function (a) {
                var b =
                    this.chart, g = b.options.chart, d = g.zoomType || "", b = b.inverted;
                /touch/.test(a.type) && (d = l(g.pinchType, d));
                this.zoomX = a = /x/.test(d);
                this.zoomY = d = /y/.test(d);
                this.zoomHor = a && !b || d && b;
                this.zoomVert = d && !b || a && b;
                this.hasZoom = a || d
            }, normalize: function (a, b) {
                var g;
                g = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                b || (this.chartPosition = b = e(this.chart.container));
                return t(a, {chartX: Math.round(g.pageX - b.left), chartY: Math.round(g.pageY - b.top)})
            }, getCoordinates: function (a) {
                var b = {xAxis: [], yAxis: []};
                this.chart.axes.forEach(function (g) {
                    b[g.isXAxis ? "xAxis" : "yAxis"].push({axis: g, value: g.toValue(a[g.horiz ? "chartX" : "chartY"])})
                });
                return b
            }, findNearestKDPoint: function (a, b, d) {
                var g;
                a.forEach(function (a) {
                    var e = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(d, e);
                    if ((e = h(a, !0)) && !(e = !h(g, !0))) var e = g.distX - a.distX, c = g.dist - a.dist,
                        m = (a.series.group && a.series.group.zIndex) - (g.series.group && g.series.group.zIndex),
                        e = 0 < (0 !== e && b ? e : 0 !== c ? c : 0 !== m ? m : g.series.index > a.series.index ?
                            -1 : 1);
                    e && (g = a)
                });
                return g
            }, getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            }, getChartCoordinatesFromPoint: function (a, b) {
                var g = a.series, d = g.xAxis, g = g.yAxis, e = l(a.clientX, a.plotX), c = a.shapeArgs;
                if (d && g) return b ? {
                    chartX: d.len + d.pos - e,
                    chartY: g.len + g.pos - a.plotY
                } : {chartX: e + d.pos, chartY: a.plotY + g.pos};
                if (c && c.x && c.y) return {chartX: c.x, chartY: c.y}
            }, getHoverData: function (a, b, d, e, c, n) {
                var g, m = [];
                e = !(!e || !a);
                var z = b && !b.stickyTracking ? [b] : d.filter(function (a) {
                    return a.visible &&
                        !(!c && a.directTouch) && l(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                b = (g = e ? a : this.findNearestKDPoint(z, c, n)) && g.series;
                g && (c && !b.noSharedTooltip ? (z = d.filter(function (a) {
                    return a.visible && !(!c && a.directTouch) && l(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), z.forEach(function (a) {
                    var b = v(a.points, function (a) {
                        return a.x === g.x && !a.isNull
                    });
                    h(b) && (a.chart.isBoosting && (b = a.getPoint(b)), m.push(b))
                })) : m.push(g));
                return {hoverPoint: g, hoverSeries: b, hoverPoints: m}
            }, runPointActions: function (g,
                                          b) {
                var d = this.chart, e = d.tooltip && d.tooltip.options.enabled ? d.tooltip : void 0,
                    c = e ? e.shared : !1, h = b || d.hoverPoint, n = h && h.series || d.hoverSeries,
                    n = this.getHoverData(h, n, d.series, "touchmove" !== g.type && (!!b || n && n.directTouch && this.isDirectTouch), c, g),
                    m, h = n.hoverPoint;
                m = n.hoverPoints;
                b = (n = n.hoverSeries) && n.tooltipOptions.followPointer;
                c = c && n && !n.noSharedTooltip;
                if (h && (h !== d.hoverPoint || e && e.isHidden)) {
                    (d.hoverPoints || []).forEach(function (a) {
                        -1 === m.indexOf(a) && a.setState()
                    });
                    (m || []).forEach(function (a) {
                        a.setState("hover")
                    });
                    if (d.hoverSeries !== n) n.onMouseOver();
                    d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut");
                    if (!h.series) return;
                    h.firePointEvent("mouseOver");
                    d.hoverPoints = m;
                    d.hoverPoint = h;
                    e && e.refresh(c ? m : h, g)
                } else b && e && !e.isHidden && (h = e.getAnchor([{}], g), e.updatePosition({
                    plotX: h[0],
                    plotY: h[1]
                }));
                this.unDocMouseMove || (this.unDocMouseMove = y(d.container.ownerDocument, "mousemove", function (b) {
                    var g = G[a.hoverChartIndex];
                    if (g) g.pointer.onDocumentMouseMove(b)
                }));
                d.axes.forEach(function (b) {
                    var d = l(b.crosshair.snap, !0),
                        e = d ? a.find(m, function (a) {
                            return a.series[b.coll] === b
                        }) : void 0;
                    e || !d ? b.drawCrosshair(g, e) : b.hideCrosshair()
                })
            }, reset: function (a, b) {
                var g = this.chart, d = g.hoverSeries, e = g.hoverPoint, c = g.hoverPoints, h = g.tooltip,
                    m = h && h.shared ? c : e;
                a && m && n(m).forEach(function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) h && m && n(m).length && (h.refresh(m), h.shared && c ? c.forEach(function (a) {
                    a.setState(a.state, !0);
                    a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair &&
                    a.series.yAxis.drawCrosshair(null, a))
                }) : e && (e.setState(e.state, !0), g.axes.forEach(function (a) {
                    a.crosshair && a.drawCrosshair(null, e)
                }))); else {
                    if (e) e.onMouseOut();
                    c && c.forEach(function (a) {
                        a.setState()
                    });
                    if (d) d.onMouseOut();
                    h && h.hide(b);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    g.axes.forEach(function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = g.hoverPoints = g.hoverPoint = null
                }
            }, scaleGroups: function (a, b) {
                var g = this.chart, d;
                g.series.forEach(function (e) {
                    d = a || e.getPlotBox();
                    e.xAxis && e.xAxis.zoomEnabled &&
                    e.group && (e.group.attr(d), e.markerGroup && (e.markerGroup.attr(d), e.markerGroup.clip(b ? g.clipRect : null)), e.dataLabelsGroup && e.dataLabelsGroup.attr(d))
                });
                g.clipRect.attr(b || g.clipBox)
            }, dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            }, drag: function (a) {
                var b = this.chart, g = b.options.chart, d = a.chartX, e = a.chartY, c = this.zoomHor,
                    h = this.zoomVert, m = b.plotLeft, n = b.plotTop, l = b.plotWidth, A = b.plotHeight, f,
                    q = this.selectionMarker,
                    r = this.mouseDownX, p = this.mouseDownY, t = g.panKey && a[g.panKey + "Key"];
                q && q.touch || (d < m ? d = m : d > m + l && (d = m + l), e < n ? e = n : e > n + A && (e = n + A), this.hasDragged = Math.sqrt(Math.pow(r - d, 2) + Math.pow(p - e, 2)), 10 < this.hasDragged && (f = b.isInsidePlot(r - m, p - n), b.hasCartesianSeries && (this.zoomX || this.zoomY) && f && !t && !q && (this.selectionMarker = q = b.renderer.rect(m, n, c ? 1 : l, h ? 1 : A, 0).attr({
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add(), b.styledMode || q.attr({fill: g.selectionMarkerFill || k("#335cad").setOpacity(.25).get()})), q &&
                c && (d -= r, q.attr({
                    width: Math.abs(d),
                    x: (0 < d ? 0 : d) + r
                })), q && h && (d = e - p, q.attr({
                    height: Math.abs(d),
                    y: (0 < d ? 0 : d) + p
                })), f && !q && g.panning && b.pan(a, g.panning)))
            }, drop: function (a) {
                var b = this, d = this.chart, g = this.hasPinched;
                if (this.selectionMarker) {
                    var e = {originalEvent: a, xAxis: [], yAxis: []}, h = this.selectionMarker,
                        n = h.attr ? h.attr("x") : h.x, m = h.attr ? h.attr("y") : h.y,
                        l = h.attr ? h.attr("width") : h.width, D = h.attr ? h.attr("height") : h.height, k;
                    if (this.hasDragged || g) d.axes.forEach(function (f) {
                        if (f.zoomEnabled && p(f.min) && (g || b[{
                                xAxis: "zoomX",
                                yAxis: "zoomY"
                            }[f.coll]])) {
                            var d = f.horiz, c = "touchend" === a.type ? f.minPixelPadding : 0,
                                h = f.toValue((d ? n : m) + c), d = f.toValue((d ? n + l : m + D) - c);
                            e[f.coll].push({axis: f, min: Math.min(h, d), max: Math.max(h, d)});
                            k = !0
                        }
                    }), k && w(d, "selection", e, function (a) {
                        d.zoom(t(a, g ? {animation: !1} : null))
                    });
                    r(d.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    g && this.scaleGroups()
                }
                d && r(d.index) && (c(d.container, {cursor: d._cursor}), d.cancelClick = 10 < this.hasDragged, d.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown =
                    [])
            }, onContainerMouseDown: function (a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            }, onDocumentMouseUp: function (d) {
                G[a.hoverChartIndex] && G[a.hoverChartIndex].pointer.drop(d)
            }, onDocumentMouseMove: function (a) {
                var b = this.chart, d = this.chartPosition;
                a = this.normalize(a, d);
                !d || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            }, onContainerMouseLeave: function (d) {
                var b = G[a.hoverChartIndex];
                b && (d.relatedTarget || d.toElement) && (b.pointer.reset(), b.pointer.chartPosition = null)
            }, onContainerMouseMove: function (d) {
                var b = this.chart;
                p(a.hoverChartIndex) && G[a.hoverChartIndex] && G[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = b.index);
                d = this.normalize(d);
                d.preventDefault || (d.returnValue = !1);
                "mousedown" === b.mouseIsDown && this.drag(d);
                !this.inClass(d.target, "highcharts-tracker") && !b.isInsidePlot(d.chartX - b.plotLeft, d.chartY - b.plotTop) || b.openMenu || this.runPointActions(d)
            }, inClass: function (a, b) {
                for (var d; a;) {
                    if (d =
                            F(a, "class")) {
                        if (-1 !== d.indexOf(b)) return !0;
                        if (-1 !== d.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            }, onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            }, onContainerClick: function (a) {
                var b = this.chart, d = b.hoverPoint, g = b.plotLeft, e = b.plotTop;
                a = this.normalize(a);
                b.cancelClick ||
                (d && this.inClass(a.target, "highcharts-tracker") ? (w(d.series, "click", t(a, {point: d})), b.hoverPoint && d.firePointEvent("click", a)) : (t(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - g, a.chartY - e) && w(b, "click", a)))
            }, setDOMEvents: function () {
                var d = this, b = d.chart.container, e = b.ownerDocument;
                b.onmousedown = function (a) {
                    d.onContainerMouseDown(a)
                };
                b.onmousemove = function (a) {
                    d.onContainerMouseMove(a)
                };
                b.onclick = function (a) {
                    d.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = y(b, "mouseleave", d.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = y(e, "mouseup", d.onDocumentMouseUp));
                a.hasTouch && (b.ontouchstart = function (a) {
                    d.onContainerTouchStart(a)
                }, b.ontouchmove = function (a) {
                    d.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = y(e, "touchend", d.onDocumentTouchEnd)))
            }, destroy: function () {
                var d = this;
                d.unDocMouseMove && d.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd &&
                (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(d.tooltipTimeout);
                a.objectEach(d, function (a, g) {
                    d[g] = null
                })
            }
        }
    })(I);
    (function (a) {
        var y = a.charts, F = a.extend, G = a.noop, k = a.pick;
        F(a.Pointer.prototype, {
            pinchTranslate: function (a, k, t, v, w, r) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, k, t, v, w, r);
                this.zoomVert && this.pinchTranslateDirection(!1, a, k, t, v, w, r)
            }, pinchTranslateDirection: function (a, k, t, v, w, r, h, e) {
                var c = this.chart, n = a ? "x" : "y", d = a ? "X" : "Y", g = "chart" + d, b = a ? "width" : "height",
                    x = c["plot" +
                    (a ? "Left" : "Top")], u, p, E = e || 1, B = c.inverted, m = c.bounds[a ? "h" : "v"],
                    z = 1 === k.length, D = k[0][g], A = t[0][g], f = !z && k[1][g], q = !z && t[1][g], L;
                t = function () {
                    !z && 20 < Math.abs(D - f) && (E = e || Math.abs(A - q) / Math.abs(D - f));
                    p = (x - A) / E + D;
                    u = c["plot" + (a ? "Width" : "Height")] / E
                };
                t();
                k = p;
                k < m.min ? (k = m.min, L = !0) : k + u > m.max && (k = m.max - u, L = !0);
                L ? (A -= .8 * (A - h[n][0]), z || (q -= .8 * (q - h[n][1])), t()) : h[n] = [A, q];
                B || (r[n] = p - x, r[b] = u);
                r = B ? 1 / E : E;
                w[b] = u;
                w[n] = k;
                v[B ? a ? "scaleY" : "scaleX" : "scale" + d] = E;
                v["translate" + d] = r * x + (A - r * D)
            }, pinch: function (a) {
                var c =
                        this, t = c.chart, v = c.pinchDown, w = a.touches, r = w.length, h = c.lastValidTouch,
                    e = c.hasZoom, l = c.selectionMarker, n = {},
                    d = 1 === r && (c.inClass(a.target, "highcharts-tracker") && t.runTrackerClick || c.runChartClick),
                    g = {};
                1 < r && (c.initiated = !0);
                e && c.initiated && !d && a.preventDefault();
                [].map.call(w, function (a) {
                    return c.normalize(a)
                });
                "touchstart" === a.type ? ([].forEach.call(w, function (a, d) {
                    v[d] = {chartX: a.chartX, chartY: a.chartY}
                }), h.x = [v[0].chartX, v[1] && v[1].chartX], h.y = [v[0].chartY, v[1] && v[1].chartY], t.axes.forEach(function (a) {
                    if (a.zoomEnabled) {
                        var b =
                                t.bounds[a.horiz ? "h" : "v"], d = a.minPixelPadding,
                            g = a.toPixels(k(a.options.min, a.dataMin)), e = a.toPixels(k(a.options.max, a.dataMax)),
                            c = Math.max(g, e);
                        b.min = Math.min(a.pos, Math.min(g, e) - d);
                        b.max = Math.max(a.pos + a.len, c + d)
                    }
                }), c.res = !0) : c.followTouchMove && 1 === r ? this.runPointActions(c.normalize(a)) : v.length && (l || (c.selectionMarker = l = F({
                    destroy: G,
                    touch: !0
                }, t.plotBox)), c.pinchTranslate(v, w, n, l, g, h), c.hasPinched = e, c.scaleGroups(n, g), c.res && (c.res = !1, this.reset(!1, 0)))
            }, touch: function (c, p) {
                var t = this.chart, v, w;
                if (t.index !== a.hoverChartIndex) this.onContainerMouseLeave({relatedTarget: !0});
                a.hoverChartIndex = t.index;
                1 === c.touches.length ? (c = this.normalize(c), (w = t.isInsidePlot(c.chartX - t.plotLeft, c.chartY - t.plotTop)) && !t.openMenu ? (p && this.runPointActions(c), "touchmove" === c.type && (p = this.pinchDown, v = p[0] ? 4 <= Math.sqrt(Math.pow(p[0].chartX - c.chartX, 2) + Math.pow(p[0].chartY - c.chartY, 2)) : !1), k(v, !0) && this.pinch(c)) : p && this.reset()) : 2 === c.touches.length && this.pinch(c)
            }, onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            }, onContainerTouchMove: function (a) {
                this.touch(a)
            }, onDocumentTouchEnd: function (c) {
                y[a.hoverChartIndex] && y[a.hoverChartIndex].pointer.drop(c)
            }
        })
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.charts, G = a.css, k = a.doc, c = a.extend, p = a.noop, t = a.Pointer,
            v = a.removeEvent, w = a.win, r = a.wrap;
        if (!a.hasTouch && (w.PointerEvent || w.MSPointerEvent)) {
            var h = {}, e = !!w.PointerEvent, l = function () {
                var d = [];
                d.item = function (a) {
                    return this[a]
                };
                a.objectEach(h, function (a) {
                    d.push({pageX: a.pageX, pageY: a.pageY, target: a.target})
                });
                return d
            }, n = function (d, g, b, e) {
                "touch" !== d.pointerType && d.pointerType !== d.MSPOINTER_TYPE_TOUCH || !F[a.hoverChartIndex] || (e(d), e = F[a.hoverChartIndex].pointer, e[g]({
                    type: b,
                    target: d.currentTarget,
                    preventDefault: p,
                    touches: l()
                }))
            };
            c(t.prototype, {
                onContainerPointerDown: function (a) {
                    n(a, "onContainerTouchStart", "touchstart", function (a) {
                        h[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                    })
                }, onContainerPointerMove: function (a) {
                    n(a, "onContainerTouchMove", "touchmove", function (a) {
                        h[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        h[a.pointerId].target || (h[a.pointerId].target = a.currentTarget)
                    })
                }, onDocumentPointerUp: function (a) {
                    n(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete h[a.pointerId]
                    })
                }, batchMSEvents: function (a) {
                    a(this.chart.container, e ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, e ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(k, e ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            r(t.prototype, "init", function (a, g, b) {
                a.call(this, g, b);
                this.hasZoom &&
                G(g.container, {"-ms-touch-action": "none", "touch-action": "none"})
            });
            r(t.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(y)
            });
            r(t.prototype, "destroy", function (a) {
                this.batchMSEvents(v);
                a.call(this)
            })
        }
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.css, G = a.discardElement, k = a.defined, c = a.fireEvent, p = a.isFirefox,
            t = a.marginNames, v = a.merge, w = a.pick, r = a.setAnimation, h = a.stableSort, e = a.win, l = a.wrap;
        a.Legend = function (a, d) {
            this.init(a, d)
        };
        a.Legend.prototype =
            {
                init: function (a, d) {
                    this.chart = a;
                    this.setOptions(d);
                    d.enabled && (this.render(), y(this.chart, "endResize", function () {
                        this.legend.positionCheckboxes()
                    }), this.proximate ? this.unchartrender = y(this.chart, "render", function () {
                        this.legend.proximatePositions();
                        this.legend.positionItems()
                    }) : this.unchartrender && this.unchartrender())
                }, setOptions: function (a) {
                var d = w(a.padding, 8);
                this.options = a;
                this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = v(this.itemStyle, a.itemHiddenStyle));
                this.itemMarginTop =
                    a.itemMarginTop || 0;
                this.padding = d;
                this.initialItemY = d - 5;
                this.symbolWidth = w(a.symbolWidth, 16);
                this.pages = [];
                this.proximate = "proximate" === a.layout && !this.chart.inverted
            }, update: function (a, d) {
                var g = this.chart;
                this.setOptions(v(!0, this.options, a));
                this.destroy();
                g.isDirtyLegend = g.isDirtyBox = !0;
                w(d, !0) && g.redraw();
                c(this, "afterUpdate")
            }, colorizeItem: function (a, d) {
                a.legendGroup[d ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                if (!this.chart.styledMode) {
                    var g = this.options, b = a.legendItem, e = a.legendLine,
                        h = a.legendSymbol, n = this.itemHiddenStyle.color, g = d ? g.itemStyle.color : n,
                        l = d ? a.color || n : n, k = a.options && a.options.marker, m = {fill: l};
                    b && b.css({fill: g, color: g});
                    e && e.attr({stroke: l});
                    h && (k && h.isMarker && (m = a.pointAttribs(), d || (m.stroke = m.fill = n)), h.attr(m))
                }
                c(this, "afterColorizeItem", {item: a, visible: d})
            }, positionItems: function () {
                this.allItems.forEach(this.positionItem, this);
                this.chart.isResizing || this.positionCheckboxes()
            }, positionItem: function (a) {
                var d = this.options, e = d.symbolPadding, d = !d.rtl, b = a._legendItemPos,
                    c = b[0], b = b[1], h = a.checkbox;
                if ((a = a.legendGroup) && a.element) a[k(a.translateY) ? "animate" : "attr"]({
                    translateX: d ? c : this.legendWidth - c - 2 * e - 4,
                    translateY: b
                });
                h && (h.x = c, h.y = b)
            }, destroyItem: function (a) {
                var d = a.checkbox;
                ["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (d) {
                    a[d] && (a[d] = a[d].destroy())
                });
                d && G(a.checkbox)
            }, destroy: function () {
                function a(a) {
                    this[a] && (this[a] = this[a].destroy())
                }

                this.getAllItems().forEach(function (d) {
                    ["legendItem", "legendGroup"].forEach(a, d)
                });
                "clipRect up down pager nav box title group".split(" ").forEach(a,
                    this);
                this.display = null
            }, positionCheckboxes: function () {
                var a = this.group && this.group.alignAttr, d, e = this.clipHeight || this.legendHeight,
                    b = this.titleHeight;
                a && (d = a.translateY, this.allItems.forEach(function (g) {
                    var c = g.checkbox, h;
                    c && (h = d + b + c.y + (this.scrollOffset || 0) + 3, F(c, {
                        left: a.translateX + g.checkboxOffset + c.x - 20 + "px",
                        top: h + "px",
                        display: this.proximate || h > d - 6 && h < d + e - 6 ? "" : "none"
                    }))
                }, this))
            }, renderTitle: function () {
                var a = this.options, d = this.padding, e = a.title, b = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text,
                    d - 3, d - 4, null, null, null, a.useHTML, null, "legend-title").attr({zIndex: 1}), this.chart.styledMode || this.title.css(e.style), this.title.add(this.group)), e.width || this.title.css({width: this.maxLegendWidth + "px"}), a = this.title.getBBox(), b = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: b}));
                this.titleHeight = b
            }, setText: function (e) {
                var d = this.options;
                e.legendItem.attr({text: d.labelFormat ? a.format(d.labelFormat, e, this.chart.time) : d.labelFormatter.call(e)})
            }, renderItem: function (a) {
                var d = this.chart,
                    e = d.renderer, b = this.options, c = this.symbolWidth, h = b.symbolPadding, n = this.itemStyle,
                    l = this.itemHiddenStyle, k = "horizontal" === b.layout ? w(b.itemDistance, 20) : 0, m = !b.rtl,
                    z = a.legendItem, D = !a.series, A = !D && a.series.drawLegendSymbol ? a.series : a, f = A.options,
                    f = this.createCheckboxForItem && f && f.showCheckbox, k = c + h + k + (f ? 20 : 0), q = b.useHTML,
                    r = a.options.className;
                z || (a.legendGroup = e.g("legend-item").addClass("highcharts-" + A.type + "-series highcharts-color-" + a.colorIndex + (r ? " " + r : "") + (D ? " highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup),
                    a.legendItem = z = e.text("", m ? c + h : -h, this.baseline || 0, q), d.styledMode || z.css(v(a.visible ? n : l)), z.attr({
                    align: m ? "left" : "right",
                    zIndex: 2
                }).add(a.legendGroup), this.baseline || (this.fontMetrics = e.fontMetrics(d.styledMode ? 12 : n.fontSize, z), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, z.attr("y", this.baseline)), this.symbolHeight = b.symbolHeight || this.fontMetrics.f, A.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, z, q), f && this.createCheckboxForItem(a));
                this.colorizeItem(a, a.visible);
                !d.styledMode && n.width || z.css({width: (b.itemWidth || this.widthOption || d.spacingBox.width) - k});
                this.setText(a);
                d = z.getBBox();
                a.itemWidth = a.checkboxOffset = b.itemWidth || a.legendItemWidth || d.width + k;
                this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                this.totalItemWidth += a.itemWidth;
                this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || d.height || this.symbolHeight)
            }, layoutItem: function (a) {
                var d = this.options, e = this.padding, b = "horizontal" === d.layout, c = a.itemHeight,
                    h = d.itemMarginBottom || 0, n = this.itemMarginTop,
                    l = b ? w(d.itemDistance, 20) : 0, k = this.maxLegendWidth,
                    d = d.alignColumns && this.totalItemWidth > k ? this.maxItemWidth : a.itemWidth;
                b && this.itemX - e + d > k && (this.itemX = e, this.itemY += n + this.lastLineHeight + h, this.lastLineHeight = 0);
                this.lastItemY = n + this.itemY + h;
                this.lastLineHeight = Math.max(c, this.lastLineHeight);
                a._legendItemPos = [this.itemX, this.itemY];
                b ? this.itemX += d : (this.itemY += n + c + h, this.lastLineHeight = c);
                this.offsetWidth = this.widthOption || Math.max((b ? this.itemX - e - (a.checkbox ? 0 : l) : d) + e, this.offsetWidth)
            }, getAllItems: function () {
                var a =
                    [];
                this.chart.series.forEach(function (d) {
                    var e = d && d.options;
                    d && w(e.showInLegend, k(e.linkedTo) ? !1 : void 0, !0) && (a = a.concat(d.legendItems || ("point" === e.legendType ? d.data : d)))
                });
                c(this, "afterGetAllItems", {allItems: a});
                return a
            }, getAlignment: function () {
                var a = this.options;
                return this.proximate ? a.align.charAt(0) + "tv" : a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
            }, adjustMargins: function (a, d) {
                var e = this.chart, b = this.options, c = this.getAlignment(), h = void 0 !== e.options.title.margin ?
                    e.titleOffset + e.options.title.margin : 0;
                c && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (g, n) {
                    g.test(c) && !k(a[n]) && (e[t[n]] = Math.max(e[t[n]], e.legend[(n + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][n] * b[n % 2 ? "x" : "y"] + w(b.margin, 12) + d[n] + (0 === n && (0 === e.titleOffset ? 0 : h))))
                })
            }, proximatePositions: function () {
                var e = this.chart, d = [], g = "left" === this.options.align;
                this.allItems.forEach(function (b) {
                    var c, h;
                    c = g;
                    b.xAxis && b.points && (b.xAxis.options.reversed && (c = !c), c = a.find(c ? b.points :
                        b.points.slice(0).reverse(), function (b) {
                        return a.isNumber(b.plotY)
                    }), h = b.legendGroup.getBBox().height, d.push({
                        target: b.visible ? (c ? c.plotY : b.xAxis.height) - .3 * h : e.plotHeight,
                        size: h,
                        item: b
                    }))
                }, this);
                a.distribute(d, e.plotHeight);
                d.forEach(function (a) {
                    a.item._legendItemPos[1] = e.plotTop - e.spacing[0] + a.pos
                })
            }, render: function () {
                var e = this.chart, d = e.renderer, g = this.group, b, l, k, r = this.box, p = this.options,
                    B = this.padding;
                this.itemX = B;
                this.itemY = this.initialItemY;
                this.lastItemY = this.offsetWidth = 0;
                this.widthOption =
                    a.relativeLength(p.width, e.spacingBox.width - B);
                b = e.spacingBox.width - 2 * B - p.x;
                -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (b /= 2);
                this.maxLegendWidth = this.widthOption || b;
                g || (this.group = g = d.g("legend").attr({zIndex: 7}).add(), this.contentGroup = d.g().attr({zIndex: 1}).add(g), this.scrollGroup = d.g().add(this.contentGroup));
                this.renderTitle();
                b = this.getAllItems();
                h(b, function (a, b) {
                    return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                });
                p.reversed && b.reverse();
                this.allItems =
                    b;
                this.display = l = !!b.length;
                this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                b.forEach(this.renderItem, this);
                b.forEach(this.layoutItem, this);
                b = (this.widthOption || this.offsetWidth) + B;
                k = this.lastItemY + this.lastLineHeight + this.titleHeight;
                k = this.handleOverflow(k);
                k += B;
                r || (this.box = r = d.rect().addClass("highcharts-legend-box").attr({r: p.borderRadius}).add(g), r.isNew = !0);
                e.styledMode || r.attr({
                    stroke: p.borderColor,
                    "stroke-width": p.borderWidth || 0,
                    fill: p.backgroundColor || "none"
                }).shadow(p.shadow);
                0 < b && 0 < k && (r[r.isNew ? "attr" : "animate"](r.crisp.call({}, {
                    x: 0,
                    y: 0,
                    width: b,
                    height: k
                }, r.strokeWidth())), r.isNew = !1);
                r[l ? "show" : "hide"]();
                e.styledMode && "none" === g.getStyle("display") && (b = k = 0);
                this.legendWidth = b;
                this.legendHeight = k;
                l && (d = e.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (r = d.y + e.titleOffset, d = v(d, {y: 0 < e.titleOffset ? r += e.options.title.margin : r})), g.align(v(p, {
                    width: b,
                    height: k,
                    verticalAlign: this.proximate ? "top" : p.verticalAlign
                }), !0, d));
                this.proximate || this.positionItems();
                c(this, "afterRender")
            },
                handleOverflow: function (a) {
                    var d = this, e = this.chart, b = e.renderer, c = this.options, h = c.y, n = this.padding,
                        h = e.spacingBox.height + ("top" === c.verticalAlign ? -h : h) - n, l = c.maxHeight, k,
                        m = this.clipRect, z = c.navigation, D = w(z.animation, !0), r = z.arrowSize || 12,
                        f = this.nav, q = this.pages, p, t = this.allItems, v = function (a) {
                            "number" === typeof a ? m.attr({height: a}) : m && (d.clipRect = m.destroy(), d.contentGroup.clip());
                            d.contentGroup.div && (d.contentGroup.div.style.clip = a ? "rect(" + n + "px,9999px," + (n + a) + "px,0)" : "auto")
                        };
                    "horizontal" !== c.layout ||
                    "middle" === c.verticalAlign || c.floating || (h /= 2);
                    l && (h = Math.min(h, l));
                    q.length = 0;
                    a > h && !1 !== z.enabled ? (this.clipHeight = k = Math.max(h - 20 - this.titleHeight - n, 0), this.currentPage = w(this.currentPage, 1), this.fullHeight = a, t.forEach(function (a, b) {
                        var f = a._legendItemPos[1], d = Math.round(a.legendItem.getBBox().height), e = q.length;
                        if (!e || f - q[e - 1] > k && (p || f) !== q[e - 1]) q.push(p || f), e++;
                        a.pageIx = e - 1;
                        p && (t[b - 1].pageIx = e - 1);
                        b === t.length - 1 && f + d - q[e - 1] > k && f !== p && (q.push(f), a.pageIx = e);
                        f !== p && (p = f)
                    }), m || (m = d.clipRect = b.clipRect(0,
                        n, 9999, 0), d.contentGroup.clip(m)), v(k), f || (this.nav = f = b.g().attr({zIndex: 1}).add(this.group), this.up = b.symbol("triangle", 0, 0, r, r).on("click", function () {
                        d.scroll(-1, D)
                    }).add(f), this.pager = b.text("", 15, 10).addClass("highcharts-legend-navigation"), e.styledMode || this.pager.css(z.style), this.pager.add(f), this.down = b.symbol("triangle-down", 0, 0, r, r).on("click", function () {
                        d.scroll(1, D)
                    }).add(f)), d.scroll(0), a = h) : f && (v(), this.nav = f.destroy(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                    return a
                },
                scroll: function (a, d) {
                    var e = this.pages, b = e.length;
                    a = this.currentPage + a;
                    var c = this.clipHeight, h = this.options.navigation, l = this.pager, n = this.padding;
                    a > b && (a = b);
                    0 < a && (void 0 !== d && r(d, this.chart), this.nav.attr({
                        translateX: n,
                        translateY: c + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({"class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"}), l.attr({text: a + "/" + b}), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === b ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }),
                    this.chart.styledMode || (this.up.attr({fill: 1 === a ? h.inactiveColor : h.activeColor}).css({cursor: 1 === a ? "default" : "pointer"}), this.down.attr({fill: a === b ? h.inactiveColor : h.activeColor}).css({cursor: a === b ? "default" : "pointer"})), this.scrollOffset = -e[a - 1] + this.initialItemY, this.scrollGroup.animate({translateY: this.scrollOffset}), this.currentPage = a, this.positionCheckboxes())
                }
            };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, d) {
                var e = a.symbolHeight, b = a.options.squareSymbol;
                d.legendSymbol = this.chart.renderer.rect(b ?
                    (a.symbolWidth - e) / 2 : 0, a.baseline - e + 1, b ? e : a.symbolWidth, e, w(a.options.symbolRadius, e / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(d.legendGroup)
            }, drawLineMarker: function (a) {
                var d = this.options, e = d.marker, b = a.symbolWidth, c = a.symbolHeight, h = c / 2,
                    l = this.chart.renderer, n = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var k = {};
                this.chart.styledMode || (k = {"stroke-width": d.lineWidth || 0}, d.dashStyle && (k.dashstyle = d.dashStyle));
                this.legendLine = l.path(["M", 0, a, "L", b, a]).addClass("highcharts-graph").attr(k).add(n);
                e && !1 !== e.enabled && b && (d = Math.min(w(e.radius, h), h), 0 === this.symbol.indexOf("url") && (e = v(e, {
                    width: c,
                    height: c
                }), d = 0), this.legendSymbol = e = l.symbol(this.symbol, b / 2 - d, a - d, 2 * d, 2 * d, e).addClass("highcharts-point").add(n), e.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(e.navigator && e.navigator.userAgent) || p) && l(a.Legend.prototype, "positionItem", function (a, d) {
            var e = this, b = function () {
                d._legendItemPos && a.call(e, d)
            };
            b();
            e.bubbleLegend || setTimeout(b)
        })
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.animate, G = a.animObject, k = a.attr,
            c = a.doc, p = a.Axis, t = a.createElement, v = a.defaultOptions, w = a.discardElement, r = a.charts,
            h = a.css, e = a.defined, l = a.extend, n = a.find, d = a.fireEvent, g = a.isNumber, b = a.isObject,
            x = a.isString, u = a.Legend, H = a.marginNames, E = a.merge, B = a.objectEach, m = a.Pointer, z = a.pick,
            D = a.pInt, A = a.removeEvent, f = a.seriesTypes, q = a.splat, L = a.syncTimeout, K = a.win,
            T = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, f) {
            return new T(a, b, f)
        };
        l(T.prototype, {
            callbacks: [], getArgs: function () {
                var a = [].slice.call(arguments);
                if (x(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            }, init: function (b, f) {
                var e, g, c = b.series, m = b.plotOptions || {};
                d(this, "init", {args: arguments}, function () {
                    b.series = null;
                    e = E(v, b);
                    for (g in e.plotOptions) e.plotOptions[g].tooltip = m[g] && E(m[g].tooltip) || void 0;
                    e.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    e.series = b.series = c;
                    this.userOptions = b;
                    var h = e.chart, q = h.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {h: {}, v: {}};
                    this.labelCollectors = [];
                    this.callback =
                        f;
                    this.isResizing = 0;
                    this.options = e;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && Object.keys(b.time).length ? new a.Time(b.time) : a.time;
                    this.styledMode = h.styledMode;
                    this.hasCartesianSeries = h.showAxes;
                    var l = this;
                    l.index = r.length;
                    r.push(l);
                    a.chartCount++;
                    q && B(q, function (a, b) {
                        y(l, b, a)
                    });
                    l.xAxis = [];
                    l.yAxis = [];
                    l.pointCount = l.colorCounter = l.symbolCounter = 0;
                    d(l, "afterInit");
                    l.firstRender()
                })
            }, initSeries: function (b) {
                var d = this.options.chart;
                (d = f[b.type || d.type || d.defaultSeriesType]) || a.error(17, !0, this);
                d =
                    new d;
                d.init(this, b);
                return d
            }, orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            }, isInsidePlot: function (a, b, f) {
                var d = f ? b : a;
                a = f ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            }, redraw: function (b) {
                d(this, "beforeRedraw");
                var f = this.axes, e = this.series, g = this.pointer, c = this.legend, m = this.userOptions.legend,
                    h = this.isDirtyLegend, q, n, z = this.hasCartesianSeries, k = this.isDirtyBox, D,
                    u = this.renderer, r = u.isHidden(), A = [];
                this.setResponsive &&
                this.setResponsive(!1);
                a.setAnimation(b, this);
                r && this.temporaryDisplay();
                this.layOutTitles();
                for (b = e.length; b--;) if (D = e[b], D.options.stacking && (q = !0, D.isDirty)) {
                    n = !0;
                    break
                }
                if (n) for (b = e.length; b--;) D = e[b], D.options.stacking && (D.isDirty = !0);
                e.forEach(function (a) {
                    a.isDirty && ("point" === a.options.legendType ? (a.updateTotals && a.updateTotals(), h = !0) : m && (m.labelFormatter || m.labelFormat) && (h = !0));
                    a.isDirtyData && d(a, "updatedData")
                });
                h && c && c.options.enabled && (c.render(), this.isDirtyLegend = !1);
                q && this.getStacks();
                z && f.forEach(function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                z && (f.forEach(function (a) {
                    a.isDirty && (k = !0)
                }), f.forEach(function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, A.push(function () {
                        d(a, "afterSetExtremes", l(a.eventArgs, a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (k || q) && a.redraw()
                }));
                k && this.drawChartBox();
                d(this, "predraw");
                e.forEach(function (a) {
                    (k || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                g && g.reset(!0);
                u.draw();
                d(this, "redraw");
                d(this, "render");
                r && this.temporaryDisplay(!0);
                A.forEach(function (a) {
                    a.call()
                })
            }, get: function (a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }

                var f, d = this.series, e;
                f = n(this.axes, b) || n(this.series, b);
                for (e = 0; !f && e < d.length; e++) f = n(d[e].points || [], b);
                return f
            }, getAxes: function () {
                var a = this, b = this.options, f = b.xAxis = q(b.xAxis || {}), b = b.yAxis = q(b.yAxis || {});
                d(this, "getAxes");
                f.forEach(function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                b.forEach(function (a, b) {
                    a.index = b
                });
                f.concat(b).forEach(function (b) {
                    new p(a, b)
                });
                d(this, "afterGetAxes")
            }, getSelectedPoints: function () {
                var a =
                    [];
                this.series.forEach(function (b) {
                    a = a.concat((b[b.hasGroupedData ? "points" : "data"] || []).filter(function (a) {
                        return a.selected
                    }))
                });
                return a
            }, getSelectedSeries: function () {
                return this.series.filter(function (a) {
                    return a.selected
                })
            }, setTitle: function (a, b, f) {
                var d = this, e = d.options, g = d.styledMode, c;
                c = e.title = E(!g && {style: {color: "#333333", fontSize: e.isStock ? "16px" : "18px"}}, e.title, a);
                e = e.subtitle = E(!g && {style: {color: "#666666"}}, e.subtitle, b);
                [["title", a, c], ["subtitle", b, e]].forEach(function (a, b) {
                    var f = a[0],
                        e = d[f], c = a[1];
                    a = a[2];
                    e && c && (d[f] = e = e.destroy());
                    a && !e && (d[f] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + f,
                        zIndex: a.zIndex || 4
                    }).add(), d[f].update = function (a) {
                        d.setTitle(!b && a, b && a)
                    }, g || d[f].css(a.style))
                });
                d.layOutTitles(f)
            }, layOutTitles: function (a) {
                var b = 0, f, d = this.renderer, e = this.spacingBox;
                ["title", "subtitle"].forEach(function (a) {
                    var f = this[a], g = this.options[a];
                    a = "title" === a ? -3 : g.verticalAlign ? 0 : b + 2;
                    var c;
                    f && (this.styledMode || (c = g.style.fontSize), c = d.fontMetrics(c,
                        f).b, f.css({width: (g.width || e.width + g.widthAdjust) + "px"}).align(l({y: a + c}, g), !1, "spacingBox"), g.floating || g.verticalAlign || (b = Math.ceil(b + f.getBBox(g.useHTML).height)))
                }, this);
                f = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && f && (this.isDirtyBox = this.isDirtyLegend = f, this.hasRendered && z(a, !0) && this.isDirtyBox && this.redraw())
            }, getChartSize: function () {
                var b = this.options.chart, f = b.width, b = b.height, d = this.renderTo;
                e(f) || (this.containerWidth = a.getStyle(d, "width"));
                e(b) || (this.containerHeight =
                    a.getStyle(d, "height"));
                this.chartWidth = Math.max(0, f || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            }, temporaryDisplay: function (b) {
                var f = this.renderTo;
                if (b) for (; f && f.style;) f.hcOrigStyle && (a.css(f, f.hcOrigStyle), delete f.hcOrigStyle), f.hcOrigDetached && (c.body.removeChild(f), f.hcOrigDetached = !1), f = f.parentNode; else for (; f && f.style;) {
                    c.body.contains(f) || f.parentNode || (f.hcOrigDetached = !0, c.body.appendChild(f));
                    if ("none" === a.getStyle(f, "display", !1) || f.hcOricDetached) f.hcOrigStyle = {
                        display: f.style.display,
                        height: f.style.height,
                        overflow: f.style.overflow
                    }, b = {
                        display: "block",
                        overflow: "hidden"
                    }, f !== this.renderTo && (b.height = 0), a.css(f, b), f.offsetWidth || f.style.setProperty("display", "block", "important");
                    f = f.parentNode;
                    if (f === c.body) break
                }
            }, setClassName: function (a) {
                this.container.className = "highcharts-container " + (a || "")
            }, getContainer: function () {
                var b, f = this.options, e = f.chart, m, q;
                b = this.renderTo;
                var n = a.uniqueKey(),
                    z, u;
                b || (this.renderTo = b = e.renderTo);
                x(b) && (this.renderTo = b = c.getElementById(b));
                b || a.error(13, !0, this);
                m = D(k(b, "data-highcharts-chart"));
                g(m) && r[m] && r[m].hasRendered && r[m].destroy();
                k(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                e.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                m = this.chartWidth;
                q = this.chartHeight;
                h(b, {overflow: "hidden"});
                this.styledMode || (z = l({
                    position: "relative",
                    overflow: "hidden",
                    width: m + "px",
                    height: q + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, e.style));
                this.container = b = t("div", {id: n}, z, b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[e.renderer] || a.Renderer)(b, m, q, null, e.forExport, f.exporting && f.exporting.allowHTML, this.styledMode);
                this.setClassName(e.className);
                if (this.styledMode) for (u in f.defs) this.renderer.definition(f.defs[u]); else this.renderer.setStyle(e.style);
                this.renderer.chartIndex = this.index;
                d(this, "afterGetContainer")
            }, getMargins: function (a) {
                var b = this.spacing, f = this.margin,
                    g = this.titleOffset;
                this.resetMargins();
                g && !e(f[0]) && (this.plotTop = Math.max(this.plotTop, g + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(f, b);
                d(this, "getMargins");
                a || this.getAxisMargins()
            }, getAxisMargins: function () {
                var a = this, b = a.axisOffset = [0, 0, 0, 0], f = a.margin;
                a.hasCartesianSeries && a.axes.forEach(function (a) {
                    a.visible && a.getOffset()
                });
                H.forEach(function (d, g) {
                    e(f[g]) || (a[d] += b[g])
                });
                a.setChartSize()
            }, reflow: function (b) {
                var f = this, d = f.options.chart, g = f.renderTo,
                    m = e(d.width) && e(d.height), h = d.width || a.getStyle(g, "width"),
                    d = d.height || a.getStyle(g, "height"), g = b ? b.target : K;
                if (!m && !f.isPrinting && h && d && (g === K || g === c)) {
                    if (h !== f.containerWidth || d !== f.containerHeight) a.clearTimeout(f.reflowTimeout), f.reflowTimeout = L(function () {
                        f.container && f.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    f.containerWidth = h;
                    f.containerHeight = d
                }
            }, setReflow: function (a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = y(K,
                    "resize", function (a) {
                        b.reflow(a)
                    }), y(this, "destroy", this.unbindReflow))
            }, setSize: function (b, f, e) {
                var g = this, c = g.renderer, m;
                g.isResizing += 1;
                a.setAnimation(e, g);
                g.oldChartHeight = g.chartHeight;
                g.oldChartWidth = g.chartWidth;
                void 0 !== b && (g.options.chart.width = b);
                void 0 !== f && (g.options.chart.height = f);
                g.getChartSize();
                g.styledMode || (m = c.globalAnimation, (m ? F : h)(g.container, {
                    width: g.chartWidth + "px",
                    height: g.chartHeight + "px"
                }, m));
                g.setChartSize(!0);
                c.setSize(g.chartWidth, g.chartHeight, e);
                g.axes.forEach(function (a) {
                    a.isDirty =
                        !0;
                    a.setScale()
                });
                g.isDirtyLegend = !0;
                g.isDirtyBox = !0;
                g.layOutTitles();
                g.getMargins();
                g.redraw(e);
                g.oldChartHeight = null;
                d(g, "resize");
                L(function () {
                    g && d(g, "endResize", null, function () {
                        --g.isResizing
                    })
                }, G(m).duration)
            }, setChartSize: function (a) {
                var b = this.inverted, f = this.renderer, e = this.chartWidth, g = this.chartHeight,
                    c = this.options.chart, m = this.spacing, h = this.clipOffset, q, l, n, z;
                this.plotLeft = q = Math.round(this.plotLeft);
                this.plotTop = l = Math.round(this.plotTop);
                this.plotWidth = n = Math.max(0, Math.round(e - q - this.marginRight));
                this.plotHeight = z = Math.max(0, Math.round(g - l - this.marginBottom));
                this.plotSizeX = b ? z : n;
                this.plotSizeY = b ? n : z;
                this.plotBorderWidth = c.plotBorderWidth || 0;
                this.spacingBox = f.spacingBox = {x: m[3], y: m[0], width: e - m[3] - m[1], height: g - m[0] - m[2]};
                this.plotBox = f.plotBox = {x: q, y: l, width: n, height: z};
                e = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(e, h[3]) / 2);
                f = Math.ceil(Math.max(e, h[0]) / 2);
                this.clipBox = {
                    x: b,
                    y: f,
                    width: Math.floor(this.plotSizeX - Math.max(e, h[1]) / 2 - b),
                    height: Math.max(0, Math.floor(this.plotSizeY -
                        Math.max(e, h[2]) / 2 - f))
                };
                a || this.axes.forEach(function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                d(this, "afterSetChartSize", {skipAxes: a})
            }, resetMargins: function () {
                d(this, "resetMargins");
                var a = this, f = a.options.chart;
                ["margin", "spacing"].forEach(function (d) {
                    var e = f[d], g = b(e) ? e : [e, e, e, e];
                    ["Top", "Right", "Bottom", "Left"].forEach(function (b, e) {
                        a[d][e] = z(f[d + b], g[e])
                    })
                });
                H.forEach(function (b, f) {
                    a[b] = z(a.margin[f], a.spacing[f])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            }, drawChartBox: function () {
                var a =
                        this.options.chart, b = this.renderer, f = this.chartWidth, e = this.chartHeight,
                    g = this.chartBackground, c = this.plotBackground, m = this.plotBorder, h, q = this.styledMode,
                    l = this.plotBGImage, n = a.backgroundColor, z = a.plotBackgroundColor, k = a.plotBackgroundImage,
                    D, u = this.plotLeft, r = this.plotTop, A = this.plotWidth, x = this.plotHeight, p = this.plotBox,
                    B = this.clipRect, t = this.clipBox, v = "animate";
                g || (this.chartBackground = g = b.rect().addClass("highcharts-background").add(), v = "attr");
                if (q) h = D = g.strokeWidth(); else {
                    h = a.borderWidth ||
                        0;
                    D = h + (a.shadow ? 8 : 0);
                    n = {fill: n || "none"};
                    if (h || g["stroke-width"]) n.stroke = a.borderColor, n["stroke-width"] = h;
                    g.attr(n).shadow(a.shadow)
                }
                g[v]({x: D / 2, y: D / 2, width: f - D - h % 2, height: e - D - h % 2, r: a.borderRadius});
                v = "animate";
                c || (v = "attr", this.plotBackground = c = b.rect().addClass("highcharts-plot-background").add());
                c[v](p);
                q || (c.attr({fill: z || "none"}).shadow(a.plotShadow), k && (l ? l.animate(p) : this.plotBGImage = b.image(k, u, r, A, x).add()));
                B ? B.animate({width: t.width, height: t.height}) : this.clipRect = b.clipRect(t);
                v = "animate";
                m || (v = "attr", this.plotBorder = m = b.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                q || m.attr({stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none"});
                m[v](m.crisp({x: u, y: r, width: A, height: x}, -m.strokeWidth()));
                this.isDirtyBox = !1;
                d(this, "afterDrawChartBox")
            }, propFromSeries: function () {
                var a = this, b = a.options.chart, d, e = a.options.series, g, c;
                ["inverted", "angular", "polar"].forEach(function (m) {
                    d = f[b.type || b.defaultSeriesType];
                    c = b[m] || d && d.prototype[m];
                    for (g = e && e.length; !c &&
                    g--;) (d = f[e[g].type]) && d.prototype[m] && (c = !0);
                    a[m] = c
                })
            }, linkSeries: function () {
                var a = this, b = a.series;
                b.forEach(function (a) {
                    a.linkedSeries.length = 0
                });
                b.forEach(function (b) {
                    var f = b.options.linkedTo;
                    x(f) && (f = ":previous" === f ? a.series[b.index - 1] : a.get(f)) && f.linkedParent !== b && (f.linkedSeries.push(b), b.linkedParent = f, b.visible = z(b.options.visible, f.options.visible, b.visible))
                });
                d(this, "afterLinkSeries")
            }, renderSeries: function () {
                this.series.forEach(function (a) {
                    a.translate();
                    a.render()
                })
            }, renderLabels: function () {
                var a =
                    this, b = a.options.labels;
                b.items && b.items.forEach(function (f) {
                    var d = l(b.style, f.style), e = D(d.left) + a.plotLeft, g = D(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(f.html, e, g).attr({zIndex: 2}).css(d).add()
                })
            }, render: function () {
                var a = this.axes, b = this.renderer, f = this.options, d = 0, e, g, c;
                this.setTitle();
                this.legend = new u(this, f.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                f = this.plotWidth;
                a.some(function (a) {
                    if (a.horiz && a.visible && a.options.labels.enabled &&
                        a.series.length) return d = 21, !0
                });
                e = this.plotHeight = Math.max(this.plotHeight - d, 0);
                a.forEach(function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                g = 1.1 < f / this.plotWidth;
                c = 1.05 < e / this.plotHeight;
                if (g || c) a.forEach(function (a) {
                    (a.horiz && g || !a.horiz && c) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && a.forEach(function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }, addCredits: function (a) {
                var b = this;
                a = E(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href && (K.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }), b.styledMode || this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            },
            destroy: function () {
                var b = this, f = b.axes, e = b.series, g = b.container, c, m = g && g.parentNode;
                d(b, "destroy");
                b.renderer.forExport ? a.erase(r, b) : r[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                A(b);
                for (c = f.length; c--;) f[c] = f[c].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (c = e.length; c--;) e[c] = e[c].destroy();
                "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (a) {
                    var f =
                        b[a];
                    f && f.destroy && (b[a] = f.destroy())
                });
                g && (g.innerHTML = "", A(g), m && w(g));
                B(b, function (a, f) {
                    delete b[f]
                })
            }, firstRender: function () {
                var b = this, f = b.options;
                if (!b.isReadyToRender || b.isReadyToRender()) {
                    b.getContainer();
                    b.resetMargins();
                    b.setChartSize();
                    b.propFromSeries();
                    b.getAxes();
                    (a.isArray(f.series) ? f.series : []).forEach(function (a) {
                        b.initSeries(a)
                    });
                    b.linkSeries();
                    d(b, "beforeRender");
                    m && (b.pointer = new m(b, f));
                    b.render();
                    if (!b.renderer.imgCount && b.onload) b.onload();
                    b.temporaryDisplay(!0)
                }
            }, onload: function () {
                [this.callback].concat(this.callbacks).forEach(function (a) {
                    a &&
                    void 0 !== this.index && a.apply(this, [this])
                }, this);
                d(this, "load");
                d(this, "render");
                e(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.Chart;
        y(F, "afterSetChartSize", function (y) {
            var k = this.options.chart.scrollablePlotArea;
            (k = k && k.minWidth) && !this.renderer.forExport && (this.scrollablePixels = k = Math.max(0, k - this.chartWidth)) && (this.plotWidth += k, this.clipBox.width += k, y.skipAxes || this.axes.forEach(function (c) {
                1 === c.side ? c.getPlotLinePath = function () {
                    var k =
                        this.right, t;
                    this.right = k - c.chart.scrollablePixels;
                    t = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
                    this.right = k;
                    return t
                } : (c.setAxisSize(), c.setAxisTranslation())
            }))
        });
        y(F, "render", function () {
            this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        F.prototype.setUpScrolling = function () {
            this.scrollingContainer = a.createElement("div", {className: "highcharts-scrolling"}, {
                overflowX: "auto",
                WebkitOverflowScrolling: "touch"
            }, this.renderTo);
            this.innerContainer = a.createElement("div", {className: "highcharts-inner-container"}, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        F.prototype.applyFixed = function () {
            var y = this.container, k, c, p = !this.fixedDiv;
            p && (this.fixedDiv = a.createElement("div", {className: "highcharts-fixed"}, {
                position: "absolute",
                overflow: "hidden",
                pointerEvents: "none",
                zIndex: 2
            }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow =
                "visible", this.fixedRenderer = k = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = k.path().attr({
                fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(),
                zIndex: -1
            }).addClass("highcharts-scrollable-mask").add(), [this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ? ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title", ".highcharts-legend-checkbox"].forEach(function (a) {
                [].forEach.call(y.querySelectorAll(a),
                    function (a) {
                        (a.namespaceURI === k.SVG_NS ? k.box : k.box.parentNode).appendChild(a);
                        a.style.pointerEvents = "auto"
                    })
            }));
            this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            c = this.chartWidth + this.scrollablePixels;
            a.stop(this.container);
            this.container.style.width = c + "px";
            this.renderer.boxWrapper.attr({
                width: c,
                height: this.chartHeight,
                viewBox: [0, 0, c, this.chartHeight].join(" ")
            });
            this.chartBackground.attr({width: c});
            p && (c = this.options.chart.scrollablePlotArea, c.scrollPositionX && (this.scrollingContainer.scrollLeft =
                this.scrollablePixels * c.scrollPositionX));
            p = this.axisOffset;
            c = this.plotTop - p[0] - 1;
            var p = this.plotTop + this.plotHeight + p[2], t = this.plotLeft + this.plotWidth - this.scrollablePixels;
            this.scrollableMask.attr({d: this.scrollablePixels ? ["M", 0, c, "L", this.plotLeft - 1, c, "L", this.plotLeft - 1, p, "L", 0, p, "Z", "M", t, c, "L", this.chartWidth, c, "L", this.chartWidth, p, "L", t, p, "Z"] : ["M", 0, 0]})
        }
    })(I);
    (function (a) {
        var y, F = a.extend, G = a.erase, k = a.fireEvent, c = a.format, p = a.isArray, t = a.isNumber, v = a.pick,
            w = a.uniqueKey, r = a.defined, h = a.removeEvent;
        a.Point = y = function () {
        };
        a.Point.prototype = {
            init: function (a, c, h) {
                var d;
                d = a.chart.options.chart.colorCount;
                var e = a.chart.styledMode;
                this.series = a;
                e || (this.color = a.color);
                this.applyOptions(c, h);
                this.id = r(this.id) ? this.id : w();
                a.options.colorByPoint ? (e || (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter], d = d.length), c = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : c = a.colorIndex;
                this.colorIndex = v(this.colorIndex, c);
                a.chart.pointCount++;
                k(this, "afterInit");
                return this
            }, applyOptions: function (a, c) {
                var e = this.series, d = e.options.pointValKey || e.pointValKey;
                a = y.prototype.optionsToObject.call(this, a);
                F(this, a);
                this.options = this.options ? F(this.options, a) : a;
                a.group && delete this.group;
                a.dataLabels && delete this.dataLabels;
                d && (this.y = this[d]);
                this.isNull = v(this.isValid && !this.isValid(), null === this.x || !t(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === c && e.xAxis && e.xAxis.hasNames && (this.x = e.xAxis.nameToX(this));
                void 0 === this.x && e && (this.x =
                    void 0 === c ? e.autoIncrement(this) : c);
                return this
            }, setNestedProperty: function (e, c, h) {
                h.split(".").reduce(function (d, e, b, h) {
                    d[e] = h.length - 1 === b ? c : a.isObject(d[e], !0) ? d[e] : {};
                    return d[e]
                }, e);
                return e
            }, optionsToObject: function (e) {
                var c = {}, h = this.series, d = h.options.keys, g = d || h.pointArrayMap || ["y"], b = g.length, k = 0,
                    u = 0;
                if (t(e) || null === e) c[g[0]] = e; else if (p(e)) for (!d && e.length > b && (h = typeof e[0], "string" === h ? c.name = e[0] : "number" === h && (c.x = e[0]), k++); u < b;) d && void 0 === e[k] || (0 < g[u].indexOf(".") ? a.Point.prototype.setNestedProperty(c,
                    e[k], g[u]) : c[g[u]] = e[k]), k++, u++; else "object" === typeof e && (c = e, e.dataLabels && (h._hasPointLabels = !0), e.marker && (h._hasPointMarkers = !0));
                return c
            }, getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative",
                    "") : "")
            }, getZone: function () {
                var a = this.series, c = a.zones, a = a.zoneAxis || "y", h = 0, d;
                for (d = c[h]; this[a] >= d.value;) d = c[++h];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = d && d.color && !this.options.color ? d.color : this.nonZonedColor;
                return d
            }, destroy: function () {
                var a = this.series.chart, c = a.hoverPoints, n;
                a.pointCount--;
                c && (this.setState(), G(c, this), c.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel || this.dataLabels) h(this), this.destroyElements();
                this.legendItem && a.legend.destroyItem(this);
                for (n in this) this[n] = null
            }, destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], c, h = 6; h--;) c = a[h], this[c] && (this[c] = this[c].destroy());
                this.dataLabels && (this.dataLabels.forEach(function (a) {
                    a.element && a.destroy()
                }), delete this.dataLabels);
                this.connectors && (this.connectors.forEach(function (a) {
                    a.element && a.destroy()
                }), delete this.connectors)
            }, getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }, tooltipFormatter: function (a) {
                var e = this.series, h = e.tooltipOptions, d = v(h.valueDecimals, ""), g = h.valuePrefix || "",
                    b = h.valueSuffix || "";
                e.chart.styledMode && (a = e.chart.tooltip.styledModeFormat(a));
                (e.pointArrayMap || ["y"]).forEach(function (e) {
                    e = "{point." + e;
                    if (g || b) a = a.replace(RegExp(e + "}", "g"), g + e + "}" + b);
                    a = a.replace(RegExp(e + "}", "g"), e + ":,." + d + "f}")
                });
                return c(a,
                    {point: this, series: this.series}, e.chart.time)
            }, firePointEvent: function (a, c, h) {
                var d = this, e = this.series.options;
                (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
                "click" === a && e.allowPointSelect && (h = function (a) {
                    d.select && d.select(null, a.ctrlKey || a.metaKey || a.shiftKey)
                });
                k(this, a, c, h)
            }, visible: !0
        }
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.animObject, G = a.arrayMax, k = a.arrayMin, c = a.correctFloat, p = a.defaultOptions,
            t = a.defaultPlotOptions, v = a.defined, w = a.erase, r = a.extend,
            h = a.fireEvent, e = a.isArray, l = a.isNumber, n = a.isString, d = a.merge, g = a.objectEach, b = a.pick,
            x = a.removeEvent, u = a.splat, H = a.SVGElement, E = a.syncTimeout, B = a.win;
        a.Series = a.seriesType("line", null, {
                lineWidth: 2,
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {duration: 1E3},
                events: {},
                marker: {
                    lineWidth: 0,
                    lineColor: "#ffffff",
                    enabledThreshold: 2,
                    radius: 4,
                    states: {
                        normal: {animation: !0},
                        hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1},
                        select: {fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2}
                    }
                },
                point: {events: {}},
                dataLabels: {
                    align: "center",
                    formatter: function () {
                        return null === this.y ? "" : a.numberFormat(this.y, -1)
                    },
                    style: {fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast"},
                    verticalAlign: "bottom",
                    x: 0,
                    y: 0,
                    padding: 5
                },
                cropThreshold: 300,
                pointRange: 0,
                softThreshold: !0,
                states: {
                    normal: {animation: !0},
                    hover: {animation: {duration: 50}, lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}},
                    select: {animation: {duration: 0}}
                },
                stickyTracking: !0,
                turboThreshold: 1E3,
                findNearestPointBy: "x"
            },
            {
                isCartesian: !0,
                pointClass: a.Point,
                sorted: !0,
                requireSorting: !0,
                directTouch: !1,
                axisTypes: ["xAxis", "yAxis"],
                colorCounter: 0,
                parallelArrays: ["x", "y"],
                coll: "series",
                cropShoulder: 1,
                init: function (a, d) {
                    h(this, "init", {options: d});
                    var e = this, c, f = a.series, m;
                    e.chart = a;
                    e.options = d = e.setOptions(d);
                    e.linkedSeries = [];
                    e.bindAxes();
                    r(e, {name: d.name, state: "", visible: !1 !== d.visible, selected: !0 === d.selected});
                    c = d.events;
                    g(c, function (a, b) {
                        e.hcEvents && e.hcEvents[b] && -1 !== e.hcEvents[b].indexOf(a) || y(e, b, a)
                    });
                    if (c && c.click ||
                        d.point && d.point.events && d.point.events.click || d.allowPointSelect) a.runTrackerClick = !0;
                    e.getColor();
                    e.getSymbol();
                    e.parallelArrays.forEach(function (a) {
                        e[a + "Data"] = []
                    });
                    e.setData(d.data, !1);
                    e.isCartesian && (a.hasCartesianSeries = !0);
                    f.length && (m = f[f.length - 1]);
                    e._i = b(m && m._i, -1) + 1;
                    a.orderSeries(this.insert(f));
                    h(this, "afterInit")
                },
                insert: function (a) {
                    var d = this.options.index, e;
                    if (l(d)) {
                        for (e = a.length; e--;) if (d >= b(a[e].options.index, a[e]._i)) {
                            a.splice(e + 1, 0, this);
                            break
                        }
                        -1 === e && a.unshift(this);
                        e += 1
                    } else a.push(this);
                    return b(e, a.length - 1)
                },
                bindAxes: function () {
                    var b = this, d = b.options, e = b.chart, g;
                    h(this, "bindAxes", null, function () {
                        (b.axisTypes || []).forEach(function (f) {
                            e[f].forEach(function (a) {
                                g = a.options;
                                if (d[f] === g.index || void 0 !== d[f] && d[f] === g.id || void 0 === d[f] && 0 === g.index) b.insert(a.series), b[f] = a, a.isDirty = !0
                            });
                            b[f] || b.optionalAxis === f || a.error(18, !0, e)
                        })
                    })
                },
                updateParallelArrays: function (a, b) {
                    var d = a.series, e = arguments, f = l(b) ? function (f) {
                        var e = "y" === f && d.toYData ? d.toYData(a) : a[f];
                        d[f + "Data"][b] = e
                    } : function (a) {
                        Array.prototype[b].apply(d[a +
                        "Data"], Array.prototype.slice.call(e, 2))
                    };
                    d.parallelArrays.forEach(f)
                },
                autoIncrement: function () {
                    var a = this.options, d = this.xIncrement, e, g = a.pointIntervalUnit, f = this.chart.time,
                        d = b(d, a.pointStart, 0);
                    this.pointInterval = e = b(this.pointInterval, a.pointInterval, 1);
                    g && (a = new f.Date(d), "day" === g ? f.set("Date", a, f.get("Date", a) + e) : "month" === g ? f.set("Month", a, f.get("Month", a) + e) : "year" === g && f.set("FullYear", a, f.get("FullYear", a) + e), e = a.getTime() - d);
                    this.xIncrement = d + e;
                    return d
                },
                setOptions: function (a) {
                    var e = this.chart,
                        g = e.options, c = g.plotOptions, f = (e.userOptions || {}).plotOptions || {}, m = c[this.type],
                        l = d(a);
                    a = e.styledMode;
                    h(this, "setOptions", {userOptions: l});
                    this.userOptions = l;
                    e = d(m, c.series, l);
                    this.tooltipOptions = d(p.tooltip, p.plotOptions.series && p.plotOptions.series.tooltip, p.plotOptions[this.type].tooltip, g.tooltip.userOptions, c.series && c.series.tooltip, c[this.type].tooltip, l.tooltip);
                    this.stickyTracking = b(l.stickyTracking, f[this.type] && f[this.type].stickyTracking, f.series && f.series.stickyTracking, this.tooltipOptions.shared &&
                    !this.noSharedTooltip ? !0 : e.stickyTracking);
                    null === m.marker && delete e.marker;
                    this.zoneAxis = e.zoneAxis;
                    g = this.zones = (e.zones || []).slice();
                    !e.negativeColor && !e.negativeFillColor || e.zones || (c = {
                        value: e[this.zoneAxis + "Threshold"] || e.threshold || 0,
                        className: "highcharts-negative"
                    }, a || (c.color = e.negativeColor, c.fillColor = e.negativeFillColor), g.push(c));
                    g.length && v(g[g.length - 1].value) && g.push(a ? {} : {
                        color: this.color,
                        fillColor: this.fillColor
                    });
                    h(this, "afterSetOptions", {options: e});
                    return e
                },
                getName: function () {
                    return b(this.options.name,
                        "Series " + (this.index + 1))
                },
                getCyclic: function (a, d, e) {
                    var g, f = this.chart, c = this.userOptions, h = a + "Index", m = a + "Counter",
                        l = e ? e.length : b(f.options.chart[a + "Count"], f[a + "Count"]);
                    d || (g = b(c[h], c["_" + h]), v(g) || (f.series.length || (f[m] = 0), c["_" + h] = g = f[m] % l, f[m] += 1), e && (d = e[g]));
                    void 0 !== g && (this[h] = g);
                    this[a] = d
                },
                getColor: function () {
                    this.chart.styledMode ? this.getCyclic("color") : this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors)
                },
                getSymbol: function () {
                    this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols)
                },
                drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
                updateData: function (b) {
                    var d = this.options, e = this.points, g = [], f, c, h, m = this.requireSorting;
                    this.xIncrement = null;
                    b.forEach(function (b) {
                        var c, q, k;
                        c = a.defined(b) && this.pointClass.prototype.optionsToObject.call({series: this}, b) || {};
                        k = c.x;
                        if ((c = c.id) || l(k)) c && (q = (q = this.chart.get(c)) && q.index), void 0 === q && l(k) && (q = this.xData.indexOf(k, h)), -1 !== q && void 0 !==
                        q && this.cropped && (q = q >= this.cropStart ? q - this.cropStart : q), -1 === q || void 0 === q || e[q] && e[q].touched ? g.push(b) : b !== d.data[q] ? (e[q].update(b, !1, null, !1), e[q].touched = !0, m && (h = q + 1)) : e[q] && (e[q].touched = !0), f = !0
                    }, this);
                    if (f) for (b = e.length; b--;) c = e[b], c.touched || c.remove(!1), c.touched = !1; else if (b.length === e.length) b.forEach(function (a, b) {
                        e[b].update && a !== d.data[b] && e[b].update(a, !1, null, !1)
                    }); else return !1;
                    g.forEach(function (a) {
                        this.addPoint(a, !1)
                    }, this);
                    return !0
                },
                setData: function (d, g, c, h) {
                    var f = this, m =
                            f.points, k = m && m.length || 0, z, u = f.options, r = f.chart, D = null, x = f.xAxis,
                        A = u.turboThreshold, p = this.xData, B = this.yData, t = (z = f.pointArrayMap) && z.length,
                        v = u.keys, E = 0, w = 1, H;
                    d = d || [];
                    z = d.length;
                    g = b(g, !0);
                    !1 !== h && z && k && !f.cropped && !f.hasGroupedData && f.visible && !f.isSeriesBoosting && (H = this.updateData(d));
                    if (!H) {
                        f.xIncrement = null;
                        f.colorCounter = 0;
                        this.parallelArrays.forEach(function (a) {
                            f[a + "Data"].length = 0
                        });
                        if (A && z > A) {
                            for (c = 0; null === D && c < z;) D = d[c], c++;
                            if (l(D)) for (c = 0; c < z; c++) p[c] = this.autoIncrement(), B[c] = d[c];
                            else if (e(D)) if (t) for (c = 0; c < z; c++) D = d[c], p[c] = D[0], B[c] = D.slice(1, t + 1); else for (v && (E = v.indexOf("x"), w = v.indexOf("y"), E = 0 <= E ? E : 0, w = 0 <= w ? w : 1), c = 0; c < z; c++) D = d[c], p[c] = D[E], B[c] = D[w]; else a.error(12, !1, r)
                        } else for (c = 0; c < z; c++) void 0 !== d[c] && (D = {series: f}, f.pointClass.prototype.applyOptions.apply(D, [d[c]]), f.updateParallelArrays(D, c));
                        B && n(B[0]) && a.error(14, !0, r);
                        f.data = [];
                        f.options.data = f.userOptions.data = d;
                        for (c = k; c--;) m[c] && m[c].destroy && m[c].destroy();
                        x && (x.minRange = x.userMinRange);
                        f.isDirty = r.isDirtyBox =
                            !0;
                        f.isDirtyData = !!m;
                        c = !1
                    }
                    "point" === u.legendType && (this.processData(), this.generatePoints());
                    g && r.redraw(c)
                },
                processData: function (b) {
                    var d = this.xData, e = this.yData, c = d.length, f;
                    f = 0;
                    var g, h, m = this.xAxis, l, k = this.options;
                    l = k.cropThreshold;
                    var n = this.getExtremesFromAll || k.getExtremesFromAll, u = this.isCartesian, k = m && m.val2lin,
                        r = m && m.isLog, x = this.requireSorting, p, B;
                    if (u && !this.isDirty && !m.isDirty && !this.yAxis.isDirty && !b) return !1;
                    m && (b = m.getExtremes(), p = b.min, B = b.max);
                    u && this.sorted && !n && (!l || c > l || this.forceCrop) &&
                    (d[c - 1] < p || d[0] > B ? (d = [], e = []) : this.yData && (d[0] < p || d[c - 1] > B) && (f = this.cropData(this.xData, this.yData, p, B), d = f.xData, e = f.yData, f = f.start, g = !0));
                    for (l = d.length || 1; --l;) c = r ? k(d[l]) - k(d[l - 1]) : d[l] - d[l - 1], 0 < c && (void 0 === h || c < h) ? h = c : 0 > c && x && (a.error(15, !1, this.chart), x = !1);
                    this.cropped = g;
                    this.cropStart = f;
                    this.processedXData = d;
                    this.processedYData = e;
                    this.closestPointRange = h
                },
                cropData: function (a, d, e, c, f) {
                    var g = a.length, h = 0, m = g, l;
                    f = b(f, this.cropShoulder);
                    for (l = 0; l < g; l++) if (a[l] >= e) {
                        h = Math.max(0, l - f);
                        break
                    }
                    for (e =
                             l; e < g; e++) if (a[e] > c) {
                        m = e + f;
                        break
                    }
                    return {xData: a.slice(h, m), yData: d.slice(h, m), start: h, end: m}
                },
                generatePoints: function () {
                    var a = this.options, b = a.data, d = this.data, e, f = this.processedXData,
                        c = this.processedYData, g = this.pointClass, l = f.length, k = this.cropStart || 0, n,
                        x = this.hasGroupedData, a = a.keys, p, B = [], t;
                    d || x || (d = [], d.length = b.length, d = this.data = d);
                    a && x && (this.options.keys = !1);
                    for (t = 0; t < l; t++) n = k + t, x ? (p = (new g).init(this, [f[t]].concat(u(c[t]))), p.dataGroup = this.groupMap[t], p.dataGroup.options && (p.options =
                        p.dataGroup.options, r(p, p.dataGroup.options), delete p.dataLabels)) : (p = d[n]) || void 0 === b[n] || (d[n] = p = (new g).init(this, b[n], f[t])), p && (p.index = n, B[t] = p);
                    this.options.keys = a;
                    if (d && (l !== (e = d.length) || x)) for (t = 0; t < e; t++) t !== k || x || (t += l), d[t] && (d[t].destroyElements(), d[t].plotX = void 0);
                    this.data = d;
                    this.points = B;
                    h(this, "afterGeneratePoints")
                },
                getExtremes: function (a) {
                    var b = this.yAxis, d = this.processedXData, c, f = [], g = 0;
                    c = this.xAxis.getExtremes();
                    var m = c.min, n = c.max, u, r, x = this.requireSorting ? this.cropShoulder :
                        0, p, B;
                    a = a || this.stackedYData || this.processedYData || [];
                    c = a.length;
                    for (B = 0; B < c; B++) if (r = d[B], p = a[B], u = (l(p, !0) || e(p)) && (!b.positiveValuesOnly || p.length || 0 < p), r = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (d[B + x] || r) >= m && (d[B - x] || r) <= n, u && r) if (u = p.length) for (; u--;) "number" === typeof p[u] && (f[g++] = p[u]); else f[g++] = p;
                    this.dataMin = k(f);
                    this.dataMax = G(f);
                    h(this, "afterGetExtremes")
                },
                translate: function () {
                    this.processedXData || this.processData();
                    this.generatePoints();
                    var a = this.options,
                        d = a.stacking, e = this.xAxis, g = e.categories, f = this.yAxis, q = this.points, k = q.length,
                        n = !!this.modifyValue, u, r = this.pointPlacementToXValue(), x = l(r), p = a.threshold,
                        B = a.startFromThreshold ? p : 0, t, E, w, H, y = this.zoneAxis || "y", G = Number.MAX_VALUE;
                    for (u = 0; u < k; u++) {
                        var F = q[u], I = F.x, Q = F.y;
                        E = F.low;
                        var N = d && f.stacks[(this.negStacks && Q < (B ? 0 : p) ? "-" : "") + this.stackKey], V;
                        f.positiveValuesOnly && null !== Q && 0 >= Q && (F.isNull = !0);
                        F.plotX = t = c(Math.min(Math.max(-1E5, e.translate(I, 0, 0, 0, 1, r, "flags" === this.type)), 1E5));
                        d && this.visible &&
                        !F.isNull && N && N[I] && (H = this.getStackIndicator(H, I, this.index), V = N[I], Q = V.points[H.key], E = Q[0], Q = Q[1], E === B && H.key === N[I].base && (E = b(l(p) && p, f.min)), f.positiveValuesOnly && 0 >= E && (E = null), F.total = F.stackTotal = V.total, F.percentage = V.total && F.y / V.total * 100, F.stackY = Q, V.setOffset(this.pointXOffset || 0, this.barW || 0));
                        F.yBottom = v(E) ? Math.min(Math.max(-1E5, f.translate(E, 0, 1, 0, 1)), 1E5) : null;
                        n && (Q = this.modifyValue(Q, F));
                        F.plotY = E = "number" === typeof Q && Infinity !== Q ? Math.min(Math.max(-1E5, f.translate(Q, 0, 1, 0, 1)),
                            1E5) : void 0;
                        F.isInside = void 0 !== E && 0 <= E && E <= f.len && 0 <= t && t <= e.len;
                        F.clientX = x ? c(e.translate(I, 0, 0, 0, 1, r)) : t;
                        F.negative = F[y] < (a[y + "Threshold"] || p || 0);
                        F.category = g && void 0 !== g[F.x] ? g[F.x] : F.x;
                        F.isNull || (void 0 !== w && (G = Math.min(G, Math.abs(t - w))), w = t);
                        F.zone = this.zones.length && F.getZone()
                    }
                    this.closestPointRangePx = G;
                    h(this, "afterTranslate")
                },
                getValidPoints: function (a, b, d) {
                    var e = this.chart;
                    return (a || this.points || []).filter(function (a) {
                        return b && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : d || !a.isNull
                    })
                },
                setClip: function (a) {
                    var b = this.chart, d = this.options, e = b.renderer, f = b.inverted, c = this.clipBox,
                        g = c || b.clipBox,
                        h = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, g.height, d.xAxis, d.yAxis].join(),
                        m = b[h], l = b[h + "m"];
                    m || (a && (g.width = 0, f && (g.x = b.plotSizeX), b[h + "m"] = l = e.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[h] = m = e.clipRect(g), m.count = {length: 0});
                    a && !m.count[this.index] && (m.count[this.index] = !0, m.count.length += 1);
                    !1 !== d.clip && (this.group.clip(a ||
                    c ? m : b.clipRect), this.markerGroup.clip(l), this.sharedClipKey = h);
                    a || (m.count[this.index] && (delete m.count[this.index], --m.count.length), 0 === m.count.length && h && b[h] && (c || (b[h] = b[h].destroy()), b[h + "m"] && (b[h + "m"] = b[h + "m"].destroy())))
                },
                animate: function (a) {
                    var b = this.chart, d = F(this.options.animation), e;
                    a ? this.setClip(d) : (e = this.sharedClipKey, (a = b[e]) && a.animate({
                        width: b.plotSizeX,
                        x: 0
                    }, d), b[e + "m"] && b[e + "m"].animate({width: b.plotSizeX + 99, x: 0}, d), this.animate = null)
                },
                afterAnimate: function () {
                    this.setClip();
                    h(this, "afterAnimate");
                    this.finishedAnimating = !0
                },
                drawPoints: function () {
                    var a = this.points, d = this.chart, e, c, f, g, h = this.options.marker, l, k, n,
                        u = this[this.specialGroup] || this.markerGroup;
                    e = this.xAxis;
                    var r,
                        x = b(h.enabled, !e || e.isRadial ? !0 : null, this.closestPointRangePx >= h.enabledThreshold * h.radius);
                    if (!1 !== h.enabled || this._hasPointMarkers) for (e = 0; e < a.length; e++) c = a[e], g = c.graphic, l = c.marker || {}, k = !!c.marker, f = x && void 0 === l.enabled || l.enabled, n = !1 !== c.isInside, f && !c.isNull ? (f = b(l.symbol, this.symbol), r = this.markerAttribs(c,
                        c.selected && "select"), g ? g[n ? "show" : "hide"](!0).animate(r) : n && (0 < r.width || c.hasImage) && (c.graphic = g = d.renderer.symbol(f, r.x, r.y, r.width, r.height, k ? l : h).add(u)), g && !d.styledMode && g.attr(this.pointAttribs(c, c.selected && "select")), g && g.addClass(c.getClassName(), !0)) : g && (c.graphic = g.destroy())
                },
                markerAttribs: function (a, d) {
                    var e = this.options.marker, c = a.marker || {}, f = c.symbol || e.symbol,
                        g = b(c.radius, e.radius);
                    d && (e = e.states[d], d = c.states && c.states[d], g = b(d && d.radius, e && e.radius, g + (e && e.radiusPlus || 0)));
                    a.hasImage =
                        f && 0 === f.indexOf("url");
                    a.hasImage && (g = 0);
                    a = {x: Math.floor(a.plotX) - g, y: a.plotY - g};
                    g && (a.width = a.height = 2 * g);
                    return a
                },
                pointAttribs: function (a, d) {
                    var e = this.options.marker, c = a && a.options, f = c && c.marker || {}, g = this.color,
                        h = c && c.color, m = a && a.color, c = b(f.lineWidth, e.lineWidth);
                    a = a && a.zone && a.zone.color;
                    g = h || a || m || g;
                    a = f.fillColor || e.fillColor || g;
                    g = f.lineColor || e.lineColor || g;
                    d && (e = e.states[d], d = f.states && f.states[d] || {}, c = b(d.lineWidth, e.lineWidth, c + b(d.lineWidthPlus, e.lineWidthPlus, 0)), a = d.fillColor || e.fillColor ||
                        a, g = d.lineColor || e.lineColor || g);
                    return {stroke: g, "stroke-width": c, fill: a}
                },
                destroy: function (b) {
                    var d = this, e = d.chart, c = /AppleWebKit\/533/.test(B.navigator.userAgent), f, m,
                        l = d.data || [], k, n;
                    h(d, "destroy");
                    b || x(d);
                    (d.axisTypes || []).forEach(function (a) {
                        (n = d[a]) && n.series && (w(n.series, d), n.isDirty = n.forceRedraw = !0)
                    });
                    d.legendItem && d.chart.legend.destroyItem(d);
                    for (m = l.length; m--;) (k = l[m]) && k.destroy && k.destroy();
                    d.points = null;
                    a.clearTimeout(d.animationTimeout);
                    g(d, function (a, b) {
                        a instanceof H && !a.survive &&
                        (f = c && "group" === b ? "hide" : "destroy", a[f]())
                    });
                    e.hoverSeries === d && (e.hoverSeries = null);
                    w(e.series, d);
                    e.orderSeries();
                    g(d, function (a, f) {
                        b && "hcEvents" === f || delete d[f]
                    })
                },
                getGraphPath: function (a, b, d) {
                    var e = this, f = e.options, c = f.step, g, h = [], m = [], l;
                    a = a || e.points;
                    (g = a.reversed) && a.reverse();
                    (c = {right: 1, center: 2}[c] || c && 3) && g && (c = 4 - c);
                    !f.connectNulls || b || d || (a = this.getValidPoints(a));
                    a.forEach(function (g, q) {
                        var k = g.plotX, n = g.plotY, u = a[q - 1];
                        (g.leftCliff || u && u.rightCliff) && !d && (l = !0);
                        g.isNull && !v(b) && 0 < q ? l =
                            !f.connectNulls : g.isNull && !b ? l = !0 : (0 === q || l ? q = ["M", g.plotX, g.plotY] : e.getPointSpline ? q = e.getPointSpline(a, g, q) : c ? (q = 1 === c ? ["L", u.plotX, n] : 2 === c ? ["L", (u.plotX + k) / 2, u.plotY, "L", (u.plotX + k) / 2, n] : ["L", k, u.plotY], q.push("L", k, n)) : q = ["L", k, n], m.push(g.x), c && (m.push(g.x), 2 === c && m.push(g.x)), h.push.apply(h, q), l = !1)
                    });
                    h.xMap = m;
                    return e.graphPath = h
                },
                drawGraph: function () {
                    var a = this, b = this.options, d = (this.gappedPath || this.getGraphPath).call(this),
                        e = this.chart.styledMode, f = [["graph", "highcharts-graph"]];
                    e || f[0].push(b.lineColor ||
                        this.color, b.dashStyle);
                    f = a.getZonesGraphs(f);
                    f.forEach(function (f, c) {
                        var g = f[0], h = a[g];
                        h ? (h.endX = a.preventGraphAnimation ? null : d.xMap, h.animate({d: d})) : d.length && (a[g] = a.chart.renderer.path(d).addClass(f[1]).attr({zIndex: 1}).add(a.group), e || (h = {
                            stroke: f[2],
                            "stroke-width": b.lineWidth,
                            fill: a.fillGraph && a.color || "none"
                        }, f[3] ? h.dashstyle = f[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), h = a[g].attr(h).shadow(2 > c && b.shadow)));
                        h && (h.startX = d.xMap, h.isArea = d.isArea)
                    })
                },
                getZonesGraphs: function (a) {
                    this.zones.forEach(function (b,
                                                 d) {
                        d = ["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (b.className || "")];
                        this.chart.styledMode || d.push(b.color || this.color, b.dashStyle || this.options.dashStyle);
                        a.push(d)
                    }, this);
                    return a
                },
                applyZones: function () {
                    var a = this, d = this.chart, e = d.renderer, c = this.zones, f, g, h = this.clips || [], l,
                        k = this.graph, n = this.area, u = Math.max(d.chartWidth, d.chartHeight),
                        r = this[(this.zoneAxis || "y") + "Axis"], x, p, B = d.inverted, t, v, E, w, H = !1;
                    c.length && (k || n) && r && void 0 !== r.min && (p = r.reversed, t = r.horiz, k && !this.showLine &&
                    k.hide(), n && n.hide(), x = r.getExtremes(), c.forEach(function (c, m) {
                        f = p ? t ? d.plotWidth : 0 : t ? 0 : r.toPixels(x.min) || 0;
                        f = Math.min(Math.max(b(g, f), 0), u);
                        g = Math.min(Math.max(Math.round(r.toPixels(b(c.value, x.max), !0) || 0), 0), u);
                        H && (f = g = r.toPixels(x.max));
                        v = Math.abs(f - g);
                        E = Math.min(f, g);
                        w = Math.max(f, g);
                        r.isXAxis ? (l = {
                            x: B ? w : E,
                            y: 0,
                            width: v,
                            height: u
                        }, t || (l.x = d.plotHeight - l.x)) : (l = {
                            x: 0,
                            y: B ? w : E,
                            width: u,
                            height: v
                        }, t && (l.y = d.plotWidth - l.y));
                        B && e.isVML && (l = r.isXAxis ? {x: 0, y: p ? E : w, height: l.width, width: d.chartWidth} : {
                            x: l.y - d.plotLeft -
                            d.spacingBox.x, y: 0, width: l.height, height: d.chartHeight
                        });
                        h[m] ? h[m].animate(l) : (h[m] = e.clipRect(l), k && a["zone-graph-" + m].clip(h[m]), n && a["zone-area-" + m].clip(h[m]));
                        H = c.value > x.max;
                        a.resetZones && 0 === g && (g = void 0)
                    }), this.clips = h)
                },
                invertGroups: function (a) {
                    function b() {
                        ["group", "markerGroup"].forEach(function (b) {
                            d[b] && (e.renderer.isVML && d[b].attr({
                                width: d.yAxis.len,
                                height: d.xAxis.len
                            }), d[b].width = d.yAxis.len, d[b].height = d.xAxis.len, d[b].invert(a))
                        })
                    }

                    var d = this, e = d.chart, f;
                    d.xAxis && (f = y(e, "resize", b),
                        y(d, "destroy", f), b(a), d.invertGroups = b)
                },
                plotGroup: function (a, b, d, e, f) {
                    var c = this[a], g = !c;
                    g && (this[a] = c = this.chart.renderer.g().attr({zIndex: e || .1}).add(f));
                    c.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (v(this.colorIndex) ? "highcharts-color-" + this.colorIndex + " " : "") + (this.options.className || "") + (c.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                    c.attr({visibility: d})[g ? "attr" : "animate"](this.getPlotBox());
                    return c
                },
                getPlotBox: function () {
                    var a =
                        this.chart, b = this.xAxis, d = this.yAxis;
                    a.inverted && (b = d, d = this.xAxis);
                    return {
                        translateX: b ? b.left : a.plotLeft,
                        translateY: d ? d.top : a.plotTop,
                        scaleX: 1,
                        scaleY: 1
                    }
                },
                render: function () {
                    var a = this, b = a.chart, d, e = a.options,
                        f = !!a.animate && b.renderer.isSVG && F(e.animation).duration,
                        c = a.visible ? "inherit" : "hidden", g = e.zIndex, l = a.hasRendered, k = b.seriesGroup,
                        n = b.inverted;
                    h(this, "render");
                    d = a.plotGroup("group", "series", c, g, k);
                    a.markerGroup = a.plotGroup("markerGroup", "markers", c, g, k);
                    f && a.animate(!0);
                    d.inverted = a.isCartesian ?
                        n : !1;
                    a.drawGraph && (a.drawGraph(), a.applyZones());
                    a.drawDataLabels && a.drawDataLabels();
                    a.visible && a.drawPoints();
                    a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                    a.invertGroups(n);
                    !1 === e.clip || a.sharedClipKey || l || d.clip(b.clipRect);
                    f && a.animate();
                    l || (a.animationTimeout = E(function () {
                        a.afterAnimate()
                    }, f));
                    a.isDirty = !1;
                    a.hasRendered = !0;
                    h(a, "afterRender")
                },
                redraw: function () {
                    var a = this.chart, d = this.isDirty || this.isDirtyData, e = this.group, c = this.xAxis,
                        f = this.yAxis;
                    e && (a.inverted && e.attr({
                        width: a.plotWidth,
                        height: a.plotHeight
                    }), e.animate({translateX: b(c && c.left, a.plotLeft), translateY: b(f && f.top, a.plotTop)}));
                    this.translate();
                    this.render();
                    d && delete this.kdTree
                },
                kdAxisArray: ["clientX", "plotY"],
                searchPoint: function (a, b) {
                    var d = this.xAxis, e = this.yAxis, f = this.chart.inverted;
                    return this.searchKDTree({
                        clientX: f ? d.len - a.chartY + d.pos : a.chartX - d.pos,
                        plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos
                    }, b, a)
                },
                buildKDTree: function (a) {
                    function b(a, e, c) {
                        var f, g;
                        if (g = a && a.length) return f = d.kdAxisArray[e % c], a.sort(function (a,
                                                                                                 b) {
                            return a[f] - b[f]
                        }), g = Math.floor(g / 2), {
                            point: a[g],
                            left: b(a.slice(0, g), e + 1, c),
                            right: b(a.slice(g + 1), e + 1, c)
                        }
                    }

                    this.buildingKdTree = !0;
                    var d = this, e = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    delete d.kdTree;
                    E(function () {
                        d.kdTree = b(d.getValidPoints(null, !d.directTouch), e, e);
                        d.buildingKdTree = !1
                    }, d.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
                },
                searchKDTree: function (a, b, d) {
                    function e(a, b, d, m) {
                        var l = b.point, k = f.kdAxisArray[d % m], q, n, u = l;
                        n = v(a[c]) && v(l[c]) ? Math.pow(a[c] - l[c], 2) : null;
                        q = v(a[g]) && v(l[g]) ?
                            Math.pow(a[g] - l[g], 2) : null;
                        q = (n || 0) + (q || 0);
                        l.dist = v(q) ? Math.sqrt(q) : Number.MAX_VALUE;
                        l.distX = v(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                        k = a[k] - l[k];
                        q = 0 > k ? "left" : "right";
                        n = 0 > k ? "right" : "left";
                        b[q] && (q = e(a, b[q], d + 1, m), u = q[h] < u[h] ? q : l);
                        b[n] && Math.sqrt(k * k) < u[h] && (a = e(a, b[n], d + 1, m), u = a[h] < u[h] ? a : u);
                        return u
                    }

                    var f = this, c = this.kdAxisArray[0], g = this.kdAxisArray[1], h = b ? "distX" : "dist";
                    b = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                    this.kdTree || this.buildingKdTree || this.buildKDTree(d);
                    if (this.kdTree) return e(a,
                        this.kdTree, b, b)
                },
                pointPlacementToXValue: function () {
                    var a = this.options.pointPlacement;
                    "between" === a && (a = .5);
                    l(a) && (a *= b(this.options.pointRange || this.xAxis.pointRange));
                    return a
                }
            })
    })(I);
    (function (a) {
        var y = a.Axis, F = a.Chart, G = a.correctFloat, k = a.defined, c = a.destroyObjectProperties, p = a.format,
            t = a.objectEach, v = a.pick, w = a.Series;
        a.StackItem = function (a, c, e, l, k) {
            var d = a.chart.inverted;
            this.axis = a;
            this.isNegative = e;
            this.options = c;
            this.x = l;
            this.total = null;
            this.points = {};
            this.stack = k;
            this.rightCliff = this.leftCliff =
                0;
            this.alignOptions = {
                align: c.align || (d ? e ? "left" : "right" : "center"),
                verticalAlign: c.verticalAlign || (d ? "middle" : e ? "bottom" : "top"),
                y: v(c.y, d ? 4 : e ? 14 : -6),
                x: v(c.x, d ? e ? -6 : 6 : 0)
            };
            this.textAlign = c.textAlign || (d ? e ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function () {
                c(this, this.axis)
            }, render: function (a) {
                var c = this.axis.chart, e = this.options, l = e.format,
                    l = l ? p(l, this, c.time) : e.formatter.call(this);
                this.label ? this.label.attr({
                    text: l,
                    visibility: "hidden"
                }) : this.label = c.renderer.text(l, null, null, e.useHTML).css(e.style).attr({
                    align: this.textAlign,
                    rotation: e.rotation, visibility: "hidden"
                }).add(a);
                this.label.labelrank = c.plotHeight
            }, setOffset: function (a, c) {
                var e = this.axis, h = e.chart, n = e.translate(e.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    d = e.translate(0), d = k(n) && Math.abs(n - d);
                a = h.xAxis[0].translate(this.x) + a;
                e = k(n) && this.getStackBox(h, this, a, n, c, d, e);
                (c = this.label) && e && (c.align(this.alignOptions, null, e), e = c.alignAttr, c[!1 === this.options.crop || h.isInsidePlot(e.x, e.y) ? "show" : "hide"](!0))
            }, getStackBox: function (a, c, e, l, k, d, g) {
                var b = c.axis.reversed, h =
                    a.inverted;
                a = g.height + g.pos - (h ? a.plotLeft : a.plotTop);
                c = c.isNegative && !b || !c.isNegative && b;
                return {
                    x: h ? c ? l : l - d : e,
                    y: h ? a - e - k : c ? a - l - d : a - l,
                    width: h ? d : k,
                    height: h ? k : d
                }
            }
        };
        F.prototype.getStacks = function () {
            var a = this;
            a.yAxis.forEach(function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            a.series.forEach(function (c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + v(c.options.stack, ""))
            })
        };
        y.prototype.buildStacks = function () {
            var a = this.series, c = v(this.options.reversedStacks,
                !0), e = a.length, l;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (l = e; l--;) a[c ? l : e - l - 1].setStackedPoints();
                for (l = 0; l < e; l++) a[l].modifyStacks()
            }
        };
        y.prototype.renderStackTotals = function () {
            var a = this.chart, c = a.renderer, e = this.stacks, l = this.stackTotalGroup;
            l || (this.stackTotalGroup = l = c.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
            l.translate(a.plotLeft, a.plotTop);
            t(e, function (a) {
                t(a, function (a) {
                    a.render(l)
                })
            })
        };
        y.prototype.resetStacks = function () {
            var a = this, c = a.stacks;
            a.isXAxis || t(c, function (e) {
                t(e,
                    function (c, h) {
                        c.touched < a.stacksTouched ? (c.destroy(), delete e[h]) : (c.total = null, c.cumulative = null)
                    })
            })
        };
        y.prototype.cleanStacks = function () {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), t(a, function (a) {
                t(a, function (a) {
                    a.cumulative = a.total
                })
            }))
        };
        w.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var c = this.processedXData, h = this.processedYData, e = [], l = h.length, n = this.options,
                    d = n.threshold, g = v(n.startFromThreshold &&
                    d, 0), b = n.stack, n = n.stacking, x = this.stackKey, u = "-" + x, p = this.negStacks,
                    t = this.yAxis, B = t.stacks, m = t.oldStacks, z, D, A, f, q, w, y;
                t.stacksTouched += 1;
                for (q = 0; q < l; q++) w = c[q], y = h[q], z = this.getStackIndicator(z, w, this.index), f = z.key, A = (D = p && y < (g ? 0 : d)) ? u : x, B[A] || (B[A] = {}), B[A][w] || (m[A] && m[A][w] ? (B[A][w] = m[A][w], B[A][w].total = null) : B[A][w] = new a.StackItem(t, t.options.stackLabels, D, w, b)), A = B[A][w], null !== y ? (A.points[f] = A.points[this.index] = [v(A.cumulative, g)], k(A.cumulative) || (A.base = f), A.touched = t.stacksTouched,
                0 < z.index && !1 === this.singleStacks && (A.points[f][0] = A.points[this.index + "," + w + ",0"][0])) : A.points[f] = A.points[this.index] = null, "percent" === n ? (D = D ? x : u, p && B[D] && B[D][w] ? (D = B[D][w], A.total = D.total = Math.max(D.total, A.total) + Math.abs(y) || 0) : A.total = G(A.total + (Math.abs(y) || 0))) : A.total = G(A.total + (y || 0)), A.cumulative = v(A.cumulative, g) + (y || 0), null !== y && (A.points[f].push(A.cumulative), e[q] = A.cumulative);
                "percent" === n && (t.usePercentage = !0);
                this.stackedYData = e;
                t.oldStacks = {}
            }
        };
        w.prototype.modifyStacks = function () {
            var a =
                this, c = a.stackKey, e = a.yAxis.stacks, l = a.processedXData, k, d = a.options.stacking;
            a[d + "Stacker"] && [c, "-" + c].forEach(function (c) {
                for (var b = l.length, g, h; b--;) if (g = l[b], k = a.getStackIndicator(k, g, a.index, c), h = (g = e[c] && e[c][g]) && g.points[k.key]) a[d + "Stacker"](h, g, b)
            })
        };
        w.prototype.percentStacker = function (a, c, e) {
            c = c.total ? 100 / c.total : 0;
            a[0] = G(a[0] * c);
            a[1] = G(a[1] * c);
            this.stackedYData[e] = a[1]
        };
        w.prototype.getStackIndicator = function (a, c, e, l) {
            !k(a) || a.x !== c || l && a.key !== l ? a = {x: c, index: 0, key: l} : a.index++;
            a.key = [e,
                c, a.index].join();
            return a
        }
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.animate, G = a.Axis, k = a.Chart, c = a.createElement, p = a.css, t = a.defined,
            v = a.erase, w = a.extend, r = a.fireEvent, h = a.isNumber, e = a.isObject, l = a.isArray, n = a.merge,
            d = a.objectEach, g = a.pick, b = a.Point, x = a.Series, u = a.seriesTypes, H = a.setAnimation, E = a.splat;
        a.cleanRecursively = function (b, c) {
            var g = {};
            d(b, function (d, h) {
                if (e(b[h], !0) && c[h]) d = a.cleanRecursively(b[h], c[h]), Object.keys(d).length && (g[h] = d); else if (e(b[h]) || b[h] !== c[h]) g[h] = b[h]
            });
            return g
        };
        w(k.prototype,
            {
                addSeries: function (a, b, d) {
                    var e, c = this;
                    a && (b = g(b, !0), r(c, "addSeries", {options: a}, function () {
                        e = c.initSeries(a);
                        c.isDirtyLegend = !0;
                        c.linkSeries();
                        r(c, "afterAddSeries");
                        b && c.redraw(d)
                    }));
                    return e
                },
                addAxis: function (a, b, d, e) {
                    var c = b ? "xAxis" : "yAxis", f = this.options;
                    a = n(a, {index: this[c].length, isX: b});
                    b = new G(this, a);
                    f[c] = E(f[c] || {});
                    f[c].push(a);
                    g(d, !0) && this.redraw(e);
                    return b
                },
                showLoading: function (a) {
                    var b = this, d = b.options, e = b.loadingDiv, g = d.loading, f = function () {
                        e && p(e, {
                            left: b.plotLeft + "px", top: b.plotTop +
                            "px", width: b.plotWidth + "px", height: b.plotHeight + "px"
                        })
                    };
                    e || (b.loadingDiv = e = c("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, b.container), b.loadingSpan = c("span", {className: "highcharts-loading-inner"}, null, e), y(b, "redraw", f));
                    e.className = "highcharts-loading";
                    b.loadingSpan.innerHTML = a || d.lang.loading;
                    b.styledMode || (p(e, w(g.style, {zIndex: 10})), p(b.loadingSpan, g.labelStyle), b.loadingShown || (p(e, {
                        opacity: 0,
                        display: ""
                    }), F(e, {opacity: g.style.opacity || .5}, {duration: g.showDuration || 0})));
                    b.loadingShown = !0;
                    f()
                },
                hideLoading: function () {
                    var a = this.options, b = this.loadingDiv;
                    b && (b.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || F(b, {opacity: 0}, {
                        duration: a.loading.hideDuration || 100,
                        complete: function () {
                            p(b, {display: "none"})
                        }
                    }));
                    this.loadingShown = !1
                },
                propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
                propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
                collectionsWithUpdate: "xAxis yAxis zAxis series colorAxis pane".split(" "),
                update: function (b, e, c, l) {
                    var m = this, f = {credits: "addCredits", title: "setTitle", subtitle: "setSubtitle"}, k, u, p,
                        x = [];
                    r(m, "update", {options: b});
                    b.isResponsiveOptions || m.setResponsive(!1, !0);
                    b = a.cleanRecursively(b, m.options);
                    if (k = b.chart) {
                        n(!0, m.options.chart, k);
                        "className" in k && m.setClassName(k.className);
                        "reflow" in k && m.setReflow(k.reflow);
                        if ("inverted" in k || "polar" in k || "type" in k) m.propFromSeries(), u = !0;
                        "alignTicks" in k && (u = !0);
                        d(k, function (a, b) {
                            -1 !== m.propsRequireUpdateSeries.indexOf("chart." + b) && (p = !0);
                            -1 !== m.propsRequireDirtyBox.indexOf(b) && (m.isDirtyBox = !0)
                        });
                        !m.styledMode && "style" in k && m.renderer.setStyle(k.style)
                    }
                    !m.styledMode && b.colors && (this.options.colors = b.colors);
                    b.plotOptions && n(!0, this.options.plotOptions, b.plotOptions);
                    d(b, function (a, b) {
                        if (m[b] && "function" === typeof m[b].update) m[b].update(a,
                            !1); else if ("function" === typeof m[f[b]]) m[f[b]](a);
                        "chart" !== b && -1 !== m.propsRequireUpdateSeries.indexOf(b) && (p = !0)
                    });
                    this.collectionsWithUpdate.forEach(function (a) {
                        var d;
                        b[a] && ("series" === a && (d = [], m[a].forEach(function (a, b) {
                            a.options.isInternal || d.push(g(a.options.index, b))
                        })), E(b[a]).forEach(function (b, f) {
                            (f = t(b.id) && m.get(b.id) || m[a][d ? d[f] : f]) && f.coll === a && (f.update(b, !1), c && (f.touched = !0));
                            if (!f && c) if ("series" === a) m.addSeries(b, !1).touched = !0; else if ("xAxis" === a || "yAxis" === a) m.addAxis(b, "xAxis" ===
                                a, !1).touched = !0
                        }), c && m[a].forEach(function (a) {
                            a.touched || a.options.isInternal ? delete a.touched : x.push(a)
                        }))
                    });
                    x.forEach(function (a) {
                        a.remove && a.remove(!1)
                    });
                    u && m.axes.forEach(function (a) {
                        a.update({}, !1)
                    });
                    p && m.series.forEach(function (a) {
                        a.update({}, !1)
                    });
                    b.loading && n(!0, m.options.loading, b.loading);
                    u = k && k.width;
                    k = k && k.height;
                    h(u) && u !== m.chartWidth || h(k) && k !== m.chartHeight ? m.setSize(u, k, l) : g(e, !0) && m.redraw(l);
                    r(m, "afterUpdate", {options: b})
                },
                setSubtitle: function (a) {
                    this.setTitle(void 0, a)
                }
            });
        w(b.prototype,
            {
                update: function (a, b, d, c) {
                    function h() {
                        f.applyOptions(a);
                        null === f.y && l && (f.graphic = l.destroy());
                        e(a, !0) && (l && l.element && a && a.marker && void 0 !== a.marker.symbol && (f.graphic = l.destroy()), a && a.dataLabels && f.dataLabel && (f.dataLabel = f.dataLabel.destroy()), f.connector && (f.connector = f.connector.destroy()));
                        k = f.index;
                        m.updateParallelArrays(f, k);
                        u.data[k] = e(u.data[k], !0) || e(a, !0) ? f.options : g(a, u.data[k]);
                        m.isDirty = m.isDirtyData = !0;
                        !m.fixedBox && m.hasCartesianSeries && (n.isDirtyBox = !0);
                        "point" === u.legendType &&
                        (n.isDirtyLegend = !0);
                        b && n.redraw(d)
                    }

                    var f = this, m = f.series, l = f.graphic, k, n = m.chart, u = m.options;
                    b = g(b, !0);
                    !1 === c ? h() : f.firePointEvent("update", {options: a}, h)
                }, remove: function (a, b) {
                this.series.removePoint(this.series.data.indexOf(this), a, b)
            }
            });
        w(x.prototype, {
            addPoint: function (a, b, d, e) {
                var c = this.options, f = this.data, h = this.chart, m = this.xAxis, m = m && m.hasNames && m.names,
                    l = c.data, k, n, u = this.xData, p, r;
                b = g(b, !0);
                k = {series: this};
                this.pointClass.prototype.applyOptions.apply(k, [a]);
                r = k.x;
                p = u.length;
                if (this.requireSorting &&
                    r < u[p - 1]) for (n = !0; p && u[p - 1] > r;) p--;
                this.updateParallelArrays(k, "splice", p, 0, 0);
                this.updateParallelArrays(k, p);
                m && k.name && (m[r] = k.name);
                l.splice(p, 0, a);
                n && (this.data.splice(p, 0, null), this.processData());
                "point" === c.legendType && this.generatePoints();
                d && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), this.updateParallelArrays(k, "shift"), l.shift()));
                this.isDirtyData = this.isDirty = !0;
                b && h.redraw(e)
            }, removePoint: function (a, b, d) {
                var e = this, c = e.data, f = c[a], h = e.points, m = e.chart, l = function () {
                    h && h.length === c.length &&
                    h.splice(a, 1);
                    c.splice(a, 1);
                    e.options.data.splice(a, 1);
                    e.updateParallelArrays(f || {series: e}, "splice", a, 1);
                    f && f.destroy();
                    e.isDirty = !0;
                    e.isDirtyData = !0;
                    b && m.redraw()
                };
                H(d, m);
                b = g(b, !0);
                f ? f.firePointEvent("remove", null, l) : l()
            }, remove: function (a, b, d, e) {
                function c() {
                    f.destroy(e);
                    f.remove = null;
                    h.isDirtyLegend = h.isDirtyBox = !0;
                    h.linkSeries();
                    g(a, !0) && h.redraw(b)
                }

                var f = this, h = f.chart;
                !1 !== d ? r(f, "remove", null, c) : c()
            }, update: function (b, d) {
                b = a.cleanRecursively(b, this.userOptions);
                var e = this, c = e.chart, h = e.userOptions,
                    f = e.initialType || e.type, m = b.type || h.type || c.options.chart.type, l = u[f].prototype, k,
                    p = ["group", "markerGroup", "dataLabelsGroup"], x = ["navigatorSeries", "baseSeries"],
                    t = e.finishedAnimating && {animation: !1}, v = ["data", "name", "turboThreshold"],
                    B = Object.keys(b), E = 0 < B.length;
                B.forEach(function (a) {
                    -1 === v.indexOf(a) && (E = !1)
                });
                if (E) b.data && this.setData(b.data, !1), b.name && this.setName(b.name, !1); else {
                    x = p.concat(x);
                    x.forEach(function (a) {
                        x[a] = e[a];
                        delete e[a]
                    });
                    b = n(h, t, {index: e.index, pointStart: g(h.pointStart, e.xData[0])},
                        {data: e.options.data}, b);
                    e.remove(!1, null, !1, !0);
                    for (k in l) e[k] = void 0;
                    u[m || f] ? w(e, u[m || f].prototype) : a.error(17, !0, c);
                    x.forEach(function (a) {
                        e[a] = x[a]
                    });
                    e.init(c, b);
                    b.zIndex !== h.zIndex && p.forEach(function (a) {
                        e[a] && e[a].attr({zIndex: b.zIndex})
                    });
                    e.initialType = f;
                    c.linkSeries()
                }
                r(this, "afterUpdate");
                g(d, !0) && c.redraw(E ? void 0 : !1)
            }, setName: function (a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        w(G.prototype, {
            update: function (a, b) {
                var e = this.chart, c = a && a.events ||
                    {};
                a = n(this.userOptions, a);
                e.options[this.coll].indexOf && (e.options[this.coll][e.options[this.coll].indexOf(this.userOptions)] = a);
                d(e.options[this.coll].events, function (a, b) {
                    "undefined" === typeof c[b] && (c[b] = void 0)
                });
                this.destroy(!0);
                this.init(e, w(a, {events: c}));
                e.isDirtyBox = !0;
                g(b, !0) && e.redraw()
            }, remove: function (a) {
                for (var b = this.chart, d = this.coll, e = this.series, c = e.length; c--;) e[c] && e[c].remove(!1);
                v(b.axes, this);
                v(b[d], this);
                l(b.options[d]) ? b.options[d].splice(this.options.index, 1) : delete b.options[d];
                b[d].forEach(function (a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                b.isDirtyBox = !0;
                g(a, !0) && b.redraw()
            }, setTitle: function (a, b) {
                this.update({title: a}, b)
            }, setCategories: function (a, b) {
                this.update({categories: a}, b)
            }
        })
    })(I);
    (function (a) {
        var y = a.color, F = a.pick, G = a.Series, k = a.seriesType;
        k("area", "line", {softThreshold: !1, threshold: 0}, {
            singleStacks: !1, getStackPoints: function (c) {
                var k = [], t = [], v = this.xAxis, w = this.yAxis, r = w.stacks[this.stackKey], h = {}, e = this.index,
                    l = w.series, n = l.length, d, g = F(w.options.reversedStacks,
                    !0) ? 1 : -1, b;
                c = c || this.points;
                if (this.options.stacking) {
                    for (b = 0; b < c.length; b++) c[b].leftNull = c[b].rightNull = null, h[c[b].x] = c[b];
                    a.objectEach(r, function (a, b) {
                        null !== a.total && t.push(b)
                    });
                    t.sort(function (a, b) {
                        return a - b
                    });
                    d = l.map(function (a) {
                        return a.visible
                    });
                    t.forEach(function (a, c) {
                        var l = 0, u, p;
                        if (h[a] && !h[a].isNull) k.push(h[a]), [-1, 1].forEach(function (l) {
                            var k = 1 === l ? "rightNull" : "leftNull", m = 0, x = r[t[c + l]];
                            if (x) for (b = e; 0 <= b && b < n;) u = x.points[b], u || (b === e ? h[a][k] = !0 : d[b] && (p = r[a].points[b]) && (m -= p[1] - p[0])),
                                b += g;
                            h[a][1 === l ? "rightCliff" : "leftCliff"] = m
                        }); else {
                            for (b = e; 0 <= b && b < n;) {
                                if (u = r[a].points[b]) {
                                    l = u[1];
                                    break
                                }
                                b += g
                            }
                            l = w.translate(l, 0, 1, 0, 1);
                            k.push({isNull: !0, plotX: v.translate(a, 0, 0, 0, 1), x: a, plotY: l, yBottom: l})
                        }
                    })
                }
                return k
            }, getGraphPath: function (a) {
                var c = G.prototype.getGraphPath, k = this.options, v = k.stacking, w = this.yAxis, r, h, e = [],
                    l = [], n = this.index, d, g = w.stacks[this.stackKey], b = k.threshold,
                    x = w.getThreshold(k.threshold), u, k = k.connectNulls || "percent" === v, H = function (c, h, k) {
                        var m = a[c];
                        c = v && g[m.x].points[n];
                        var u =
                            m[k + "Null"] || 0;
                        k = m[k + "Cliff"] || 0;
                        var p, f, m = !0;
                        k || u ? (p = (u ? c[0] : c[1]) + k, f = c[0] + k, m = !!u) : !v && a[h] && a[h].isNull && (p = f = b);
                        void 0 !== p && (l.push({
                            plotX: d,
                            plotY: null === p ? x : w.getThreshold(p),
                            isNull: m,
                            isCliff: !0
                        }), e.push({plotX: d, plotY: null === f ? x : w.getThreshold(f), doCurve: !1}))
                    };
                a = a || this.points;
                v && (a = this.getStackPoints(a));
                for (r = 0; r < a.length; r++) if (h = a[r].isNull, d = F(a[r].rectPlotX, a[r].plotX), u = F(a[r].yBottom, x), !h || k) k || H(r, r - 1, "left"), h && !v && k || (l.push(a[r]), e.push({
                    x: r,
                    plotX: d,
                    plotY: u
                })), k || H(r, r + 1, "right");
                r = c.call(this, l, !0, !0);
                e.reversed = !0;
                h = c.call(this, e, !0, !0);
                h.length && (h[0] = "L");
                h = r.concat(h);
                c = c.call(this, l, !1, k);
                h.xMap = r.xMap;
                this.areaPath = h;
                return c
            }, drawGraph: function () {
                this.areaPath = [];
                G.prototype.drawGraph.apply(this);
                var a = this, k = this.areaPath, t = this.options,
                    v = [["area", "highcharts-area", this.color, t.fillColor]];
                this.zones.forEach(function (c, k) {
                    v.push(["zone-area-" + k, "highcharts-area highcharts-zone-area-" + k + " " + c.className, c.color || a.color, c.fillColor || t.fillColor])
                });
                v.forEach(function (c) {
                    var p =
                        c[0], h = a[p];
                    h ? (h.endX = a.preventGraphAnimation ? null : k.xMap, h.animate({d: k})) : (h = {zIndex: 0}, a.chart.styledMode || (h.fill = F(c[3], y(c[2]).setOpacity(F(t.fillOpacity, .75)).get())), h = a[p] = a.chart.renderer.path(k).addClass(c[1]).attr(h).add(a.group), h.isArea = !0);
                    h.startX = k.xMap;
                    h.shiftUnit = t.step ? 2 : 1
                })
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(I);
    (function (a) {
        var y = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function (a, G, k) {
                var c = G.plotX, p = G.plotY, t = a[k - 1];
                k = a[k + 1];
                var v, w, r,
                    h;
                if (t && !t.isNull && !1 !== t.doCurve && !G.isCliff && k && !k.isNull && !1 !== k.doCurve && !G.isCliff) {
                    a = t.plotY;
                    r = k.plotX;
                    k = k.plotY;
                    var e = 0;
                    v = (1.5 * c + t.plotX) / 2.5;
                    w = (1.5 * p + a) / 2.5;
                    r = (1.5 * c + r) / 2.5;
                    h = (1.5 * p + k) / 2.5;
                    r !== v && (e = (h - w) * (r - c) / (r - v) + p - h);
                    w += e;
                    h += e;
                    w > a && w > p ? (w = Math.max(a, p), h = 2 * p - w) : w < a && w < p && (w = Math.min(a, p), h = 2 * p - w);
                    h > k && h > p ? (h = Math.max(k, p), w = 2 * p - h) : h < k && h < p && (h = Math.min(k, p), w = 2 * p - h);
                    G.rightContX = r;
                    G.rightContY = h
                }
                G = ["C", y(t.rightContX, t.plotX), y(t.rightContY, t.plotY), y(v, c), y(w, p), c, p];
                t.rightContX = t.rightContY =
                    null;
                return G
            }
        })
    })(I);
    (function (a) {
        var y = a.seriesTypes.area.prototype, F = a.seriesType;
        F("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: y.getStackPoints,
            getGraphPath: y.getGraphPath,
            drawGraph: y.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(I);
    (function (a) {
        var y = a.animObject, F = a.color, G = a.extend, k = a.defined, c = a.isNumber, p = a.merge, t = a.pick,
            v = a.Series, w = a.seriesType, r = a.svg;
        w("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {hover: {halo: !1, brightness: .1}, select: {color: "#cccccc", borderColor: "#000000"}},
            dataLabels: {align: null, verticalAlign: null, y: null},
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {distance: 6},
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0,
            directTouch: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function () {
                v.prototype.init.apply(this, arguments);
                var a = this, e = a.chart;
                e.hasRendered && e.series.forEach(function (e) {
                    e.type === a.type &&
                    (e.isDirty = !0)
                })
            },
            getColumnMetrics: function () {
                var a = this, e = a.options, c = a.xAxis, k = a.yAxis, d = c.options.reversedStacks,
                    d = c.reversed && !d || !c.reversed && d, g, b = {}, p = 0;
                !1 === e.grouping ? p = 1 : a.chart.series.forEach(function (d) {
                    var e = d.options, c = d.yAxis, h;
                    d.type !== a.type || !d.visible && a.chart.options.chart.ignoreHiddenSeries || k.len !== c.len || k.pos !== c.pos || (e.stacking ? (g = d.stackKey, void 0 === b[g] && (b[g] = p++), h = b[g]) : !1 !== e.grouping && (h = p++), d.columnIndex = h)
                });
                var u = Math.min(Math.abs(c.transA) * (c.ordinalSlope || e.pointRange ||
                    c.closestPointRange || c.tickInterval || 1), c.len), r = u * e.groupPadding,
                    v = (u - 2 * r) / (p || 1),
                    e = Math.min(e.maxPointWidth || c.len, t(e.pointWidth, v * (1 - 2 * e.pointPadding)));
                a.columnMetrics = {
                    width: e,
                    offset: (v - e) / 2 + (r + ((a.columnIndex || 0) + (d ? 1 : 0)) * v - u / 2) * (d ? -1 : 1)
                };
                return a.columnMetrics
            },
            crispCol: function (a, e, c, k) {
                var d = this.chart, g = this.borderWidth, b = -(g % 2 ? .5 : 0), g = g % 2 ? .5 : 1;
                d.inverted && d.renderer.isVML && (g += 1);
                this.options.crisp && (c = Math.round(a + c) + b, a = Math.round(a) + b, c -= a);
                k = Math.round(e + k) + g;
                b = .5 >= Math.abs(e) && .5 <
                    k;
                e = Math.round(e) + g;
                k -= e;
                b && k && (--e, k += 1);
                return {x: a, y: e, width: c, height: k}
            },
            translate: function () {
                var a = this, e = a.chart, c = a.options, n = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    n = a.borderWidth = t(c.borderWidth, n ? 0 : 1), d = a.yAxis, g = c.threshold,
                    b = a.translatedThreshold = d.getThreshold(g), p = t(c.minPointLength, 5), u = a.getColumnMetrics(),
                    r = u.width, E = a.barW = Math.max(r, 1 + 2 * n), B = a.pointXOffset = u.offset;
                e.inverted && (b -= .5);
                c.pointPadding && (E = Math.ceil(E));
                v.prototype.translate.apply(a);
                a.points.forEach(function (c) {
                    var h =
                            t(c.yBottom, b), l = 999 + Math.abs(h), m = r, l = Math.min(Math.max(-l, c.plotY), d.len + l),
                        f = c.plotX + B, n = E, u = Math.min(l, h), x, v = Math.max(l, h) - u;
                    p && Math.abs(v) < p && (v = p, x = !d.reversed && !c.negative || d.reversed && c.negative, c.y === g && a.dataMax <= g && d.min < g && (x = !x), u = Math.abs(u - b) > p ? h - p : b - (x ? p : 0));
                    k(c.options.pointWidth) && (m = n = Math.ceil(c.options.pointWidth), f -= Math.round((m - r) / 2));
                    c.barX = f;
                    c.pointWidth = m;
                    c.tooltipPos = e.inverted ? [d.len + d.pos - e.plotLeft - l, a.xAxis.len - f - n / 2, v] : [f + n / 2, l + d.pos - e.plotTop, v];
                    c.shapeType = c.shapeType ||
                        "rect";
                    c.shapeArgs = a.crispCol.apply(a, c.isNull ? [f, b, n, 0] : [f, u, n, v])
                })
            },
            getSymbol: a.noop,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            },
            pointAttribs: function (a, e) {
                var c = this.options, h, d = this.pointAttrToOptions || {};
                h = d.stroke || "borderColor";
                var g = d["stroke-width"] || "borderWidth", b = a && a.color || this.color,
                    k = a && a[h] || c[h] || this.color || b, u = a && a[g] || c[g] || this[g] || 0, d = c.dashStyle;
                a && this.zones.length && (b = a.getZone(),
                    b = a.options.color || b && b.color || this.color);
                e && (a = p(c.states[e], a.options.states && a.options.states[e] || {}), e = a.brightness, b = a.color || void 0 !== e && F(b).brighten(a.brightness).get() || b, k = a[h] || k, u = a[g] || u, d = a.dashStyle || d);
                h = {fill: b, stroke: k, "stroke-width": u};
                d && (h.dashstyle = d);
                return h
            },
            drawPoints: function () {
                var a = this, e = this.chart, k = a.options, n = e.renderer, d = k.animationLimit || 250, g;
                a.points.forEach(function (b) {
                    var h = b.graphic, l = h && e.pointCount < d ? "animate" : "attr";
                    if (c(b.plotY) && null !== b.y) {
                        g = b.shapeArgs;
                        if (h) h[l](p(g)); else b.graphic = h = n[b.shapeType](g).add(b.group || a.group);
                        k.borderRadius && h.attr({r: k.borderRadius});
                        e.styledMode || h[l](a.pointAttribs(b, b.selected && "select")).shadow(k.shadow, null, k.stacking && !k.borderRadius);
                        h.addClass(b.getClassName(), !0)
                    } else h && (b.graphic = h.destroy())
                })
            },
            animate: function (a) {
                var e = this, c = this.yAxis, h = e.options, d = this.chart.inverted, g = {},
                    b = d ? "translateX" : "translateY", k;
                r && (a ? (g.scaleY = .001, a = Math.min(c.pos + c.len, Math.max(c.pos, c.toPixels(h.threshold))), d ? g.translateX =
                    a - c.len : g.translateY = a, e.clipBox && e.setClip(), e.group.attr(g)) : (k = e.group.attr(b), e.group.animate({scaleY: 1}, G(y(e.options.animation), {
                    step: function (a, d) {
                        g[b] = k + d.pos * (c.pos - k);
                        e.group.attr(g)
                    }
                })), e.animate = null))
            },
            remove: function () {
                var a = this, e = a.chart;
                e.hasRendered && e.series.forEach(function (e) {
                    e.type === a.type && (e.isDirty = !0)
                });
                v.prototype.remove.apply(a, arguments)
            }
        })
    })(I);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {inverted: !0})
    })(I);
    (function (a) {
        var y = a.Series, F = a.seriesType;
        F("scatter",
            "line", {
                lineWidth: 0,
                findNearestPointBy: "xy",
                jitter: {x: 0, y: 0},
                marker: {enabled: !0},
                tooltip: {
                    headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                    pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
                }
            }, {
                sorted: !1,
                requireSorting: !1,
                noSharedTooltip: !0,
                trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
                takeOrdinalPosition: !1,
                drawGraph: function () {
                    this.options.lineWidth &&
                    y.prototype.drawGraph.call(this)
                },
                applyJitter: function () {
                    var a = this, k = this.options.jitter, c = this.points.length;
                    k && this.points.forEach(function (p, t) {
                        ["x", "y"].forEach(function (v, w) {
                            var r, h = "plot" + v.toUpperCase(), e, l;
                            k[v] && !p.isNull && (r = a[v + "Axis"], l = k[v] * r.transA, r && !r.isLog && (e = Math.max(0, p[h] - l), r = Math.min(r.len, p[h] + l), w = 1E4 * Math.sin(t + w * c), p[h] = e + (r - e) * (w - Math.floor(w)), "x" === v && (p.clientX = p.plotX)))
                        })
                    })
                }
            });
        a.addEvent(y, "afterTranslate", function () {
            this.applyJitter && this.applyJitter()
        })
    })(I);
    (function (a) {
        var y =
            a.deg2rad, F = a.isNumber, G = a.pick, k = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options, p = this.chart, t = 2 * (a.slicedOffset || 0), v = p.plotWidth - 2 * t,
                    p = p.plotHeight - 2 * t, w = a.center,
                    w = [G(w[0], "50%"), G(w[1], "50%"), a.size || "100%", a.innerSize || 0], r = Math.min(v, p), h, e;
                for (h = 0; 4 > h; ++h) e = w[h], a = 2 > h || 2 === h && /%$/.test(e), w[h] = k(e, [v, p, r, w[2]][h]) + (a ? t : 0);
                w[3] > w[2] && (w[3] = w[2]);
                return w
            }, getStartAndEndRadians: function (a, k) {
                a = F(a) ? a : 0;
                k = F(k) && k > a && 360 > k - a ? k : a + 360;
                return {
                    start: y * (a + -90), end: y *
                    (k + -90)
                }
            }
        }
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.CenteredSeriesMixin, G = a.defined, k = a.extend, c = F.getStartAndEndRadians,
            p = a.noop, t = a.pick, v = a.Point, w = a.Series, r = a.seriesType, h = a.setAnimation;
        r("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                allowOverlap: !0, connectorPadding: 5, distance: 30, enabled: !0, formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                }, softConnector: !0, x: 0, connectorShape: "fixedOffset", crookDistance: "70%"
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {followPointer: !0},
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {hover: {brightness: .1}}
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var e = this, c = e.points, d = e.startAngleRad;
                a || (c.forEach(function (a) {
                    var b = a.graphic, c = a.shapeArgs;
                    b && (b.attr({r: a.startR || e.center[3] / 2, start: d, end: d}),
                        b.animate({r: c.r, start: c.start, end: c.end}, e.options.animation))
                }), e.animate = null)
            },
            updateTotals: function () {
                var a, c = 0, h = this.points, d = h.length, g, b = this.options.ignoreHiddenPoint;
                for (a = 0; a < d; a++) g = h[a], c += b && !g.visible ? 0 : g.isNull ? 0 : g.y;
                this.total = c;
                for (a = 0; a < d; a++) g = h[a], g.percentage = 0 < c && (g.visible || !b) ? g.y / c * 100 : 0, g.total = c
            },
            generatePoints: function () {
                w.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            getX: function (a, c, h) {
                var d = this.center, e = this.radii ? this.radii[h.index] : d[2] / 2;
                return d[0] +
                    (c ? -1 : 1) * Math.cos(Math.asin(Math.max(Math.min((a - d[1]) / (e + h.labelDistance), 1), -1))) * (e + h.labelDistance) + (0 < h.labelDistance ? (c ? -1 : 1) * this.options.dataLabels.padding : 0)
            },
            translate: function (a) {
                this.generatePoints();
                var e = 0, h = this.options, d = h.slicedOffset, g = d + (h.borderWidth || 0), b, k,
                    u = c(h.startAngle, h.endAngle), p = this.startAngleRad = u.start,
                    u = (this.endAngleRad = u.end) - p, r = this.points, v, m, z = h.dataLabels.distance,
                    h = h.ignoreHiddenPoint, w, A = r.length, f;
                a || (this.center = a = this.getCenter());
                for (w = 0; w < A; w++) {
                    f = r[w];
                    f.labelDistance = t(f.options.dataLabels && f.options.dataLabels.distance, z);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, f.labelDistance);
                    b = p + e * u;
                    if (!h || f.visible) e += f.percentage / 100;
                    k = p + e * u;
                    f.shapeType = "arc";
                    f.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * b) / 1E3,
                        end: Math.round(1E3 * k) / 1E3
                    };
                    k = (k + b) / 2;
                    k > 1.5 * Math.PI ? k -= 2 * Math.PI : k < -Math.PI / 2 && (k += 2 * Math.PI);
                    f.slicedTranslation = {
                        translateX: Math.round(Math.cos(k) * d),
                        translateY: Math.round(Math.sin(k) * d)
                    };
                    v = Math.cos(k) * a[2] /
                        2;
                    m = Math.sin(k) * a[2] / 2;
                    f.tooltipPos = [a[0] + .7 * v, a[1] + .7 * m];
                    f.half = k < -Math.PI / 2 || k > Math.PI / 2 ? 1 : 0;
                    f.angle = k;
                    b = Math.min(g, f.labelDistance / 5);
                    f.labelPosition = {
                        natural: {
                            x: a[0] + v + Math.cos(k) * f.labelDistance,
                            y: a[1] + m + Math.sin(k) * f.labelDistance
                        },
                        "final": {},
                        alignment: 0 > f.labelDistance ? "center" : f.half ? "right" : "left",
                        connectorPosition: {
                            breakAt: {x: a[0] + v + Math.cos(k) * b, y: a[1] + m + Math.sin(k) * b},
                            touchingSliceAt: {x: a[0] + v, y: a[1] + m}
                        }
                    }
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this, c = a.chart, h = c.renderer, d, g, b, p,
                    u = a.options.shadow;
                !u || a.shadowGroup || c.styledMode || (a.shadowGroup = h.g("shadow").add(a.group));
                a.points.forEach(function (e) {
                    g = e.graphic;
                    if (e.isNull) g && (e.graphic = g.destroy()); else {
                        p = e.shapeArgs;
                        d = e.getTranslate();
                        if (!c.styledMode) {
                            var l = e.shadowGroup;
                            u && !l && (l = e.shadowGroup = h.g("shadow").add(a.shadowGroup));
                            l && l.attr(d);
                            b = a.pointAttribs(e, e.selected && "select")
                        }
                        g ? (g.setRadialReference(a.center), c.styledMode || g.attr(b), g.animate(k(p, d))) : (e.graphic = g = h[e.shapeType](p).setRadialReference(a.center).attr(d).add(a.group),
                        c.styledMode || g.attr(b).attr({"stroke-linejoin": "round"}).shadow(u, l));
                        g.attr({visibility: e.visible ? "inherit" : "hidden"});
                        g.addClass(e.getClassName())
                    }
                })
            },
            searchPoint: p,
            sortByAngle: function (a, c) {
                a.sort(function (a, d) {
                    return void 0 !== a.angle && (d.angle - a.angle) * c
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: F.getCenter,
            getSymbol: p
        }, {
            init: function () {
                v.prototype.init.apply(this, arguments);
                var a = this, c;
                a.name = t(a.name, "Slice");
                c = function (e) {
                    a.slice("select" === e.type)
                };
                y(a, "select", c);
                y(a, "unselect", c);
                return a
            }, isValid: function () {
                return a.isNumber(this.y, !0) && 0 <= this.y
            }, setVisible: function (a, c) {
                var e = this, d = e.series, g = d.chart, b = d.options.ignoreHiddenPoint;
                c = t(c, b);
                a !== e.visible && (e.visible = e.options.visible = a = void 0 === a ? !e.visible : a, d.options.data[d.data.indexOf(e)] = e.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (b) {
                    if (e[b]) e[b][a ? "show" : "hide"](!0)
                }), e.legendItem && g.legend.colorizeItem(e, a), a || "hover" !== e.state || e.setState(""), b && (d.isDirty = !0), c &&
                g.redraw())
            }, slice: function (a, c, k) {
                var d = this.series;
                h(k, d.chart);
                t(c, !0);
                this.sliced = this.options.sliced = G(a) ? a : !this.sliced;
                d.options.data[d.data.indexOf(this)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            }, getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {translateX: 0, translateY: 0}
            }, haloPath: function (a) {
                var e = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(e.x, e.y,
                    e.r + a, e.r + a, {innerR: this.shapeArgs.r - 1, start: e.start, end: e.end})
            }, connectorShapes: {
                fixedOffset: function (a, c, h) {
                    var d = c.breakAt;
                    c = c.touchingSliceAt;
                    return ["M", a.x, a.y].concat(h.softConnector ? ["C", a.x + ("left" === a.alignment ? -5 : 5), a.y, 2 * d.x - c.x, 2 * d.y - c.y, d.x, d.y] : ["L", d.x, d.y]).concat(["L", c.x, c.y])
                }, straight: function (a, c) {
                    c = c.touchingSliceAt;
                    return ["M", a.x, a.y, "L", c.x, c.y]
                }, crookedLine: function (e, c, h) {
                    c = c.touchingSliceAt;
                    var d = this.series, g = d.center[0], b = d.chart.plotWidth, k = d.chart.plotLeft, d = e.alignment,
                        l = this.shapeArgs.r;
                    h = a.relativeLength(h.crookDistance, 1);
                    h = "left" === d ? g + l + (b + k - g - l) * (1 - h) : k + (g - l) * h;
                    g = ["L", h, e.y];
                    if ("left" === d ? h > e.x || h < c.x : h < e.x || h > c.x) g = [];
                    return ["M", e.x, e.y].concat(g).concat(["L", c.x, c.y])
                }
            }, getConnectorPath: function () {
                var a = this.labelPosition, c = this.series.options.dataLabels, h = c.connectorShape,
                    d = this.connectorShapes;
                d[h] && (h = d[h]);
                return h.call(this, {x: a.final.x, y: a.final.y, alignment: a.alignment}, a.connectorPosition, c)
            }
        })
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.arrayMax, G = a.defined,
            k = a.extend, c = a.format, p = a.merge, t = a.noop, v = a.pick, w = a.relativeLength, r = a.Series,
            h = a.seriesTypes, e = a.stableSort, l = a.isArray, n = a.splat;
        a.distribute = function (d, c, b) {
            function g(a, b) {
                return a.target - b.target
            }

            var h, k = !0, l = d, n = [], m;
            m = 0;
            var p = l.reducedLen || c;
            for (h = d.length; h--;) m += d[h].size;
            if (m > p) {
                e(d, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (m = h = 0; m <= p;) m += d[h].size, h++;
                n = d.splice(h - 1, d.length)
            }
            e(d, g);
            for (d = d.map(function (a) {
                return {size: a.size, targets: [a.target], align: v(a.align, .5)}
            }); k;) {
                for (h =
                         d.length; h--;) k = d[h], m = (Math.min.apply(0, k.targets) + Math.max.apply(0, k.targets)) / 2, k.pos = Math.min(Math.max(0, m - k.size * k.align), c - k.size);
                h = d.length;
                for (k = !1; h--;) 0 < h && d[h - 1].pos + d[h - 1].size > d[h].pos && (d[h - 1].size += d[h].size, d[h - 1].targets = d[h - 1].targets.concat(d[h].targets), d[h - 1].align = .5, d[h - 1].pos + d[h - 1].size > c && (d[h - 1].pos = c - d[h - 1].size), d.splice(h, 1), k = !0)
            }
            l.push.apply(l, n);
            h = 0;
            d.some(function (d) {
                var e = 0;
                if (d.targets.some(function () {
                        l[h].pos = d.pos + e;
                        if (Math.abs(l[h].pos - l[h].target) > b) return l.slice(0,
                            h + 1).forEach(function (a) {
                            delete a.pos
                        }), l.reducedLen = (l.reducedLen || c) - .1 * c, l.reducedLen > .1 * c && a.distribute(l, c, b), !0;
                        e += l[h].size;
                        h++
                    })) return !0
            });
            e(l, g)
        };
        r.prototype.drawDataLabels = function () {
            function d(a, b) {
                var d = b.filter;
                return d ? (b = d.operator, a = a[d.property], d = d.value, "\x3e" === b && a > d || "\x3c" === b && a < d || "\x3e\x3d" === b && a >= d || "\x3c\x3d" === b && a <= d || "\x3d\x3d" === b && a == d || "\x3d\x3d\x3d" === b && a === d ? !0 : !1) : !0
            }

            function e(a, b) {
                var d = [], c;
                if (l(a) && !l(b)) d = a.map(function (a) {
                    return p(a, b)
                }); else if (l(b) &&
                    !l(a)) d = b.map(function (b) {
                    return p(a, b)
                }); else if (l(a) || l(b)) for (c = Math.max(a.length, b.length); c--;) d[c] = p(a[c], b[c]); else d = p(a, b);
                return d
            }

            var b = this, h = b.chart, k = b.options, r = k.dataLabels, t = b.points, w, m = b.hasRendered || 0, z,
                D = v(r.defer, !!k.animation), A = h.renderer,
                r = e(e(h.options.plotOptions && h.options.plotOptions.series && h.options.plotOptions.series.dataLabels, h.options.plotOptions && h.options.plotOptions[b.type] && h.options.plotOptions[b.type].dataLabels), r);
            a.fireEvent(this, "drawDataLabels");
            if (l(r) ||
                r.enabled || b._hasPointLabels) z = b.plotGroup("dataLabelsGroup", "data-labels", D && !m ? "hidden" : "visible", r.zIndex || 6), D && (z.attr({opacity: +m}), m || y(b, "afterAnimate", function () {
                b.visible && z.show(!0);
                z[k.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
            })), t.forEach(function (f) {
                w = n(e(r, f.dlOptions || f.options && f.options.dataLabels));
                w.forEach(function (e, g) {
                    var m = e.enabled && !f.isNull && d(f, e), l, n, q, u,
                        p = f.dataLabels ? f.dataLabels[g] : f.dataLabel,
                        r = f.connectors ? f.connectors[g] : f.connector, t = !p;
                    m && (l = f.getLabelConfig(),
                        n = e[f.formatPrefix + "Format"] || e.format, l = G(n) ? c(n, l, h.time) : (e[f.formatPrefix + "Formatter"] || e.formatter).call(l, e), n = e.style, q = e.rotation, h.styledMode || (n.color = v(e.color, n.color, b.color, "#000000"), "contrast" === n.color && (f.contrastColor = A.getContrast(f.color || b.color), n.color = e.inside || 0 > v(e.distance, f.labelDistance) || k.stacking ? f.contrastColor : "#000000"), k.cursor && (n.cursor = k.cursor)), u = {
                        r: e.borderRadius || 0,
                        rotation: q,
                        padding: e.padding,
                        zIndex: 1
                    }, h.styledMode || (u.fill = e.backgroundColor, u.stroke = e.borderColor,
                        u["stroke-width"] = e.borderWidth), a.objectEach(u, function (a, b) {
                        void 0 === a && delete u[b]
                    }));
                    !p || m && G(l) ? m && G(l) && (p ? u.text = l : (f.dataLabels = f.dataLabels || [], p = f.dataLabels[g] = q ? A.text(l, 0, -9999).addClass("highcharts-data-label") : A.label(l, 0, -9999, e.shape, null, null, e.useHTML, null, "data-label"), g || (f.dataLabel = p), p.addClass(" highcharts-data-label-color-" + f.colorIndex + " " + (e.className || "") + (e.useHTML ? " highcharts-tracker" : ""))), p.options = e, p.attr(u), h.styledMode || p.css(n).shadow(e.shadow), p.added || p.add(z),
                        b.alignDataLabel(f, p, e, null, t)) : (f.dataLabel = f.dataLabel && f.dataLabel.destroy(), f.dataLabels && (1 === f.dataLabels.length ? delete f.dataLabels : delete f.dataLabels[g]), g || delete f.dataLabel, r && (f.connector = f.connector.destroy(), f.connectors && (1 === f.connectors.length ? delete f.connectors : delete f.connectors[g])))
                })
            });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        r.prototype.alignDataLabel = function (a, e, b, c, h) {
            var d = this.chart, g = this.isCartesian && d.inverted, l = v(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                m = v(a.plotY,
                    -9999), n = e.getBBox(), u, p = b.rotation, f = b.align,
                q = this.visible && (a.series.forceDL || d.isInsidePlot(l, Math.round(m), g) || c && d.isInsidePlot(l, g ? c.x + 1 : c.y + c.height - 1, g)),
                r = "justify" === v(b.overflow, "justify");
            if (q && (u = d.renderer.fontMetrics(d.styledMode ? void 0 : b.style.fontSize, e).b, c = k({
                    x: g ? this.yAxis.len - m : l,
                    y: Math.round(g ? this.xAxis.len - l : m),
                    width: 0,
                    height: 0
                }, c), k(b, {width: n.width, height: n.height}), p ? (r = !1, l = d.renderer.rotCorr(u, p), l = {
                    x: c.x + b.x + c.width / 2 + l.x, y: c.y + b.y + {top: 0, middle: .5, bottom: 1}[b.verticalAlign] *
                    c.height
                }, e[h ? "attr" : "animate"](l).attr({align: f}), m = (p + 720) % 360, m = 180 < m && 360 > m, "left" === f ? l.y -= m ? n.height : 0 : "center" === f ? (l.x -= n.width / 2, l.y -= n.height / 2) : "right" === f && (l.x -= n.width, l.y -= m ? 0 : n.height), e.placed = !0, e.alignAttr = l) : (e.align(b, null, c), l = e.alignAttr), r && 0 <= c.height ? a.isLabelJustified = this.justifyDataLabel(e, b, l, n, c, h) : v(b.crop, !0) && (q = d.isInsidePlot(l.x, l.y) && d.isInsidePlot(l.x + n.width, l.y + n.height)), b.shape && !p)) e[h ? "attr" : "animate"]({
                anchorX: g ? d.plotWidth - a.plotY : a.plotX, anchorY: g ? d.plotHeight -
                    a.plotX : a.plotY
            });
            q || (e.attr({y: -9999}), e.placed = !1)
        };
        r.prototype.justifyDataLabel = function (a, e, b, c, h, k) {
            var d = this.chart, g = e.align, m = e.verticalAlign, l, n, u = a.box ? 0 : a.padding || 0;
            l = b.x + u;
            0 > l && ("right" === g ? e.align = "left" : e.x = -l, n = !0);
            l = b.x + c.width - u;
            l > d.plotWidth && ("left" === g ? e.align = "right" : e.x = d.plotWidth - l, n = !0);
            l = b.y + u;
            0 > l && ("bottom" === m ? e.verticalAlign = "top" : e.y = -l, n = !0);
            l = b.y + c.height - u;
            l > d.plotHeight && ("top" === m ? e.verticalAlign = "bottom" : e.y = d.plotHeight - l, n = !0);
            n && (a.placed = !k, a.align(e, null,
                h));
            return n
        };
        h.pie && (h.pie.prototype.dataLabelPositioners = {
            radialDistributionY: function (a) {
                return a.top + a.distributeBox.pos
            }, radialDistributionX: function (a, e, b, c) {
                return a.getX(b < e.top + 2 || b > e.bottom - 2 ? c : b, e.half, e)
            }, justify: function (a, e, b) {
                return b[0] + (a.half ? -1 : 1) * (e + a.labelDistance)
            }, alignToPlotEdges: function (a, e, b, c) {
                a = a.getBBox().width;
                return e ? a + c : b - a - c
            }, alignToConnectors: function (a, e, b, c) {
                var d = 0, g;
                a.forEach(function (a) {
                    g = a.dataLabel.getBBox().width;
                    g > d && (d = g)
                });
                return e ? d + c : b - d - c
            }
        }, h.pie.prototype.drawDataLabels =
            function () {
                var d = this, e = d.data, b, c = d.chart, h = d.options.dataLabels, k = h.connectorPadding,
                    l = v(h.connectorWidth, 1), n = c.plotWidth, m = c.plotHeight, p = c.plotLeft,
                    t = Math.round(c.chartWidth / 3), w, f = d.center, q = f[2] / 2, y = f[1], K, I, J, M, R = [[], []],
                    C, P, N, S, O = [0, 0, 0, 0], W = d.dataLabelPositioners;
                d.visible && (h.enabled || d._hasPointLabels) && (e.forEach(function (a) {
                    a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({width: "auto"}).css({
                        width: "auto",
                        textOverflow: "clip"
                    }), a.dataLabel.shortened = !1)
                }), r.prototype.drawDataLabels.apply(d),
                    e.forEach(function (a) {
                        a.dataLabel && (a.visible ? (R[a.half].push(a), a.dataLabel._pos = null, !G(h.style.width) && !G(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > t && (a.dataLabel.css({width: .7 * t}), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels))
                    }), R.forEach(function (e, g) {
                    var l, u, r = e.length, t = [], x;
                    if (r) for (d.sortByAngle(e, g - .5), 0 < d.maxLabelDistance && (l = Math.max(0, y - q -
                        d.maxLabelDistance), u = Math.min(y + q + d.maxLabelDistance, c.plotHeight), e.forEach(function (a) {
                        0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, y - q - a.labelDistance), a.bottom = Math.min(y + q + a.labelDistance, c.plotHeight), x = a.dataLabel.getBBox().height || 21, a.distributeBox = {
                            target: a.labelPosition.natural.y - a.top + x / 2,
                            size: x,
                            rank: a.y
                        }, t.push(a.distributeBox))
                    }), l = u + x - l, a.distribute(t, l, l / 5)), S = 0; S < r; S++) {
                        b = e[S];
                        J = b.labelPosition;
                        K = b.dataLabel;
                        N = !1 === b.visible ? "hidden" : "inherit";
                        P = l = J.natural.y;
                        t && G(b.distributeBox) &&
                        (void 0 === b.distributeBox.pos ? N = "hidden" : (M = b.distributeBox.size, P = W.radialDistributionY(b)));
                        delete b.positionIndex;
                        if (h.justify) C = W.justify(b, q, f); else switch (h.alignTo) {
                            case "connectors":
                                C = W.alignToConnectors(e, g, n, p);
                                break;
                            case "plotEdges":
                                C = W.alignToPlotEdges(K, g, n, p);
                                break;
                            default:
                                C = W.radialDistributionX(d, b, P, l)
                        }
                        K._attr = {visibility: N, align: J.alignment};
                        K._pos = {x: C + h.x + ({left: k, right: -k}[J.alignment] || 0), y: P + h.y - 10};
                        J.final.x = C;
                        J.final.y = P;
                        v(h.crop, !0) && (I = K.getBBox().width, l = null, C - I < k && 1 ===
                        g ? (l = Math.round(I - C + k), O[3] = Math.max(l, O[3])) : C + I > n - k && 0 === g && (l = Math.round(C + I - n + k), O[1] = Math.max(l, O[1])), 0 > P - M / 2 ? O[0] = Math.max(Math.round(-P + M / 2), O[0]) : P + M / 2 > m && (O[2] = Math.max(Math.round(P + M / 2 - m), O[2])), K.sideOverflow = l)
                    }
                }), 0 === F(O) || this.verifyDataLabelOverflow(O)) && (this.placeDataLabels(), l && this.points.forEach(function (a) {
                    var b;
                    w = a.connector;
                    if ((K = a.dataLabel) && K._pos && a.visible && 0 < a.labelDistance) {
                        N = K._attr.visibility;
                        if (b = !w) a.connector = w = c.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" +
                            a.colorIndex + (a.className ? " " + a.className : "")).add(d.dataLabelsGroup), c.styledMode || w.attr({
                            "stroke-width": l,
                            stroke: h.connectorColor || a.color || "#666666"
                        });
                        w[b ? "attr" : "animate"]({d: a.getConnectorPath()});
                        w.attr("visibility", N)
                    } else w && (a.connector = w.destroy())
                }))
            }, h.pie.prototype.placeDataLabels = function () {
            this.points.forEach(function (a) {
                var d = a.dataLabel;
                d && a.visible && ((a = d._pos) ? (d.sideOverflow && (d._attr.width = d.getBBox().width - d.sideOverflow, d.css({
                    width: d._attr.width + "px", textOverflow: (this.options.dataLabels.style ||
                        {}).textOverflow || "ellipsis"
                }), d.shortened = !0), d.attr(d._attr), d[d.moved ? "animate" : "attr"](a), d.moved = !0) : d && d.attr({y: -9999}))
            }, this)
        }, h.pie.prototype.alignDataLabel = t, h.pie.prototype.verifyDataLabelOverflow = function (a) {
            var d = this.center, b = this.options, e = b.center, c = b.minSize || 80, h, k = null !== b.size;
            k || (null !== e[0] ? h = Math.max(d[2] - Math.max(a[1], a[3]), c) : (h = Math.max(d[2] - a[1] - a[3], c), d[0] += (a[3] - a[1]) / 2), null !== e[1] ? h = Math.max(Math.min(h, d[2] - Math.max(a[0], a[2])), c) : (h = Math.max(Math.min(h, d[2] - a[0] -
                a[2]), c), d[1] += (a[0] - a[2]) / 2), h < d[2] ? (d[2] = h, d[3] = Math.min(w(b.innerSize || 0, h), h), this.translate(d), this.drawDataLabels && this.drawDataLabels()) : k = !0);
            return k
        });
        h.column && (h.column.prototype.alignDataLabel = function (a, e, b, c, h) {
            var d = this.chart.inverted, g = a.series, k = a.dlBox || a.shapeArgs,
                l = v(a.below, a.plotY > v(this.translatedThreshold, g.yAxis.len)),
                n = v(b.inside, !!this.options.stacking);
            k && (c = p(k), 0 > c.y && (c.height += c.y, c.y = 0), k = c.y + c.height - g.yAxis.len, 0 < k && (c.height -= k), d && (c = {
                x: g.yAxis.len - c.y - c.height,
                y: g.xAxis.len - c.x - c.width, width: c.height, height: c.width
            }), n || (d ? (c.x += l ? 0 : c.width, c.width = 0) : (c.y += l ? c.height : 0, c.height = 0)));
            b.align = v(b.align, !d || n ? "center" : l ? "right" : "left");
            b.verticalAlign = v(b.verticalAlign, d || n ? "middle" : l ? "top" : "bottom");
            r.prototype.alignDataLabel.call(this, a, e, b, c, h);
            a.isLabelJustified && a.contrastColor && e.css({color: a.contrastColor})
        })
    })(I);
    (function (a) {
        var y = a.Chart, F = a.isArray, G = a.objectEach, k = a.pick, c = a.addEvent, p = a.fireEvent;
        c(y, "render", function () {
            var a = [];
            (this.labelCollectors ||
                []).forEach(function (c) {
                a = a.concat(c())
            });
            (this.yAxis || []).forEach(function (c) {
                c.options.stackLabels && !c.options.stackLabels.allowOverlap && G(c.stacks, function (c) {
                    G(c, function (c) {
                        a.push(c.label)
                    })
                })
            });
            (this.series || []).forEach(function (c) {
                var p = c.options.dataLabels;
                c.visible && (!1 !== p.enabled || c._hasPointLabels) && c.points.forEach(function (c) {
                    c.visible && (F(c.dataLabels) ? c.dataLabels : c.dataLabel ? [c.dataLabel] : []).forEach(function (h) {
                        var e = h.options;
                        h.labelrank = k(e.labelrank, c.labelrank, c.shapeArgs && c.shapeArgs.height);
                        e.allowOverlap || a.push(h)
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        y.prototype.hideOverlappingLabels = function (a) {
            var c = this, k = a.length, r = c.renderer, h, e, l, n, d, g, b = function (a, b, c, d, e, g, h, k) {
                return !(e > a + c || e + h < a || g > b + d || g + k < b)
            };
            l = function (a) {
                var b, c, d, e = a.box ? 0 : a.padding || 0;
                d = 0;
                if (a && (!a.alignAttr || a.placed)) return b = a.alignAttr || {
                    x: a.attr("x"),
                    y: a.attr("y")
                }, c = a.parentGroup, a.width || (d = a.getBBox(), a.width = d.width, a.height = d.height, d = r.fontMetrics(null, a.element).h), {
                    x: b.x + (c.translateX || 0) + e, y: b.y + (c.translateY ||
                        0) + e - d, width: a.width - 2 * e, height: a.height - 2 * e
                }
            };
            for (e = 0; e < k; e++) if (h = a[e]) h.oldOpacity = h.opacity, h.newOpacity = 1, h.absoluteBox = l(h);
            a.sort(function (a, b) {
                return (b.labelrank || 0) - (a.labelrank || 0)
            });
            for (e = 0; e < k; e++) for (g = (l = a[e]) && l.absoluteBox, h = e + 1; h < k; ++h) if (d = (n = a[h]) && n.absoluteBox, g && d && l !== n && 0 !== l.newOpacity && 0 !== n.newOpacity && (d = b(g.x, g.y, g.width, g.height, d.x, d.y, d.width, d.height))) (l.labelrank < n.labelrank ? l : n).newOpacity = 0;
            a.forEach(function (a) {
                var b, d;
                a && (d = a.newOpacity, a.oldOpacity !== d && (a.alignAttr &&
                a.placed ? (d ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = d, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b), p(c, "afterHideOverlappingLabels")) : a.attr({opacity: d})), a.isOld = !0)
            })
        }
    })(I);
    (function (a) {
        var y = a.addEvent, F = a.Chart, G = a.createElement, k = a.css, c = a.defaultOptions, p = a.defaultPlotOptions,
            t = a.extend, v = a.fireEvent, w = a.hasTouch, r = a.isObject, h = a.Legend, e = a.merge, l = a.pick,
            n = a.Point, d = a.Series, g = a.seriesTypes, b = a.svg, x;
        x = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this, b = a.chart, c = b.pointer,
                    d = function (a) {
                        var b = c.getPointFromEvent(a);
                        void 0 !== b && (c.isDirectTouch = !0, b.onMouseOver(a))
                    };
                a.points.forEach(function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel && (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (a.trackerGroups.forEach(function (e) {
                    if (a[e]) {
                        a[e].addClass("highcharts-tracker").on("mouseover", d).on("mouseout", function (a) {
                            c.onTrackerMouseOut(a)
                        });
                        if (w) a[e].on("touchstart", d);
                        !b.styledMode && a.options.cursor && a[e].css(k).css({cursor: a.options.cursor})
                    }
                }),
                    a._hasTracking = !0);
                v(this, "afterDrawTracker")
            }, drawTrackerGraph: function () {
                var a = this, c = a.options, d = c.trackByArea, e = [].concat(d ? a.areaPath : a.graphPath),
                    g = e.length, h = a.chart, k = h.pointer, l = h.renderer, f = h.options.tooltip.snap, n = a.tracker,
                    p, r = function () {
                        if (h.hoverSeries !== a) a.onMouseOver()
                    }, t = "rgba(192,192,192," + (b ? .0001 : .002) + ")";
                if (g && !d) for (p = g + 1; p--;) "M" === e[p] && e.splice(p + 1, 0, e[p + 1] - f, e[p + 2], "L"), (p && "M" === e[p] || p === g) && e.splice(p, 0, "L", e[p - 2] + f, e[p - 1]);
                n ? n.attr({d: e}) : a.graph && (a.tracker = l.path(e).attr({
                    visibility: a.visible ?
                        "visible" : "hidden", zIndex: 2
                }).addClass(d ? "highcharts-tracker-area" : "highcharts-tracker-line").add(a.group), h.styledMode || a.tracker.attr({
                    "stroke-linejoin": "round",
                    stroke: t,
                    fill: d ? t : "none",
                    "stroke-width": a.graph.strokeWidth() + (d ? 0 : 2 * f)
                }), [a.tracker, a.markerGroup].forEach(function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", r).on("mouseout", function (a) {
                        k.onTrackerMouseOut(a)
                    });
                    c.cursor && !h.styledMode && a.css({cursor: c.cursor});
                    if (w) a.on("touchstart", r)
                }));
                v(this, "afterDrawTracker")
            }
        };
        g.column &&
        (g.column.prototype.drawTracker = x.drawTrackerPoint);
        g.pie && (g.pie.prototype.drawTracker = x.drawTrackerPoint);
        g.scatter && (g.scatter.prototype.drawTracker = x.drawTrackerPoint);
        t(h.prototype, {
            setItemEvents: function (a, b, c) {
                var d = this, g = d.chart.renderer.boxWrapper,
                    h = "highcharts-legend-" + (a instanceof n ? "point" : "series") + "-active",
                    k = d.chart.styledMode;
                (c ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    g.addClass(h);
                    k || b.css(d.options.itemHoverStyle)
                }).on("mouseout", function () {
                    d.styledMode ||
                    b.css(e(a.visible ? d.itemStyle : d.itemHiddenStyle));
                    g.removeClass(h);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    g.removeClass(h);
                    b = {browserEvent: b};
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : v(a, "legendItemClick", b, c)
                })
            }, createCheckboxForItem: function (a) {
                a.checkbox = G("input", {
                    type: "checkbox",
                    className: "highcharts-legend-checkbox",
                    checked: a.selected,
                    defaultChecked: a.selected
                }, this.options.itemCheckboxStyle, this.chart.container);
                y(a.checkbox, "click",
                    function (b) {
                        v(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                            a.select()
                        })
                    })
            }
        });
        t(F.prototype, {
            showResetZoom: function () {
                function a() {
                    b.zoomOut()
                }

                var b = this, d = c.lang, e = b.options.chart.resetZoomButton, g = e.theme, h = g.states,
                    k = "chart" === e.relativeTo ? null : "plotBox";
                v(this, "beforeShowResetZoom", null, function () {
                    b.resetZoomButton = b.renderer.button(d.resetZoom, null, null, a, g, h && h.hover).attr({
                        align: e.position.align,
                        title: d.resetZoomTitle
                    }).addClass("highcharts-reset-zoom").add().align(e.position,
                        !1, k)
                })
            }, zoomOut: function () {
                v(this, "selection", {resetSelection: !0}, this.zoom)
            }, zoom: function (a) {
                var b, c = this.pointer, d = !1, e;
                !a || a.resetSelection ? (this.axes.forEach(function (a) {
                    b = a.zoom()
                }), c.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) {
                    var e = a.axis;
                    c[e.isXAxis ? "zoomX" : "zoomY"] && (b = e.zoom(a.min, a.max), e.displayBtn && (d = !0))
                });
                e = this.resetZoomButton;
                d && !e ? this.showResetZoom() : !d && r(e) && (this.resetZoomButton = e.destroy());
                b && this.redraw(l(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            },
            pan: function (a, b) {
                var c = this, d = c.hoverPoints, e;
                v(this, "pan", {originalEvent: a}, function () {
                    d && d.forEach(function (a) {
                        a.setState()
                    });
                    ("xy" === b ? [1, 0] : [1]).forEach(function (b) {
                        b = c[b ? "xAxis" : "yAxis"][0];
                        var d = b.horiz, g = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", f = c[d],
                            h = (b.pointRange || 0) / 2,
                            k = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1, l = b.getExtremes(),
                            m = b.toValue(f - g, !0) + h * k, k = b.toValue(f + b.len - g, !0) - h * k, n = k < m,
                            f = n ? k : m, m = n ? m : k,
                            k = Math.min(l.dataMin, h ? l.min : b.toValue(b.toPixels(l.min) -
                                b.minPixelPadding)),
                            h = Math.max(l.dataMax, h ? l.max : b.toValue(b.toPixels(l.max) + b.minPixelPadding)),
                            n = k - f;
                        0 < n && (m += n, f = k);
                        n = m - h;
                        0 < n && (m = h, f -= n);
                        b.series.length && f !== l.min && m !== l.max && (b.setExtremes(f, m, !1, !1, {trigger: "pan"}), e = !0);
                        c[d] = g
                    });
                    e && c.redraw(!1);
                    k(c.container, {cursor: "move"})
                })
            }
        });
        t(n.prototype, {
            select: function (a, b) {
                var c = this, d = c.series, e = d.chart;
                a = l(a, !c.selected);
                c.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                    c.selected = c.options.selected = a;
                    d.options.data[d.data.indexOf(c)] =
                        c.options;
                    c.setState(a && "select");
                    b || e.getSelectedPoints().forEach(function (a) {
                        a.selected && a !== c && (a.selected = a.options.selected = !1, d.options.data[d.data.indexOf(a)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            }, onMouseOver: function (a) {
                var b = this.series.chart, c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            }, onMouseOut: function () {
                var a = this.series.chart;
                this.firePointEvent("mouseOut");
                (a.hoverPoints || []).forEach(function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            }, importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this, c = e(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function (a, c) {
                        y(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            }, setState: function (a, b) {
                var c = Math.floor(this.plotX), d = this.plotY, e = this.series,
                    g = e.options.states[a || "normal"] || {}, h = p[e.type].marker && e.options.marker,
                    k = h && !1 === h.enabled, f = h && h.states && h.states[a || "normal"] || {}, n = !1 === f.enabled,
                    r = e.stateMarkerGraphic, u = this.marker || {}, w = e.chart,
                    x = e.halo, y, F = h && e.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (n || k && !1 === f.enabled) || a && u.states && u.states[a] && !1 === u.states[a].enabled)) {
                    F && (y = e.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), w.styledMode || this.graphic.animate(e.pointAttribs(this, a), l(w.options.chart.animation, g.animation)), y && this.graphic.animate(y, l(w.options.chart.animation,
                        f.animation, h.animation)), r && r.hide(); else {
                        if (a && f) {
                            h = u.symbol || e.symbol;
                            r && r.currentSymbol !== h && (r = r.destroy());
                            if (r) r[b ? "animate" : "attr"]({
                                x: y.x,
                                y: y.y
                            }); else h && (e.stateMarkerGraphic = r = w.renderer.symbol(h, y.x, y.y, y.width, y.height).add(e.markerGroup), r.currentSymbol = h);
                            !w.styledMode && r && r.attr(e.pointAttribs(this, a))
                        }
                        r && (r[a && w.isInsidePlot(c, d, w.inverted) ? "show" : "hide"](), r.element.point = this)
                    }
                    (c = g.halo) && c.size ? (x || (e.halo = x = w.renderer.path().add((this.graphic || r).parentGroup)), x.show()[b ? "animate" :
                        "attr"]({d: this.haloPath(c.size)}), x.attr({
                        "class": "highcharts-halo highcharts-color-" + l(this.colorIndex, e.colorIndex) + (this.className ? " " + this.className : ""),
                        zIndex: -1
                    }), x.point = this, w.styledMode || x.attr(t({
                        fill: this.color || e.color,
                        "fill-opacity": c.opacity
                    }, c.attributes))) : x && x.point && x.point.haloPath && x.animate({d: x.point.haloPath(0)}, null, x.hide);
                    this.state = a;
                    v(this, "afterSetState")
                }
            }, haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a,
                    2 * a)
            }
        });
        t(d.prototype, {
            onMouseOver: function () {
                var a = this.chart, b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && v(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            }, onMouseOut: function () {
                var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && v(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            }, setState: function (a) {
                var b = this, c = b.options, d = b.graph,
                    e = c.states, g = c.lineWidth, c = 0;
                a = a || "";
                if (b.state !== a && ([b.group, b.markerGroup, b.dataLabelsGroup].forEach(function (c) {
                        c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                    }), b.state = a, !(b.chart.styledMode || e[a] && !1 === e[a].enabled) && (a && (g = e[a].lineWidth || g + (e[a].lineWidthPlus || 0)), d && !d.dashstyle))) for (g = {"stroke-width": g}, d.animate(g, l(e[a || "normal"] && e[a || "normal"].animation, b.chart.options.chart.animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(g),
                    c += 1
            }, setVisible: function (a, b) {
                var c = this, d = c.chart, e = c.legendItem, g, h = d.options.chart.ignoreHiddenSeries, k = c.visible;
                g = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                ["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) {
                    if (c[a]) c[a][g]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && d.series.forEach(function (a) {
                    a.options.stacking && a.visible &&
                    (a.isDirty = !0)
                });
                c.linkedSeries.forEach(function (b) {
                    b.setVisible(a, !1)
                });
                h && (d.isDirtyBox = !0);
                v(c, g);
                !1 !== b && d.redraw()
            }, show: function () {
                this.setVisible(!0)
            }, hide: function () {
                this.setVisible(!1)
            }, select: function (a) {
                this.selected = a = this.options.selected = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                v(this, a ? "select" : "unselect")
            }, drawTracker: x.drawTrackerGraph
        })
    })(I);
    (function (a) {
        var y = a.Chart, F = a.isArray, G = a.isObject, k = a.pick, c = a.splat;
        y.prototype.setResponsive = function (c, k) {
            var p =
                this.options.responsive, t = [], r = this.currentResponsive;
            !k && p && p.rules && p.rules.forEach(function (h) {
                void 0 === h._id && (h._id = a.uniqueKey());
                this.matchResponsiveRule(h, t, c)
            }, this);
            k = a.merge.apply(0, t.map(function (c) {
                return a.find(p.rules, function (a) {
                    return a._id === c
                }).chartOptions
            }));
            k.isResponsiveOptions = !0;
            t = t.toString() || void 0;
            t !== (r && r.ruleIds) && (r && this.update(r.undoOptions, c), t ? (r = this.currentOptions(k), r.isResponsiveOptions = !0, this.currentResponsive = {
                ruleIds: t,
                mergedOptions: k,
                undoOptions: r
            }, this.update(k,
                c)) : this.currentResponsive = void 0)
        };
        y.prototype.matchResponsiveRule = function (a, c) {
            var p = a.condition;
            (p.callback || function () {
                return this.chartWidth <= k(p.maxWidth, Number.MAX_VALUE) && this.chartHeight <= k(p.maxHeight, Number.MAX_VALUE) && this.chartWidth >= k(p.minWidth, 0) && this.chartHeight >= k(p.minHeight, 0)
            }).call(this) && c.push(a._id)
        };
        y.prototype.currentOptions = function (k) {
            function p(k, r, h, e) {
                var l;
                a.objectEach(k, function (a, d) {
                    if (!e && -1 < ["series", "xAxis", "yAxis"].indexOf(d)) for (a = c(a), h[d] = [], l = 0; l < a.length; l++) r[d][l] &&
                    (h[d][l] = {}, p(a[l], r[d][l], h[d][l], e + 1)); else G(a) ? (h[d] = F(a) ? [] : {}, p(a, r[d] || {}, h[d], e + 1)) : h[d] = r[d] || null
                })
            }

            var v = {};
            p(k, this.options, v, 0);
            return v
        }
    })(I);
    return I
});
//# sourceMappingURL=highcharts.js.map