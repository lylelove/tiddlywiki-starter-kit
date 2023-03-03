!(function (t, e) {
  !(function t(e, n, a, i) {
    var o = !!(
      e.Worker &&
      e.Blob &&
      e.Promise &&
      e.OffscreenCanvas &&
      e.OffscreenCanvasRenderingContext2D &&
      e.HTMLCanvasElement &&
      e.HTMLCanvasElement.prototype.transferControlToOffscreen &&
      e.URL &&
      e.URL.createObjectURL
    );
    function r() {}
    function l(t) {
      var a = n.exports.Promise,
        i = void 0 !== a ? a : e.Promise;
      return 'function' == typeof i ? new i(t) : (t(r, r), null);
    }
    var c,
      s,
      u,
      h,
      f,
      d,
      m,
      g,
      b,
      v =
        ((u = Math.floor(1e3 / 60)),
        (h = {}),
        (f = 0),
        'function' == typeof requestAnimationFrame &&
        'function' == typeof cancelAnimationFrame
          ? ((c = function (t) {
              var e = Math.random();
              return (
                (h[e] = requestAnimationFrame(function n(a) {
                  f === a || f + u - 1 < a
                    ? ((f = a), delete h[e], t())
                    : (h[e] = requestAnimationFrame(n));
                })),
                e
              );
            }),
            (s = function (t) {
              h[t] && cancelAnimationFrame(h[t]);
            }))
          : ((c = function (t) {
              return setTimeout(t, u);
            }),
            (s = function (t) {
              return clearTimeout(t);
            })),
        { frame: c, cancel: s }),
      M =
        ((g = {}),
        function () {
          if (d) return d;
          if (!a && o) {
            var e = [
              'var CONFETTI, SIZE = {}, module = {};',
              '(' + t.toString() + ')(this, module, true, SIZE);',
              'onmessage = function(msg) {',
              '  if (msg.data.options) {',
              '    CONFETTI(msg.data.options).then(function () {',
              '      if (msg.data.callback) {',
              '        postMessage({ callback: msg.data.callback });',
              '      }',
              '    });',
              '  } else if (msg.data.reset) {',
              '    CONFETTI && CONFETTI.reset();',
              '  } else if (msg.data.resize) {',
              '    SIZE.width = msg.data.resize.width;',
              '    SIZE.height = msg.data.resize.height;',
              '  } else if (msg.data.canvas) {',
              '    SIZE.width = msg.data.canvas.width;',
              '    SIZE.height = msg.data.canvas.height;',
              '    CONFETTI = module.exports.create(msg.data.canvas);',
              '  }',
              '}',
            ].join('\n');
            try {
              d = new Worker(URL.createObjectURL(new Blob([e])));
            } catch (t) {
              return (
                void 0 !== typeof console &&
                  'function' == typeof console.warn &&
                  console.warn('🎊 Could not load worker', t),
                null
              );
            }
            !(function (t) {
              function e(e, n) {
                t.postMessage({ options: e || {}, callback: n });
              }
              (t.init = function (e) {
                var n = e.transferControlToOffscreen();
                t.postMessage({ canvas: n }, [n]);
              }),
                (t.fire = function (n, a, i) {
                  if (m) return e(n, null), m;
                  var o = Math.random().toString(36).slice(2);
                  return (m = l(function (a) {
                    function r(e) {
                      e.data.callback === o &&
                        (delete g[o],
                        t.removeEventListener('message', r),
                        (m = null),
                        i(),
                        a());
                    }
                    t.addEventListener('message', r),
                      e(n, o),
                      (g[o] = r.bind(null, { data: { callback: o } }));
                  }));
                }),
                (t.reset = function () {
                  for (var e in (t.postMessage({ reset: !0 }), g))
                    g[e](), delete g[e];
                });
            })(d);
          }
          return d;
        }),
      p = {
        particleCount: 50,
        angle: 90,
        spread: 45,
        startVelocity: 45,
        decay: 0.9,
        gravity: 1,
        drift: 0,
        ticks: 200,
        x: 0.5,
        y: 0.5,
        shapes: ['square', 'circle'],
        zIndex: 100,
        colors: [
          '#26ccff',
          '#a25afd',
          '#ff5e7e',
          '#88ff5a',
          '#fcff42',
          '#ffa62d',
          '#ff36ff',
        ],
        disableForReducedMotion: !1,
        scalar: 1,
      };
    function y(t, e, n) {
      return (function (t, e) {
        return e ? e(t) : t;
      })(t && null != t[e] ? t[e] : p[e], n);
    }
    function w(t) {
      return t < 0 ? 0 : Math.floor(t);
    }
    function x(t) {
      return parseInt(t, 16);
    }
    function C(t) {
      return t.map(T);
    }
    function T(t) {
      var e = String(t).replace(/[^0-9a-f]/gi, '');
      return (
        e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
        {
          r: x(e.substring(0, 2)),
          g: x(e.substring(2, 4)),
          b: x(e.substring(4, 6)),
        }
      );
    }
    function I(t) {
      (t.width = document.documentElement.clientWidth),
        (t.height = document.documentElement.clientHeight);
    }
    function k(t) {
      var e = t.getBoundingClientRect();
      (t.width = e.width), (t.height = e.height);
    }
    function E(t, e, n, o, r) {
      var c,
        s,
        u = e.slice(),
        h = t.getContext('2d'),
        f = l(function (e) {
          function l() {
            (c = s = null), h.clearRect(0, 0, o.width, o.height), r(), e();
          }
          (c = v.frame(function e() {
            !a ||
              (o.width === i.width && o.height === i.height) ||
              ((o.width = t.width = i.width), (o.height = t.height = i.height)),
              o.width ||
                o.height ||
                (n(t), (o.width = t.width), (o.height = t.height)),
              h.clearRect(0, 0, o.width, o.height),
              (u = u.filter(function (t) {
                return (function (t, e) {
                  (e.x += Math.cos(e.angle2D) * e.velocity + e.drift),
                    (e.y += Math.sin(e.angle2D) * e.velocity + e.gravity),
                    (e.wobble += e.wobbleSpeed),
                    (e.velocity *= e.decay),
                    (e.tiltAngle += 0.1),
                    (e.tiltSin = Math.sin(e.tiltAngle)),
                    (e.tiltCos = Math.cos(e.tiltAngle)),
                    (e.random = Math.random() + 2),
                    (e.wobbleX = e.x + 10 * e.scalar * Math.cos(e.wobble)),
                    (e.wobbleY = e.y + 10 * e.scalar * Math.sin(e.wobble));
                  var n = e.tick++ / e.totalTicks,
                    a = e.x + e.random * e.tiltCos,
                    i = e.y + e.random * e.tiltSin,
                    o = e.wobbleX + e.random * e.tiltCos,
                    r = e.wobbleY + e.random * e.tiltSin;
                  if (
                    ((t.fillStyle =
                      'rgba(' +
                      e.color.r +
                      ', ' +
                      e.color.g +
                      ', ' +
                      e.color.b +
                      ', ' +
                      (1 - n) +
                      ')'),
                    t.beginPath(),
                    'circle' === e.shape)
                  )
                    t.ellipse
                      ? t.ellipse(
                          e.x,
                          e.y,
                          Math.abs(o - a) * e.ovalScalar,
                          Math.abs(r - i) * e.ovalScalar,
                          (Math.PI / 10) * e.wobble,
                          0,
                          2 * Math.PI,
                        )
                      : (function (t, e, n, a, i, o, r, l, c) {
                          t.save(),
                            t.translate(e, n),
                            t.rotate(o),
                            t.scale(a, i),
                            t.arc(0, 0, 1, r, l, c),
                            t.restore();
                        })(
                          t,
                          e.x,
                          e.y,
                          Math.abs(o - a) * e.ovalScalar,
                          Math.abs(r - i) * e.ovalScalar,
                          (Math.PI / 10) * e.wobble,
                          0,
                          2 * Math.PI,
                        );
                  else if ('star' === e.shape)
                    for (
                      var l = (Math.PI / 2) * 3,
                        c = 4 * e.scalar,
                        s = 8 * e.scalar,
                        u = e.x,
                        h = e.y,
                        f = 5,
                        d = Math.PI / f;
                      f--;

                    )
                      (u = e.x + Math.cos(l) * s),
                        (h = e.y + Math.sin(l) * s),
                        t.lineTo(u, h),
                        (l += d),
                        (u = e.x + Math.cos(l) * c),
                        (h = e.y + Math.sin(l) * c),
                        t.lineTo(u, h),
                        (l += d);
                  else
                    t.moveTo(Math.floor(e.x), Math.floor(e.y)),
                      t.lineTo(Math.floor(e.wobbleX), Math.floor(i)),
                      t.lineTo(Math.floor(o), Math.floor(r)),
                      t.lineTo(Math.floor(a), Math.floor(e.wobbleY));
                  return t.closePath(), t.fill(), e.tick < e.totalTicks;
                })(h, t);
              })),
              u.length ? (c = v.frame(e)) : l();
          })),
            (s = l);
        });
      return {
        addFettis: function (t) {
          return (u = u.concat(t)), f;
        },
        canvas: t,
        promise: f,
        reset: function () {
          c && v.cancel(c), s && s();
        },
      };
    }
    function S(t, n) {
      var a,
        i = !t,
        r = !!y(n || {}, 'resize'),
        c = y(n, 'disableForReducedMotion', Boolean),
        s = o && !!y(n || {}, 'useWorker') ? M() : null,
        u = i ? I : k,
        h = !(!t || !s) && !!t.__confetti_initialized,
        f =
          'function' == typeof matchMedia &&
          matchMedia('(prefers-reduced-motion)').matches;
      function d(e, n, i) {
        for (
          var o,
            r,
            l,
            c,
            s,
            h = y(e, 'particleCount', w),
            f = y(e, 'angle', Number),
            d = y(e, 'spread', Number),
            m = y(e, 'startVelocity', Number),
            g = y(e, 'decay', Number),
            b = y(e, 'gravity', Number),
            v = y(e, 'drift', Number),
            M = y(e, 'colors', C),
            p = y(e, 'ticks', Number),
            x = y(e, 'shapes'),
            T = y(e, 'scalar'),
            I = (function (t) {
              var e = y(t, 'origin', Object);
              return (e.x = y(e, 'x', Number)), (e.y = y(e, 'y', Number)), e;
            })(e),
            k = h,
            S = [],
            F = t.width * I.x,
            N = t.height * I.y;
          k--;

        )
          S.push(
            ((o = {
              x: F,
              y: N,
              angle: f,
              spread: d,
              startVelocity: m,
              color: M[k % M.length],
              shape:
                x[
                  ((c = 0),
                  (s = x.length),
                  Math.floor(Math.random() * (s - c)) + c)
                ],
              ticks: p,
              decay: g,
              gravity: b,
              drift: v,
              scalar: T,
            }),
            (r = void 0),
            (l = void 0),
            (r = o.angle * (Math.PI / 180)),
            (l = o.spread * (Math.PI / 180)),
            {
              x: o.x,
              y: o.y,
              wobble: 10 * Math.random(),
              wobbleSpeed: Math.min(0.11, 0.1 * Math.random() + 0.05),
              velocity: 0.5 * o.startVelocity + Math.random() * o.startVelocity,
              angle2D: -r + (0.5 * l - Math.random() * l),
              tiltAngle: (0.5 * Math.random() + 0.25) * Math.PI,
              color: o.color,
              shape: o.shape,
              tick: 0,
              totalTicks: o.ticks,
              decay: o.decay,
              drift: o.drift,
              random: Math.random() + 2,
              tiltSin: 0,
              tiltCos: 0,
              wobbleX: 0,
              wobbleY: 0,
              gravity: 3 * o.gravity,
              ovalScalar: 0.6,
              scalar: o.scalar,
            }),
          );
        return a ? a.addFettis(S) : (a = E(t, S, u, n, i)).promise;
      }
      function m(n) {
        var o = c || y(n, 'disableForReducedMotion', Boolean),
          m = y(n, 'zIndex', Number);
        if (o && f)
          return l(function (t) {
            t();
          });
        i && a
          ? (t = a.canvas)
          : i &&
            !t &&
            ((t = (function (t) {
              var e = document.createElement('canvas');
              return (
                (e.style.position = 'fixed'),
                (e.style.top = '0px'),
                (e.style.left = '0px'),
                (e.style.pointerEvents = 'none'),
                (e.style.zIndex = t),
                e
              );
            })(m)),
            document.body.appendChild(t)),
          r && !h && u(t);
        var g = { width: t.width, height: t.height };
        function b() {
          if (s) {
            var e = {
              getBoundingClientRect: function () {
                if (!i) return t.getBoundingClientRect();
              },
            };
            return (
              u(e),
              void s.postMessage({
                resize: { width: e.width, height: e.height },
              })
            );
          }
          g.width = g.height = null;
        }
        function v() {
          (a = null),
            r && e.removeEventListener('resize', b),
            i && t && (document.body.removeChild(t), (t = null), (h = !1));
        }
        return (
          s && !h && s.init(t),
          (h = !0),
          s && (t.__confetti_initialized = !0),
          r && e.addEventListener('resize', b, !1),
          s ? s.fire(n, g, v) : d(n, g, v)
        );
      }
      return (
        (m.reset = function () {
          s && s.reset(), a && a.reset();
        }),
        m
      );
    }
    function F() {
      return b || (b = S(null, { useWorker: !0, resize: !0 })), b;
    }
    (n.exports = function () {
      return F().apply(this, arguments);
    }),
      (n.exports.reset = function () {
        F().reset();
      }),
      (n.exports.create = S);
  })(
    (function () {
      return void 0 !== t ? t : 'undefined' != typeof self ? self : this || {};
    })(),
    e,
    !1,
  ),
    (t.confetti = e.exports);
})(window, {});
