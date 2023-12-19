/*\
title: $:/plugins/oeyoews/notebook-theme-sidebar-resizer/widget.js
type: application/javascript
module-type: widget

notebook-theme-sidebar-resizer widget

\*/
const { widget: Widget } = require('$:/core/modules/widgets/widget.js');

// TODO: add some button on bar to reset, close or open
class NotebookResizer extends Widget {
  constructor(parseTreeNode, options) {
    super(parseTreeNode, options);
    this.isResizing = false;
    this.tiddler = '$:/themes/nico/notebook/metrics/sidebar-width';
    this.positionTiddler = '$:/themes/nico/notebook/metrics/sidebar-position';
    this.stateSidebar = '$:/state/notebook-sidebar';
    this.width;
  }

  getSidebarPosition() {
    if (!$tw.wiki.tiddlerExists(this.positionTiddler)) {
      return 'left';
    }
    const { position = 'left' } = $tw.wiki.getTiddler(
      this.positionTiddler,
    ).fields;
    return position;
  }

  render(parent, nextSibling) {
    if (!$tw.browser) return;
    this.parentDomNode = parent;
    this.computeAttributes();
    this.execute();

    const createElement = $tw.utils.domMaker;

    const resizer = createElement('div', {
      class:
        'hover:cursor-ew-resize bg-gray-100 dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all h-full w-[6px] absolute top-0',
      // attributes: { id: 'om-resizer' },
    });

    if (this.getSidebarPosition() === 'left') {
      resizer.classList.add('right-0');
    } else {
      resizer.classList.add('left-0');
    }

    // let width = $tw.wiki.getTiddlerText(this.tiddler).replace('px', '');

    // TODO: support reset sidebar width
    resizer.addEventListener('pointerdown', (e) => {
      this.isResizing = true;
      e.preventDefault(); // 阻止默认的文本选择行为
      document.addEventListener('pointermove', resize);

      document.addEventListener('pointerup', stopResize);
    });

    const resize = (e) => {
      // TODO: use percent
      if (this.isResizing) {
        if (this.getSidebarPosition() === 'left') {
          this.width = e.clientX;
          if (this.width > 750) {
            return;
          }
          if (this.width < 10) {
            this.closeSidebar();
            this.isResizing = false;
            return;
          }
          this.updateSidebarWidth(this.width);
        } else {
          this.width = window.innerWidth - e.clientX;
          if (this.width > 750) {
            return;
          }
          if (this.width < 10) {
            this.closeSidebar();
            this.isResizing = false;
            return;
          }
          this.updateSidebarWidth(this.width);
        }
      }
    };

    const stopResize = () => {
      this.isResizing = false;
      document.removeEventListener('pointermove', resize);
    };

    parent.insertBefore(resizer, nextSibling);
    this.domNodes.push(resizer);
  }

  closeSidebar() {
    $tw.wiki.setText(this.stateSidebar, 'text', null, 'no');
    this.updateSidebarWidth(350);
  }

  updateSidebarWidth(width) {
    requestAnimationFrame(() => {
      $tw.wiki.setText(this.tiddler, null, null, `${width.toFixed(0)}px`);
    });
  }

  refresh(changedTiddlers) {
    if (Object.keys(changedTiddlers).includes(this.positionTiddler)) {
      this.refreshSelf();
      return true;
    }
    return false;
  }
}

/**
 * @description notebook-theme-sidebar-resizer widget
 */
exports.nbresizer = NotebookResizer;
