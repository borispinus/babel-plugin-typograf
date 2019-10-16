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
      Program(programPath) {
        var isTpFile = false;
        programPath.traverse({
          enter(path) {
            if (path.node.leadingComments && path.node.leadingComments.find(function(comment) {
              return comment.value === "typograf-enable";
            })) {
              isTpFile = true;
              return;
            }
          },
          StringLiteral(path) {
            if (isTpFile
              && path.parentPath.node.type !== "ImportDeclaration"
              && (path.node.value || '').trim()) {
              path.node.value = tp.execute(path.node.value)
            }
          }
        });
      },
      JSXText(path) {
        if ((path.node.value || '').trim()) {
          path.node.value = tp.execute(path.node.value)
        }
      },
    }
  };
};
