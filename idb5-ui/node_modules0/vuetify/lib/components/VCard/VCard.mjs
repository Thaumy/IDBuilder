import { withDirectives as _withDirectives, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Styles
import "./VCard.css"; // Components

import { VAvatar } from "../VAvatar/index.mjs";
import { VImg } from "../VImg/index.mjs";
import { VCardActions } from "./VCardActions.mjs";
import { VCardAvatar } from "./VCardAvatar.mjs";
import { VCardHeader } from "./VCardHeader.mjs";
import { VCardHeaderText } from "./VCardHeaderText.mjs";
import { VCardImg } from "./VCardImg.mjs";
import { VCardSubtitle } from "./VCardSubtitle.mjs";
import { VCardText } from "./VCardText.mjs";
import { VCardTitle } from "./VCardTitle.mjs"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makePositionProps, usePosition } from "../../composables/position.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeRouterProps, useLink } from "../../composables/router.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { genOverlays, makeVariantProps, useVariant } from "../../composables/variant.mjs"; // Directives

import { Ripple } from "../../directives/ripple/index.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VCard = defineComponent({
  name: 'VCard',
  directives: {
    Ripple
  },
  props: {
    appendAvatar: String,
    appendIcon: String,
    disabled: Boolean,
    flat: Boolean,
    hover: Boolean,
    image: String,
    link: Boolean,
    prependAvatar: String,
    prependIcon: String,
    ripple: Boolean,
    subtitle: String,
    text: String,
    title: String,
    ...makeThemeProps(),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
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
    } = useBorder(props, 'v-card');
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props, 'v-card');
    const {
      densityClasses
    } = useDensity(props, 'v-card');
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses,
      positionStyles
    } = usePosition(props, 'v-card');
    const {
      roundedClasses
    } = useRounded(props, 'v-card');
    const link = useLink(props, attrs);
    return () => {
      var _slots$image, _slots$media, _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasTitle = !!(slots.title || props.title);
      const hasSubtitle = !!(slots.subtitle || props.subtitle);
      const hasHeaderText = hasTitle || hasSubtitle;
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const hasImage = !!(slots.image || props.image);
      const hasHeader = hasHeaderText || hasPrepend || hasAppend;
      const hasText = !!(slots.text || props.text);
      const isClickable = !props.disabled && (link.isClickable.value || props.link);
      return _withDirectives(_createVNode(Tag, {
        "class": ['v-card', {
          'v-card--disabled': props.disabled,
          'v-card--flat': props.flat,
          'v-card--hover': props.hover && !(props.disabled || props.flat),
          'v-card--link': isClickable
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value, positionStyles.value],
        "href": link.href.value,
        "onClick": isClickable && link.navigate
      }, {
        default: () => [genOverlays(isClickable, 'v-card'), hasImage && _createVNode(VCardImg, null, {
          default: () => [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots, {
            src: props.image
          }) : _createVNode(VImg, {
            "src": props.image,
            "cover": true,
            "alt": ""
          }, null, 8, ["src", "cover"])]
        }), (_slots$media = slots.media) == null ? void 0 : _slots$media.call(slots), hasHeader && _createVNode(VCardHeader, null, {
          default: () => [hasPrepend && _createVNode(VCardAvatar, null, {
            default: () => [slots.prepend ? slots.prepend() : _createVNode(VAvatar, {
              "density": props.density,
              "icon": props.prependIcon,
              "image": props.prependAvatar
            }, null, 8, ["density", "icon", "image"])]
          }), hasHeaderText && _createVNode(VCardHeaderText, null, {
            default: () => [hasTitle && _createVNode(VCardTitle, null, {
              default: () => [slots.title ? slots.title() : props.title]
            }), _createVNode(VCardSubtitle, null, {
              default: () => [slots.subtitle ? slots.subtitle() : props.subtitle]
            })],
            _: 1
          }), hasAppend && _createVNode(VCardAvatar, null, {
            default: () => [slots.append ? slots.append() : _createVNode(VAvatar, {
              "density": props.density,
              "icon": props.appendIcon,
              "image": props.appendAvatar
            }, null, 8, ["density", "icon", "image"])]
          })],
          _: 1
        }), hasText && _createVNode(VCardText, null, {
          default: () => [slots.text ? slots.text() : props.text]
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.actions && _createVNode(VCardActions, null, {
          default: slots.actions
        })],
        _: 1
      }, 8, ["class", "style", "href", "onClick"]), [[_resolveDirective("ripple"), isClickable]]);
    };
  }

});
//# sourceMappingURL=VCard.mjs.map