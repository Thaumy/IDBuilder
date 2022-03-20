// Utilities
import { computed } from 'vue';
import { convertToUnit, propsFactory } from "../util/index.mjs"; // Types

const predefinedSizes = ['x-small', 'small', 'default', 'large', 'x-large'];
// Composables
export const makeSizeProps = propsFactory({
  size: {
    type: [String, Number],
    default: 'default'
  }
}, 'size');
export function useSize(props, name) {
  const sizeClasses = computed(() => {
    return predefinedSizes.includes(props.size) ? `${name}--size-${props.size}` : null;
  });
  const sizeStyles = computed(() => {
    return !predefinedSizes.includes(props.size) && props.size ? {
      width: convertToUnit(props.size),
      height: convertToUnit(props.size)
    } : null;
  });
  return {
    sizeClasses,
    sizeStyles
  };
}
//# sourceMappingURL=size.mjs.map