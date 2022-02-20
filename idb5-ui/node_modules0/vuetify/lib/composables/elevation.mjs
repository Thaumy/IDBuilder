// Utilities
import { computed } from 'vue';
import { propsFactory } from "../util/index.mjs"; // Types

// Composables
export const makeElevationProps = propsFactory({
  elevation: {
    type: [Number, String],

    validator(v) {
      const value = parseInt(v);
      return !isNaN(value) && value >= 0 && // Material Design has a maximum elevation of 24
      // https://material.io/design/environment/elevation.html#default-elevations
      value <= 24;
    }

  }
}, 'elevation');
export function useElevation(props) {
  const elevationClasses = computed(() => {
    const classes = [];
    if (props.elevation == null) return classes;
    classes.push(`elevation-${props.elevation}`);
    return classes;
  });
  return {
    elevationClasses
  };
}
//# sourceMappingURL=elevation.mjs.map