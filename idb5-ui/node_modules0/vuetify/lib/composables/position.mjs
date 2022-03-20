// Utilities
import { computed } from 'vue';
import { convertToUnit, propsFactory } from "../util/index.mjs"; // Types

const positionValues = ['static', 'relative', 'fixed', 'absolute', 'sticky'];
// Composables
export const makePositionProps = propsFactory({
  absolute: Boolean,
  bottom: [Boolean, Number, String],
  fixed: Boolean,
  left: [Boolean, Number, String],
  position: {
    type: String,
    validator:
    /* istanbul ignore next */
    v => positionValues.includes(v)
  },
  right: [Boolean, Number, String],
  top: [Boolean, Number, String]
}, 'position');
export function usePosition(props, name) {
  const targets = ['top', 'right', 'bottom', 'left'];
  const positionClasses = computed(() => {
    if (props.fixed) return `${name}--fixed`;
    if (props.absolute) return `${name}--absolute`;
    return props.position ? `position-${props.position}` : undefined;
  });
  const positionStyles = computed(() => {
    const styles = {};

    for (const target of targets) {
      const prop = props[target];
      if (prop == null || prop === false) continue;
      styles[target] = convertToUnit(prop === true ? '0' : String(prop));
    }

    return styles;
  });
  return {
    positionClasses,
    positionStyles
  };
}
//# sourceMappingURL=position.mjs.map