/*\
title: $:/plugins/oeyoews/vue-tabs/widget.js
type: application/javascript
module-type: widget

vue-tabs widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

class ExampleWidget extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;

    this.computeAttributes();
    this.execute();

    const ssr = this.document.isTiddlyWikiFakeDom;
    if (ssr) return;

    const vuelib = '$:/plugins/oeyoews/neotw-vue3/vue.global.prod.js';

    if (!window.Vue) {
      window.Vue = require(vuelib);
    }

    const { createApp } = window.Vue;
    const component = require('./app');
    const domNode = this.document.createElement('div');
    const TiddlyWikiVue = require('./plugins/TiddlyWikiVue');

    try {
      const app = createApp(component());

      app.use(TiddlyWikiVue);

      app.config.errorHandler = (err) => {
        const text = `[Vue3](${app.version}): ` + err;
        console.error(text);
        domNode.textContent = text;
        domNode.style.color = 'red';
      };

      // 挂载
      app.mount(domNode);

      parent.insertBefore(domNode, nextSibling);
      this.domNodes.push(domNode);
    } catch (e) {
      console.error(e);
    }
  }

  refresh(changedTiddlers) {
    const DEFAULT_STORY_TITLE = '$:/StoryList';
    if (Object.keys(changedTiddlers).includes(DEFAULT_STORY_TITLE)) {
      window.localStorage.setItem('tw-list', new Date());
    }
    return true;
  }
}

/** @description vue-tabs widget */
exports['vue-tabs'] = ExampleWidget;