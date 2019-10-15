var Typograf = require('typograf');

var tp = new Typograf({
  locale:'ru'
});

module.exports = function({ types: t }) {
  return {
    pre() {
      if (this.opts.disable){
        for (var di = 0; di < this.opts.disable.length; di++ ) {
          tp.disableRule(this.opts.disable[di]);
        }
      }
      if (this.opts.enable){
        for (var ei = 0; ei < this.opts.enable.length; ei++ ) {
          tp.enableRule(this.opts.enable[ei]);
        }
      }
    },
    visitor: {
      JSXText(path) {
        if ((path.node.value || '').trim()) {
          path.node.value = tp.execute(path.node.value)
        }
      },
    }
  };
};
