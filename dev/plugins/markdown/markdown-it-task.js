/*\
title: $:/plugins/tiddlywiki/markdown/markdown-it-task.js
type: application/javascript
module-type: library
hide-body: yes

markdown-it-task-lists 2.1.0 https://github.com/revin/markdown-it-task-lists#readme by  @license {ISC}

\*/

!(function (n) {
  if ('object' == typeof exports && 'undefined' != typeof module)
    module.exports = n();
  else if ('function' == typeof define && define.amd) define([], n);
  else {
    var e;
    (e =
      'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : this),
      (e.markdownitTaskLists = n());
  }
})(function () {
  return (function () {
    function n(e, t, i) {
      function r(c, l) {
        if (!t[c]) {
          if (!e[c]) {
            var f = 'function' == typeof require && require;
            if (!l && f) return f(c, !0);
            if (o) return o(c, !0);
            var u = new Error("Cannot find module '" + c + "'");
            throw ((u.code = 'MODULE_NOT_FOUND'), u);
          }
          var a = (t[c] = { exports: {} });
          e[c][0].call(
            a.exports,
            function (n) {
              var t = e[c][1][n];
              return r(t ? t : n);
            },
            a,
            a.exports,
            n,
            e,
            t,
            i,
          );
        }
        return t[c].exports;
      }
      for (
        var o = 'function' == typeof require && require, c = 0;
        c < i.length;
        c++
      )
        r(i[c]);
      return r;
    }
    return n;
  })()(
    {
      1: [
        function (n, e, t) {
          function i(n, e, t) {
            var i = n.attrIndex(e),
              r = [e, t];
            0 > i ? n.attrPush(r) : (n.attrs[i] = r);
          }
          function r(n, e) {
            for (var t = n[e].level - 1, i = e - 1; i >= 0; i--)
              if (n[i].level === t) return i;
            return -1;
          }
          function o(n, e) {
            return s(n[e]) && d(n[e - 1]) && h(n[e - 2]) && p(n[e]);
          }
          function c(n, e) {
            if (
              (n.children.unshift(l(n, e)),
              (n.children[1].content = n.children[1].content.slice(3)),
              (n.content = n.content.slice(3)),
              b)
            )
              if (v) {
                n.children.pop();
                var t = 'task-item-' + Math.ceil(1e7 * Math.random() - 1e3);
                (n.children[0].content =
                  n.children[0].content.slice(0, -1) + ' id="' + t + '">'),
                  n.children.push(a(n.content, t, e));
              } else n.children.unshift(f(e)), n.children.push(u(e));
          }
          function l(n, e) {
            var t = new e('html_inline', '', 0),
              i = x ? ' disabled="" ' : '';
            return (
              0 === n.content.indexOf('[ ] ')
                ? (t.content =
                    '<input class="task-list-item-checkbox"' +
                    i +
                    'type="checkbox">')
                : (0 === n.content.indexOf('[x] ') ||
                    0 === n.content.indexOf('[X] ')) &&
                  (t.content =
                    '<input class="task-list-item-checkbox" checked=""' +
                    i +
                    'type="checkbox">'),
              t
            );
          }
          function f(n) {
            var e = new n('html_inline', '', 0);
            return (e.content = '<label>'), e;
          }
          function u(n) {
            var e = new n('html_inline', '', 0);
            return (e.content = '</label>'), e;
          }
          function a(n, e, t) {
            var i = new t('html_inline', '', 0);
            return (
              (i.content =
                '<label class="task-list-item-label" for="' +
                e +
                '">' +
                n +
                '</label>'),
              (i.attrs = [{ for: e }]),
              i
            );
          }
          function s(n) {
            return 'inline' === n.type;
          }
          function d(n) {
            return 'paragraph_open' === n.type;
          }
          function h(n) {
            return 'list_item_open' === n.type;
          }
          function p(n) {
            return (
              0 === n.content.indexOf('[ ] ') ||
              0 === n.content.indexOf('[x] ') ||
              0 === n.content.indexOf('[X] ')
            );
          }
          var x = !0,
            b = !1,
            v = !1;
          e.exports = function (n, e) {
            e && ((x = !e.enabled), (b = !!e.label), (v = !!e.labelAfter)),
              n.core.ruler.after('inline', 'github-task-lists', function (n) {
                for (var e = n.tokens, t = 2; t < e.length; t++)
                  o(e, t) &&
                    (c(e[t], n.Token),
                    i(
                      e[t - 2],
                      'class',
                      'task-list-item' + (x ? '' : ' enabled'),
                    ),
                    i(e[r(e, t - 2)], 'class', 'contains-task-list'));
              });
          };
        },
        {},
      ],
    },
    {},
    [1],
  )(1);
});
