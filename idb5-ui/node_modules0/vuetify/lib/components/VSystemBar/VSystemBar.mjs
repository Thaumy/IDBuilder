import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VSystemBar.css"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makePositionProps, usePosition } from "../../composables/position.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VSystemBar = defineComponent({
  name: 'VSystemBar',
  props: {
    lightsOut: Boolean,
    window: Boolean,
    ...makeBorderProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme(props);
    const {
      borderClasses
    } = useBorder(props, 'v-system-bar');
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses,
      positionStyles
    } = usePosition(props, 'v-system-bar');
    const {
      roundedClasses
    } = useRounded(props, 'v-system-bar');
    return () => _createVNode(props.tag, {
      "class": [{
        'v-system-bar': true,
        'v-system-bar--lights-out': props.lightsOut,
        'v-system-bar--window': props.window
      }, themeClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [dimensionStyles.value, positionStyles.value]
    }, slots, 8, ["class", "style"]);
  }

});
//# sourceMappingURL=VSystemBar.mjs.map