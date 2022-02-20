// Types
function mounted(el, binding) {
  var _modifierKeys$attr, _modifierKeys$char, _modifierKeys$child, _modifierKeys$sub;

  const modifiers = binding.modifiers || {};
  const value = binding.value;
  const {
    once,
    immediate,
    ...modifierKeys
  } = modifiers;
  const defaultValue = !Object.keys(modifierKeys).length;
  const {
    handler,
    options
  } = typeof value === 'object' ? value : {
    handler: value,
    options: {
      attributes: (_modifierKeys$attr = modifierKeys == null ? void 0 : modifierKeys.attr) != null ? _modifierKeys$attr : defaultValue,
      characterData: (_modifierKeys$char = modifierKeys == null ? void 0 : modifierKeys.char) != null ? _modifierKeys$char : defaultValue,
      childList: (_modifierKeys$child = modifierKeys == null ? void 0 : modifierKeys.child) != null ? _modifierKeys$child : defaultValue,
      subtree: (_modifierKeys$sub = modifierKeys == null ? void 0 : modifierKeys.sub) != null ? _modifierKeys$sub : defaultValue
    }
  };
  const observer = new MutationObserver(function () {
    let mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    let observer = arguments.length > 1 ? arguments[1] : undefined;
    handler == null ? void 0 : handler(mutations, observer);
    if (once) unmounted(el, binding);
  });
  if (immediate) handler == null ? void 0 : handler([], observer);
  el._mutate = Object(el._mutate);
  el._mutate[binding.instance.$.uid] = {
    observer
  };
  observer.observe(el, options);
}

function unmounted(el, binding) {
  var _el$_mutate;

  if (!((_el$_mutate = el._mutate) != null && _el$_mutate[binding.instance.$.uid])) return;

  el._mutate[binding.instance.$.uid].observer.disconnect();

  delete el._mutate[binding.instance.$.uid];
}

export const Mutate = {
  mounted,
  unmounted
};
export default Mutate;
//# sourceMappingURL=index.mjs.map