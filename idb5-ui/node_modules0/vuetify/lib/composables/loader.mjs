import { createVNode as _createVNode } from "vue";
// Components
import { VProgressLinear } from "../components/VProgressLinear/index.mjs"; // Utilities

import { computed } from 'vue';
import { propsFactory } from "../util/index.mjs"; // Types

// Composables
export const makeLoaderProps = propsFactory({
  loading: Boolean
}, 'loader');
export function useLoader(props, name) {
  const loaderClasses = computed(() => ({
    [`${name}--loading`]: props.loading
  }));
  return {
    loaderClasses
  };
}
export function LoaderSlot(props, _ref) {
  var _slots$default;

  let {
    slots
  } = _ref;
  return _createVNode("div", {
    "class": `${props.name}__loader`
  }, [((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
    color: props.color,
    isActive: props.active
  })) || _createVNode(VProgressLinear, {
    "active": props.active,
    "color": props.color,
    "height": "2",
    "indeterminate": true
  }, null, 8, ["active", "color", "indeterminate"])]);
}
//# sourceMappingURL=loader.mjs.map