import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VFooter.css"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makePositionProps, usePosition } from "../../composables/position.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VFooter = defineComponent({
  name: 'VFooter',
  props: { ...makeBorderProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeTagProps({
      tag: 'footer'
    }),
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
    } = useBorder(props, 'v-footer');
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses,
      positionStyles
    } = usePosition(props, 'v-footer');
    const {
      roundedClasses
    } = useRounded(props, 'v-footer');
    return () => _createVNode(props.tag, {
      "class": ['v-footer', themeClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [dimensionStyles.value, positionStyles.value]
    }, slots, 8, ["class", "style"]);
  }

});
//# sourceMappingURL=VFooter.mjs.map