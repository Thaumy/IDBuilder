// Utilities
import { computed } from 'vue';
import { propsFactory } from "../util/index.mjs"; // Types

const allowedDensities = [null, 'default', 'comfortable', 'compact'];
// Composables
export const makeDensityProps = propsFactory({
  density: {
    type: String,
    default: 'default',
    validator: v => allowedDensities.includes(v)
  }
}, 'density');
export function useDensity(props, name) {
  const densityClasses = computed(() => {
    return `${name}--density-${props.density}`;
  });
  return {
    densityClasses
  };
}
//# sourceMappingURL=density.mjs.map