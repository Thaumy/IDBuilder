import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VSheet.css"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makePositionProps, usePosition } from "../../composables/position.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useBackgroundColor } from "../../composables/color.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs"; // Utilities

import { toRef } from 'vue';
import { defineComponent } from "../../util/index.mjs";
export const VSheet = defineComponent({
  name: 'VSheet',
  props: {
    color: {
      type: String,
      default: 'surface'
    },
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
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
    const {
      borderClasses
    } = useBorder(props, 'v-sheet');
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses,
      positionStyles
    } = usePosition(props, 'v-sheet');
    const {
      roundedClasses
    } = useRounded(props, 'v-sheet');
    return () => _createVNode(props.tag, {
      "class": ['v-sheet', themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value],
      "style": [backgroundColorStyles.value, dimensionStyles.value, positionStyles.value]
    }, slots, 8, ["class", "style"]);
  }

});
//# sourceMappingURL=VSheet.mjs.map