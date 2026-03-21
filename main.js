"use strict";

//  Obsidian API 
const { Plugin, Modal } = require("obsidian");

//  Styles 
const STYLE_ID = "obsidian-sticky-table-styles";
const STYLE_CSS = `
/*  Reading mode: sticky header  */
.markdown-preview-view table thead th,
.markdown-preview-view table thead td {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--background-primary);
  box-shadow: 0 1px 0 var(--background-modifier-border);
}

/*  Clickable cursor on tables  */
.markdown-preview-view table,
.markdown-source-view.is-live-preview table {
  cursor: pointer;
}
.markdown-preview-view table a,
.markdown-source-view.is-live-preview table a {
  cursor: auto;
}

/*  Modal container  */
.sticky-table-modal-el {
  width: min(92vw, 1600px);
  max-width: 92vw;
}
.sticky-table-modal-el .modal-content {
  padding: 0;
  overflow: hidden;
}

/*  Scroll wrapper inside modal  */
.sticky-table-scroll-wrap {
  overflow: auto;
  max-height: 80vh;
  padding: 1rem 1.25rem;
}
.sticky-table-scroll-wrap table {
  border-collapse: collapse;
  width: max-content;
  min-width: 100%;
}
.sticky-table-scroll-wrap table thead th,
.sticky-table-scroll-wrap table thead td {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--background-primary);
  box-shadow: 0 1px 0 var(--background-modifier-border);
}
.sticky-table-scroll-wrap table th,
.sticky-table-scroll-wrap table td {
  padding: 4px 12px;
  border: 1px solid var(--background-modifier-border);
  white-space: nowrap;
  font-size: 0.85em;
  text-align: left;
}
.sticky-table-scroll-wrap table tbody tr:hover {
  background-color: var(--background-modifier-hover);
}
`;

//  TableModal 
class TableModal extends Modal {
  constructor(app, tableEl) {
    super(app);
    this.tableEl = tableEl;
  }

  onOpen() {
    this.modalEl.addClass("sticky-table-modal-el");
    this.contentEl.empty();

    const wrap = this.contentEl.createDiv({ cls: "sticky-table-scroll-wrap" });
    // Clone so the original table in the document is untouched
    wrap.appendChild(this.tableEl.cloneNode(true));
  }

  onClose() {
    this.contentEl.empty();
  }
}

//  Main Plugin 
class StickyTablePlugin extends Plugin {
  onload() {
    // Inject styles
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = STYLE_CSS;
    document.head.appendChild(style);
    // Automatically removed when plugin is unloaded
    this.register(() => style.remove());

    // Click handler — reading mode: click / live-preview desktop: Ctrl+click / live-preview mobile: disabled
    this.registerDomEvent(document, "click", (evt) => {
      const target = evt.target;

      // Don't intercept clicks on links, inputs, or buttons
      if (target.closest("a, input, button, label")) return;

      const inReading     = target.closest(".markdown-preview-view table");
      const inLivePreview = target.closest(".markdown-source-view.is-live-preview table");

      if (inReading) {
        // Reading mode: plain click opens popup
        new TableModal(this.app, inReading).open();
        return;
      }

      if (inLivePreview) {
        // Live-preview: desktop only, Ctrl+click opens popup
        if (this.app.isMobile) return;
        if (!evt.ctrlKey) return;
        evt.preventDefault();
        new TableModal(this.app, inLivePreview).open();
      }
    });
  }
}

//  CommonJS export 
module.exports = StickyTablePlugin;
