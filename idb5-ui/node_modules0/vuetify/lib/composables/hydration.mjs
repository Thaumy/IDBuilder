// Utilities
import { getCurrentInstance, IN_BROWSER } from "../util/index.mjs";
import { onMounted } from 'vue';
export function useHydration(callback) {
  var _vm$root, _vm$root$appContext, _vm$root$appContext$a;

  if (!IN_BROWSER) return;
  const vm = getCurrentInstance('useHydration');
  const rootEl = vm == null ? void 0 : (_vm$root = vm.root) == null ? void 0 : (_vm$root$appContext = _vm$root.appContext) == null ? void 0 : (_vm$root$appContext$a = _vm$root$appContext.app) == null ? void 0 : _vm$root$appContext$a._container;
  return rootEl != null && rootEl.__vue_app__ ? callback() : onMounted(callback);
}
//# sourceMappingURL=hydration.mjs.map