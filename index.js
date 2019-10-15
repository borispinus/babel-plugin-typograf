var Typograf = require('typograf');

var tp = new Typograf({
  locale:'ru'
});

module.exports = function({ types: t }) {
  return {
    pre(state) {
      if (state.opts.disable){
        state.opts.disable.forEach(function(rule){
          tp.disableRule(rule);
        });
      }
      if (state.opts.enable){
        state.opts.disable.forEach(function(rule){
          tp.enableRule(rule);
        });
      }
    },
    visitor: {
      StringLiteral(path){
        if (path.parentPath.node.type !== "ImportDeclaration") {
          path.node.value = tp.execute(path.node.value)
        }
      }
    }
  };
};