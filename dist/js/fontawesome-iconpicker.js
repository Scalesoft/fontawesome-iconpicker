/*!
 * Font Awesome Icon Picker
 * https://farbelous.github.io/fontawesome-iconpicker/
 *
 * @author Javi Aguilar, itsjavi.com
 * @license MIT License
 * @see https://github.com/farbelous/fontawesome-iconpicker/blob/master/LICENSE
 */
(function(e) {
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else {
        e(jQuery);
    }
})(function(V) {
    V.ui = V.ui || {};
    var e = V.ui.version = "1.12.1";
    (function() {
        var r, y = Math.max, x = Math.abs, t = /left|center|right/, f = /top|center|bottom/, i = /[\+\-]\d+(\.[\d]+)?%?/, l = /^\w+/, c = /%$/, a = V.fn.pos;
        function q(e, a, s) {
            return [ parseFloat(e[0]) * (c.test(e[0]) ? a / 100 : 1), parseFloat(e[1]) * (c.test(e[1]) ? s / 100 : 1) ];
        }
        function C(e, a) {
            return parseInt(V.css(e, a), 10) || 0;
        }
        function s(e) {
            var a = e[0];
            if (a.nodeType === 9) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: 0,
                        left: 0
                    }
                };
            }
            if (V.isWindow(a)) {
                return {
                    width: e.width(),
                    height: e.height(),
                    offset: {
                        top: e.scrollTop(),
                        left: e.scrollLeft()
                    }
                };
            }
            if (a.preventDefault) {
                return {
                    width: 0,
                    height: 0,
                    offset: {
                        top: a.pageY,
                        left: a.pageX
                    }
                };
            }
            return {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            };
        }
        V.pos = {
            scrollbarWidth: function() {
                if (r !== undefined) {
                    return r;
                }
                var e, a, s = V("<div " + "style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'>" + "<div style='height:100px;width:auto;'></div></div>"), t = s.children()[0];
                V("body").append(s);
                e = t.offsetWidth;
                s.css("overflow", "scroll");
                a = t.offsetWidth;
                if (e === a) {
                    a = s[0].clientWidth;
                }
                s.remove();
                return r = e - a;
            },
            getScrollInfo: function(e) {
                var a = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"), s = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"), t = a === "scroll" || a === "auto" && e.width < e.element[0].scrollWidth, r = s === "scroll" || s === "auto" && e.height < e.element[0].scrollHeight;
                return {
                    width: r ? V.pos.scrollbarWidth() : 0,
                    height: t ? V.pos.scrollbarWidth() : 0
                };
            },
            getWithinInfo: function(e) {
                var a = V(e || window), s = V.isWindow(a[0]), t = !!a[0] && a[0].nodeType === 9, r = !s && !t;
                return {
                    element: a,
                    isWindow: s,
                    isDocument: t,
                    offset: r ? V(e).offset() : {
                        left: 0,
                        top: 0
                    },
                    scrollLeft: a.scrollLeft(),
                    scrollTop: a.scrollTop(),
                    width: a.outerWidth(),
                    height: a.outerHeight()
                };
            }
        };
        V.fn.pos = function(o) {
            if (!o || !o.of) {
                return a.apply(this, arguments);
            }
            o = V.extend({}, o);
            var n, T, p, u, d, e, b = V(o.of), g = V.pos.getWithinInfo(o.within), k = V.pos.getScrollInfo(g), w = (o.collision || "flip").split(" "), v = {};
            e = s(b);
            if (b[0].preventDefault) {
                o.at = "left top";
            }
            T = e.width;
            p = e.height;
            u = e.offset;
            d = V.extend({}, u);
            V.each([ "my", "at" ], function() {
                var e = (o[this] || "").split(" "), a, s;
                if (e.length === 1) {
                    e = t.test(e[0]) ? e.concat([ "center" ]) : f.test(e[0]) ? [ "center" ].concat(e) : [ "center", "center" ];
                }
                e[0] = t.test(e[0]) ? e[0] : "center";
                e[1] = f.test(e[1]) ? e[1] : "center";
                a = i.exec(e[0]);
                s = i.exec(e[1]);
                v[this] = [ a ? a[0] : 0, s ? s[0] : 0 ];
                o[this] = [ l.exec(e[0])[0], l.exec(e[1])[0] ];
            });
            if (w.length === 1) {
                w[1] = w[0];
            }
            if (o.at[0] === "right") {
                d.left += T;
            } else if (o.at[0] === "center") {
                d.left += T / 2;
            }
            if (o.at[1] === "bottom") {
                d.top += p;
            } else if (o.at[1] === "center") {
                d.top += p / 2;
            }
            n = q(v.at, T, p);
            d.left += n[0];
            d.top += n[1];
            return this.each(function() {
                var s, e, i = V(this), l = i.outerWidth(), c = i.outerHeight(), a = C(this, "marginLeft"), t = C(this, "marginTop"), r = l + a + C(this, "marginRight") + k.width, f = c + t + C(this, "marginBottom") + k.height, h = V.extend({}, d), m = q(v.my, i.outerWidth(), i.outerHeight());
                if (o.my[0] === "right") {
                    h.left -= l;
                } else if (o.my[0] === "center") {
                    h.left -= l / 2;
                }
                if (o.my[1] === "bottom") {
                    h.top -= c;
                } else if (o.my[1] === "center") {
                    h.top -= c / 2;
                }
                h.left += m[0];
                h.top += m[1];
                s = {
                    marginLeft: a,
                    marginTop: t
                };
                V.each([ "left", "top" ], function(e, a) {
                    if (V.ui.pos[w[e]]) {
                        V.ui.pos[w[e]][a](h, {
                            targetWidth: T,
                            targetHeight: p,
                            elemWidth: l,
                            elemHeight: c,
                            collisionPosition: s,
                            collisionWidth: r,
                            collisionHeight: f,
                            offset: [ n[0] + m[0], n[1] + m[1] ],
                            my: o.my,
                            at: o.at,
                            within: g,
                            elem: i
                        });
                    }
                });
                if (o.using) {
                    e = function(e) {
                        var a = u.left - h.left, s = a + T - l, t = u.top - h.top, r = t + p - c, f = {
                            target: {
                                element: b,
                                left: u.left,
                                top: u.top,
                                width: T,
                                height: p
                            },
                            element: {
                                element: i,
                                left: h.left,
                                top: h.top,
                                width: l,
                                height: c
                            },
                            horizontal: s < 0 ? "left" : a > 0 ? "right" : "center",
                            vertical: r < 0 ? "top" : t > 0 ? "bottom" : "middle"
                        };
                        if (T < l && x(a + s) < T) {
                            f.horizontal = "center";
                        }
                        if (p < c && x(t + r) < p) {
                            f.vertical = "middle";
                        }
                        if (y(x(a), x(s)) > y(x(t), x(r))) {
                            f.important = "horizontal";
                        } else {
                            f.important = "vertical";
                        }
                        o.using.call(this, e, f);
                    };
                }
                i.offset(V.extend(h, {
                    using: e
                }));
            });
        };
        V.ui.pos = {
            _trigger: function(e, a, s, t) {
                if (a.elem) {
                    a.elem.trigger({
                        type: s,
                        position: e,
                        positionData: a,
                        triggered: t
                    });
                }
            },
            fit: {
                left: function(e, a) {
                    V.ui.pos._trigger(e, a, "posCollide", "fitLeft");
                    var s = a.within, t = s.isWindow ? s.scrollLeft : s.offset.left, r = s.width, f = e.left - a.collisionPosition.marginLeft, i = t - f, l = f + a.collisionWidth - r - t, c;
                    if (a.collisionWidth > r) {
                        if (i > 0 && l <= 0) {
                            c = e.left + i + a.collisionWidth - r - t;
                            e.left += i - c;
                        } else if (l > 0 && i <= 0) {
                            e.left = t;
                        } else {
                            if (i > l) {
                                e.left = t + r - a.collisionWidth;
                            } else {
                                e.left = t;
                            }
                        }
                    } else if (i > 0) {
                        e.left += i;
                    } else if (l > 0) {
                        e.left -= l;
                    } else {
                        e.left = y(e.left - f, e.left);
                    }
                    V.ui.pos._trigger(e, a, "posCollided", "fitLeft");
                },
                top: function(e, a) {
                    V.ui.pos._trigger(e, a, "posCollide", "fitTop");
                    var s = a.within, t = s.isWindow ? s.scrollTop : s.offset.top, r = a.within.height, f = e.top - a.collisionPosition.marginTop, i = t - f, l = f + a.collisionHeight - r - t, c;
                    if (a.collisionHeight > r) {
                        if (i > 0 && l <= 0) {
                            c = e.top + i + a.collisionHeight - r - t;
                            e.top += i - c;
                        } else if (l > 0 && i <= 0) {
                            e.top = t;
                        } else {
                            if (i > l) {
                                e.top = t + r - a.collisionHeight;
                            } else {
                                e.top = t;
                            }
                        }
                    } else if (i > 0) {
                        e.top += i;
                    } else if (l > 0) {
                        e.top -= l;
                    } else {
                        e.top = y(e.top - f, e.top);
                    }
                    V.ui.pos._trigger(e, a, "posCollided", "fitTop");
                }
            },
            flip: {
                left: function(e, a) {
                    V.ui.pos._trigger(e, a, "posCollide", "flipLeft");
                    var s = a.within, t = s.offset.left + s.scrollLeft, r = s.width, f = s.isWindow ? s.scrollLeft : s.offset.left, i = e.left - a.collisionPosition.marginLeft, l = i - f, c = i + a.collisionWidth - r - f, h = a.my[0] === "left" ? -a.elemWidth : a.my[0] === "right" ? a.elemWidth : 0, m = a.at[0] === "left" ? a.targetWidth : a.at[0] === "right" ? -a.targetWidth : 0, o = -2 * a.offset[0], n, T;
                    if (l < 0) {
                        n = e.left + h + m + o + a.collisionWidth - r - t;
                        if (n < 0 || n < x(l)) {
                            e.left += h + m + o;
                        }
                    } else if (c > 0) {
                        T = e.left - a.collisionPosition.marginLeft + h + m + o - f;
                        if (T > 0 || x(T) < c) {
                            e.left += h + m + o;
                        }
                    }
                    V.ui.pos._trigger(e, a, "posCollided", "flipLeft");
                },
                top: function(e, a) {
                    V.ui.pos._trigger(e, a, "posCollide", "flipTop");
                    var s = a.within, t = s.offset.top + s.scrollTop, r = s.height, f = s.isWindow ? s.scrollTop : s.offset.top, i = e.top - a.collisionPosition.marginTop, l = i - f, c = i + a.collisionHeight - r - f, h = a.my[1] === "top", m = h ? -a.elemHeight : a.my[1] === "bottom" ? a.elemHeight : 0, o = a.at[1] === "top" ? a.targetHeight : a.at[1] === "bottom" ? -a.targetHeight : 0, n = -2 * a.offset[1], T, p;
                    if (l < 0) {
                        p = e.top + m + o + n + a.collisionHeight - r - t;
                        if (p < 0 || p < x(l)) {
                            e.top += m + o + n;
                        }
                    } else if (c > 0) {
                        T = e.top - a.collisionPosition.marginTop + m + o + n - f;
                        if (T > 0 || x(T) < c) {
                            e.top += m + o + n;
                        }
                    }
                    V.ui.pos._trigger(e, a, "posCollided", "flipTop");
                }
            },
            flipfit: {
                left: function() {
                    V.ui.pos.flip.left.apply(this, arguments);
                    V.ui.pos.fit.left.apply(this, arguments);
                },
                top: function() {
                    V.ui.pos.flip.top.apply(this, arguments);
                    V.ui.pos.fit.top.apply(this, arguments);
                }
            }
        };
        (function() {
            var e, a, s, t, r, f = document.getElementsByTagName("body")[0], i = document.createElement("div");
            e = document.createElement(f ? "div" : "body");
            s = {
                visibility: "hidden",
                width: 0,
                height: 0,
                border: 0,
                margin: 0,
                background: "none"
            };
            if (f) {
                V.extend(s, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
            }
            for (r in s) {
                e.style[r] = s[r];
            }
            e.appendChild(i);
            a = f || document.documentElement;
            a.insertBefore(e, a.firstChild);
            i.style.cssText = "position: absolute; left: 10.7432222px;";
            t = V(i).offset().left;
            V.support.offsetFractions = t > 10 && t < 11;
            e.innerHTML = "";
            a.removeChild(e);
        })();
    })();
    var a = V.ui.position;
});

(function(e) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        define([ "jquery" ], e);
    } else if (window.jQuery && !window.jQuery.fn.iconpicker) {
        e(window.jQuery);
    }
})(function(c) {
    "use strict";
    var i = {
        isEmpty: function(e) {
            return e === false || e === "" || e === null || e === undefined;
        },
        isEmptyObject: function(e) {
            return this.isEmpty(e) === true || e.length === 0;
        },
        isElement: function(e) {
            return c(e).length > 0;
        },
        isString: function(e) {
            return typeof e === "string" || e instanceof String;
        },
        isArray: function(e) {
            return c.isArray(e);
        },
        inArray: function(e, a) {
            return c.inArray(e, a) !== -1;
        },
        throwError: function(e) {
            throw "Font Awesome Icon Picker Exception: " + e;
        }
    };
    var s = function(e, a) {
        this._id = s._idCounter++;
        this.element = c(e).addClass("iconpicker-element");
        this._trigger("iconpickerCreate", {
            iconpickerValue: this.iconpickerValue
        });
        this.options = c.extend({}, s.defaultOptions, this.element.data(), a);
        this.options.templates = c.extend({}, s.defaultOptions.templates, this.options.templates);
        this.options.originalPlacement = this.options.placement;
        this.container = i.isElement(this.options.container) ? c(this.options.container) : false;
        if (this.container === false) {
            if (this.element.is(".dropdown-toggle")) {
                this.container = c("~ .dropdown-menu:first", this.element);
            } else {
                this.container = this.element.is("input,textarea,button,.btn") ? this.element.parent() : this.element;
            }
        }
        this.container.addClass("iconpicker-container");
        if (this.isDropdownMenu()) {
            this.options.placement = "inline";
        }
        this.input = this.element.is("input,textarea") ? this.element.addClass("iconpicker-input") : false;
        if (this.input === false) {
            this.input = this.container.find(this.options.input);
            if (!this.input.is("input,textarea")) {
                this.input = false;
            }
        }
        this.component = this.isDropdownMenu() ? this.container.parent().find(this.options.component) : this.container.find(this.options.component);
        if (this.component.length === 0) {
            this.component = false;
        } else {
            this.component.find("i").addClass("iconpicker-component");
        }
        this._createPopover();
        this._createIconpicker();
        if (this.getAcceptButton().length === 0) {
            this.options.mustAccept = false;
        }
        if (this.isInputGroup()) {
            this.container.parent().append(this.popover);
        } else {
            this.container.append(this.popover);
        }
        this._bindElementEvents();
        this._bindWindowEvents();
        this.update(this.options.selected);
        if (this.isInline()) {
            this.show();
        }
        this._trigger("iconpickerCreated", {
            iconpickerValue: this.iconpickerValue
        });
    };
    s._idCounter = 0;
    s.defaultOptions = {
        title: false,
        selected: false,
        defaultValue: false,
        placement: "bottom",
        collision: "none",
        animation: true,
        hideOnSelect: false,
        showFooter: false,
        searchInFooter: false,
        mustAccept: false,
        selectedCustomClass: "bg-primary",
        icons: [],
        fullClassFormatter: function(e) {
            return e;
        },
        input: "input,.iconpicker-input",
        inputSearch: false,
        container: false,
        component: ".input-group-addon,.iconpicker-component",
        templates: {
            popover: '<div class="iconpicker-popover popover"><div class="arrow"></div>' + '<div class="popover-title"></div><div class="popover-content"></div></div>',
            footer: '<div class="popover-footer"></div>',
            buttons: '<button class="iconpicker-btn iconpicker-btn-cancel btn btn-default btn-sm">Cancel</button>' + ' <button class="iconpicker-btn iconpicker-btn-accept btn btn-primary btn-sm">Accept</button>',
            search: '<input type="search" class="form-control iconpicker-search" placeholder="Type to filter" />',
            iconpicker: '<div class="iconpicker"><div class="iconpicker-items"></div></div>',
            iconpickerItem: '<a role="button" href="javascript:;" class="iconpicker-item"><i></i></a>'
        }
    };
    s.batch = function(e, a) {
        var s = Array.prototype.slice.call(arguments, 2);
        return c(e).each(function() {
            var e = c(this).data("iconpicker");
            if (!!e) {
                e[a].apply(e, s);
            }
        });
    };
    s.prototype = {
        constructor: s,
        options: {},
        _id: 0,
        _trigger: function(e, a) {
            a = a || {};
            this.element.trigger(c.extend({
                type: e,
                iconpickerInstance: this
            }, a));
        },
        _createPopover: function() {
            this.popover = c(this.options.templates.popover);
            var e = this.popover.find(".popover-title");
            if (!!this.options.title) {
                e.append(c('<div class="popover-title-text">' + this.options.title + "</div>"));
            }
            if (this.hasSeparatedSearchInput() && !this.options.searchInFooter) {
                e.append(this.options.templates.search);
            } else if (!this.options.title) {
                e.remove();
            }
            if (this.options.showFooter && !i.isEmpty(this.options.templates.footer)) {
                var a = c(this.options.templates.footer);
                if (this.hasSeparatedSearchInput() && this.options.searchInFooter) {
                    a.append(c(this.options.templates.search));
                }
                if (!i.isEmpty(this.options.templates.buttons)) {
                    a.append(c(this.options.templates.buttons));
                }
                this.popover.append(a);
            }
            if (this.options.animation === true) {
                this.popover.addClass("fade");
            }
            return this.popover;
        },
        _createIconpicker: function() {
            var s = this;
            this.iconpicker = c(this.options.templates.iconpicker);
            var e = function(e) {
                var a = c(this);
                if (a.is("i")) {
                    a = a.parent();
                }
                s._trigger("iconpickerSelect", {
                    iconpickerItem: a,
                    iconpickerValue: s.iconpickerValue
                });
                if (s.options.mustAccept === false) {
                    s.update(a.data("iconpickerValue"));
                    s._trigger("iconpickerSelected", {
                        iconpickerItem: this,
                        iconpickerValue: s.iconpickerValue
                    });
                } else {
                    s.update(a.data("iconpickerValue"), true);
                }
                if (s.options.hideOnSelect && s.options.mustAccept === false) {
                    s.hide();
                }
            };
            var a = c(this.options.templates.iconpickerItem);
            var t = [];
            for (var r in this.options.icons) {
                if (typeof this.options.icons[r].title === "string") {
                    var f = a.clone();
                    f.find("i").addClass(this.options.fullClassFormatter(this.options.icons[r].title));
                    f.data("iconpickerValue", this.options.icons[r].title).on("click.iconpicker", e);
                    f.attr("title", "." + this.options.icons[r].title);
                    if (this.options.icons[r].searchTerms.length > 0) {
                        var i = "";
                        for (var l = 0; l < this.options.icons[r].searchTerms.length; l++) {
                            i = i + this.options.icons[r].searchTerms[l] + " ";
                        }
                        f.attr("data-search-terms", i);
                    }
                    t.push(f);
                }
            }
            this.iconpicker.find(".iconpicker-items").append(t);
            this.popover.find(".popover-content").append(this.iconpicker);
            return this.iconpicker;
        },
        _isEventInsideIconpicker: function(e) {
            var a = c(e.target);
            if ((!a.hasClass("iconpicker-element") || a.hasClass("iconpicker-element") && !a.is(this.element)) && a.parents(".iconpicker-popover").length === 0) {
                return false;
            }
            return true;
        },
        _bindElementEvents: function() {
            var a = this;
            this.getSearchInput().on("keyup.iconpicker", function() {
                a.filter(c(this).val().toLowerCase());
            });
            this.getAcceptButton().on("click.iconpicker", function() {
                var e = a.iconpicker.find(".iconpicker-selected").get(0);
                a.update(a.iconpickerValue);
                a._trigger("iconpickerSelected", {
                    iconpickerItem: e,
                    iconpickerValue: a.iconpickerValue
                });
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.getCancelButton().on("click.iconpicker", function() {
                if (!a.isInline()) {
                    a.hide();
                }
            });
            this.element.on("focus.iconpicker", function(e) {
                a.show();
                e.stopPropagation();
            });
            if (this.hasComponent()) {
                this.component.on("click.iconpicker", function() {
                    a.toggle();
                });
            }
            if (this.hasInput()) {
                this.input.on("keyup.iconpicker", function(e) {
                    if (!i.inArray(e.keyCode, [ 38, 40, 37, 39, 16, 17, 18, 9, 8, 91, 93, 20, 46, 186, 190, 46, 78, 188, 44, 86 ])) {
                        a.update();
                    } else {
                        a._updateFormGroupStatus(a.getValid(this.value) !== false);
                    }
                    if (a.options.inputSearch === true) {
                        a.filter(c(this).val().toLowerCase());
                    }
                });
            }
        },
        _bindWindowEvents: function() {
            var e = c(window.document);
            var a = this;
            var s = ".iconpicker.inst" + this._id;
            c(window).on("resize.iconpicker" + s + " orientationchange.iconpicker" + s, function(e) {
                if (a.popover.hasClass("in")) {
                    a.updatePlacement();
                }
            });
            if (!a.isInline()) {
                e.on("mouseup" + s, function(e) {
                    if (!a._isEventInsideIconpicker(e) && !a.isInline()) {
                        a.hide();
                    }
                });
            }
        },
        _unbindElementEvents: function() {
            this.popover.off(".iconpicker");
            this.element.off(".iconpicker");
            if (this.hasInput()) {
                this.input.off(".iconpicker");
            }
            if (this.hasComponent()) {
                this.component.off(".iconpicker");
            }
            if (this.hasContainer()) {
                this.container.off(".iconpicker");
            }
        },
        _unbindWindowEvents: function() {
            c(window).off(".iconpicker.inst" + this._id);
            c(window.document).off(".iconpicker.inst" + this._id);
        },
        updatePlacement: function(e, a) {
            e = e || this.options.placement;
            this.options.placement = e;
            a = a || this.options.collision;
            a = a === true ? "flip" : a;
            var s = {
                at: "right bottom",
                my: "right top",
                of: this.hasInput() && !this.isInputGroup() ? this.input : this.container,
                collision: a === true ? "flip" : a,
                within: window
            };
            this.popover.removeClass("inline topLeftCorner topLeft top topRight topRightCorner " + "rightTop right rightBottom bottomRight bottomRightCorner " + "bottom bottomLeft bottomLeftCorner leftBottom left leftTop");
            if (typeof e === "object") {
                return this.popover.pos(c.extend({}, s, e));
            }
            switch (e) {
              case "inline":
                {
                    s = false;
                }
                break;

              case "topLeftCorner":
                {
                    s.my = "right bottom";
                    s.at = "left top";
                }
                break;

              case "topLeft":
                {
                    s.my = "left bottom";
                    s.at = "left top";
                }
                break;

              case "top":
                {
                    s.my = "center bottom";
                    s.at = "center top";
                }
                break;

              case "topRight":
                {
                    s.my = "right bottom";
                    s.at = "right top";
                }
                break;

              case "topRightCorner":
                {
                    s.my = "left bottom";
                    s.at = "right top";
                }
                break;

              case "rightTop":
                {
                    s.my = "left bottom";
                    s.at = "right center";
                }
                break;

              case "right":
                {
                    s.my = "left center";
                    s.at = "right center";
                }
                break;

              case "rightBottom":
                {
                    s.my = "left top";
                    s.at = "right center";
                }
                break;

              case "bottomRightCorner":
                {
                    s.my = "left top";
                    s.at = "right bottom";
                }
                break;

              case "bottomRight":
                {
                    s.my = "right top";
                    s.at = "right bottom";
                }
                break;

              case "bottom":
                {
                    s.my = "center top";
                    s.at = "center bottom";
                }
                break;

              case "bottomLeft":
                {
                    s.my = "left top";
                    s.at = "left bottom";
                }
                break;

              case "bottomLeftCorner":
                {
                    s.my = "right top";
                    s.at = "left bottom";
                }
                break;

              case "leftBottom":
                {
                    s.my = "right top";
                    s.at = "left center";
                }
                break;

              case "left":
                {
                    s.my = "right center";
                    s.at = "left center";
                }
                break;

              case "leftTop":
                {
                    s.my = "right bottom";
                    s.at = "left center";
                }
                break;

              default:
                {
                    return false;
                }
                break;
            }
            this.popover.css({
                display: this.options.placement === "inline" ? "" : "block"
            });
            if (s !== false) {
                this.popover.pos(s).css("maxWidth", c(window).width() - this.container.offset().left - 5);
            } else {
                this.popover.css({
                    top: "auto",
                    right: "auto",
                    bottom: "auto",
                    left: "auto",
                    maxWidth: "none"
                });
            }
            this.popover.addClass(this.options.placement);
            return true;
        },
        _updateComponents: function() {
            this.iconpicker.find(".iconpicker-item.iconpicker-selected").removeClass("iconpicker-selected " + this.options.selectedCustomClass);
            if (this.iconpickerValue) {
                this.iconpicker.find("." + this.options.fullClassFormatter(this.iconpickerValue).replace(/ /g, ".")).parent().addClass("iconpicker-selected " + this.options.selectedCustomClass);
            }
            if (this.hasComponent()) {
                var e = this.component.find("i");
                if (e.length > 0) {
                    e.attr("class", this.options.fullClassFormatter(this.iconpickerValue));
                } else {
                    this.component.html(this.getHtml());
                }
            }
        },
        _updateFormGroupStatus: function(e) {
            if (this.hasInput()) {
                if (e !== false) {
                    this.input.parents(".form-group:first").removeClass("has-error");
                } else {
                    this.input.parents(".form-group:first").addClass("has-error");
                }
                return true;
            }
            return false;
        },
        getValid: function(e) {
            if (!i.isString(e)) {
                e = "";
            }
            var a = e === "";
            e = c.trim(e);
            var s = false;
            for (var t = 0; t < this.options.icons.length; t++) {
                if (this.options.icons[t].title === e) {
                    s = true;
                    break;
                }
            }
            if (s || a) {
                return e;
            }
            return false;
        },
        setValue: function(e) {
            var a = this.getValid(e);
            if (a !== false) {
                this.iconpickerValue = a;
                this._trigger("iconpickerSetValue", {
                    iconpickerValue: a
                });
                return this.iconpickerValue;
            } else {
                this._trigger("iconpickerInvalid", {
                    iconpickerValue: e
                });
                return false;
            }
        },
        getHtml: function() {
            return '<i class="' + this.options.fullClassFormatter(this.iconpickerValue) + '"></i>';
        },
        setSourceValue: function(e) {
            e = this.setValue(e);
            if (e !== false && e !== "") {
                if (this.hasInput()) {
                    this.input.val(this.iconpickerValue);
                } else {
                    this.element.data("iconpickerValue", this.iconpickerValue);
                }
                this._trigger("iconpickerSetSourceValue", {
                    iconpickerValue: e
                });
            }
            return e;
        },
        getSourceValue: function(e) {
            e = e || this.options.defaultValue;
            var a = e;
            if (this.hasInput()) {
                a = this.input.val();
            } else {
                a = this.element.data("iconpickerValue");
            }
            if (a === undefined || a === "" || a === null || a === false) {
                a = e;
            }
            return a;
        },
        hasInput: function() {
            return this.input !== false;
        },
        isInputSearch: function() {
            return this.hasInput() && this.options.inputSearch === true;
        },
        isInputGroup: function() {
            return this.container.is(".input-group");
        },
        isDropdownMenu: function() {
            return this.container.is(".dropdown-menu");
        },
        hasSeparatedSearchInput: function() {
            return this.options.templates.search !== false && !this.isInputSearch();
        },
        hasComponent: function() {
            return this.component !== false;
        },
        hasContainer: function() {
            return this.container !== false;
        },
        getAcceptButton: function() {
            return this.popover.find(".iconpicker-btn-accept");
        },
        getCancelButton: function() {
            return this.popover.find(".iconpicker-btn-cancel");
        },
        getSearchInput: function() {
            return this.popover.find(".iconpicker-search");
        },
        filter: function(r) {
            if (i.isEmpty(r)) {
                this.iconpicker.find(".iconpicker-item").show();
                return c(false);
            } else {
                var f = [];
                this.iconpicker.find(".iconpicker-item").each(function() {
                    var e = c(this);
                    var a = e.attr("title").toLowerCase();
                    var s = e.attr("data-search-terms") ? e.attr("data-search-terms").toLowerCase() : "";
                    a = a + " " + s;
                    var t = false;
                    try {
                        t = new RegExp("(^|\\W)" + r, "g");
                    } catch (e) {
                        t = false;
                    }
                    if (t !== false && a.match(t)) {
                        f.push(e);
                        e.show();
                    } else {
                        e.hide();
                    }
                });
                return f;
            }
        },
        show: function() {
            if (this.popover.hasClass("in")) {
                return false;
            }
            c.iconpicker.batch(c(".iconpicker-popover.in:not(.inline)").not(this.popover), "hide");
            this._trigger("iconpickerShow", {
                iconpickerValue: this.iconpickerValue
            });
            this.updatePlacement();
            this.popover.addClass("in");
            setTimeout(c.proxy(function() {
                this.popover.css("display", this.isInline() ? "" : "block");
                this._trigger("iconpickerShown", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        hide: function() {
            if (!this.popover.hasClass("in")) {
                return false;
            }
            this._trigger("iconpickerHide", {
                iconpickerValue: this.iconpickerValue
            });
            this.popover.removeClass("in");
            setTimeout(c.proxy(function() {
                this.popover.css("display", "none");
                this.getSearchInput().val("");
                this.filter("");
                this._trigger("iconpickerHidden", {
                    iconpickerValue: this.iconpickerValue
                });
            }, this), this.options.animation ? 300 : 1);
        },
        toggle: function() {
            if (this.popover.is(":visible")) {
                this.hide();
            } else {
                this.show(true);
            }
        },
        update: function(e, a) {
            e = e ? e : this.getSourceValue(this.iconpickerValue);
            this._trigger("iconpickerUpdate", {
                iconpickerValue: this.iconpickerValue
            });
            if (a === true) {
                e = this.setValue(e);
            } else {
                e = this.setSourceValue(e);
                this._updateFormGroupStatus(e !== false);
            }
            if (e !== false) {
                this._updateComponents();
            }
            this._trigger("iconpickerUpdated", {
                iconpickerValue: this.iconpickerValue
            });
            return e;
        },
        destroy: function() {
            this._trigger("iconpickerDestroy", {
                iconpickerValue: this.iconpickerValue
            });
            this.element.removeData("iconpicker").removeData("iconpickerValue").removeClass("iconpicker-element");
            this._unbindElementEvents();
            this._unbindWindowEvents();
            c(this.popover).remove();
            this._trigger("iconpickerDestroyed", {
                iconpickerValue: this.iconpickerValue
            });
        },
        disable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", true);
                return true;
            }
            return false;
        },
        enable: function() {
            if (this.hasInput()) {
                this.input.prop("disabled", false);
                return true;
            }
            return false;
        },
        isDisabled: function() {
            if (this.hasInput()) {
                return this.input.prop("disabled") === true;
            }
            return false;
        },
        isInline: function() {
            return this.options.placement === "inline" || this.popover.hasClass("inline");
        }
    };
    c.iconpicker = s;
    c.fn.iconpicker = function(a) {
        return this.each(function() {
            var e = c(this);
            if (!e.data("iconpicker")) {
                e.data("iconpicker", new s(this, typeof a === "object" ? a : {}));
            }
        });
    };
    s.defaultOptions = c.extend(s.defaultOptions, {
        icons: [ {
            title: "fas fa-0",
            searchTerms: []
        }, {
            title: "fas fa-1",
            searchTerms: []
        }, {
            title: "fas fa-2",
            searchTerms: []
        }, {
            title: "fas fa-3",
            searchTerms: []
        }, {
            title: "fas fa-4",
            searchTerms: []
        }, {
            title: "fas fa-5",
            searchTerms: []
        }, {
            title: "fas fa-6",
            searchTerms: []
        }, {
            title: "fas fa-7",
            searchTerms: []
        }, {
            title: "fas fa-8",
            searchTerms: []
        }, {
            title: "fas fa-9",
            searchTerms: []
        }, {
            title: "fab fa-42-group",
            searchTerms: []
        }, {
            title: "fab fa-500px",
            searchTerms: []
        }, {
            title: "fas fa-a",
            searchTerms: []
        }, {
            title: "fab fa-accessible-icon",
            searchTerms: []
        }, {
            title: "fab fa-accusoft",
            searchTerms: []
        }, {
            title: "fas fa-address-book",
            searchTerms: []
        }, {
            title: "far fa-address-book",
            searchTerms: []
        }, {
            title: "fas fa-address-card",
            searchTerms: []
        }, {
            title: "far fa-address-card",
            searchTerms: []
        }, {
            title: "fab fa-adn",
            searchTerms: []
        }, {
            title: "fab fa-adversal",
            searchTerms: []
        }, {
            title: "fab fa-affiliatetheme",
            searchTerms: []
        }, {
            title: "fab fa-airbnb",
            searchTerms: []
        }, {
            title: "fab fa-algolia",
            searchTerms: []
        }, {
            title: "fas fa-align-center",
            searchTerms: []
        }, {
            title: "fas fa-align-justify",
            searchTerms: []
        }, {
            title: "fas fa-align-left",
            searchTerms: []
        }, {
            title: "fas fa-align-right",
            searchTerms: []
        }, {
            title: "fab fa-alipay",
            searchTerms: []
        }, {
            title: "fab fa-amazon",
            searchTerms: []
        }, {
            title: "fab fa-amazon-pay",
            searchTerms: []
        }, {
            title: "fab fa-amilia",
            searchTerms: []
        }, {
            title: "fas fa-anchor",
            searchTerms: []
        }, {
            title: "fas fa-anchor-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-anchor-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-anchor-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-anchor-lock",
            searchTerms: []
        }, {
            title: "fab fa-android",
            searchTerms: []
        }, {
            title: "fab fa-angellist",
            searchTerms: []
        }, {
            title: "fas fa-angle-down",
            searchTerms: []
        }, {
            title: "fas fa-angle-left",
            searchTerms: []
        }, {
            title: "fas fa-angle-right",
            searchTerms: []
        }, {
            title: "fas fa-angle-up",
            searchTerms: []
        }, {
            title: "fas fa-angles-down",
            searchTerms: []
        }, {
            title: "fas fa-angles-left",
            searchTerms: []
        }, {
            title: "fas fa-angles-right",
            searchTerms: []
        }, {
            title: "fas fa-angles-up",
            searchTerms: []
        }, {
            title: "fab fa-angrycreative",
            searchTerms: []
        }, {
            title: "fab fa-angular",
            searchTerms: []
        }, {
            title: "fas fa-ankh",
            searchTerms: []
        }, {
            title: "fab fa-app-store",
            searchTerms: []
        }, {
            title: "fab fa-app-store-ios",
            searchTerms: []
        }, {
            title: "fab fa-apper",
            searchTerms: []
        }, {
            title: "fab fa-apple",
            searchTerms: []
        }, {
            title: "fab fa-apple-pay",
            searchTerms: []
        }, {
            title: "fas fa-apple-whole",
            searchTerms: []
        }, {
            title: "fas fa-archway",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down-1-9",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down-9-1",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down-a-z",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down-long",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down-short-wide",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down-up-across-line",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down-up-lock",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down-wide-short",
            searchTerms: []
        }, {
            title: "fas fa-arrow-down-z-a",
            searchTerms: []
        }, {
            title: "fas fa-arrow-left",
            searchTerms: []
        }, {
            title: "fas fa-arrow-left-long",
            searchTerms: []
        }, {
            title: "fas fa-arrow-pointer",
            searchTerms: []
        }, {
            title: "fas fa-arrow-right",
            searchTerms: []
        }, {
            title: "fas fa-arrow-right-arrow-left",
            searchTerms: []
        }, {
            title: "fas fa-arrow-right-from-bracket",
            searchTerms: []
        }, {
            title: "fas fa-arrow-right-long",
            searchTerms: []
        }, {
            title: "fas fa-arrow-right-to-bracket",
            searchTerms: []
        }, {
            title: "fas fa-arrow-right-to-city",
            searchTerms: []
        }, {
            title: "fas fa-arrow-rotate-left",
            searchTerms: []
        }, {
            title: "fas fa-arrow-rotate-right",
            searchTerms: []
        }, {
            title: "fas fa-arrow-trend-down",
            searchTerms: []
        }, {
            title: "fas fa-arrow-trend-up",
            searchTerms: []
        }, {
            title: "fas fa-arrow-turn-down",
            searchTerms: []
        }, {
            title: "fas fa-arrow-turn-up",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-1-9",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-9-1",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-a-z",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-from-bracket",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-from-ground-water",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-from-water-pump",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-long",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-right-dots",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-right-from-square",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-short-wide",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-wide-short",
            searchTerms: []
        }, {
            title: "fas fa-arrow-up-z-a",
            searchTerms: []
        }, {
            title: "fas fa-arrows-down-to-line",
            searchTerms: []
        }, {
            title: "fas fa-arrows-down-to-people",
            searchTerms: []
        }, {
            title: "fas fa-arrows-left-right",
            searchTerms: []
        }, {
            title: "fas fa-arrows-left-right-to-line",
            searchTerms: []
        }, {
            title: "fas fa-arrows-rotate",
            searchTerms: []
        }, {
            title: "fas fa-arrows-spin",
            searchTerms: []
        }, {
            title: "fas fa-arrows-split-up-and-left",
            searchTerms: []
        }, {
            title: "fas fa-arrows-to-circle",
            searchTerms: []
        }, {
            title: "fas fa-arrows-to-dot",
            searchTerms: []
        }, {
            title: "fas fa-arrows-to-eye",
            searchTerms: []
        }, {
            title: "fas fa-arrows-turn-right",
            searchTerms: []
        }, {
            title: "fas fa-arrows-turn-to-dots",
            searchTerms: []
        }, {
            title: "fas fa-arrows-up-down",
            searchTerms: []
        }, {
            title: "fas fa-arrows-up-down-left-right",
            searchTerms: []
        }, {
            title: "fas fa-arrows-up-to-line",
            searchTerms: []
        }, {
            title: "fab fa-artstation",
            searchTerms: []
        }, {
            title: "fas fa-asterisk",
            searchTerms: []
        }, {
            title: "fab fa-asymmetrik",
            searchTerms: []
        }, {
            title: "fas fa-at",
            searchTerms: []
        }, {
            title: "fab fa-atlassian",
            searchTerms: []
        }, {
            title: "fas fa-atom",
            searchTerms: []
        }, {
            title: "fab fa-audible",
            searchTerms: []
        }, {
            title: "fas fa-audio-description",
            searchTerms: []
        }, {
            title: "fas fa-austral-sign",
            searchTerms: []
        }, {
            title: "fab fa-autoprefixer",
            searchTerms: []
        }, {
            title: "fab fa-avianex",
            searchTerms: []
        }, {
            title: "fab fa-aviato",
            searchTerms: []
        }, {
            title: "fas fa-award",
            searchTerms: []
        }, {
            title: "fab fa-aws",
            searchTerms: []
        }, {
            title: "fas fa-b",
            searchTerms: []
        }, {
            title: "fas fa-baby",
            searchTerms: []
        }, {
            title: "fas fa-baby-carriage",
            searchTerms: []
        }, {
            title: "fas fa-backward",
            searchTerms: []
        }, {
            title: "fas fa-backward-fast",
            searchTerms: []
        }, {
            title: "fas fa-backward-step",
            searchTerms: []
        }, {
            title: "fas fa-bacon",
            searchTerms: []
        }, {
            title: "fas fa-bacteria",
            searchTerms: []
        }, {
            title: "fas fa-bacterium",
            searchTerms: []
        }, {
            title: "fas fa-bag-shopping",
            searchTerms: []
        }, {
            title: "fas fa-bahai",
            searchTerms: []
        }, {
            title: "fas fa-baht-sign",
            searchTerms: []
        }, {
            title: "fas fa-ban",
            searchTerms: []
        }, {
            title: "fas fa-ban-smoking",
            searchTerms: []
        }, {
            title: "fas fa-bandage",
            searchTerms: []
        }, {
            title: "fab fa-bandcamp",
            searchTerms: []
        }, {
            title: "fas fa-barcode",
            searchTerms: []
        }, {
            title: "fas fa-bars",
            searchTerms: []
        }, {
            title: "fas fa-bars-progress",
            searchTerms: []
        }, {
            title: "fas fa-bars-staggered",
            searchTerms: []
        }, {
            title: "fas fa-baseball",
            searchTerms: []
        }, {
            title: "fas fa-baseball-bat-ball",
            searchTerms: []
        }, {
            title: "fas fa-basket-shopping",
            searchTerms: []
        }, {
            title: "fas fa-basketball",
            searchTerms: []
        }, {
            title: "fas fa-bath",
            searchTerms: []
        }, {
            title: "fas fa-battery-empty",
            searchTerms: []
        }, {
            title: "fas fa-battery-full",
            searchTerms: []
        }, {
            title: "fas fa-battery-half",
            searchTerms: []
        }, {
            title: "fas fa-battery-quarter",
            searchTerms: []
        }, {
            title: "fas fa-battery-three-quarters",
            searchTerms: []
        }, {
            title: "fab fa-battle-net",
            searchTerms: []
        }, {
            title: "fas fa-bed",
            searchTerms: []
        }, {
            title: "fas fa-bed-pulse",
            searchTerms: []
        }, {
            title: "fas fa-beer-mug-empty",
            searchTerms: []
        }, {
            title: "fab fa-behance",
            searchTerms: []
        }, {
            title: "fab fa-behance-square",
            searchTerms: []
        }, {
            title: "fas fa-bell",
            searchTerms: []
        }, {
            title: "far fa-bell",
            searchTerms: []
        }, {
            title: "fas fa-bell-concierge",
            searchTerms: []
        }, {
            title: "fas fa-bell-slash",
            searchTerms: []
        }, {
            title: "far fa-bell-slash",
            searchTerms: []
        }, {
            title: "fas fa-bezier-curve",
            searchTerms: []
        }, {
            title: "fas fa-bicycle",
            searchTerms: []
        }, {
            title: "fab fa-bilibili",
            searchTerms: []
        }, {
            title: "fab fa-bimobject",
            searchTerms: []
        }, {
            title: "fas fa-binoculars",
            searchTerms: []
        }, {
            title: "fas fa-biohazard",
            searchTerms: []
        }, {
            title: "fab fa-bitbucket",
            searchTerms: []
        }, {
            title: "fab fa-bitcoin",
            searchTerms: []
        }, {
            title: "fas fa-bitcoin-sign",
            searchTerms: []
        }, {
            title: "fab fa-bity",
            searchTerms: []
        }, {
            title: "fab fa-black-tie",
            searchTerms: []
        }, {
            title: "fab fa-blackberry",
            searchTerms: []
        }, {
            title: "fas fa-blender",
            searchTerms: []
        }, {
            title: "fas fa-blender-phone",
            searchTerms: []
        }, {
            title: "fas fa-blog",
            searchTerms: []
        }, {
            title: "fab fa-blogger",
            searchTerms: []
        }, {
            title: "fab fa-blogger-b",
            searchTerms: []
        }, {
            title: "fab fa-bluetooth",
            searchTerms: []
        }, {
            title: "fab fa-bluetooth-b",
            searchTerms: []
        }, {
            title: "fas fa-bold",
            searchTerms: []
        }, {
            title: "fas fa-bolt",
            searchTerms: []
        }, {
            title: "fas fa-bolt-lightning",
            searchTerms: []
        }, {
            title: "fas fa-bomb",
            searchTerms: []
        }, {
            title: "fas fa-bone",
            searchTerms: []
        }, {
            title: "fas fa-bong",
            searchTerms: []
        }, {
            title: "fas fa-book",
            searchTerms: []
        }, {
            title: "fas fa-book-atlas",
            searchTerms: []
        }, {
            title: "fas fa-book-bible",
            searchTerms: []
        }, {
            title: "fas fa-book-bookmark",
            searchTerms: []
        }, {
            title: "fas fa-book-journal-whills",
            searchTerms: []
        }, {
            title: "fas fa-book-medical",
            searchTerms: []
        }, {
            title: "fas fa-book-open",
            searchTerms: []
        }, {
            title: "fas fa-book-open-reader",
            searchTerms: []
        }, {
            title: "fas fa-book-quran",
            searchTerms: []
        }, {
            title: "fas fa-book-skull",
            searchTerms: []
        }, {
            title: "fas fa-bookmark",
            searchTerms: []
        }, {
            title: "far fa-bookmark",
            searchTerms: []
        }, {
            title: "fab fa-bootstrap",
            searchTerms: []
        }, {
            title: "fas fa-border-all",
            searchTerms: []
        }, {
            title: "fas fa-border-none",
            searchTerms: []
        }, {
            title: "fas fa-border-top-left",
            searchTerms: []
        }, {
            title: "fas fa-bore-hole",
            searchTerms: []
        }, {
            title: "fab fa-bots",
            searchTerms: []
        }, {
            title: "fas fa-bottle-droplet",
            searchTerms: []
        }, {
            title: "fas fa-bottle-water",
            searchTerms: []
        }, {
            title: "fas fa-bowl-food",
            searchTerms: []
        }, {
            title: "fas fa-bowl-rice",
            searchTerms: []
        }, {
            title: "fas fa-bowling-ball",
            searchTerms: []
        }, {
            title: "fas fa-box",
            searchTerms: []
        }, {
            title: "fas fa-box-archive",
            searchTerms: []
        }, {
            title: "fas fa-box-open",
            searchTerms: []
        }, {
            title: "fas fa-box-tissue",
            searchTerms: []
        }, {
            title: "fas fa-boxes-packing",
            searchTerms: []
        }, {
            title: "fas fa-boxes-stacked",
            searchTerms: []
        }, {
            title: "fas fa-braille",
            searchTerms: []
        }, {
            title: "fas fa-brain",
            searchTerms: []
        }, {
            title: "fas fa-brazilian-real-sign",
            searchTerms: []
        }, {
            title: "fas fa-bread-slice",
            searchTerms: []
        }, {
            title: "fas fa-bridge",
            searchTerms: []
        }, {
            title: "fas fa-bridge-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-bridge-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-bridge-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-bridge-lock",
            searchTerms: []
        }, {
            title: "fas fa-bridge-water",
            searchTerms: []
        }, {
            title: "fas fa-briefcase",
            searchTerms: []
        }, {
            title: "fas fa-briefcase-medical",
            searchTerms: []
        }, {
            title: "fas fa-broom",
            searchTerms: []
        }, {
            title: "fas fa-broom-ball",
            searchTerms: []
        }, {
            title: "fas fa-brush",
            searchTerms: []
        }, {
            title: "fab fa-btc",
            searchTerms: []
        }, {
            title: "fas fa-bucket",
            searchTerms: []
        }, {
            title: "fab fa-buffer",
            searchTerms: []
        }, {
            title: "fas fa-bug",
            searchTerms: []
        }, {
            title: "fas fa-bug-slash",
            searchTerms: []
        }, {
            title: "fas fa-bugs",
            searchTerms: []
        }, {
            title: "fas fa-building",
            searchTerms: []
        }, {
            title: "far fa-building",
            searchTerms: []
        }, {
            title: "fas fa-building-circle-arrow-right",
            searchTerms: []
        }, {
            title: "fas fa-building-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-building-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-building-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-building-columns",
            searchTerms: []
        }, {
            title: "fas fa-building-flag",
            searchTerms: []
        }, {
            title: "fas fa-building-lock",
            searchTerms: []
        }, {
            title: "fas fa-building-ngo",
            searchTerms: []
        }, {
            title: "fas fa-building-shield",
            searchTerms: []
        }, {
            title: "fas fa-building-un",
            searchTerms: []
        }, {
            title: "fas fa-building-user",
            searchTerms: []
        }, {
            title: "fas fa-building-wheat",
            searchTerms: []
        }, {
            title: "fas fa-bullhorn",
            searchTerms: []
        }, {
            title: "fas fa-bullseye",
            searchTerms: []
        }, {
            title: "fas fa-burger",
            searchTerms: []
        }, {
            title: "fab fa-buromobelexperte",
            searchTerms: []
        }, {
            title: "fas fa-burst",
            searchTerms: []
        }, {
            title: "fas fa-bus",
            searchTerms: []
        }, {
            title: "fas fa-bus-simple",
            searchTerms: []
        }, {
            title: "fas fa-business-time",
            searchTerms: []
        }, {
            title: "fab fa-buy-n-large",
            searchTerms: []
        }, {
            title: "fab fa-buysellads",
            searchTerms: []
        }, {
            title: "fas fa-c",
            searchTerms: []
        }, {
            title: "fas fa-cake-candles",
            searchTerms: []
        }, {
            title: "fas fa-calculator",
            searchTerms: []
        }, {
            title: "fas fa-calendar",
            searchTerms: []
        }, {
            title: "far fa-calendar",
            searchTerms: []
        }, {
            title: "fas fa-calendar-check",
            searchTerms: []
        }, {
            title: "far fa-calendar-check",
            searchTerms: []
        }, {
            title: "fas fa-calendar-day",
            searchTerms: []
        }, {
            title: "fas fa-calendar-days",
            searchTerms: []
        }, {
            title: "far fa-calendar-days",
            searchTerms: []
        }, {
            title: "fas fa-calendar-minus",
            searchTerms: []
        }, {
            title: "far fa-calendar-minus",
            searchTerms: []
        }, {
            title: "fas fa-calendar-plus",
            searchTerms: []
        }, {
            title: "far fa-calendar-plus",
            searchTerms: []
        }, {
            title: "fas fa-calendar-week",
            searchTerms: []
        }, {
            title: "fas fa-calendar-xmark",
            searchTerms: []
        }, {
            title: "far fa-calendar-xmark",
            searchTerms: []
        }, {
            title: "fas fa-camera",
            searchTerms: []
        }, {
            title: "fas fa-camera-retro",
            searchTerms: []
        }, {
            title: "fas fa-camera-rotate",
            searchTerms: []
        }, {
            title: "fas fa-campground",
            searchTerms: []
        }, {
            title: "fab fa-canadian-maple-leaf",
            searchTerms: []
        }, {
            title: "fas fa-candy-cane",
            searchTerms: []
        }, {
            title: "fas fa-cannabis",
            searchTerms: []
        }, {
            title: "fas fa-capsules",
            searchTerms: []
        }, {
            title: "fas fa-car",
            searchTerms: []
        }, {
            title: "fas fa-car-battery",
            searchTerms: []
        }, {
            title: "fas fa-car-burst",
            searchTerms: []
        }, {
            title: "fas fa-car-on",
            searchTerms: []
        }, {
            title: "fas fa-car-rear",
            searchTerms: []
        }, {
            title: "fas fa-car-side",
            searchTerms: []
        }, {
            title: "fas fa-car-tunnel",
            searchTerms: []
        }, {
            title: "fas fa-caravan",
            searchTerms: []
        }, {
            title: "fas fa-caret-down",
            searchTerms: []
        }, {
            title: "fas fa-caret-left",
            searchTerms: []
        }, {
            title: "fas fa-caret-right",
            searchTerms: []
        }, {
            title: "fas fa-caret-up",
            searchTerms: []
        }, {
            title: "fas fa-carrot",
            searchTerms: []
        }, {
            title: "fas fa-cart-arrow-down",
            searchTerms: []
        }, {
            title: "fas fa-cart-flatbed",
            searchTerms: []
        }, {
            title: "fas fa-cart-flatbed-suitcase",
            searchTerms: []
        }, {
            title: "fas fa-cart-plus",
            searchTerms: []
        }, {
            title: "fas fa-cart-shopping",
            searchTerms: []
        }, {
            title: "fas fa-cash-register",
            searchTerms: []
        }, {
            title: "fas fa-cat",
            searchTerms: []
        }, {
            title: "fab fa-cc-amazon-pay",
            searchTerms: []
        }, {
            title: "fab fa-cc-amex",
            searchTerms: []
        }, {
            title: "fab fa-cc-apple-pay",
            searchTerms: []
        }, {
            title: "fab fa-cc-diners-club",
            searchTerms: []
        }, {
            title: "fab fa-cc-discover",
            searchTerms: []
        }, {
            title: "fab fa-cc-jcb",
            searchTerms: []
        }, {
            title: "fab fa-cc-mastercard",
            searchTerms: []
        }, {
            title: "fab fa-cc-paypal",
            searchTerms: []
        }, {
            title: "fab fa-cc-stripe",
            searchTerms: []
        }, {
            title: "fab fa-cc-visa",
            searchTerms: []
        }, {
            title: "fas fa-cedi-sign",
            searchTerms: []
        }, {
            title: "fas fa-cent-sign",
            searchTerms: []
        }, {
            title: "fab fa-centercode",
            searchTerms: []
        }, {
            title: "fab fa-centos",
            searchTerms: []
        }, {
            title: "fas fa-certificate",
            searchTerms: []
        }, {
            title: "fas fa-chair",
            searchTerms: []
        }, {
            title: "fas fa-chalkboard",
            searchTerms: []
        }, {
            title: "fas fa-chalkboard-user",
            searchTerms: []
        }, {
            title: "fas fa-champagne-glasses",
            searchTerms: []
        }, {
            title: "fas fa-charging-station",
            searchTerms: []
        }, {
            title: "fas fa-chart-area",
            searchTerms: []
        }, {
            title: "fas fa-chart-bar",
            searchTerms: []
        }, {
            title: "far fa-chart-bar",
            searchTerms: []
        }, {
            title: "fas fa-chart-column",
            searchTerms: []
        }, {
            title: "fas fa-chart-gantt",
            searchTerms: []
        }, {
            title: "fas fa-chart-line",
            searchTerms: []
        }, {
            title: "fas fa-chart-pie",
            searchTerms: []
        }, {
            title: "fas fa-chart-simple",
            searchTerms: []
        }, {
            title: "fas fa-check",
            searchTerms: []
        }, {
            title: "fas fa-check-double",
            searchTerms: []
        }, {
            title: "fas fa-check-to-slot",
            searchTerms: []
        }, {
            title: "fas fa-cheese",
            searchTerms: []
        }, {
            title: "fas fa-chess",
            searchTerms: []
        }, {
            title: "fas fa-chess-bishop",
            searchTerms: []
        }, {
            title: "far fa-chess-bishop",
            searchTerms: []
        }, {
            title: "fas fa-chess-board",
            searchTerms: []
        }, {
            title: "fas fa-chess-king",
            searchTerms: []
        }, {
            title: "far fa-chess-king",
            searchTerms: []
        }, {
            title: "fas fa-chess-knight",
            searchTerms: []
        }, {
            title: "far fa-chess-knight",
            searchTerms: []
        }, {
            title: "fas fa-chess-pawn",
            searchTerms: []
        }, {
            title: "far fa-chess-pawn",
            searchTerms: []
        }, {
            title: "fas fa-chess-queen",
            searchTerms: []
        }, {
            title: "far fa-chess-queen",
            searchTerms: []
        }, {
            title: "fas fa-chess-rook",
            searchTerms: []
        }, {
            title: "far fa-chess-rook",
            searchTerms: []
        }, {
            title: "fas fa-chevron-down",
            searchTerms: []
        }, {
            title: "fas fa-chevron-left",
            searchTerms: []
        }, {
            title: "fas fa-chevron-right",
            searchTerms: []
        }, {
            title: "fas fa-chevron-up",
            searchTerms: []
        }, {
            title: "fas fa-child",
            searchTerms: []
        }, {
            title: "fas fa-child-dress",
            searchTerms: []
        }, {
            title: "fas fa-child-reaching",
            searchTerms: []
        }, {
            title: "fas fa-child-rifle",
            searchTerms: []
        }, {
            title: "fas fa-children",
            searchTerms: []
        }, {
            title: "fab fa-chrome",
            searchTerms: []
        }, {
            title: "fab fa-chromecast",
            searchTerms: []
        }, {
            title: "fas fa-church",
            searchTerms: []
        }, {
            title: "fas fa-circle",
            searchTerms: []
        }, {
            title: "far fa-circle",
            searchTerms: []
        }, {
            title: "fas fa-circle-arrow-down",
            searchTerms: []
        }, {
            title: "fas fa-circle-arrow-left",
            searchTerms: []
        }, {
            title: "fas fa-circle-arrow-right",
            searchTerms: []
        }, {
            title: "fas fa-circle-arrow-up",
            searchTerms: []
        }, {
            title: "fas fa-circle-check",
            searchTerms: []
        }, {
            title: "far fa-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-circle-chevron-down",
            searchTerms: []
        }, {
            title: "fas fa-circle-chevron-left",
            searchTerms: []
        }, {
            title: "fas fa-circle-chevron-right",
            searchTerms: []
        }, {
            title: "fas fa-circle-chevron-up",
            searchTerms: []
        }, {
            title: "fas fa-circle-dollar-to-slot",
            searchTerms: []
        }, {
            title: "fas fa-circle-dot",
            searchTerms: []
        }, {
            title: "far fa-circle-dot",
            searchTerms: []
        }, {
            title: "fas fa-circle-down",
            searchTerms: []
        }, {
            title: "far fa-circle-down",
            searchTerms: []
        }, {
            title: "fas fa-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-circle-h",
            searchTerms: []
        }, {
            title: "fas fa-circle-half-stroke",
            searchTerms: []
        }, {
            title: "fas fa-circle-info",
            searchTerms: []
        }, {
            title: "fas fa-circle-left",
            searchTerms: []
        }, {
            title: "far fa-circle-left",
            searchTerms: []
        }, {
            title: "fas fa-circle-minus",
            searchTerms: []
        }, {
            title: "fas fa-circle-nodes",
            searchTerms: []
        }, {
            title: "fas fa-circle-notch",
            searchTerms: []
        }, {
            title: "fas fa-circle-pause",
            searchTerms: []
        }, {
            title: "far fa-circle-pause",
            searchTerms: []
        }, {
            title: "fas fa-circle-play",
            searchTerms: []
        }, {
            title: "far fa-circle-play",
            searchTerms: []
        }, {
            title: "fas fa-circle-plus",
            searchTerms: []
        }, {
            title: "fas fa-circle-question",
            searchTerms: []
        }, {
            title: "far fa-circle-question",
            searchTerms: []
        }, {
            title: "fas fa-circle-radiation",
            searchTerms: []
        }, {
            title: "fas fa-circle-right",
            searchTerms: []
        }, {
            title: "far fa-circle-right",
            searchTerms: []
        }, {
            title: "fas fa-circle-stop",
            searchTerms: []
        }, {
            title: "far fa-circle-stop",
            searchTerms: []
        }, {
            title: "fas fa-circle-up",
            searchTerms: []
        }, {
            title: "far fa-circle-up",
            searchTerms: []
        }, {
            title: "fas fa-circle-user",
            searchTerms: []
        }, {
            title: "far fa-circle-user",
            searchTerms: []
        }, {
            title: "fas fa-circle-xmark",
            searchTerms: []
        }, {
            title: "far fa-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-city",
            searchTerms: []
        }, {
            title: "fas fa-clapperboard",
            searchTerms: []
        }, {
            title: "fas fa-clipboard",
            searchTerms: []
        }, {
            title: "far fa-clipboard",
            searchTerms: []
        }, {
            title: "fas fa-clipboard-check",
            searchTerms: []
        }, {
            title: "fas fa-clipboard-list",
            searchTerms: []
        }, {
            title: "fas fa-clipboard-question",
            searchTerms: []
        }, {
            title: "fas fa-clipboard-user",
            searchTerms: []
        }, {
            title: "fas fa-clock",
            searchTerms: []
        }, {
            title: "far fa-clock",
            searchTerms: []
        }, {
            title: "fas fa-clock-rotate-left",
            searchTerms: []
        }, {
            title: "fas fa-clone",
            searchTerms: []
        }, {
            title: "far fa-clone",
            searchTerms: []
        }, {
            title: "fas fa-closed-captioning",
            searchTerms: []
        }, {
            title: "far fa-closed-captioning",
            searchTerms: []
        }, {
            title: "fas fa-cloud",
            searchTerms: []
        }, {
            title: "fas fa-cloud-arrow-down",
            searchTerms: []
        }, {
            title: "fas fa-cloud-arrow-up",
            searchTerms: []
        }, {
            title: "fas fa-cloud-bolt",
            searchTerms: []
        }, {
            title: "fas fa-cloud-meatball",
            searchTerms: []
        }, {
            title: "fas fa-cloud-moon",
            searchTerms: []
        }, {
            title: "fas fa-cloud-moon-rain",
            searchTerms: []
        }, {
            title: "fas fa-cloud-rain",
            searchTerms: []
        }, {
            title: "fas fa-cloud-showers-heavy",
            searchTerms: []
        }, {
            title: "fas fa-cloud-showers-water",
            searchTerms: []
        }, {
            title: "fas fa-cloud-sun",
            searchTerms: []
        }, {
            title: "fas fa-cloud-sun-rain",
            searchTerms: []
        }, {
            title: "fab fa-cloudflare",
            searchTerms: []
        }, {
            title: "fab fa-cloudscale",
            searchTerms: []
        }, {
            title: "fab fa-cloudsmith",
            searchTerms: []
        }, {
            title: "fab fa-cloudversify",
            searchTerms: []
        }, {
            title: "fas fa-clover",
            searchTerms: []
        }, {
            title: "fab fa-cmplid",
            searchTerms: []
        }, {
            title: "fas fa-code",
            searchTerms: []
        }, {
            title: "fas fa-code-branch",
            searchTerms: []
        }, {
            title: "fas fa-code-commit",
            searchTerms: []
        }, {
            title: "fas fa-code-compare",
            searchTerms: []
        }, {
            title: "fas fa-code-fork",
            searchTerms: []
        }, {
            title: "fas fa-code-merge",
            searchTerms: []
        }, {
            title: "fas fa-code-pull-request",
            searchTerms: []
        }, {
            title: "fab fa-codepen",
            searchTerms: []
        }, {
            title: "fab fa-codiepie",
            searchTerms: []
        }, {
            title: "fas fa-coins",
            searchTerms: []
        }, {
            title: "fas fa-colon-sign",
            searchTerms: []
        }, {
            title: "fas fa-comment",
            searchTerms: []
        }, {
            title: "far fa-comment",
            searchTerms: []
        }, {
            title: "fas fa-comment-dollar",
            searchTerms: []
        }, {
            title: "fas fa-comment-dots",
            searchTerms: []
        }, {
            title: "far fa-comment-dots",
            searchTerms: []
        }, {
            title: "fas fa-comment-medical",
            searchTerms: []
        }, {
            title: "fas fa-comment-slash",
            searchTerms: []
        }, {
            title: "fas fa-comment-sms",
            searchTerms: []
        }, {
            title: "fas fa-comments",
            searchTerms: []
        }, {
            title: "far fa-comments",
            searchTerms: []
        }, {
            title: "fas fa-comments-dollar",
            searchTerms: []
        }, {
            title: "fas fa-compact-disc",
            searchTerms: []
        }, {
            title: "fas fa-compass",
            searchTerms: []
        }, {
            title: "far fa-compass",
            searchTerms: []
        }, {
            title: "fas fa-compass-drafting",
            searchTerms: []
        }, {
            title: "fas fa-compress",
            searchTerms: []
        }, {
            title: "fas fa-computer",
            searchTerms: []
        }, {
            title: "fas fa-computer-mouse",
            searchTerms: []
        }, {
            title: "fab fa-confluence",
            searchTerms: []
        }, {
            title: "fab fa-connectdevelop",
            searchTerms: []
        }, {
            title: "fab fa-contao",
            searchTerms: []
        }, {
            title: "fas fa-cookie",
            searchTerms: []
        }, {
            title: "fas fa-cookie-bite",
            searchTerms: []
        }, {
            title: "fas fa-copy",
            searchTerms: []
        }, {
            title: "far fa-copy",
            searchTerms: []
        }, {
            title: "fas fa-copyright",
            searchTerms: []
        }, {
            title: "far fa-copyright",
            searchTerms: []
        }, {
            title: "fab fa-cotton-bureau",
            searchTerms: []
        }, {
            title: "fas fa-couch",
            searchTerms: []
        }, {
            title: "fas fa-cow",
            searchTerms: []
        }, {
            title: "fab fa-cpanel",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-by",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nc",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nc-eu",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nc-jp",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-nd",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-pd",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-pd-alt",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-remix",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-sa",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-sampling",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-sampling-plus",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-share",
            searchTerms: []
        }, {
            title: "fab fa-creative-commons-zero",
            searchTerms: []
        }, {
            title: "fas fa-credit-card",
            searchTerms: []
        }, {
            title: "far fa-credit-card",
            searchTerms: []
        }, {
            title: "fab fa-critical-role",
            searchTerms: []
        }, {
            title: "fas fa-crop",
            searchTerms: []
        }, {
            title: "fas fa-crop-simple",
            searchTerms: []
        }, {
            title: "fas fa-cross",
            searchTerms: []
        }, {
            title: "fas fa-crosshairs",
            searchTerms: []
        }, {
            title: "fas fa-crow",
            searchTerms: []
        }, {
            title: "fas fa-crown",
            searchTerms: []
        }, {
            title: "fas fa-crutch",
            searchTerms: []
        }, {
            title: "fas fa-cruzeiro-sign",
            searchTerms: []
        }, {
            title: "fab fa-css3",
            searchTerms: []
        }, {
            title: "fab fa-css3-alt",
            searchTerms: []
        }, {
            title: "fas fa-cube",
            searchTerms: []
        }, {
            title: "fas fa-cubes",
            searchTerms: []
        }, {
            title: "fas fa-cubes-stacked",
            searchTerms: []
        }, {
            title: "fab fa-cuttlefish",
            searchTerms: []
        }, {
            title: "fas fa-d",
            searchTerms: []
        }, {
            title: "fab fa-d-and-d",
            searchTerms: []
        }, {
            title: "fab fa-d-and-d-beyond",
            searchTerms: []
        }, {
            title: "fab fa-dailymotion",
            searchTerms: []
        }, {
            title: "fab fa-dashcube",
            searchTerms: []
        }, {
            title: "fas fa-database",
            searchTerms: []
        }, {
            title: "fab fa-deezer",
            searchTerms: []
        }, {
            title: "fas fa-delete-left",
            searchTerms: []
        }, {
            title: "fab fa-delicious",
            searchTerms: []
        }, {
            title: "fas fa-democrat",
            searchTerms: []
        }, {
            title: "fab fa-deploydog",
            searchTerms: []
        }, {
            title: "fab fa-deskpro",
            searchTerms: []
        }, {
            title: "fas fa-desktop",
            searchTerms: []
        }, {
            title: "fab fa-dev",
            searchTerms: []
        }, {
            title: "fab fa-deviantart",
            searchTerms: []
        }, {
            title: "fas fa-dharmachakra",
            searchTerms: []
        }, {
            title: "fab fa-dhl",
            searchTerms: []
        }, {
            title: "fas fa-diagram-next",
            searchTerms: []
        }, {
            title: "fas fa-diagram-predecessor",
            searchTerms: []
        }, {
            title: "fas fa-diagram-project",
            searchTerms: []
        }, {
            title: "fas fa-diagram-successor",
            searchTerms: []
        }, {
            title: "fas fa-diamond",
            searchTerms: []
        }, {
            title: "fas fa-diamond-turn-right",
            searchTerms: []
        }, {
            title: "fab fa-diaspora",
            searchTerms: []
        }, {
            title: "fas fa-dice",
            searchTerms: []
        }, {
            title: "fas fa-dice-d20",
            searchTerms: []
        }, {
            title: "fas fa-dice-d6",
            searchTerms: []
        }, {
            title: "fas fa-dice-five",
            searchTerms: []
        }, {
            title: "fas fa-dice-four",
            searchTerms: []
        }, {
            title: "fas fa-dice-one",
            searchTerms: []
        }, {
            title: "fas fa-dice-six",
            searchTerms: []
        }, {
            title: "fas fa-dice-three",
            searchTerms: []
        }, {
            title: "fas fa-dice-two",
            searchTerms: []
        }, {
            title: "fab fa-digg",
            searchTerms: []
        }, {
            title: "fab fa-digital-ocean",
            searchTerms: []
        }, {
            title: "fab fa-discord",
            searchTerms: []
        }, {
            title: "fab fa-discourse",
            searchTerms: []
        }, {
            title: "fas fa-disease",
            searchTerms: []
        }, {
            title: "fas fa-display",
            searchTerms: []
        }, {
            title: "fas fa-divide",
            searchTerms: []
        }, {
            title: "fas fa-dna",
            searchTerms: []
        }, {
            title: "fab fa-dochub",
            searchTerms: []
        }, {
            title: "fab fa-docker",
            searchTerms: []
        }, {
            title: "fas fa-dog",
            searchTerms: []
        }, {
            title: "fas fa-dollar-sign",
            searchTerms: []
        }, {
            title: "fas fa-dolly",
            searchTerms: []
        }, {
            title: "fas fa-dong-sign",
            searchTerms: []
        }, {
            title: "fas fa-door-closed",
            searchTerms: []
        }, {
            title: "fas fa-door-open",
            searchTerms: []
        }, {
            title: "fas fa-dove",
            searchTerms: []
        }, {
            title: "fas fa-down-left-and-up-right-to-center",
            searchTerms: []
        }, {
            title: "fas fa-down-long",
            searchTerms: []
        }, {
            title: "fas fa-download",
            searchTerms: []
        }, {
            title: "fab fa-draft2digital",
            searchTerms: []
        }, {
            title: "fas fa-dragon",
            searchTerms: []
        }, {
            title: "fas fa-draw-polygon",
            searchTerms: []
        }, {
            title: "fab fa-dribbble",
            searchTerms: []
        }, {
            title: "fab fa-dribbble-square",
            searchTerms: []
        }, {
            title: "fab fa-dropbox",
            searchTerms: []
        }, {
            title: "fas fa-droplet",
            searchTerms: []
        }, {
            title: "fas fa-droplet-slash",
            searchTerms: []
        }, {
            title: "fas fa-drum",
            searchTerms: []
        }, {
            title: "fas fa-drum-steelpan",
            searchTerms: []
        }, {
            title: "fas fa-drumstick-bite",
            searchTerms: []
        }, {
            title: "fab fa-drupal",
            searchTerms: []
        }, {
            title: "fas fa-dumbbell",
            searchTerms: []
        }, {
            title: "fas fa-dumpster",
            searchTerms: []
        }, {
            title: "fas fa-dumpster-fire",
            searchTerms: []
        }, {
            title: "fas fa-dungeon",
            searchTerms: []
        }, {
            title: "fab fa-dyalog",
            searchTerms: []
        }, {
            title: "fas fa-e",
            searchTerms: []
        }, {
            title: "fas fa-ear-deaf",
            searchTerms: []
        }, {
            title: "fas fa-ear-listen",
            searchTerms: []
        }, {
            title: "fab fa-earlybirds",
            searchTerms: []
        }, {
            title: "fas fa-earth-africa",
            searchTerms: []
        }, {
            title: "fas fa-earth-americas",
            searchTerms: []
        }, {
            title: "fas fa-earth-asia",
            searchTerms: []
        }, {
            title: "fas fa-earth-europe",
            searchTerms: []
        }, {
            title: "fas fa-earth-oceania",
            searchTerms: []
        }, {
            title: "fab fa-ebay",
            searchTerms: []
        }, {
            title: "fab fa-edge",
            searchTerms: []
        }, {
            title: "fab fa-edge-legacy",
            searchTerms: []
        }, {
            title: "fas fa-egg",
            searchTerms: []
        }, {
            title: "fas fa-eject",
            searchTerms: []
        }, {
            title: "fab fa-elementor",
            searchTerms: []
        }, {
            title: "fas fa-elevator",
            searchTerms: []
        }, {
            title: "fas fa-ellipsis",
            searchTerms: []
        }, {
            title: "fas fa-ellipsis-vertical",
            searchTerms: []
        }, {
            title: "fab fa-ello",
            searchTerms: []
        }, {
            title: "fab fa-ember",
            searchTerms: []
        }, {
            title: "fab fa-empire",
            searchTerms: []
        }, {
            title: "fas fa-envelope",
            searchTerms: []
        }, {
            title: "far fa-envelope",
            searchTerms: []
        }, {
            title: "fas fa-envelope-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-envelope-open",
            searchTerms: []
        }, {
            title: "far fa-envelope-open",
            searchTerms: []
        }, {
            title: "fas fa-envelope-open-text",
            searchTerms: []
        }, {
            title: "fas fa-envelopes-bulk",
            searchTerms: []
        }, {
            title: "fab fa-envira",
            searchTerms: []
        }, {
            title: "fas fa-equals",
            searchTerms: []
        }, {
            title: "fas fa-eraser",
            searchTerms: []
        }, {
            title: "fab fa-erlang",
            searchTerms: []
        }, {
            title: "fab fa-ethereum",
            searchTerms: []
        }, {
            title: "fas fa-ethernet",
            searchTerms: []
        }, {
            title: "fab fa-etsy",
            searchTerms: []
        }, {
            title: "fas fa-euro-sign",
            searchTerms: []
        }, {
            title: "fab fa-evernote",
            searchTerms: []
        }, {
            title: "fas fa-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-expand",
            searchTerms: []
        }, {
            title: "fab fa-expeditedssl",
            searchTerms: []
        }, {
            title: "fas fa-explosion",
            searchTerms: []
        }, {
            title: "fas fa-eye",
            searchTerms: []
        }, {
            title: "far fa-eye",
            searchTerms: []
        }, {
            title: "fas fa-eye-dropper",
            searchTerms: []
        }, {
            title: "fas fa-eye-low-vision",
            searchTerms: []
        }, {
            title: "fas fa-eye-slash",
            searchTerms: []
        }, {
            title: "far fa-eye-slash",
            searchTerms: []
        }, {
            title: "fas fa-f",
            searchTerms: []
        }, {
            title: "fas fa-face-angry",
            searchTerms: []
        }, {
            title: "far fa-face-angry",
            searchTerms: []
        }, {
            title: "fas fa-face-dizzy",
            searchTerms: []
        }, {
            title: "far fa-face-dizzy",
            searchTerms: []
        }, {
            title: "fas fa-face-flushed",
            searchTerms: []
        }, {
            title: "far fa-face-flushed",
            searchTerms: []
        }, {
            title: "fas fa-face-frown",
            searchTerms: []
        }, {
            title: "far fa-face-frown",
            searchTerms: []
        }, {
            title: "fas fa-face-frown-open",
            searchTerms: []
        }, {
            title: "far fa-face-frown-open",
            searchTerms: []
        }, {
            title: "fas fa-face-grimace",
            searchTerms: []
        }, {
            title: "far fa-face-grimace",
            searchTerms: []
        }, {
            title: "fas fa-face-grin",
            searchTerms: []
        }, {
            title: "far fa-face-grin",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-beam",
            searchTerms: []
        }, {
            title: "far fa-face-grin-beam",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-beam-sweat",
            searchTerms: []
        }, {
            title: "far fa-face-grin-beam-sweat",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-hearts",
            searchTerms: []
        }, {
            title: "far fa-face-grin-hearts",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-squint",
            searchTerms: []
        }, {
            title: "far fa-face-grin-squint",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-squint-tears",
            searchTerms: []
        }, {
            title: "far fa-face-grin-squint-tears",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-stars",
            searchTerms: []
        }, {
            title: "far fa-face-grin-stars",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-tears",
            searchTerms: []
        }, {
            title: "far fa-face-grin-tears",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-tongue",
            searchTerms: []
        }, {
            title: "far fa-face-grin-tongue",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-tongue-squint",
            searchTerms: []
        }, {
            title: "far fa-face-grin-tongue-squint",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-tongue-wink",
            searchTerms: []
        }, {
            title: "far fa-face-grin-tongue-wink",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-wide",
            searchTerms: []
        }, {
            title: "far fa-face-grin-wide",
            searchTerms: []
        }, {
            title: "fas fa-face-grin-wink",
            searchTerms: []
        }, {
            title: "far fa-face-grin-wink",
            searchTerms: []
        }, {
            title: "fas fa-face-kiss",
            searchTerms: []
        }, {
            title: "far fa-face-kiss",
            searchTerms: []
        }, {
            title: "fas fa-face-kiss-beam",
            searchTerms: []
        }, {
            title: "far fa-face-kiss-beam",
            searchTerms: []
        }, {
            title: "fas fa-face-kiss-wink-heart",
            searchTerms: []
        }, {
            title: "far fa-face-kiss-wink-heart",
            searchTerms: []
        }, {
            title: "fas fa-face-laugh",
            searchTerms: []
        }, {
            title: "far fa-face-laugh",
            searchTerms: []
        }, {
            title: "fas fa-face-laugh-beam",
            searchTerms: []
        }, {
            title: "far fa-face-laugh-beam",
            searchTerms: []
        }, {
            title: "fas fa-face-laugh-squint",
            searchTerms: []
        }, {
            title: "far fa-face-laugh-squint",
            searchTerms: []
        }, {
            title: "fas fa-face-laugh-wink",
            searchTerms: []
        }, {
            title: "far fa-face-laugh-wink",
            searchTerms: []
        }, {
            title: "fas fa-face-meh",
            searchTerms: []
        }, {
            title: "far fa-face-meh",
            searchTerms: []
        }, {
            title: "fas fa-face-meh-blank",
            searchTerms: []
        }, {
            title: "far fa-face-meh-blank",
            searchTerms: []
        }, {
            title: "fas fa-face-rolling-eyes",
            searchTerms: []
        }, {
            title: "far fa-face-rolling-eyes",
            searchTerms: []
        }, {
            title: "fas fa-face-sad-cry",
            searchTerms: []
        }, {
            title: "far fa-face-sad-cry",
            searchTerms: []
        }, {
            title: "fas fa-face-sad-tear",
            searchTerms: []
        }, {
            title: "far fa-face-sad-tear",
            searchTerms: []
        }, {
            title: "fas fa-face-smile",
            searchTerms: []
        }, {
            title: "far fa-face-smile",
            searchTerms: []
        }, {
            title: "fas fa-face-smile-beam",
            searchTerms: []
        }, {
            title: "far fa-face-smile-beam",
            searchTerms: []
        }, {
            title: "fas fa-face-smile-wink",
            searchTerms: []
        }, {
            title: "far fa-face-smile-wink",
            searchTerms: []
        }, {
            title: "fas fa-face-surprise",
            searchTerms: []
        }, {
            title: "far fa-face-surprise",
            searchTerms: []
        }, {
            title: "fas fa-face-tired",
            searchTerms: []
        }, {
            title: "far fa-face-tired",
            searchTerms: []
        }, {
            title: "fab fa-facebook",
            searchTerms: []
        }, {
            title: "fab fa-facebook-f",
            searchTerms: []
        }, {
            title: "fab fa-facebook-messenger",
            searchTerms: []
        }, {
            title: "fab fa-facebook-square",
            searchTerms: []
        }, {
            title: "fas fa-fan",
            searchTerms: []
        }, {
            title: "fab fa-fantasy-flight-games",
            searchTerms: []
        }, {
            title: "fas fa-faucet",
            searchTerms: []
        }, {
            title: "fas fa-faucet-drip",
            searchTerms: []
        }, {
            title: "fas fa-fax",
            searchTerms: []
        }, {
            title: "fas fa-feather",
            searchTerms: []
        }, {
            title: "fas fa-feather-pointed",
            searchTerms: []
        }, {
            title: "fab fa-fedex",
            searchTerms: []
        }, {
            title: "fab fa-fedora",
            searchTerms: []
        }, {
            title: "fas fa-ferry",
            searchTerms: []
        }, {
            title: "fab fa-figma",
            searchTerms: []
        }, {
            title: "fas fa-file",
            searchTerms: []
        }, {
            title: "far fa-file",
            searchTerms: []
        }, {
            title: "fas fa-file-arrow-down",
            searchTerms: []
        }, {
            title: "fas fa-file-arrow-up",
            searchTerms: []
        }, {
            title: "fas fa-file-audio",
            searchTerms: []
        }, {
            title: "far fa-file-audio",
            searchTerms: []
        }, {
            title: "fas fa-file-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-file-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-file-circle-minus",
            searchTerms: []
        }, {
            title: "fas fa-file-circle-plus",
            searchTerms: []
        }, {
            title: "fas fa-file-circle-question",
            searchTerms: []
        }, {
            title: "fas fa-file-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-file-code",
            searchTerms: []
        }, {
            title: "far fa-file-code",
            searchTerms: []
        }, {
            title: "fas fa-file-contract",
            searchTerms: []
        }, {
            title: "fas fa-file-csv",
            searchTerms: []
        }, {
            title: "fas fa-file-excel",
            searchTerms: []
        }, {
            title: "far fa-file-excel",
            searchTerms: []
        }, {
            title: "fas fa-file-export",
            searchTerms: []
        }, {
            title: "fas fa-file-image",
            searchTerms: []
        }, {
            title: "far fa-file-image",
            searchTerms: []
        }, {
            title: "fas fa-file-import",
            searchTerms: []
        }, {
            title: "fas fa-file-invoice",
            searchTerms: []
        }, {
            title: "fas fa-file-invoice-dollar",
            searchTerms: []
        }, {
            title: "fas fa-file-lines",
            searchTerms: []
        }, {
            title: "far fa-file-lines",
            searchTerms: []
        }, {
            title: "fas fa-file-medical",
            searchTerms: []
        }, {
            title: "fas fa-file-pdf",
            searchTerms: []
        }, {
            title: "far fa-file-pdf",
            searchTerms: []
        }, {
            title: "fas fa-file-pen",
            searchTerms: []
        }, {
            title: "fas fa-file-powerpoint",
            searchTerms: []
        }, {
            title: "far fa-file-powerpoint",
            searchTerms: []
        }, {
            title: "fas fa-file-prescription",
            searchTerms: []
        }, {
            title: "fas fa-file-shield",
            searchTerms: []
        }, {
            title: "fas fa-file-signature",
            searchTerms: []
        }, {
            title: "fas fa-file-video",
            searchTerms: []
        }, {
            title: "far fa-file-video",
            searchTerms: []
        }, {
            title: "fas fa-file-waveform",
            searchTerms: []
        }, {
            title: "fas fa-file-word",
            searchTerms: []
        }, {
            title: "far fa-file-word",
            searchTerms: []
        }, {
            title: "fas fa-file-zipper",
            searchTerms: []
        }, {
            title: "far fa-file-zipper",
            searchTerms: []
        }, {
            title: "fas fa-fill",
            searchTerms: []
        }, {
            title: "fas fa-fill-drip",
            searchTerms: []
        }, {
            title: "fas fa-film",
            searchTerms: []
        }, {
            title: "fas fa-filter",
            searchTerms: []
        }, {
            title: "fas fa-filter-circle-dollar",
            searchTerms: []
        }, {
            title: "fas fa-filter-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-fingerprint",
            searchTerms: []
        }, {
            title: "fas fa-fire",
            searchTerms: []
        }, {
            title: "fas fa-fire-burner",
            searchTerms: []
        }, {
            title: "fas fa-fire-extinguisher",
            searchTerms: []
        }, {
            title: "fas fa-fire-flame-curved",
            searchTerms: []
        }, {
            title: "fas fa-fire-flame-simple",
            searchTerms: []
        }, {
            title: "fab fa-firefox",
            searchTerms: []
        }, {
            title: "fab fa-firefox-browser",
            searchTerms: []
        }, {
            title: "fab fa-first-order",
            searchTerms: []
        }, {
            title: "fab fa-first-order-alt",
            searchTerms: []
        }, {
            title: "fab fa-firstdraft",
            searchTerms: []
        }, {
            title: "fas fa-fish",
            searchTerms: []
        }, {
            title: "fas fa-fish-fins",
            searchTerms: []
        }, {
            title: "fas fa-flag",
            searchTerms: []
        }, {
            title: "far fa-flag",
            searchTerms: []
        }, {
            title: "fas fa-flag-checkered",
            searchTerms: []
        }, {
            title: "fas fa-flag-usa",
            searchTerms: []
        }, {
            title: "fas fa-flask",
            searchTerms: []
        }, {
            title: "fas fa-flask-vial",
            searchTerms: []
        }, {
            title: "fab fa-flickr",
            searchTerms: []
        }, {
            title: "fab fa-flipboard",
            searchTerms: []
        }, {
            title: "fas fa-floppy-disk",
            searchTerms: []
        }, {
            title: "far fa-floppy-disk",
            searchTerms: []
        }, {
            title: "fas fa-florin-sign",
            searchTerms: []
        }, {
            title: "fab fa-fly",
            searchTerms: []
        }, {
            title: "fas fa-folder",
            searchTerms: []
        }, {
            title: "far fa-folder",
            searchTerms: []
        }, {
            title: "fas fa-folder-closed",
            searchTerms: []
        }, {
            title: "far fa-folder-closed",
            searchTerms: []
        }, {
            title: "fas fa-folder-minus",
            searchTerms: []
        }, {
            title: "fas fa-folder-open",
            searchTerms: []
        }, {
            title: "far fa-folder-open",
            searchTerms: []
        }, {
            title: "fas fa-folder-plus",
            searchTerms: []
        }, {
            title: "fas fa-folder-tree",
            searchTerms: []
        }, {
            title: "fas fa-font",
            searchTerms: []
        }, {
            title: "fas fa-font-awesome",
            searchTerms: []
        }, {
            title: "far fa-font-awesome",
            searchTerms: []
        }, {
            title: "fab fa-font-awesome",
            searchTerms: []
        }, {
            title: "fab fa-fonticons",
            searchTerms: []
        }, {
            title: "fab fa-fonticons-fi",
            searchTerms: []
        }, {
            title: "fas fa-football",
            searchTerms: []
        }, {
            title: "fab fa-fort-awesome",
            searchTerms: []
        }, {
            title: "fab fa-fort-awesome-alt",
            searchTerms: []
        }, {
            title: "fab fa-forumbee",
            searchTerms: []
        }, {
            title: "fas fa-forward",
            searchTerms: []
        }, {
            title: "fas fa-forward-fast",
            searchTerms: []
        }, {
            title: "fas fa-forward-step",
            searchTerms: []
        }, {
            title: "fab fa-foursquare",
            searchTerms: []
        }, {
            title: "fas fa-franc-sign",
            searchTerms: []
        }, {
            title: "fab fa-free-code-camp",
            searchTerms: []
        }, {
            title: "fab fa-freebsd",
            searchTerms: []
        }, {
            title: "fas fa-frog",
            searchTerms: []
        }, {
            title: "fab fa-fulcrum",
            searchTerms: []
        }, {
            title: "fas fa-futbol",
            searchTerms: []
        }, {
            title: "far fa-futbol",
            searchTerms: []
        }, {
            title: "fas fa-g",
            searchTerms: []
        }, {
            title: "fab fa-galactic-republic",
            searchTerms: []
        }, {
            title: "fab fa-galactic-senate",
            searchTerms: []
        }, {
            title: "fas fa-gamepad",
            searchTerms: []
        }, {
            title: "fas fa-gas-pump",
            searchTerms: []
        }, {
            title: "fas fa-gauge",
            searchTerms: []
        }, {
            title: "fas fa-gauge-high",
            searchTerms: []
        }, {
            title: "fas fa-gauge-simple",
            searchTerms: []
        }, {
            title: "fas fa-gauge-simple-high",
            searchTerms: []
        }, {
            title: "fas fa-gavel",
            searchTerms: []
        }, {
            title: "fas fa-gear",
            searchTerms: []
        }, {
            title: "fas fa-gears",
            searchTerms: []
        }, {
            title: "fas fa-gem",
            searchTerms: []
        }, {
            title: "far fa-gem",
            searchTerms: []
        }, {
            title: "fas fa-genderless",
            searchTerms: []
        }, {
            title: "fab fa-get-pocket",
            searchTerms: []
        }, {
            title: "fab fa-gg",
            searchTerms: []
        }, {
            title: "fab fa-gg-circle",
            searchTerms: []
        }, {
            title: "fas fa-ghost",
            searchTerms: []
        }, {
            title: "fas fa-gift",
            searchTerms: []
        }, {
            title: "fas fa-gifts",
            searchTerms: []
        }, {
            title: "fab fa-git",
            searchTerms: []
        }, {
            title: "fab fa-git-alt",
            searchTerms: []
        }, {
            title: "fab fa-git-square",
            searchTerms: []
        }, {
            title: "fab fa-github",
            searchTerms: []
        }, {
            title: "fab fa-github-alt",
            searchTerms: []
        }, {
            title: "fab fa-github-square",
            searchTerms: []
        }, {
            title: "fab fa-gitkraken",
            searchTerms: []
        }, {
            title: "fab fa-gitlab",
            searchTerms: []
        }, {
            title: "fab fa-gitter",
            searchTerms: []
        }, {
            title: "fas fa-glass-water",
            searchTerms: []
        }, {
            title: "fas fa-glass-water-droplet",
            searchTerms: []
        }, {
            title: "fas fa-glasses",
            searchTerms: []
        }, {
            title: "fab fa-glide",
            searchTerms: []
        }, {
            title: "fab fa-glide-g",
            searchTerms: []
        }, {
            title: "fas fa-globe",
            searchTerms: []
        }, {
            title: "fab fa-gofore",
            searchTerms: []
        }, {
            title: "fab fa-golang",
            searchTerms: []
        }, {
            title: "fas fa-golf-ball-tee",
            searchTerms: []
        }, {
            title: "fab fa-goodreads",
            searchTerms: []
        }, {
            title: "fab fa-goodreads-g",
            searchTerms: []
        }, {
            title: "fab fa-google",
            searchTerms: []
        }, {
            title: "fab fa-google-drive",
            searchTerms: []
        }, {
            title: "fab fa-google-pay",
            searchTerms: []
        }, {
            title: "fab fa-google-play",
            searchTerms: []
        }, {
            title: "fab fa-google-plus",
            searchTerms: []
        }, {
            title: "fab fa-google-plus-g",
            searchTerms: []
        }, {
            title: "fab fa-google-plus-square",
            searchTerms: []
        }, {
            title: "fab fa-google-wallet",
            searchTerms: []
        }, {
            title: "fas fa-gopuram",
            searchTerms: []
        }, {
            title: "fas fa-graduation-cap",
            searchTerms: []
        }, {
            title: "fab fa-gratipay",
            searchTerms: []
        }, {
            title: "fab fa-grav",
            searchTerms: []
        }, {
            title: "fas fa-greater-than",
            searchTerms: []
        }, {
            title: "fas fa-greater-than-equal",
            searchTerms: []
        }, {
            title: "fas fa-grip",
            searchTerms: []
        }, {
            title: "fas fa-grip-lines",
            searchTerms: []
        }, {
            title: "fas fa-grip-lines-vertical",
            searchTerms: []
        }, {
            title: "fas fa-grip-vertical",
            searchTerms: []
        }, {
            title: "fab fa-gripfire",
            searchTerms: []
        }, {
            title: "fas fa-group-arrows-rotate",
            searchTerms: []
        }, {
            title: "fab fa-grunt",
            searchTerms: []
        }, {
            title: "fas fa-guarani-sign",
            searchTerms: []
        }, {
            title: "fab fa-guilded",
            searchTerms: []
        }, {
            title: "fas fa-guitar",
            searchTerms: []
        }, {
            title: "fab fa-gulp",
            searchTerms: []
        }, {
            title: "fas fa-gun",
            searchTerms: []
        }, {
            title: "fas fa-h",
            searchTerms: []
        }, {
            title: "fab fa-hacker-news",
            searchTerms: []
        }, {
            title: "fab fa-hacker-news-square",
            searchTerms: []
        }, {
            title: "fab fa-hackerrank",
            searchTerms: []
        }, {
            title: "fas fa-hammer",
            searchTerms: []
        }, {
            title: "fas fa-hamsa",
            searchTerms: []
        }, {
            title: "fas fa-hand",
            searchTerms: []
        }, {
            title: "far fa-hand",
            searchTerms: []
        }, {
            title: "fas fa-hand-back-fist",
            searchTerms: []
        }, {
            title: "far fa-hand-back-fist",
            searchTerms: []
        }, {
            title: "fas fa-hand-dots",
            searchTerms: []
        }, {
            title: "fas fa-hand-fist",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding-dollar",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding-droplet",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding-hand",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding-heart",
            searchTerms: []
        }, {
            title: "fas fa-hand-holding-medical",
            searchTerms: []
        }, {
            title: "fas fa-hand-lizard",
            searchTerms: []
        }, {
            title: "far fa-hand-lizard",
            searchTerms: []
        }, {
            title: "fas fa-hand-middle-finger",
            searchTerms: []
        }, {
            title: "fas fa-hand-peace",
            searchTerms: []
        }, {
            title: "far fa-hand-peace",
            searchTerms: []
        }, {
            title: "fas fa-hand-point-down",
            searchTerms: []
        }, {
            title: "far fa-hand-point-down",
            searchTerms: []
        }, {
            title: "fas fa-hand-point-left",
            searchTerms: []
        }, {
            title: "far fa-hand-point-left",
            searchTerms: []
        }, {
            title: "fas fa-hand-point-right",
            searchTerms: []
        }, {
            title: "far fa-hand-point-right",
            searchTerms: []
        }, {
            title: "fas fa-hand-point-up",
            searchTerms: []
        }, {
            title: "far fa-hand-point-up",
            searchTerms: []
        }, {
            title: "fas fa-hand-pointer",
            searchTerms: []
        }, {
            title: "far fa-hand-pointer",
            searchTerms: []
        }, {
            title: "fas fa-hand-scissors",
            searchTerms: []
        }, {
            title: "far fa-hand-scissors",
            searchTerms: []
        }, {
            title: "fas fa-hand-sparkles",
            searchTerms: []
        }, {
            title: "fas fa-hand-spock",
            searchTerms: []
        }, {
            title: "far fa-hand-spock",
            searchTerms: []
        }, {
            title: "fas fa-handcuffs",
            searchTerms: []
        }, {
            title: "fas fa-hands",
            searchTerms: []
        }, {
            title: "fas fa-hands-asl-interpreting",
            searchTerms: []
        }, {
            title: "fas fa-hands-bound",
            searchTerms: []
        }, {
            title: "fas fa-hands-bubbles",
            searchTerms: []
        }, {
            title: "fas fa-hands-clapping",
            searchTerms: []
        }, {
            title: "fas fa-hands-holding",
            searchTerms: []
        }, {
            title: "fas fa-hands-holding-child",
            searchTerms: []
        }, {
            title: "fas fa-hands-holding-circle",
            searchTerms: []
        }, {
            title: "fas fa-hands-praying",
            searchTerms: []
        }, {
            title: "fas fa-handshake",
            searchTerms: []
        }, {
            title: "far fa-handshake",
            searchTerms: []
        }, {
            title: "fas fa-handshake-angle",
            searchTerms: []
        }, {
            title: "fas fa-handshake-simple",
            searchTerms: []
        }, {
            title: "fas fa-handshake-simple-slash",
            searchTerms: []
        }, {
            title: "fas fa-handshake-slash",
            searchTerms: []
        }, {
            title: "fas fa-hanukiah",
            searchTerms: []
        }, {
            title: "fas fa-hard-drive",
            searchTerms: []
        }, {
            title: "far fa-hard-drive",
            searchTerms: []
        }, {
            title: "fab fa-hashnode",
            searchTerms: []
        }, {
            title: "fas fa-hashtag",
            searchTerms: []
        }, {
            title: "fas fa-hat-cowboy",
            searchTerms: []
        }, {
            title: "fas fa-hat-cowboy-side",
            searchTerms: []
        }, {
            title: "fas fa-hat-wizard",
            searchTerms: []
        }, {
            title: "fas fa-head-side-cough",
            searchTerms: []
        }, {
            title: "fas fa-head-side-cough-slash",
            searchTerms: []
        }, {
            title: "fas fa-head-side-mask",
            searchTerms: []
        }, {
            title: "fas fa-head-side-virus",
            searchTerms: []
        }, {
            title: "fas fa-heading",
            searchTerms: []
        }, {
            title: "fas fa-headphones",
            searchTerms: []
        }, {
            title: "fas fa-headphones-simple",
            searchTerms: []
        }, {
            title: "fas fa-headset",
            searchTerms: []
        }, {
            title: "fas fa-heart",
            searchTerms: []
        }, {
            title: "far fa-heart",
            searchTerms: []
        }, {
            title: "fas fa-heart-circle-bolt",
            searchTerms: []
        }, {
            title: "fas fa-heart-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-heart-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-heart-circle-minus",
            searchTerms: []
        }, {
            title: "fas fa-heart-circle-plus",
            searchTerms: []
        }, {
            title: "fas fa-heart-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-heart-crack",
            searchTerms: []
        }, {
            title: "fas fa-heart-pulse",
            searchTerms: []
        }, {
            title: "fas fa-helicopter",
            searchTerms: []
        }, {
            title: "fas fa-helicopter-symbol",
            searchTerms: []
        }, {
            title: "fas fa-helmet-safety",
            searchTerms: []
        }, {
            title: "fas fa-helmet-un",
            searchTerms: []
        }, {
            title: "fas fa-highlighter",
            searchTerms: []
        }, {
            title: "fas fa-hill-avalanche",
            searchTerms: []
        }, {
            title: "fas fa-hill-rockslide",
            searchTerms: []
        }, {
            title: "fas fa-hippo",
            searchTerms: []
        }, {
            title: "fab fa-hips",
            searchTerms: []
        }, {
            title: "fab fa-hire-a-helper",
            searchTerms: []
        }, {
            title: "fab fa-hive",
            searchTerms: []
        }, {
            title: "fas fa-hockey-puck",
            searchTerms: []
        }, {
            title: "fas fa-holly-berry",
            searchTerms: []
        }, {
            title: "fab fa-hooli",
            searchTerms: []
        }, {
            title: "fab fa-hornbill",
            searchTerms: []
        }, {
            title: "fas fa-horse",
            searchTerms: []
        }, {
            title: "fas fa-horse-head",
            searchTerms: []
        }, {
            title: "fas fa-hospital",
            searchTerms: []
        }, {
            title: "far fa-hospital",
            searchTerms: []
        }, {
            title: "fas fa-hospital-user",
            searchTerms: []
        }, {
            title: "fas fa-hot-tub-person",
            searchTerms: []
        }, {
            title: "fas fa-hotdog",
            searchTerms: []
        }, {
            title: "fas fa-hotel",
            searchTerms: []
        }, {
            title: "fab fa-hotjar",
            searchTerms: []
        }, {
            title: "fas fa-hourglass",
            searchTerms: []
        }, {
            title: "far fa-hourglass",
            searchTerms: []
        }, {
            title: "fas fa-hourglass-empty",
            searchTerms: []
        }, {
            title: "fas fa-hourglass-end",
            searchTerms: []
        }, {
            title: "fas fa-hourglass-start",
            searchTerms: []
        }, {
            title: "fas fa-house",
            searchTerms: []
        }, {
            title: "fas fa-house-chimney",
            searchTerms: []
        }, {
            title: "fas fa-house-chimney-crack",
            searchTerms: []
        }, {
            title: "fas fa-house-chimney-medical",
            searchTerms: []
        }, {
            title: "fas fa-house-chimney-user",
            searchTerms: []
        }, {
            title: "fas fa-house-chimney-window",
            searchTerms: []
        }, {
            title: "fas fa-house-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-house-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-house-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-house-crack",
            searchTerms: []
        }, {
            title: "fas fa-house-fire",
            searchTerms: []
        }, {
            title: "fas fa-house-flag",
            searchTerms: []
        }, {
            title: "fas fa-house-flood-water",
            searchTerms: []
        }, {
            title: "fas fa-house-flood-water-circle-arrow-right",
            searchTerms: []
        }, {
            title: "fas fa-house-laptop",
            searchTerms: []
        }, {
            title: "fas fa-house-lock",
            searchTerms: []
        }, {
            title: "fas fa-house-medical",
            searchTerms: []
        }, {
            title: "fas fa-house-medical-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-house-medical-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-house-medical-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-house-medical-flag",
            searchTerms: []
        }, {
            title: "fas fa-house-signal",
            searchTerms: []
        }, {
            title: "fas fa-house-tsunami",
            searchTerms: []
        }, {
            title: "fas fa-house-user",
            searchTerms: []
        }, {
            title: "fab fa-houzz",
            searchTerms: []
        }, {
            title: "fas fa-hryvnia-sign",
            searchTerms: []
        }, {
            title: "fab fa-html5",
            searchTerms: []
        }, {
            title: "fab fa-hubspot",
            searchTerms: []
        }, {
            title: "fas fa-hurricane",
            searchTerms: []
        }, {
            title: "fas fa-i",
            searchTerms: []
        }, {
            title: "fas fa-i-cursor",
            searchTerms: []
        }, {
            title: "fas fa-ice-cream",
            searchTerms: []
        }, {
            title: "fas fa-icicles",
            searchTerms: []
        }, {
            title: "fas fa-icons",
            searchTerms: []
        }, {
            title: "fas fa-id-badge",
            searchTerms: []
        }, {
            title: "far fa-id-badge",
            searchTerms: []
        }, {
            title: "fas fa-id-card",
            searchTerms: []
        }, {
            title: "far fa-id-card",
            searchTerms: []
        }, {
            title: "fas fa-id-card-clip",
            searchTerms: []
        }, {
            title: "fab fa-ideal",
            searchTerms: []
        }, {
            title: "fas fa-igloo",
            searchTerms: []
        }, {
            title: "fas fa-image",
            searchTerms: []
        }, {
            title: "far fa-image",
            searchTerms: []
        }, {
            title: "fas fa-image-portrait",
            searchTerms: []
        }, {
            title: "fas fa-images",
            searchTerms: []
        }, {
            title: "far fa-images",
            searchTerms: []
        }, {
            title: "fab fa-imdb",
            searchTerms: []
        }, {
            title: "fas fa-inbox",
            searchTerms: []
        }, {
            title: "fas fa-indent",
            searchTerms: []
        }, {
            title: "fas fa-indian-rupee-sign",
            searchTerms: []
        }, {
            title: "fas fa-industry",
            searchTerms: []
        }, {
            title: "fas fa-infinity",
            searchTerms: []
        }, {
            title: "fas fa-info",
            searchTerms: []
        }, {
            title: "fab fa-instagram",
            searchTerms: []
        }, {
            title: "fab fa-instagram-square",
            searchTerms: []
        }, {
            title: "fab fa-instalod",
            searchTerms: []
        }, {
            title: "fab fa-intercom",
            searchTerms: []
        }, {
            title: "fab fa-internet-explorer",
            searchTerms: []
        }, {
            title: "fab fa-invision",
            searchTerms: []
        }, {
            title: "fab fa-ioxhost",
            searchTerms: []
        }, {
            title: "fas fa-italic",
            searchTerms: []
        }, {
            title: "fab fa-itch-io",
            searchTerms: []
        }, {
            title: "fab fa-itunes",
            searchTerms: []
        }, {
            title: "fab fa-itunes-note",
            searchTerms: []
        }, {
            title: "fas fa-j",
            searchTerms: []
        }, {
            title: "fas fa-jar",
            searchTerms: []
        }, {
            title: "fas fa-jar-wheat",
            searchTerms: []
        }, {
            title: "fab fa-java",
            searchTerms: []
        }, {
            title: "fas fa-jedi",
            searchTerms: []
        }, {
            title: "fab fa-jedi-order",
            searchTerms: []
        }, {
            title: "fab fa-jenkins",
            searchTerms: []
        }, {
            title: "fas fa-jet-fighter",
            searchTerms: []
        }, {
            title: "fas fa-jet-fighter-up",
            searchTerms: []
        }, {
            title: "fab fa-jira",
            searchTerms: []
        }, {
            title: "fab fa-joget",
            searchTerms: []
        }, {
            title: "fas fa-joint",
            searchTerms: []
        }, {
            title: "fab fa-joomla",
            searchTerms: []
        }, {
            title: "fab fa-js",
            searchTerms: []
        }, {
            title: "fab fa-js-square",
            searchTerms: []
        }, {
            title: "fab fa-jsfiddle",
            searchTerms: []
        }, {
            title: "fas fa-jug-detergent",
            searchTerms: []
        }, {
            title: "fas fa-k",
            searchTerms: []
        }, {
            title: "fas fa-kaaba",
            searchTerms: []
        }, {
            title: "fab fa-kaggle",
            searchTerms: []
        }, {
            title: "fas fa-key",
            searchTerms: []
        }, {
            title: "fab fa-keybase",
            searchTerms: []
        }, {
            title: "fas fa-keyboard",
            searchTerms: []
        }, {
            title: "far fa-keyboard",
            searchTerms: []
        }, {
            title: "fab fa-keycdn",
            searchTerms: []
        }, {
            title: "fas fa-khanda",
            searchTerms: []
        }, {
            title: "fab fa-kickstarter",
            searchTerms: []
        }, {
            title: "fab fa-kickstarter-k",
            searchTerms: []
        }, {
            title: "fas fa-kip-sign",
            searchTerms: []
        }, {
            title: "fas fa-kit-medical",
            searchTerms: []
        }, {
            title: "fas fa-kitchen-set",
            searchTerms: []
        }, {
            title: "fas fa-kiwi-bird",
            searchTerms: []
        }, {
            title: "fab fa-korvue",
            searchTerms: []
        }, {
            title: "fas fa-l",
            searchTerms: []
        }, {
            title: "fas fa-land-mine-on",
            searchTerms: []
        }, {
            title: "fas fa-landmark",
            searchTerms: []
        }, {
            title: "fas fa-landmark-dome",
            searchTerms: []
        }, {
            title: "fas fa-landmark-flag",
            searchTerms: []
        }, {
            title: "fas fa-language",
            searchTerms: []
        }, {
            title: "fas fa-laptop",
            searchTerms: []
        }, {
            title: "fas fa-laptop-code",
            searchTerms: []
        }, {
            title: "fas fa-laptop-file",
            searchTerms: []
        }, {
            title: "fas fa-laptop-medical",
            searchTerms: []
        }, {
            title: "fab fa-laravel",
            searchTerms: []
        }, {
            title: "fas fa-lari-sign",
            searchTerms: []
        }, {
            title: "fab fa-lastfm",
            searchTerms: []
        }, {
            title: "fab fa-lastfm-square",
            searchTerms: []
        }, {
            title: "fas fa-layer-group",
            searchTerms: []
        }, {
            title: "fas fa-leaf",
            searchTerms: []
        }, {
            title: "fab fa-leanpub",
            searchTerms: []
        }, {
            title: "fas fa-left-long",
            searchTerms: []
        }, {
            title: "fas fa-left-right",
            searchTerms: []
        }, {
            title: "fas fa-lemon",
            searchTerms: []
        }, {
            title: "far fa-lemon",
            searchTerms: []
        }, {
            title: "fab fa-less",
            searchTerms: []
        }, {
            title: "fas fa-less-than",
            searchTerms: []
        }, {
            title: "fas fa-less-than-equal",
            searchTerms: []
        }, {
            title: "fas fa-life-ring",
            searchTerms: []
        }, {
            title: "far fa-life-ring",
            searchTerms: []
        }, {
            title: "fas fa-lightbulb",
            searchTerms: []
        }, {
            title: "far fa-lightbulb",
            searchTerms: []
        }, {
            title: "fab fa-line",
            searchTerms: []
        }, {
            title: "fas fa-lines-leaning",
            searchTerms: []
        }, {
            title: "fas fa-link",
            searchTerms: []
        }, {
            title: "fas fa-link-slash",
            searchTerms: []
        }, {
            title: "fab fa-linkedin",
            searchTerms: []
        }, {
            title: "fab fa-linkedin-in",
            searchTerms: []
        }, {
            title: "fab fa-linode",
            searchTerms: []
        }, {
            title: "fab fa-linux",
            searchTerms: []
        }, {
            title: "fas fa-lira-sign",
            searchTerms: []
        }, {
            title: "fas fa-list",
            searchTerms: []
        }, {
            title: "fas fa-list-check",
            searchTerms: []
        }, {
            title: "fas fa-list-ol",
            searchTerms: []
        }, {
            title: "fas fa-list-ul",
            searchTerms: []
        }, {
            title: "fas fa-litecoin-sign",
            searchTerms: []
        }, {
            title: "fas fa-location-arrow",
            searchTerms: []
        }, {
            title: "fas fa-location-crosshairs",
            searchTerms: []
        }, {
            title: "fas fa-location-dot",
            searchTerms: []
        }, {
            title: "fas fa-location-pin",
            searchTerms: []
        }, {
            title: "fas fa-location-pin-lock",
            searchTerms: []
        }, {
            title: "fas fa-lock",
            searchTerms: []
        }, {
            title: "fas fa-lock-open",
            searchTerms: []
        }, {
            title: "fas fa-locust",
            searchTerms: []
        }, {
            title: "fas fa-lungs",
            searchTerms: []
        }, {
            title: "fas fa-lungs-virus",
            searchTerms: []
        }, {
            title: "fab fa-lyft",
            searchTerms: []
        }, {
            title: "fas fa-m",
            searchTerms: []
        }, {
            title: "fab fa-magento",
            searchTerms: []
        }, {
            title: "fas fa-magnet",
            searchTerms: []
        }, {
            title: "fas fa-magnifying-glass",
            searchTerms: []
        }, {
            title: "fas fa-magnifying-glass-arrow-right",
            searchTerms: []
        }, {
            title: "fas fa-magnifying-glass-chart",
            searchTerms: []
        }, {
            title: "fas fa-magnifying-glass-dollar",
            searchTerms: []
        }, {
            title: "fas fa-magnifying-glass-location",
            searchTerms: []
        }, {
            title: "fas fa-magnifying-glass-minus",
            searchTerms: []
        }, {
            title: "fas fa-magnifying-glass-plus",
            searchTerms: []
        }, {
            title: "fab fa-mailchimp",
            searchTerms: []
        }, {
            title: "fas fa-manat-sign",
            searchTerms: []
        }, {
            title: "fab fa-mandalorian",
            searchTerms: []
        }, {
            title: "fas fa-map",
            searchTerms: []
        }, {
            title: "far fa-map",
            searchTerms: []
        }, {
            title: "fas fa-map-location",
            searchTerms: []
        }, {
            title: "fas fa-map-location-dot",
            searchTerms: []
        }, {
            title: "fas fa-map-pin",
            searchTerms: []
        }, {
            title: "fab fa-markdown",
            searchTerms: []
        }, {
            title: "fas fa-marker",
            searchTerms: []
        }, {
            title: "fas fa-mars",
            searchTerms: []
        }, {
            title: "fas fa-mars-and-venus",
            searchTerms: []
        }, {
            title: "fas fa-mars-and-venus-burst",
            searchTerms: []
        }, {
            title: "fas fa-mars-double",
            searchTerms: []
        }, {
            title: "fas fa-mars-stroke",
            searchTerms: []
        }, {
            title: "fas fa-mars-stroke-right",
            searchTerms: []
        }, {
            title: "fas fa-mars-stroke-up",
            searchTerms: []
        }, {
            title: "fas fa-martini-glass",
            searchTerms: []
        }, {
            title: "fas fa-martini-glass-citrus",
            searchTerms: []
        }, {
            title: "fas fa-martini-glass-empty",
            searchTerms: []
        }, {
            title: "fas fa-mask",
            searchTerms: []
        }, {
            title: "fas fa-mask-face",
            searchTerms: []
        }, {
            title: "fas fa-mask-ventilator",
            searchTerms: []
        }, {
            title: "fas fa-masks-theater",
            searchTerms: []
        }, {
            title: "fab fa-mastodon",
            searchTerms: []
        }, {
            title: "fas fa-mattress-pillow",
            searchTerms: []
        }, {
            title: "fab fa-maxcdn",
            searchTerms: []
        }, {
            title: "fas fa-maximize",
            searchTerms: []
        }, {
            title: "fab fa-mdb",
            searchTerms: []
        }, {
            title: "fas fa-medal",
            searchTerms: []
        }, {
            title: "fab fa-medapps",
            searchTerms: []
        }, {
            title: "fab fa-medium",
            searchTerms: []
        }, {
            title: "fab fa-medrt",
            searchTerms: []
        }, {
            title: "fab fa-meetup",
            searchTerms: []
        }, {
            title: "fab fa-megaport",
            searchTerms: []
        }, {
            title: "fas fa-memory",
            searchTerms: []
        }, {
            title: "fab fa-mendeley",
            searchTerms: []
        }, {
            title: "fas fa-menorah",
            searchTerms: []
        }, {
            title: "fas fa-mercury",
            searchTerms: []
        }, {
            title: "fas fa-message",
            searchTerms: []
        }, {
            title: "far fa-message",
            searchTerms: []
        }, {
            title: "fas fa-meteor",
            searchTerms: []
        }, {
            title: "fab fa-microblog",
            searchTerms: []
        }, {
            title: "fas fa-microchip",
            searchTerms: []
        }, {
            title: "fas fa-microphone",
            searchTerms: []
        }, {
            title: "fas fa-microphone-lines",
            searchTerms: []
        }, {
            title: "fas fa-microphone-lines-slash",
            searchTerms: []
        }, {
            title: "fas fa-microphone-slash",
            searchTerms: []
        }, {
            title: "fas fa-microscope",
            searchTerms: []
        }, {
            title: "fab fa-microsoft",
            searchTerms: []
        }, {
            title: "fas fa-mill-sign",
            searchTerms: []
        }, {
            title: "fas fa-minimize",
            searchTerms: []
        }, {
            title: "fas fa-minus",
            searchTerms: []
        }, {
            title: "fas fa-mitten",
            searchTerms: []
        }, {
            title: "fab fa-mix",
            searchTerms: []
        }, {
            title: "fab fa-mixcloud",
            searchTerms: []
        }, {
            title: "fab fa-mixer",
            searchTerms: []
        }, {
            title: "fab fa-mizuni",
            searchTerms: []
        }, {
            title: "fas fa-mobile",
            searchTerms: []
        }, {
            title: "fas fa-mobile-button",
            searchTerms: []
        }, {
            title: "fas fa-mobile-retro",
            searchTerms: []
        }, {
            title: "fas fa-mobile-screen",
            searchTerms: []
        }, {
            title: "fas fa-mobile-screen-button",
            searchTerms: []
        }, {
            title: "fab fa-modx",
            searchTerms: []
        }, {
            title: "fab fa-monero",
            searchTerms: []
        }, {
            title: "fas fa-money-bill",
            searchTerms: []
        }, {
            title: "fas fa-money-bill-1",
            searchTerms: []
        }, {
            title: "far fa-money-bill-1",
            searchTerms: []
        }, {
            title: "fas fa-money-bill-1-wave",
            searchTerms: []
        }, {
            title: "fas fa-money-bill-transfer",
            searchTerms: []
        }, {
            title: "fas fa-money-bill-trend-up",
            searchTerms: []
        }, {
            title: "fas fa-money-bill-wave",
            searchTerms: []
        }, {
            title: "fas fa-money-bill-wheat",
            searchTerms: []
        }, {
            title: "fas fa-money-bills",
            searchTerms: []
        }, {
            title: "fas fa-money-check",
            searchTerms: []
        }, {
            title: "fas fa-money-check-dollar",
            searchTerms: []
        }, {
            title: "fas fa-monument",
            searchTerms: []
        }, {
            title: "fas fa-moon",
            searchTerms: []
        }, {
            title: "far fa-moon",
            searchTerms: []
        }, {
            title: "fas fa-mortar-pestle",
            searchTerms: []
        }, {
            title: "fas fa-mosque",
            searchTerms: []
        }, {
            title: "fas fa-mosquito",
            searchTerms: []
        }, {
            title: "fas fa-mosquito-net",
            searchTerms: []
        }, {
            title: "fas fa-motorcycle",
            searchTerms: []
        }, {
            title: "fas fa-mound",
            searchTerms: []
        }, {
            title: "fas fa-mountain",
            searchTerms: []
        }, {
            title: "fas fa-mountain-city",
            searchTerms: []
        }, {
            title: "fas fa-mountain-sun",
            searchTerms: []
        }, {
            title: "fas fa-mug-hot",
            searchTerms: []
        }, {
            title: "fas fa-mug-saucer",
            searchTerms: []
        }, {
            title: "fas fa-music",
            searchTerms: []
        }, {
            title: "fas fa-n",
            searchTerms: []
        }, {
            title: "fas fa-naira-sign",
            searchTerms: []
        }, {
            title: "fab fa-napster",
            searchTerms: []
        }, {
            title: "fab fa-neos",
            searchTerms: []
        }, {
            title: "fas fa-network-wired",
            searchTerms: []
        }, {
            title: "fas fa-neuter",
            searchTerms: []
        }, {
            title: "fas fa-newspaper",
            searchTerms: []
        }, {
            title: "far fa-newspaper",
            searchTerms: []
        }, {
            title: "fab fa-nfc-directional",
            searchTerms: []
        }, {
            title: "fab fa-nfc-symbol",
            searchTerms: []
        }, {
            title: "fab fa-nimblr",
            searchTerms: []
        }, {
            title: "fab fa-node",
            searchTerms: []
        }, {
            title: "fab fa-node-js",
            searchTerms: []
        }, {
            title: "fas fa-not-equal",
            searchTerms: []
        }, {
            title: "fas fa-note-sticky",
            searchTerms: []
        }, {
            title: "far fa-note-sticky",
            searchTerms: []
        }, {
            title: "fas fa-notes-medical",
            searchTerms: []
        }, {
            title: "fab fa-npm",
            searchTerms: []
        }, {
            title: "fab fa-ns8",
            searchTerms: []
        }, {
            title: "fab fa-nutritionix",
            searchTerms: []
        }, {
            title: "fas fa-o",
            searchTerms: []
        }, {
            title: "fas fa-object-group",
            searchTerms: []
        }, {
            title: "far fa-object-group",
            searchTerms: []
        }, {
            title: "fas fa-object-ungroup",
            searchTerms: []
        }, {
            title: "far fa-object-ungroup",
            searchTerms: []
        }, {
            title: "fab fa-octopus-deploy",
            searchTerms: []
        }, {
            title: "fab fa-odnoklassniki",
            searchTerms: []
        }, {
            title: "fab fa-odnoklassniki-square",
            searchTerms: []
        }, {
            title: "fas fa-oil-can",
            searchTerms: []
        }, {
            title: "fas fa-oil-well",
            searchTerms: []
        }, {
            title: "fab fa-old-republic",
            searchTerms: []
        }, {
            title: "fas fa-om",
            searchTerms: []
        }, {
            title: "fab fa-opencart",
            searchTerms: []
        }, {
            title: "fab fa-openid",
            searchTerms: []
        }, {
            title: "fab fa-opera",
            searchTerms: []
        }, {
            title: "fab fa-optin-monster",
            searchTerms: []
        }, {
            title: "fab fa-orcid",
            searchTerms: []
        }, {
            title: "fab fa-osi",
            searchTerms: []
        }, {
            title: "fas fa-otter",
            searchTerms: []
        }, {
            title: "fas fa-outdent",
            searchTerms: []
        }, {
            title: "fas fa-p",
            searchTerms: []
        }, {
            title: "fab fa-padlet",
            searchTerms: []
        }, {
            title: "fab fa-page4",
            searchTerms: []
        }, {
            title: "fab fa-pagelines",
            searchTerms: []
        }, {
            title: "fas fa-pager",
            searchTerms: []
        }, {
            title: "fas fa-paint-roller",
            searchTerms: []
        }, {
            title: "fas fa-paintbrush",
            searchTerms: []
        }, {
            title: "fas fa-palette",
            searchTerms: []
        }, {
            title: "fab fa-palfed",
            searchTerms: []
        }, {
            title: "fas fa-pallet",
            searchTerms: []
        }, {
            title: "fas fa-panorama",
            searchTerms: []
        }, {
            title: "fas fa-paper-plane",
            searchTerms: []
        }, {
            title: "far fa-paper-plane",
            searchTerms: []
        }, {
            title: "fas fa-paperclip",
            searchTerms: []
        }, {
            title: "fas fa-parachute-box",
            searchTerms: []
        }, {
            title: "fas fa-paragraph",
            searchTerms: []
        }, {
            title: "fas fa-passport",
            searchTerms: []
        }, {
            title: "fas fa-paste",
            searchTerms: []
        }, {
            title: "far fa-paste",
            searchTerms: []
        }, {
            title: "fab fa-patreon",
            searchTerms: []
        }, {
            title: "fas fa-pause",
            searchTerms: []
        }, {
            title: "fas fa-paw",
            searchTerms: []
        }, {
            title: "fab fa-paypal",
            searchTerms: []
        }, {
            title: "fas fa-peace",
            searchTerms: []
        }, {
            title: "fas fa-pen",
            searchTerms: []
        }, {
            title: "fas fa-pen-clip",
            searchTerms: []
        }, {
            title: "fas fa-pen-fancy",
            searchTerms: []
        }, {
            title: "fas fa-pen-nib",
            searchTerms: []
        }, {
            title: "fas fa-pen-ruler",
            searchTerms: []
        }, {
            title: "fas fa-pen-to-square",
            searchTerms: []
        }, {
            title: "far fa-pen-to-square",
            searchTerms: []
        }, {
            title: "fas fa-pencil",
            searchTerms: []
        }, {
            title: "fas fa-people-arrows-left-right",
            searchTerms: []
        }, {
            title: "fas fa-people-carry-box",
            searchTerms: []
        }, {
            title: "fas fa-people-group",
            searchTerms: []
        }, {
            title: "fas fa-people-line",
            searchTerms: []
        }, {
            title: "fas fa-people-pulling",
            searchTerms: []
        }, {
            title: "fas fa-people-robbery",
            searchTerms: []
        }, {
            title: "fas fa-people-roof",
            searchTerms: []
        }, {
            title: "fas fa-pepper-hot",
            searchTerms: []
        }, {
            title: "fab fa-perbyte",
            searchTerms: []
        }, {
            title: "fas fa-percent",
            searchTerms: []
        }, {
            title: "fab fa-periscope",
            searchTerms: []
        }, {
            title: "fas fa-person",
            searchTerms: []
        }, {
            title: "fas fa-person-arrow-down-to-line",
            searchTerms: []
        }, {
            title: "fas fa-person-arrow-up-from-line",
            searchTerms: []
        }, {
            title: "fas fa-person-biking",
            searchTerms: []
        }, {
            title: "fas fa-person-booth",
            searchTerms: []
        }, {
            title: "fas fa-person-breastfeeding",
            searchTerms: []
        }, {
            title: "fas fa-person-burst",
            searchTerms: []
        }, {
            title: "fas fa-person-cane",
            searchTerms: []
        }, {
            title: "fas fa-person-chalkboard",
            searchTerms: []
        }, {
            title: "fas fa-person-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-person-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-person-circle-minus",
            searchTerms: []
        }, {
            title: "fas fa-person-circle-plus",
            searchTerms: []
        }, {
            title: "fas fa-person-circle-question",
            searchTerms: []
        }, {
            title: "fas fa-person-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-person-digging",
            searchTerms: []
        }, {
            title: "fas fa-person-dots-from-line",
            searchTerms: []
        }, {
            title: "fas fa-person-dress",
            searchTerms: []
        }, {
            title: "fas fa-person-dress-burst",
            searchTerms: []
        }, {
            title: "fas fa-person-drowning",
            searchTerms: []
        }, {
            title: "fas fa-person-falling",
            searchTerms: []
        }, {
            title: "fas fa-person-falling-burst",
            searchTerms: []
        }, {
            title: "fas fa-person-half-dress",
            searchTerms: []
        }, {
            title: "fas fa-person-harassing",
            searchTerms: []
        }, {
            title: "fas fa-person-hiking",
            searchTerms: []
        }, {
            title: "fas fa-person-military-pointing",
            searchTerms: []
        }, {
            title: "fas fa-person-military-rifle",
            searchTerms: []
        }, {
            title: "fas fa-person-military-to-person",
            searchTerms: []
        }, {
            title: "fas fa-person-praying",
            searchTerms: []
        }, {
            title: "fas fa-person-pregnant",
            searchTerms: []
        }, {
            title: "fas fa-person-rays",
            searchTerms: []
        }, {
            title: "fas fa-person-rifle",
            searchTerms: []
        }, {
            title: "fas fa-person-running",
            searchTerms: []
        }, {
            title: "fas fa-person-shelter",
            searchTerms: []
        }, {
            title: "fas fa-person-skating",
            searchTerms: []
        }, {
            title: "fas fa-person-skiing",
            searchTerms: []
        }, {
            title: "fas fa-person-skiing-nordic",
            searchTerms: []
        }, {
            title: "fas fa-person-snowboarding",
            searchTerms: []
        }, {
            title: "fas fa-person-swimming",
            searchTerms: []
        }, {
            title: "fas fa-person-through-window",
            searchTerms: []
        }, {
            title: "fas fa-person-walking",
            searchTerms: []
        }, {
            title: "fas fa-person-walking-arrow-loop-left",
            searchTerms: []
        }, {
            title: "fas fa-person-walking-arrow-right",
            searchTerms: []
        }, {
            title: "fas fa-person-walking-dashed-line-arrow-right",
            searchTerms: []
        }, {
            title: "fas fa-person-walking-luggage",
            searchTerms: []
        }, {
            title: "fas fa-person-walking-with-cane",
            searchTerms: []
        }, {
            title: "fas fa-peseta-sign",
            searchTerms: []
        }, {
            title: "fas fa-peso-sign",
            searchTerms: []
        }, {
            title: "fab fa-phabricator",
            searchTerms: []
        }, {
            title: "fab fa-phoenix-framework",
            searchTerms: []
        }, {
            title: "fab fa-phoenix-squadron",
            searchTerms: []
        }, {
            title: "fas fa-phone",
            searchTerms: []
        }, {
            title: "fas fa-phone-flip",
            searchTerms: []
        }, {
            title: "fas fa-phone-slash",
            searchTerms: []
        }, {
            title: "fas fa-phone-volume",
            searchTerms: []
        }, {
            title: "fas fa-photo-film",
            searchTerms: []
        }, {
            title: "fab fa-php",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper-alt",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper-hat",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper-pp",
            searchTerms: []
        }, {
            title: "fab fa-pied-piper-square",
            searchTerms: []
        }, {
            title: "fas fa-piggy-bank",
            searchTerms: []
        }, {
            title: "fas fa-pills",
            searchTerms: []
        }, {
            title: "fab fa-pinterest",
            searchTerms: []
        }, {
            title: "fab fa-pinterest-p",
            searchTerms: []
        }, {
            title: "fab fa-pinterest-square",
            searchTerms: []
        }, {
            title: "fab fa-pix",
            searchTerms: []
        }, {
            title: "fas fa-pizza-slice",
            searchTerms: []
        }, {
            title: "fas fa-place-of-worship",
            searchTerms: []
        }, {
            title: "fas fa-plane",
            searchTerms: []
        }, {
            title: "fas fa-plane-arrival",
            searchTerms: []
        }, {
            title: "fas fa-plane-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-plane-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-plane-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-plane-departure",
            searchTerms: []
        }, {
            title: "fas fa-plane-lock",
            searchTerms: []
        }, {
            title: "fas fa-plane-slash",
            searchTerms: []
        }, {
            title: "fas fa-plane-up",
            searchTerms: []
        }, {
            title: "fas fa-plant-wilt",
            searchTerms: []
        }, {
            title: "fas fa-plate-wheat",
            searchTerms: []
        }, {
            title: "fas fa-play",
            searchTerms: []
        }, {
            title: "fab fa-playstation",
            searchTerms: []
        }, {
            title: "fas fa-plug",
            searchTerms: []
        }, {
            title: "fas fa-plug-circle-bolt",
            searchTerms: []
        }, {
            title: "fas fa-plug-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-plug-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-plug-circle-minus",
            searchTerms: []
        }, {
            title: "fas fa-plug-circle-plus",
            searchTerms: []
        }, {
            title: "fas fa-plug-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-plus",
            searchTerms: []
        }, {
            title: "fas fa-plus-minus",
            searchTerms: []
        }, {
            title: "fas fa-podcast",
            searchTerms: []
        }, {
            title: "fas fa-poo",
            searchTerms: []
        }, {
            title: "fas fa-poo-storm",
            searchTerms: []
        }, {
            title: "fas fa-poop",
            searchTerms: []
        }, {
            title: "fas fa-power-off",
            searchTerms: []
        }, {
            title: "fas fa-prescription",
            searchTerms: []
        }, {
            title: "fas fa-prescription-bottle",
            searchTerms: []
        }, {
            title: "fas fa-prescription-bottle-medical",
            searchTerms: []
        }, {
            title: "fas fa-print",
            searchTerms: []
        }, {
            title: "fab fa-product-hunt",
            searchTerms: []
        }, {
            title: "fas fa-pump-medical",
            searchTerms: []
        }, {
            title: "fas fa-pump-soap",
            searchTerms: []
        }, {
            title: "fab fa-pushed",
            searchTerms: []
        }, {
            title: "fas fa-puzzle-piece",
            searchTerms: []
        }, {
            title: "fab fa-python",
            searchTerms: []
        }, {
            title: "fas fa-q",
            searchTerms: []
        }, {
            title: "fab fa-qq",
            searchTerms: []
        }, {
            title: "fas fa-qrcode",
            searchTerms: []
        }, {
            title: "fas fa-question",
            searchTerms: []
        }, {
            title: "fab fa-quinscape",
            searchTerms: []
        }, {
            title: "fab fa-quora",
            searchTerms: []
        }, {
            title: "fas fa-quote-left",
            searchTerms: []
        }, {
            title: "fas fa-quote-right",
            searchTerms: []
        }, {
            title: "fas fa-r",
            searchTerms: []
        }, {
            title: "fab fa-r-project",
            searchTerms: []
        }, {
            title: "fas fa-radiation",
            searchTerms: []
        }, {
            title: "fas fa-radio",
            searchTerms: []
        }, {
            title: "fas fa-rainbow",
            searchTerms: []
        }, {
            title: "fas fa-ranking-star",
            searchTerms: []
        }, {
            title: "fab fa-raspberry-pi",
            searchTerms: []
        }, {
            title: "fab fa-ravelry",
            searchTerms: []
        }, {
            title: "fab fa-react",
            searchTerms: []
        }, {
            title: "fab fa-reacteurope",
            searchTerms: []
        }, {
            title: "fab fa-readme",
            searchTerms: []
        }, {
            title: "fab fa-rebel",
            searchTerms: []
        }, {
            title: "fas fa-receipt",
            searchTerms: []
        }, {
            title: "fas fa-record-vinyl",
            searchTerms: []
        }, {
            title: "fas fa-rectangle-ad",
            searchTerms: []
        }, {
            title: "fas fa-rectangle-list",
            searchTerms: []
        }, {
            title: "far fa-rectangle-list",
            searchTerms: []
        }, {
            title: "fas fa-rectangle-xmark",
            searchTerms: []
        }, {
            title: "far fa-rectangle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-recycle",
            searchTerms: []
        }, {
            title: "fab fa-red-river",
            searchTerms: []
        }, {
            title: "fab fa-reddit",
            searchTerms: []
        }, {
            title: "fab fa-reddit-alien",
            searchTerms: []
        }, {
            title: "fab fa-reddit-square",
            searchTerms: []
        }, {
            title: "fab fa-redhat",
            searchTerms: []
        }, {
            title: "fas fa-registered",
            searchTerms: []
        }, {
            title: "far fa-registered",
            searchTerms: []
        }, {
            title: "fab fa-renren",
            searchTerms: []
        }, {
            title: "fas fa-repeat",
            searchTerms: []
        }, {
            title: "fas fa-reply",
            searchTerms: []
        }, {
            title: "fas fa-reply-all",
            searchTerms: []
        }, {
            title: "fab fa-replyd",
            searchTerms: []
        }, {
            title: "fas fa-republican",
            searchTerms: []
        }, {
            title: "fab fa-researchgate",
            searchTerms: []
        }, {
            title: "fab fa-resolving",
            searchTerms: []
        }, {
            title: "fas fa-restroom",
            searchTerms: []
        }, {
            title: "fas fa-retweet",
            searchTerms: []
        }, {
            title: "fab fa-rev",
            searchTerms: []
        }, {
            title: "fas fa-ribbon",
            searchTerms: []
        }, {
            title: "fas fa-right-from-bracket",
            searchTerms: []
        }, {
            title: "fas fa-right-left",
            searchTerms: []
        }, {
            title: "fas fa-right-long",
            searchTerms: []
        }, {
            title: "fas fa-right-to-bracket",
            searchTerms: []
        }, {
            title: "fas fa-ring",
            searchTerms: []
        }, {
            title: "fas fa-road",
            searchTerms: []
        }, {
            title: "fas fa-road-barrier",
            searchTerms: []
        }, {
            title: "fas fa-road-bridge",
            searchTerms: []
        }, {
            title: "fas fa-road-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-road-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-road-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-road-lock",
            searchTerms: []
        }, {
            title: "fas fa-road-spikes",
            searchTerms: []
        }, {
            title: "fas fa-robot",
            searchTerms: []
        }, {
            title: "fas fa-rocket",
            searchTerms: []
        }, {
            title: "fab fa-rocketchat",
            searchTerms: []
        }, {
            title: "fab fa-rockrms",
            searchTerms: []
        }, {
            title: "fas fa-rotate",
            searchTerms: []
        }, {
            title: "fas fa-rotate-left",
            searchTerms: []
        }, {
            title: "fas fa-rotate-right",
            searchTerms: []
        }, {
            title: "fas fa-route",
            searchTerms: []
        }, {
            title: "fas fa-rss",
            searchTerms: []
        }, {
            title: "fas fa-ruble-sign",
            searchTerms: []
        }, {
            title: "fas fa-rug",
            searchTerms: []
        }, {
            title: "fas fa-ruler",
            searchTerms: []
        }, {
            title: "fas fa-ruler-combined",
            searchTerms: []
        }, {
            title: "fas fa-ruler-horizontal",
            searchTerms: []
        }, {
            title: "fas fa-ruler-vertical",
            searchTerms: []
        }, {
            title: "fas fa-rupee-sign",
            searchTerms: []
        }, {
            title: "fas fa-rupiah-sign",
            searchTerms: []
        }, {
            title: "fab fa-rust",
            searchTerms: []
        }, {
            title: "fas fa-s",
            searchTerms: []
        }, {
            title: "fas fa-sack-dollar",
            searchTerms: []
        }, {
            title: "fas fa-sack-xmark",
            searchTerms: []
        }, {
            title: "fab fa-safari",
            searchTerms: []
        }, {
            title: "fas fa-sailboat",
            searchTerms: []
        }, {
            title: "fab fa-salesforce",
            searchTerms: []
        }, {
            title: "fab fa-sass",
            searchTerms: []
        }, {
            title: "fas fa-satellite",
            searchTerms: []
        }, {
            title: "fas fa-satellite-dish",
            searchTerms: []
        }, {
            title: "fas fa-scale-balanced",
            searchTerms: []
        }, {
            title: "fas fa-scale-unbalanced",
            searchTerms: []
        }, {
            title: "fas fa-scale-unbalanced-flip",
            searchTerms: []
        }, {
            title: "fab fa-schlix",
            searchTerms: []
        }, {
            title: "fas fa-school",
            searchTerms: []
        }, {
            title: "fas fa-school-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-school-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-school-circle-xmark",
            searchTerms: []
        }, {
            title: "fas fa-school-flag",
            searchTerms: []
        }, {
            title: "fas fa-school-lock",
            searchTerms: []
        }, {
            title: "fas fa-scissors",
            searchTerms: []
        }, {
            title: "fab fa-screenpal",
            searchTerms: []
        }, {
            title: "fas fa-screwdriver",
            searchTerms: []
        }, {
            title: "fas fa-screwdriver-wrench",
            searchTerms: []
        }, {
            title: "fab fa-scribd",
            searchTerms: []
        }, {
            title: "fas fa-scroll",
            searchTerms: []
        }, {
            title: "fas fa-scroll-torah",
            searchTerms: []
        }, {
            title: "fas fa-sd-card",
            searchTerms: []
        }, {
            title: "fab fa-searchengin",
            searchTerms: []
        }, {
            title: "fas fa-section",
            searchTerms: []
        }, {
            title: "fas fa-seedling",
            searchTerms: []
        }, {
            title: "fab fa-sellcast",
            searchTerms: []
        }, {
            title: "fab fa-sellsy",
            searchTerms: []
        }, {
            title: "fas fa-server",
            searchTerms: []
        }, {
            title: "fab fa-servicestack",
            searchTerms: []
        }, {
            title: "fas fa-shapes",
            searchTerms: []
        }, {
            title: "fas fa-share",
            searchTerms: []
        }, {
            title: "fas fa-share-from-square",
            searchTerms: []
        }, {
            title: "far fa-share-from-square",
            searchTerms: []
        }, {
            title: "fas fa-share-nodes",
            searchTerms: []
        }, {
            title: "fas fa-sheet-plastic",
            searchTerms: []
        }, {
            title: "fas fa-shekel-sign",
            searchTerms: []
        }, {
            title: "fas fa-shield",
            searchTerms: []
        }, {
            title: "fas fa-shield-cat",
            searchTerms: []
        }, {
            title: "fas fa-shield-dog",
            searchTerms: []
        }, {
            title: "fas fa-shield-halved",
            searchTerms: []
        }, {
            title: "fas fa-shield-heart",
            searchTerms: []
        }, {
            title: "fas fa-shield-virus",
            searchTerms: []
        }, {
            title: "fas fa-ship",
            searchTerms: []
        }, {
            title: "fas fa-shirt",
            searchTerms: []
        }, {
            title: "fab fa-shirtsinbulk",
            searchTerms: []
        }, {
            title: "fas fa-shoe-prints",
            searchTerms: []
        }, {
            title: "fas fa-shop",
            searchTerms: []
        }, {
            title: "fas fa-shop-lock",
            searchTerms: []
        }, {
            title: "fas fa-shop-slash",
            searchTerms: []
        }, {
            title: "fab fa-shopify",
            searchTerms: []
        }, {
            title: "fab fa-shopware",
            searchTerms: []
        }, {
            title: "fas fa-shower",
            searchTerms: []
        }, {
            title: "fas fa-shrimp",
            searchTerms: []
        }, {
            title: "fas fa-shuffle",
            searchTerms: []
        }, {
            title: "fas fa-shuttle-space",
            searchTerms: []
        }, {
            title: "fas fa-sign-hanging",
            searchTerms: []
        }, {
            title: "fas fa-signal",
            searchTerms: []
        }, {
            title: "fas fa-signature",
            searchTerms: []
        }, {
            title: "fas fa-signs-post",
            searchTerms: []
        }, {
            title: "fas fa-sim-card",
            searchTerms: []
        }, {
            title: "fab fa-simplybuilt",
            searchTerms: []
        }, {
            title: "fas fa-sink",
            searchTerms: []
        }, {
            title: "fab fa-sistrix",
            searchTerms: []
        }, {
            title: "fas fa-sitemap",
            searchTerms: []
        }, {
            title: "fab fa-sith",
            searchTerms: []
        }, {
            title: "fab fa-sitrox",
            searchTerms: []
        }, {
            title: "fab fa-sketch",
            searchTerms: []
        }, {
            title: "fas fa-skull",
            searchTerms: []
        }, {
            title: "fas fa-skull-crossbones",
            searchTerms: []
        }, {
            title: "fab fa-skyatlas",
            searchTerms: []
        }, {
            title: "fab fa-skype",
            searchTerms: []
        }, {
            title: "fab fa-slack",
            searchTerms: []
        }, {
            title: "fas fa-slash",
            searchTerms: []
        }, {
            title: "fas fa-sleigh",
            searchTerms: []
        }, {
            title: "fas fa-sliders",
            searchTerms: []
        }, {
            title: "fab fa-slideshare",
            searchTerms: []
        }, {
            title: "fas fa-smog",
            searchTerms: []
        }, {
            title: "fas fa-smoking",
            searchTerms: []
        }, {
            title: "fab fa-snapchat",
            searchTerms: []
        }, {
            title: "fab fa-snapchat-square",
            searchTerms: []
        }, {
            title: "fas fa-snowflake",
            searchTerms: []
        }, {
            title: "far fa-snowflake",
            searchTerms: []
        }, {
            title: "fas fa-snowman",
            searchTerms: []
        }, {
            title: "fas fa-snowplow",
            searchTerms: []
        }, {
            title: "fas fa-soap",
            searchTerms: []
        }, {
            title: "fas fa-socks",
            searchTerms: []
        }, {
            title: "fas fa-solar-panel",
            searchTerms: []
        }, {
            title: "fas fa-sort",
            searchTerms: []
        }, {
            title: "fas fa-sort-down",
            searchTerms: []
        }, {
            title: "fas fa-sort-up",
            searchTerms: []
        }, {
            title: "fab fa-soundcloud",
            searchTerms: []
        }, {
            title: "fab fa-sourcetree",
            searchTerms: []
        }, {
            title: "fas fa-spa",
            searchTerms: []
        }, {
            title: "fas fa-spaghetti-monster-flying",
            searchTerms: []
        }, {
            title: "fab fa-speakap",
            searchTerms: []
        }, {
            title: "fab fa-speaker-deck",
            searchTerms: []
        }, {
            title: "fas fa-spell-check",
            searchTerms: []
        }, {
            title: "fas fa-spider",
            searchTerms: []
        }, {
            title: "fas fa-spinner",
            searchTerms: []
        }, {
            title: "fas fa-splotch",
            searchTerms: []
        }, {
            title: "fas fa-spoon",
            searchTerms: []
        }, {
            title: "fab fa-spotify",
            searchTerms: []
        }, {
            title: "fas fa-spray-can",
            searchTerms: []
        }, {
            title: "fas fa-spray-can-sparkles",
            searchTerms: []
        }, {
            title: "fas fa-square",
            searchTerms: []
        }, {
            title: "far fa-square",
            searchTerms: []
        }, {
            title: "fas fa-square-arrow-up-right",
            searchTerms: []
        }, {
            title: "fas fa-square-caret-down",
            searchTerms: []
        }, {
            title: "far fa-square-caret-down",
            searchTerms: []
        }, {
            title: "fas fa-square-caret-left",
            searchTerms: []
        }, {
            title: "far fa-square-caret-left",
            searchTerms: []
        }, {
            title: "fas fa-square-caret-right",
            searchTerms: []
        }, {
            title: "far fa-square-caret-right",
            searchTerms: []
        }, {
            title: "fas fa-square-caret-up",
            searchTerms: []
        }, {
            title: "far fa-square-caret-up",
            searchTerms: []
        }, {
            title: "fas fa-square-check",
            searchTerms: []
        }, {
            title: "far fa-square-check",
            searchTerms: []
        }, {
            title: "fas fa-square-envelope",
            searchTerms: []
        }, {
            title: "fab fa-square-font-awesome",
            searchTerms: []
        }, {
            title: "fab fa-square-font-awesome-stroke",
            searchTerms: []
        }, {
            title: "fas fa-square-full",
            searchTerms: []
        }, {
            title: "far fa-square-full",
            searchTerms: []
        }, {
            title: "fas fa-square-h",
            searchTerms: []
        }, {
            title: "fas fa-square-minus",
            searchTerms: []
        }, {
            title: "far fa-square-minus",
            searchTerms: []
        }, {
            title: "fas fa-square-nfi",
            searchTerms: []
        }, {
            title: "fas fa-square-parking",
            searchTerms: []
        }, {
            title: "fas fa-square-pen",
            searchTerms: []
        }, {
            title: "fas fa-square-person-confined",
            searchTerms: []
        }, {
            title: "fas fa-square-phone",
            searchTerms: []
        }, {
            title: "fas fa-square-phone-flip",
            searchTerms: []
        }, {
            title: "fas fa-square-plus",
            searchTerms: []
        }, {
            title: "far fa-square-plus",
            searchTerms: []
        }, {
            title: "fas fa-square-poll-horizontal",
            searchTerms: []
        }, {
            title: "fas fa-square-poll-vertical",
            searchTerms: []
        }, {
            title: "fas fa-square-root-variable",
            searchTerms: []
        }, {
            title: "fas fa-square-rss",
            searchTerms: []
        }, {
            title: "fas fa-square-share-nodes",
            searchTerms: []
        }, {
            title: "fas fa-square-up-right",
            searchTerms: []
        }, {
            title: "fas fa-square-virus",
            searchTerms: []
        }, {
            title: "fas fa-square-xmark",
            searchTerms: []
        }, {
            title: "fab fa-squarespace",
            searchTerms: []
        }, {
            title: "fab fa-stack-exchange",
            searchTerms: []
        }, {
            title: "fab fa-stack-overflow",
            searchTerms: []
        }, {
            title: "fab fa-stackpath",
            searchTerms: []
        }, {
            title: "fas fa-staff-aesculapius",
            searchTerms: []
        }, {
            title: "fas fa-stairs",
            searchTerms: []
        }, {
            title: "fas fa-stamp",
            searchTerms: []
        }, {
            title: "fas fa-star",
            searchTerms: []
        }, {
            title: "far fa-star",
            searchTerms: []
        }, {
            title: "fas fa-star-and-crescent",
            searchTerms: []
        }, {
            title: "fas fa-star-half",
            searchTerms: []
        }, {
            title: "far fa-star-half",
            searchTerms: []
        }, {
            title: "fas fa-star-half-stroke",
            searchTerms: []
        }, {
            title: "far fa-star-half-stroke",
            searchTerms: []
        }, {
            title: "fas fa-star-of-david",
            searchTerms: []
        }, {
            title: "fas fa-star-of-life",
            searchTerms: []
        }, {
            title: "fab fa-staylinked",
            searchTerms: []
        }, {
            title: "fab fa-steam",
            searchTerms: []
        }, {
            title: "fab fa-steam-square",
            searchTerms: []
        }, {
            title: "fab fa-steam-symbol",
            searchTerms: []
        }, {
            title: "fas fa-sterling-sign",
            searchTerms: []
        }, {
            title: "fas fa-stethoscope",
            searchTerms: []
        }, {
            title: "fab fa-sticker-mule",
            searchTerms: []
        }, {
            title: "fas fa-stop",
            searchTerms: []
        }, {
            title: "fas fa-stopwatch",
            searchTerms: []
        }, {
            title: "fas fa-stopwatch-20",
            searchTerms: []
        }, {
            title: "fas fa-store",
            searchTerms: []
        }, {
            title: "fas fa-store-slash",
            searchTerms: []
        }, {
            title: "fab fa-strava",
            searchTerms: []
        }, {
            title: "fas fa-street-view",
            searchTerms: []
        }, {
            title: "fas fa-strikethrough",
            searchTerms: []
        }, {
            title: "fab fa-stripe",
            searchTerms: []
        }, {
            title: "fab fa-stripe-s",
            searchTerms: []
        }, {
            title: "fas fa-stroopwafel",
            searchTerms: []
        }, {
            title: "fab fa-studiovinari",
            searchTerms: []
        }, {
            title: "fab fa-stumbleupon",
            searchTerms: []
        }, {
            title: "fab fa-stumbleupon-circle",
            searchTerms: []
        }, {
            title: "fas fa-subscript",
            searchTerms: []
        }, {
            title: "fas fa-suitcase",
            searchTerms: []
        }, {
            title: "fas fa-suitcase-medical",
            searchTerms: []
        }, {
            title: "fas fa-suitcase-rolling",
            searchTerms: []
        }, {
            title: "fas fa-sun",
            searchTerms: []
        }, {
            title: "far fa-sun",
            searchTerms: []
        }, {
            title: "fas fa-sun-plant-wilt",
            searchTerms: []
        }, {
            title: "fab fa-superpowers",
            searchTerms: []
        }, {
            title: "fas fa-superscript",
            searchTerms: []
        }, {
            title: "fab fa-supple",
            searchTerms: []
        }, {
            title: "fab fa-suse",
            searchTerms: []
        }, {
            title: "fas fa-swatchbook",
            searchTerms: []
        }, {
            title: "fab fa-swift",
            searchTerms: []
        }, {
            title: "fab fa-symfony",
            searchTerms: []
        }, {
            title: "fas fa-synagogue",
            searchTerms: []
        }, {
            title: "fas fa-syringe",
            searchTerms: []
        }, {
            title: "fas fa-t",
            searchTerms: []
        }, {
            title: "fas fa-table",
            searchTerms: []
        }, {
            title: "fas fa-table-cells",
            searchTerms: []
        }, {
            title: "fas fa-table-cells-large",
            searchTerms: []
        }, {
            title: "fas fa-table-columns",
            searchTerms: []
        }, {
            title: "fas fa-table-list",
            searchTerms: []
        }, {
            title: "fas fa-table-tennis-paddle-ball",
            searchTerms: []
        }, {
            title: "fas fa-tablet",
            searchTerms: []
        }, {
            title: "fas fa-tablet-button",
            searchTerms: []
        }, {
            title: "fas fa-tablet-screen-button",
            searchTerms: []
        }, {
            title: "fas fa-tablets",
            searchTerms: []
        }, {
            title: "fas fa-tachograph-digital",
            searchTerms: []
        }, {
            title: "fas fa-tag",
            searchTerms: []
        }, {
            title: "fas fa-tags",
            searchTerms: []
        }, {
            title: "fas fa-tape",
            searchTerms: []
        }, {
            title: "fas fa-tarp",
            searchTerms: []
        }, {
            title: "fas fa-tarp-droplet",
            searchTerms: []
        }, {
            title: "fas fa-taxi",
            searchTerms: []
        }, {
            title: "fab fa-teamspeak",
            searchTerms: []
        }, {
            title: "fas fa-teeth",
            searchTerms: []
        }, {
            title: "fas fa-teeth-open",
            searchTerms: []
        }, {
            title: "fab fa-telegram",
            searchTerms: []
        }, {
            title: "fas fa-temperature-arrow-down",
            searchTerms: []
        }, {
            title: "fas fa-temperature-arrow-up",
            searchTerms: []
        }, {
            title: "fas fa-temperature-empty",
            searchTerms: []
        }, {
            title: "fas fa-temperature-full",
            searchTerms: []
        }, {
            title: "fas fa-temperature-half",
            searchTerms: []
        }, {
            title: "fas fa-temperature-high",
            searchTerms: []
        }, {
            title: "fas fa-temperature-low",
            searchTerms: []
        }, {
            title: "fas fa-temperature-quarter",
            searchTerms: []
        }, {
            title: "fas fa-temperature-three-quarters",
            searchTerms: []
        }, {
            title: "fab fa-tencent-weibo",
            searchTerms: []
        }, {
            title: "fas fa-tenge-sign",
            searchTerms: []
        }, {
            title: "fas fa-tent",
            searchTerms: []
        }, {
            title: "fas fa-tent-arrow-down-to-line",
            searchTerms: []
        }, {
            title: "fas fa-tent-arrow-left-right",
            searchTerms: []
        }, {
            title: "fas fa-tent-arrow-turn-left",
            searchTerms: []
        }, {
            title: "fas fa-tent-arrows-down",
            searchTerms: []
        }, {
            title: "fas fa-tents",
            searchTerms: []
        }, {
            title: "fas fa-terminal",
            searchTerms: []
        }, {
            title: "fas fa-text-height",
            searchTerms: []
        }, {
            title: "fas fa-text-slash",
            searchTerms: []
        }, {
            title: "fas fa-text-width",
            searchTerms: []
        }, {
            title: "fab fa-the-red-yeti",
            searchTerms: []
        }, {
            title: "fab fa-themeco",
            searchTerms: []
        }, {
            title: "fab fa-themeisle",
            searchTerms: []
        }, {
            title: "fas fa-thermometer",
            searchTerms: []
        }, {
            title: "fab fa-think-peaks",
            searchTerms: []
        }, {
            title: "fas fa-thumbs-down",
            searchTerms: []
        }, {
            title: "far fa-thumbs-down",
            searchTerms: []
        }, {
            title: "fas fa-thumbs-up",
            searchTerms: []
        }, {
            title: "far fa-thumbs-up",
            searchTerms: []
        }, {
            title: "fas fa-thumbtack",
            searchTerms: []
        }, {
            title: "fas fa-ticket",
            searchTerms: []
        }, {
            title: "fas fa-ticket-simple",
            searchTerms: []
        }, {
            title: "fab fa-tiktok",
            searchTerms: []
        }, {
            title: "fas fa-timeline",
            searchTerms: []
        }, {
            title: "fas fa-toggle-off",
            searchTerms: []
        }, {
            title: "fas fa-toggle-on",
            searchTerms: []
        }, {
            title: "fas fa-toilet",
            searchTerms: []
        }, {
            title: "fas fa-toilet-paper",
            searchTerms: []
        }, {
            title: "fas fa-toilet-paper-slash",
            searchTerms: []
        }, {
            title: "fas fa-toilet-portable",
            searchTerms: []
        }, {
            title: "fas fa-toilets-portable",
            searchTerms: []
        }, {
            title: "fas fa-toolbox",
            searchTerms: []
        }, {
            title: "fas fa-tooth",
            searchTerms: []
        }, {
            title: "fas fa-torii-gate",
            searchTerms: []
        }, {
            title: "fas fa-tornado",
            searchTerms: []
        }, {
            title: "fas fa-tower-broadcast",
            searchTerms: []
        }, {
            title: "fas fa-tower-cell",
            searchTerms: []
        }, {
            title: "fas fa-tower-observation",
            searchTerms: []
        }, {
            title: "fas fa-tractor",
            searchTerms: []
        }, {
            title: "fab fa-trade-federation",
            searchTerms: []
        }, {
            title: "fas fa-trademark",
            searchTerms: []
        }, {
            title: "fas fa-traffic-light",
            searchTerms: []
        }, {
            title: "fas fa-trailer",
            searchTerms: []
        }, {
            title: "fas fa-train",
            searchTerms: []
        }, {
            title: "fas fa-train-subway",
            searchTerms: []
        }, {
            title: "fas fa-train-tram",
            searchTerms: []
        }, {
            title: "fas fa-transgender",
            searchTerms: []
        }, {
            title: "fas fa-trash",
            searchTerms: []
        }, {
            title: "fas fa-trash-arrow-up",
            searchTerms: []
        }, {
            title: "fas fa-trash-can",
            searchTerms: []
        }, {
            title: "far fa-trash-can",
            searchTerms: []
        }, {
            title: "fas fa-trash-can-arrow-up",
            searchTerms: []
        }, {
            title: "fas fa-tree",
            searchTerms: []
        }, {
            title: "fas fa-tree-city",
            searchTerms: []
        }, {
            title: "fab fa-trello",
            searchTerms: []
        }, {
            title: "fas fa-triangle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-trophy",
            searchTerms: []
        }, {
            title: "fas fa-trowel",
            searchTerms: []
        }, {
            title: "fas fa-trowel-bricks",
            searchTerms: []
        }, {
            title: "fas fa-truck",
            searchTerms: []
        }, {
            title: "fas fa-truck-arrow-right",
            searchTerms: []
        }, {
            title: "fas fa-truck-droplet",
            searchTerms: []
        }, {
            title: "fas fa-truck-fast",
            searchTerms: []
        }, {
            title: "fas fa-truck-field",
            searchTerms: []
        }, {
            title: "fas fa-truck-field-un",
            searchTerms: []
        }, {
            title: "fas fa-truck-front",
            searchTerms: []
        }, {
            title: "fas fa-truck-medical",
            searchTerms: []
        }, {
            title: "fas fa-truck-monster",
            searchTerms: []
        }, {
            title: "fas fa-truck-moving",
            searchTerms: []
        }, {
            title: "fas fa-truck-pickup",
            searchTerms: []
        }, {
            title: "fas fa-truck-plane",
            searchTerms: []
        }, {
            title: "fas fa-truck-ramp-box",
            searchTerms: []
        }, {
            title: "fas fa-tty",
            searchTerms: []
        }, {
            title: "fab fa-tumblr",
            searchTerms: []
        }, {
            title: "fab fa-tumblr-square",
            searchTerms: []
        }, {
            title: "fas fa-turkish-lira-sign",
            searchTerms: []
        }, {
            title: "fas fa-turn-down",
            searchTerms: []
        }, {
            title: "fas fa-turn-up",
            searchTerms: []
        }, {
            title: "fas fa-tv",
            searchTerms: []
        }, {
            title: "fab fa-twitch",
            searchTerms: []
        }, {
            title: "fab fa-twitter",
            searchTerms: []
        }, {
            title: "fab fa-twitter-square",
            searchTerms: []
        }, {
            title: "fab fa-typo3",
            searchTerms: []
        }, {
            title: "fas fa-u",
            searchTerms: []
        }, {
            title: "fab fa-uber",
            searchTerms: []
        }, {
            title: "fab fa-ubuntu",
            searchTerms: []
        }, {
            title: "fab fa-uikit",
            searchTerms: []
        }, {
            title: "fab fa-umbraco",
            searchTerms: []
        }, {
            title: "fas fa-umbrella",
            searchTerms: []
        }, {
            title: "fas fa-umbrella-beach",
            searchTerms: []
        }, {
            title: "fab fa-uncharted",
            searchTerms: []
        }, {
            title: "fas fa-underline",
            searchTerms: []
        }, {
            title: "fab fa-uniregistry",
            searchTerms: []
        }, {
            title: "fab fa-unity",
            searchTerms: []
        }, {
            title: "fas fa-universal-access",
            searchTerms: []
        }, {
            title: "fas fa-unlock",
            searchTerms: []
        }, {
            title: "fas fa-unlock-keyhole",
            searchTerms: []
        }, {
            title: "fab fa-unsplash",
            searchTerms: []
        }, {
            title: "fab fa-untappd",
            searchTerms: []
        }, {
            title: "fas fa-up-down",
            searchTerms: []
        }, {
            title: "fas fa-up-down-left-right",
            searchTerms: []
        }, {
            title: "fas fa-up-long",
            searchTerms: []
        }, {
            title: "fas fa-up-right-and-down-left-from-center",
            searchTerms: []
        }, {
            title: "fas fa-up-right-from-square",
            searchTerms: []
        }, {
            title: "fas fa-upload",
            searchTerms: []
        }, {
            title: "fab fa-ups",
            searchTerms: []
        }, {
            title: "fab fa-usb",
            searchTerms: []
        }, {
            title: "fas fa-user",
            searchTerms: []
        }, {
            title: "far fa-user",
            searchTerms: []
        }, {
            title: "fas fa-user-astronaut",
            searchTerms: []
        }, {
            title: "fas fa-user-check",
            searchTerms: []
        }, {
            title: "fas fa-user-clock",
            searchTerms: []
        }, {
            title: "fas fa-user-doctor",
            searchTerms: []
        }, {
            title: "fas fa-user-gear",
            searchTerms: []
        }, {
            title: "fas fa-user-graduate",
            searchTerms: []
        }, {
            title: "fas fa-user-group",
            searchTerms: []
        }, {
            title: "fas fa-user-injured",
            searchTerms: []
        }, {
            title: "fas fa-user-large",
            searchTerms: []
        }, {
            title: "fas fa-user-large-slash",
            searchTerms: []
        }, {
            title: "fas fa-user-lock",
            searchTerms: []
        }, {
            title: "fas fa-user-minus",
            searchTerms: []
        }, {
            title: "fas fa-user-ninja",
            searchTerms: []
        }, {
            title: "fas fa-user-nurse",
            searchTerms: []
        }, {
            title: "fas fa-user-pen",
            searchTerms: []
        }, {
            title: "fas fa-user-plus",
            searchTerms: []
        }, {
            title: "fas fa-user-secret",
            searchTerms: []
        }, {
            title: "fas fa-user-shield",
            searchTerms: []
        }, {
            title: "fas fa-user-slash",
            searchTerms: []
        }, {
            title: "fas fa-user-tag",
            searchTerms: []
        }, {
            title: "fas fa-user-tie",
            searchTerms: []
        }, {
            title: "fas fa-user-xmark",
            searchTerms: []
        }, {
            title: "fas fa-users",
            searchTerms: []
        }, {
            title: "fas fa-users-between-lines",
            searchTerms: []
        }, {
            title: "fas fa-users-gear",
            searchTerms: []
        }, {
            title: "fas fa-users-line",
            searchTerms: []
        }, {
            title: "fas fa-users-rays",
            searchTerms: []
        }, {
            title: "fas fa-users-rectangle",
            searchTerms: []
        }, {
            title: "fas fa-users-slash",
            searchTerms: []
        }, {
            title: "fas fa-users-viewfinder",
            searchTerms: []
        }, {
            title: "fab fa-usps",
            searchTerms: []
        }, {
            title: "fab fa-ussunnah",
            searchTerms: []
        }, {
            title: "fas fa-utensils",
            searchTerms: []
        }, {
            title: "fas fa-v",
            searchTerms: []
        }, {
            title: "fab fa-vaadin",
            searchTerms: []
        }, {
            title: "fas fa-van-shuttle",
            searchTerms: []
        }, {
            title: "fas fa-vault",
            searchTerms: []
        }, {
            title: "fas fa-vector-square",
            searchTerms: []
        }, {
            title: "fas fa-venus",
            searchTerms: []
        }, {
            title: "fas fa-venus-double",
            searchTerms: []
        }, {
            title: "fas fa-venus-mars",
            searchTerms: []
        }, {
            title: "fas fa-vest",
            searchTerms: []
        }, {
            title: "fas fa-vest-patches",
            searchTerms: []
        }, {
            title: "fab fa-viacoin",
            searchTerms: []
        }, {
            title: "fab fa-viadeo",
            searchTerms: []
        }, {
            title: "fab fa-viadeo-square",
            searchTerms: []
        }, {
            title: "fas fa-vial",
            searchTerms: []
        }, {
            title: "fas fa-vial-circle-check",
            searchTerms: []
        }, {
            title: "fas fa-vial-virus",
            searchTerms: []
        }, {
            title: "fas fa-vials",
            searchTerms: []
        }, {
            title: "fab fa-viber",
            searchTerms: []
        }, {
            title: "fas fa-video",
            searchTerms: []
        }, {
            title: "fas fa-video-slash",
            searchTerms: []
        }, {
            title: "fas fa-vihara",
            searchTerms: []
        }, {
            title: "fab fa-vimeo",
            searchTerms: []
        }, {
            title: "fab fa-vimeo-square",
            searchTerms: []
        }, {
            title: "fab fa-vimeo-v",
            searchTerms: []
        }, {
            title: "fab fa-vine",
            searchTerms: []
        }, {
            title: "fas fa-virus",
            searchTerms: []
        }, {
            title: "fas fa-virus-covid",
            searchTerms: []
        }, {
            title: "fas fa-virus-covid-slash",
            searchTerms: []
        }, {
            title: "fas fa-virus-slash",
            searchTerms: []
        }, {
            title: "fas fa-viruses",
            searchTerms: []
        }, {
            title: "fab fa-vk",
            searchTerms: []
        }, {
            title: "fab fa-vnv",
            searchTerms: []
        }, {
            title: "fas fa-voicemail",
            searchTerms: []
        }, {
            title: "fas fa-volcano",
            searchTerms: []
        }, {
            title: "fas fa-volleyball",
            searchTerms: []
        }, {
            title: "fas fa-volume-high",
            searchTerms: []
        }, {
            title: "fas fa-volume-low",
            searchTerms: []
        }, {
            title: "fas fa-volume-off",
            searchTerms: []
        }, {
            title: "fas fa-volume-xmark",
            searchTerms: []
        }, {
            title: "fas fa-vr-cardboard",
            searchTerms: []
        }, {
            title: "fab fa-vuejs",
            searchTerms: []
        }, {
            title: "fas fa-w",
            searchTerms: []
        }, {
            title: "fas fa-walkie-talkie",
            searchTerms: []
        }, {
            title: "fas fa-wallet",
            searchTerms: []
        }, {
            title: "fas fa-wand-magic",
            searchTerms: []
        }, {
            title: "fas fa-wand-magic-sparkles",
            searchTerms: []
        }, {
            title: "fas fa-wand-sparkles",
            searchTerms: []
        }, {
            title: "fas fa-warehouse",
            searchTerms: []
        }, {
            title: "fab fa-watchman-monitoring",
            searchTerms: []
        }, {
            title: "fas fa-water",
            searchTerms: []
        }, {
            title: "fas fa-water-ladder",
            searchTerms: []
        }, {
            title: "fas fa-wave-square",
            searchTerms: []
        }, {
            title: "fab fa-waze",
            searchTerms: []
        }, {
            title: "fab fa-weebly",
            searchTerms: []
        }, {
            title: "fab fa-weibo",
            searchTerms: []
        }, {
            title: "fas fa-weight-hanging",
            searchTerms: []
        }, {
            title: "fas fa-weight-scale",
            searchTerms: []
        }, {
            title: "fab fa-weixin",
            searchTerms: []
        }, {
            title: "fab fa-whatsapp",
            searchTerms: []
        }, {
            title: "fab fa-whatsapp-square",
            searchTerms: []
        }, {
            title: "fas fa-wheat-awn",
            searchTerms: []
        }, {
            title: "fas fa-wheat-awn-circle-exclamation",
            searchTerms: []
        }, {
            title: "fas fa-wheelchair",
            searchTerms: []
        }, {
            title: "fas fa-wheelchair-move",
            searchTerms: []
        }, {
            title: "fas fa-whiskey-glass",
            searchTerms: []
        }, {
            title: "fab fa-whmcs",
            searchTerms: []
        }, {
            title: "fas fa-wifi",
            searchTerms: []
        }, {
            title: "fab fa-wikipedia-w",
            searchTerms: []
        }, {
            title: "fas fa-wind",
            searchTerms: []
        }, {
            title: "fas fa-window-maximize",
            searchTerms: []
        }, {
            title: "far fa-window-maximize",
            searchTerms: []
        }, {
            title: "fas fa-window-minimize",
            searchTerms: []
        }, {
            title: "far fa-window-minimize",
            searchTerms: []
        }, {
            title: "fas fa-window-restore",
            searchTerms: []
        }, {
            title: "far fa-window-restore",
            searchTerms: []
        }, {
            title: "fab fa-windows",
            searchTerms: []
        }, {
            title: "fas fa-wine-bottle",
            searchTerms: []
        }, {
            title: "fas fa-wine-glass",
            searchTerms: []
        }, {
            title: "fas fa-wine-glass-empty",
            searchTerms: []
        }, {
            title: "fab fa-wirsindhandwerk",
            searchTerms: []
        }, {
            title: "fab fa-wix",
            searchTerms: []
        }, {
            title: "fab fa-wizards-of-the-coast",
            searchTerms: []
        }, {
            title: "fab fa-wodu",
            searchTerms: []
        }, {
            title: "fab fa-wolf-pack-battalion",
            searchTerms: []
        }, {
            title: "fas fa-won-sign",
            searchTerms: []
        }, {
            title: "fab fa-wordpress",
            searchTerms: []
        }, {
            title: "fab fa-wordpress-simple",
            searchTerms: []
        }, {
            title: "fas fa-worm",
            searchTerms: []
        }, {
            title: "fab fa-wpbeginner",
            searchTerms: []
        }, {
            title: "fab fa-wpexplorer",
            searchTerms: []
        }, {
            title: "fab fa-wpforms",
            searchTerms: []
        }, {
            title: "fab fa-wpressr",
            searchTerms: []
        }, {
            title: "fas fa-wrench",
            searchTerms: []
        }, {
            title: "fas fa-x",
            searchTerms: []
        }, {
            title: "fas fa-x-ray",
            searchTerms: []
        }, {
            title: "fab fa-xbox",
            searchTerms: []
        }, {
            title: "fab fa-xing",
            searchTerms: []
        }, {
            title: "fab fa-xing-square",
            searchTerms: []
        }, {
            title: "fas fa-xmark",
            searchTerms: []
        }, {
            title: "fas fa-xmarks-lines",
            searchTerms: []
        }, {
            title: "fas fa-y",
            searchTerms: []
        }, {
            title: "fab fa-y-combinator",
            searchTerms: []
        }, {
            title: "fab fa-yahoo",
            searchTerms: []
        }, {
            title: "fab fa-yammer",
            searchTerms: []
        }, {
            title: "fab fa-yandex",
            searchTerms: []
        }, {
            title: "fab fa-yandex-international",
            searchTerms: []
        }, {
            title: "fab fa-yarn",
            searchTerms: []
        }, {
            title: "fab fa-yelp",
            searchTerms: []
        }, {
            title: "fas fa-yen-sign",
            searchTerms: []
        }, {
            title: "fas fa-yin-yang",
            searchTerms: []
        }, {
            title: "fab fa-yoast",
            searchTerms: []
        }, {
            title: "fab fa-youtube",
            searchTerms: []
        }, {
            title: "fab fa-youtube-square",
            searchTerms: []
        }, {
            title: "fas fa-z",
            searchTerms: []
        }, {
            title: "fab fa-zhihu",
            searchTerms: []
        } ]
    });
});