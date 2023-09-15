/*\
title: $:/plugins/oeyoews/${pluginname}/widget.js
type: application/javascript
module-type: widget

${pluginname} widget

\*/
(function () {
  /*jslint node: true, browser: true */
  /*global $tw: false */
  'use strict';

  const Widget = require('$:/core/modules/widgets/widget.js').widget;

  class DivWidget extends Widget {
    constructor(parseTreeNode, options) {
      super(parseTreeNode, options);
    }

    render(parent, nextSibling) {
      if (!$tw.browser) return;

      this.parentDomNode = parent;
      this.computeAttributes();
      this.execute();

      const buttonNode = document.createElement('div');

      parent.insertBefore(buttonNode, nextSibling);
      this.domNodes.push(buttonNode);
    }
  }

  exports.test = DivWidget;
})();
