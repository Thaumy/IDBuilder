// Utilities
import { computed, ref } from 'vue';
import { getCurrentInstance, toKebabCase } from "../util/index.mjs"; // Types

// Composables
export function useProxiedModel(props, prop, defaultValue) {
  let transformIn = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : v => v;
  let transformOut = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : v => v;
  const vm = getCurrentInstance('useProxiedModel');
  const propIsDefined = computed(() => {
    var _vm$vnode$props, _vm$vnode$props2;

    return !!(typeof props[prop] !== 'undefined' && (vm != null && (_vm$vnode$props = vm.vnode.props) != null && _vm$vnode$props.hasOwnProperty(prop) || vm != null && (_vm$vnode$props2 = vm.vnode.props) != null && _vm$vnode$props2.hasOwnProperty(toKebabCase(prop))));
  });
  const internal = ref(transformIn(props[prop]));
  return computed({
    get() {
      if (propIsDefined.value) return transformIn(props[prop]);else return internal.value;
    },

    set(newValue) {
      internal.value = newValue;
      vm == null ? void 0 : vm.emit(`update:${prop}`, transformOut(newValue));
    }

  });
}
//# sourceMappingURL=proxiedModel.mjs.map