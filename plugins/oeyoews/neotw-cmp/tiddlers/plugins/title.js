/*\
title: $:/plugins/oeyoews/neotw-cmp/plugins/title.js
type: application/javascript
module-type: library

\*/

const { debounced } = require('./utils');
const { closeCmp } = require('./utils');
const cmds = {
  cmd: '>',
  help: '?',
  empty: '',
};
const cmdsString = Object.values(cmds);

const goto = new $tw.Story();

const minSearchLength = $tw.wiki.getTiddlerText('$:/config/Search/MinLength');

const actions = [
  {
    title: '跳转到主页',
    action: 'home',
  },
];

const links = [
  {
    title: 'TiddlyWiki GitHub',
    link: 'https://github.com/Jermolene/TiddlyWiki5',
  },
  {
    title: 'TiddlyWiki 中文文档',
    link: 'https://bramchen.github.io/tw5-docs/zh-Hans/',
  },
  {
    title: 'TiddlyWiki 官方论坛',
    link: 'https://talk.tiddlywiki.org/',
  },
];

function Plugin(domNode) {
  return {
    getSources({ query, setQuery, refresh, setContext }) {
      let items = [];
      switch (query) {
        case '':
        case cmds.help:
          items = [...links, ...actions];
          break;
        case cmds.cmd:
          items = [
            {
              title: '进行中',
              action: '',
            },
          ];
          break;
        default:
          if (query.length >= Number(minSearchLength - 1)) {
            items = $tw.wiki.filterTiddlers(`[!is[system]search[${query}]]`);
            items = items.map((item) => $tw.wiki.getTiddler(item).fields);
          }
      }

      const length = items.length;

      return debounced([
        {
          sourceId: 'LocalTiddlers',
          templates: {
            // header({ item, html }) {
            //   if (cmdsString.includes(query)) return;
            //   return searchResult(item, html, { length, query });
            // },
            item({ item, html, query }) {
              return previewTiddlers(item, html);
            },
            noResults({ item, html, query }) {
              // if (!query) return;
              return noResults(item, html);
            },
          },

          onSelect({ item }) {
            closeCmp(domNode); // hide modal

            const invoke = (action, param) => {
              const paramString = param || '';
              const actionString = `<$action-sendmessage $message="${action}" $param="${paramString}"/>`;
              console.log(actionString);
              return $tw.rootWidget.invokeActionString(actionString);
            };

            if (item.link) {
              window.open(item.link, item.link);
              return;
            }

            if (item.action) {
              switch (item.action) {
                case 'home':
                  goto.navigateTiddler('GettingStarted');
                  break;
                default:
              }
              return;
            }

            item.title && goto.navigateTiddler(item.title);
          },

          getItems({ query }) {
            // if (!cmds.some((item) => query.startsWith(item))) {
            // }
            return items;
            // return items.filter(({ title }) =>
            //   title.toLowerCase().includes(query.toLowerCase()),
            // );
          },

          // getItemUrl({ item }) {
          //   return `#` + encodeURIComponent(item.title);
          // },

          // getItemInputValue({ item }) {
          //   return item.title;
          // },
        },
      ]);
    },
  };
}

const previewTiddlers = (item, html) => {
  // if (!item) return html`no results`;

  const image = html`<div class="aut-tiddler"></div>`;
  const linkIcon = html`<div class="aut-arrow"></div>`;
  const tooltip = `点击跳转到${item.title}`;
  const title = html`<b>${item.title}</b>`;
  // const text = html`<div>${item.text}</div>`;
  // const text = html`<div>
  //   ${$tw.wiki.renderText(
  //     'text/html',
  //     'text/markdown',
  //     `<div> ${item.text} </div>`,
  //   )}
  // </div>`;

  return html`<div class="flex justify-between items-center" title="${tooltip}">
    <div class="flex items-center justify-left gap-2">${image}${title}</div>
    <div>${linkIcon}</div>
  </div>`;
};

const searchResult = (item, html, data) => {
  return html`<footer
    class="mb-1 text-sm flex justify-start text-gray-500 dark:text-gray-500"
  >
    <mark>${data.query}</mark> 共有 <b> ${Number(data.length)} </b> 条搜索结果
  </footer>`;
};

const noResults = (item, html) => {
  return html`<div class="text-center text-sm">暂无内容</div>`;
};

module.exports = Plugin;
