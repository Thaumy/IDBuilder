// Utilities
import { computed } from 'vue';
import { propsFactory } from "../util/index.mjs"; // Types

// Composables
export const makeBorderProps = propsFactory({
  border: [Boolean, Number, String]
}, 'border');
export function useBorder(props, name) {
  const borderClasses = computed(() => {
    const classes = [];

    if (props.border != null && props.border !== false) {
      classes.push(`${name}--border`);
    }

    if (typeof props.border === 'string' && props.border !== '' || props.border === 0) {
      for (const value of String(props.border).split(' ')) {
        classes.push(`border-${value}`);
      }
    }

    return classes;
  });
  return {
    borderClasses
  };
}
//# sourceMappingURL=border.mjs.map