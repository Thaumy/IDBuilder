import { createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Composables
import { useColor } from "./color.mjs"; // Utilities

import { computed, unref } from 'vue';
import { propsFactory } from "../util/index.mjs"; // Types

export const allowedVariants = ['contained', 'outlined', 'plain', 'text', 'contained-text'];
export function genOverlays(isClickable, name) {
  return _createVNode(_Fragment, null, [isClickable && _createVNode("div", {
    "class": `${name}__overlay`
  }, null), _createVNode("div", {
    "class": `${name}__underlay`
  }, null)]);
}
export const makeVariantProps = propsFactory({
  color: String,
  textColor: String,
  variant: {
    type: String,
    default: 'contained',
    validator: v => allowedVariants.includes(v)
  }
}, 'variant');
export function useVariant(props, name) {
  const variantClasses = computed(() => {
    const {
      variant
    } = unref(props);
    return `${name}--variant-${variant}`;
  });
  const {
    colorClasses,
    colorStyles
  } = useColor(computed(() => {
    const {
      textColor,
      variant,
      color
    } = unref(props);
    return {
      text: textColor,
      [variant === 'contained' ? 'background' : 'text']: color
    };
  }));
  return {
    colorClasses,
    colorStyles,
    variantClasses
  };
}
//# sourceMappingURL=variant.mjs.map