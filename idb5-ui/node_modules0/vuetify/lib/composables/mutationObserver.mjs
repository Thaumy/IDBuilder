// Utilities
import { isComponentInstance } from "../util/index.mjs";
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'; // Types

export function useMutationObserver(handler, options) {
  const mutationRef = ref();
  const {
    once,
    immediate,
    ...optionKeys
  } = options || {};
  const defaultValue = !Object.keys(optionKeys).length;
  const observer = new MutationObserver((mutations, observer) => {
    handler == null ? void 0 : handler(mutations, observer);
    if (options != null && options.once) observer.disconnect();
  });
  onMounted(() => {
    if (!(options != null && options.immediate)) return;
    handler == null ? void 0 : handler([], observer);
  });
  onBeforeUnmount(() => {
    observer.disconnect();
  });
  watch(mutationRef, (newValue, oldValue) => {
    var _options$attr, _options$char, _options$child, _options$sub;

    if (oldValue) observer.disconnect();
    const el = isComponentInstance(newValue) ? newValue.$el : newValue;
    if (!el) return;
    observer.observe(el, {
      attributes: (_options$attr = options == null ? void 0 : options.attr) != null ? _options$attr : defaultValue,
      characterData: (_options$char = options == null ? void 0 : options.char) != null ? _options$char : defaultValue,
      childList: (_options$child = options == null ? void 0 : options.child) != null ? _options$child : defaultValue,
      subtree: (_options$sub = options == null ? void 0 : options.sub) != null ? _options$sub : defaultValue
    });
  }, {
    flush: 'post'
  });
  return {
    mutationRef
  };
}
//# sourceMappingURL=mutationObserver.mjs.map