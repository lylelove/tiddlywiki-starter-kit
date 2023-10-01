import ci from 'ci-info';

const CMEPlugins = [
  'tiddlywiki/codemirror',
  'tiddlywiki/codemirror-autocomplete',
  'tiddlywiki/codemirror-mode-css',
  'tiddlywiki/codemirror-search-replace',
  'tiddlywiki/codemirror-closebrackets',
  'tiddlywiki/codemirror-mode-markdown',
  'tiddlywiki/codemirror-mode-xml',
  'tiddlywiki/codemirror-mode-javascript',
  'oeyoews/neotw-vimjk',
];

let localPlugins = ['oeyoews/neotw-cli-info'];

console.log(typeof process.env.ENABLECME);
process.env.ENABLECME === 'true' && localPlugins.push(...CMEPlugins);

console.log('localPlugins', localPlugins);

const onlinePlugins = [
  'oeyoews/neotw-fetch',
  'oeyoews/tiddlywiki-github-share',
  'oeyoews/tiddlywiki-readonly',
  'oeyoews/neotw-notranslate',
];

/** @description tiddlywiki 启用插件列表 */
let plugins = [
  // 必选依赖
  'tiddlywiki/filesystem',
  'tiddlywiki/tiddlyweb',
  'tiddlywiki/highlight',
  'tiddlywiki/browser-sniff',
  // 'tiddlywiki/pluginlibrary',
  'tiddlywiki/markdown',
  'oeyoews/neotw-image-better',
  'oeyoews/tiddlywiki-motion',
  'oeyoews/neotw-pwa',
  'oeyoews/neotw-zen-mode',
  'oeyoews/commandpalette',
  'oeyoews/neotw-icons',
  'oeyoews/neotw-markdown-extensions',
  'oeyoews/neotw-swal2',
  'oeyoews/neotw-copy-code',
  'oeyoews/tiddlywiki-daylight',
  'oeyoews/tiddlywiki-videos',
  'oeyoews/neotw',
  'oeyoews/neotw-info',
  'oeyoews/neotw-reverse-card',
  'oeyoews/tiddlywiki-back-to-top',
  'oeyoews/tiddlywiki-modal-ui',
  'oeyoews/tiddlywiki-publish-tiddler',
  'oeyoews/tiddlywiki-tailwindcss-plus',
  'oeyoews/neotw-notion-gallery',
  'oeyoews/tiddlywiki-tiddler-info',
  'oeyoews/tiddlywiki-gravatar',
  'oeyoews/neotw-homepage',
];

const dynamicPlugins = ci.isCI ? onlinePlugins : localPlugins;

plugins.push(...dynamicPlugins);

export default plugins;
