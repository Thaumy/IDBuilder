import { resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Styles
import "./VBanner.css"; // Components

import { VAvatar } from "../VAvatar/index.mjs";
import { VBannerActions } from "./VBannerActions.mjs";
import { VBannerAvatar } from "./VBannerAvatar.mjs";
import { VBannerContent } from "./VBannerContent.mjs";
import { VBannerText } from "./VBannerText.mjs"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makePositionProps, usePosition } from "../../composables/position.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { useDisplay } from "../../composables/display.mjs";
import { useTextColor } from "../../composables/color.mjs"; // Utilities

import { toRef } from 'vue';
import { defineComponent } from "../../util/index.mjs";
export const VBanner = defineComponent({
  name: 'VBanner',
  props: {
    avatar: String,
    color: String,
    icon: String,
    lines: {
      type: String,
      default: 'one'
    },
    sticky: Boolean,
    text: String,
    ...makeBorderProps(),
    ...makeDensityProps(),
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
    } = useBorder(props, 'v-banner');
    const {
      densityClasses
    } = useDensity(props, 'v-banner');
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      mobile
    } = useDisplay();
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses,
      positionStyles
    } = usePosition(props, 'v-banner');
    const {
      roundedClasses
    } = useRounded(props, 'v-banner');
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, 'color'));
    return () => {
      var _slots$default;

      const hasAvatar = !!(props.avatar || props.icon || slots.avatar || slots.icon);
      const hasText = !!(props.text || slots.text);
      const hasContent = hasAvatar || hasText || slots.default;
      return _createVNode(props.tag, {
        "class": ['v-banner', {
          'v-banner--mobile': mobile.value,
          'v-banner--sticky': props.sticky,
          [`v-banner--${props.lines}-line`]: true
        }, borderClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, textColorClasses.value, themeClasses.value],
        "style": [dimensionStyles.value, positionStyles.value, textColorStyles.value],
        "role": "banner"
      }, {
        default: () => [hasContent && _createVNode(VBannerContent, null, {
          default: () => [hasAvatar && _createVNode(VBannerAvatar, null, {
            default: () => [slots.avatar ? slots.avatar() : _createVNode(VAvatar, {
              "density": props.density,
              "icon": props.icon,
              "image": props.avatar
            }, null, 8, ["density", "icon", "image"])]
          }), hasText && _createVNode(VBannerText, null, {
            default: () => [slots.text ? slots.text() : props.text]
          }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
          _: 1
        }), slots.actions && _createVNode(VBannerActions, null, {
          default: slots.actions
        })],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

});
//# sourceMappingURL=VBanner.mjs.map