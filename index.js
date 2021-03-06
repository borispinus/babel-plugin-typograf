var Typograf = require('typograf');

var tp = new Typograf({
  locale:'ru'
});

module.exports = function({ types: t }, opts) {
  return {
    name: 'typograf',
    pre() {
      if (opts.disable){
        for (var di = 0; di < opts.disable.length; di++ ) {
          tp.disableRule(opts.disable[di]);
        }
      }
      if (opts.enable){
        for (var ei = 0; ei < opts.enable.length; ei++ ) {
          tp.enableRule(opts.enable[ei]);
        }
      }
      if (opts.settings){
        for (var si = 0; si < opts.settings.length; si++ ) {
          tp.setSetting.apply(tp, opts.settings[si])
        }
      }
    },
    visitor: {
      Program(programPath) {
        var isTpFile = false;
        programPath.traverse({
          enter(path) {
            if (path.node.leadingComments && path.node.leadingComments.find(function(comment) {
              return comment.value.trim() === "typograf-enable";
            })) {
              isTpFile = true;
            }
            if (path.node.leadingComments && path.node.leadingComments.find(function(comment) {
              return comment.value.trim() === "typograf-disable";
            })) {
              isTpFile = false;
            }
          },
          StringLiteral(path) {
            if (isTpFile
              && !t.isImportDeclaration(path.parentPath.node)
              && (path.node.value || '').trim()) {
              path.node.value = tp.execute(path.node.value)
            }
          },
          JSXText(path) {
            if (isTpFile && (path.node.value || '').trim()) {
              path.node.value = tp.execute(path.node.value)
            }
          },
        });
      }
    }
  };
};
