import { createVNode as _createVNode } from "vue";
// Styles
import "./VBottomNavigation.css"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeLayoutItemProps, useLayoutItem } from "../../composables/layout.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useBackgroundColor, useTextColor } from "../../composables/color.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs"; // Utilities

import { computed } from 'vue';
import { convertToUnit, defineComponent } from "../../util/index.mjs";
export const VBottomNavigation = defineComponent({
  name: 'VBottomNavigation',
  props: {
    bgColor: String,
    color: String,
    grow: Boolean,
    modelValue: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String,
      validator: v => !v || ['horizontal', 'shift'].includes(v)
    },
    height: {
      type: [Number, String],
      default: 56
    },
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({
      name: 'bottom-navigation'
    }),
    ...makeTagProps({
      tag: 'header'
    }),
    ...makeThemeProps()
  },
  emits: {
    'update:modelValue': value => true
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
    } = useBorder(props, 'v-bottom-navigation');
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(computed(() => props.bgColor));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => props.color));
    const {
      densityClasses
    } = useDensity(props, 'v-bottom-navigation');
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props, 'v-bottom-navigation');
    const height = computed(() => Number(props.height) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
    const isActive = useProxiedModel(props, 'modelValue', props.modelValue);
    const layoutStyles = useLayoutItem(props.name, computed(() => props.priority), computed(() => 'bottom'), computed(() => isActive.value ? height.value : 0), height, isActive);
    return () => {
      return _createVNode(props.tag, {
        "class": ['v-bottom-navigation', {
          'v-bottom-navigation--grow': props.grow,
          'v-bottom-navigation--horizontal': props.mode === 'horizontal',
          'v-bottom-navigation--is-active': isActive.value,
          'v-bottom-navigation--shift': props.mode === 'shift',
          'v-bottom-navigation--absolute': props.absolute
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, textColorClasses.value],
        "style": [backgroundColorStyles.value, layoutStyles.value, textColorStyles.value, {
          height: convertToUnit(height.value),
          transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, '%')})`
        }]
      }, {
        default: () => [slots.default && _createVNode("div", {
          "class": "v-bottom-navigation__content"
        }, [slots.default()])]
      }, 8, ["class", "style"]);
    };
  }

});
//# sourceMappingURL=VBottomNavigation.mjs.map