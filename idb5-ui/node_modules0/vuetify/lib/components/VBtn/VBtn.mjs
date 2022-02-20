import { withDirectives as _withDirectives, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Styles
import "./VBtn.css"; // Components

import { VIcon } from "../VIcon/index.mjs"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makePositionProps, usePosition } from "../../composables/position.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeRouterProps, useLink } from "../../composables/router.mjs";
import { makeSizeProps, useSize } from "../../composables/size.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { genOverlays, makeVariantProps, useVariant } from "../../composables/variant.mjs"; // Directives

import { Ripple } from "../../directives/ripple/index.mjs"; // Utilities

import { computed } from 'vue';
import { defineComponent } from "../../util/index.mjs";
export const VBtn = defineComponent({
  name: 'VBtn',
  directives: {
    Ripple
  },
  props: {
    flat: Boolean,
    icon: [Boolean, String],
    prependIcon: String,
    appendIcon: String,
    block: Boolean,
    stacked: Boolean,
    disabled: Boolean,
    ripple: {
      type: Boolean,
      default: true
    },
    ...makeBorderProps(),
    ...makeRoundedProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'button'
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'contained'
    })
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme(props);
    const {
      borderClasses
    } = useBorder(props, 'v-btn');
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props, 'v-btn');
    const {
      densityClasses
    } = useDensity(props, 'v-btn');
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses,
      positionStyles
    } = usePosition(props, 'v-btn');
    const {
      roundedClasses
    } = useRounded(props, 'v-btn');
    const {
      sizeClasses
    } = useSize(props, 'v-btn');
    const link = useLink(props, attrs);
    const isElevated = computed(() => {
      return props.variant === 'contained' && !(props.disabled || props.flat || props.border);
    });
    return () => {
      var _link$isExactActive, _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      return _withDirectives(_createVNode(Tag, {
        "type": Tag === 'a' ? undefined : 'button',
        "class": ['v-btn', {
          'v-btn--active': (_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value,
          'v-btn--block': props.block,
          'v-btn--disabled': props.disabled,
          'v-btn--elevated': isElevated.value,
          'v-btn--flat': props.flat,
          'v-btn--icon': !!props.icon,
          'v-btn--stacked': props.stacked
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, positionStyles.value],
        "disabled": props.disabled || undefined,
        "href": link.href.value,
        "onClick": props.disabled || link.navigate
      }, {
        default: () => [genOverlays(true, 'v-btn'), !props.icon && props.prependIcon && _createVNode(VIcon, {
          "class": "v-btn__icon",
          "icon": props.prependIcon,
          "left": !props.stacked
        }, null, 8, ["icon", "left"]), typeof props.icon === 'boolean' ? (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots) : _createVNode(VIcon, {
          "class": "v-btn__icon",
          "icon": props.icon,
          "size": props.size
        }, null, 8, ["icon", "size"]), !props.icon && props.appendIcon && _createVNode(VIcon, {
          "class": "v-btn__icon",
          "icon": props.appendIcon,
          "right": !props.stacked
        }, null, 8, ["icon", "right"])],
        _: 1
      }, 8, ["type", "class", "style", "disabled", "href", "onClick"]), [[_resolveDirective("ripple"), !props.disabled && props.ripple, null]]);
    };
  }

});
//# sourceMappingURL=VBtn.mjs.map