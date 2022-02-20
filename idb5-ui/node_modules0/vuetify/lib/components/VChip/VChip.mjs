import { withDirectives as _withDirectives, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Styles
import "./VChip.css"; // Components

import { VAvatar } from "../VAvatar/index.mjs";
import { VIcon } from "../VIcon/index.mjs"; // Composables

import { genOverlays, makeVariantProps, useVariant } from "../../composables/variant.mjs";
import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeRouterProps, useLink } from "../../composables/router.mjs";
import { makeSizeProps, useSize } from "../../composables/size.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Directives

import { Ripple } from "../../directives/ripple/index.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VChip = defineComponent({
  name: 'VChip',
  directives: {
    Ripple
  },
  props: {
    activeClass: String,
    appendAvatar: String,
    appendIcon: String,
    closable: Boolean,
    closeIcon: {
      type: String,
      default: '$delete'
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close'
    },
    disabled: Boolean,
    draggable: Boolean,
    filter: Boolean,
    filterIcon: {
      type: String,
      default: '$complete'
    },
    label: Boolean,
    link: Boolean,
    pill: Boolean,
    prependAvatar: String,
    prependIcon: String,
    ripple: {
      type: Boolean,
      default: true
    },
    text: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'span'
    }),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'contained'
    })
  },
  emits: {
    'click:close': e => true,
    'update:active': value => true,
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const {
      themeClasses
    } = useTheme(props);
    const {
      borderClasses
    } = useBorder(props, 'v-chip');
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(props, 'v-chip');
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props, 'v-chip');
    const {
      sizeClasses
    } = useSize(props, 'v-chip');
    const {
      densityClasses
    } = useDensity(props, 'v-chip');
    const link = useLink(props, attrs);

    function onCloseClick(e) {
      isActive.value = false;
      emit('click:close', e);
    }

    return () => {
      var _slots$default, _slots$default2;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasAppend = !!(slots.append || props.appendIcon || props.appendAvatar);
      const hasClose = !!(slots.close || props.closable);
      const hasPrepend = !!(slots.prepend || props.prependIcon || props.prependAvatar);
      const isClickable = !props.disabled && (link.isClickable.value || props.link);
      return isActive.value && _withDirectives(_createVNode(Tag, {
        "class": ['v-chip', {
          'v-chip--disabled': props.disabled,
          'v-chip--label': props.label,
          'v-chip--link': isClickable,
          'v-chip--pill': props.pill
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, sizeClasses.value, variantClasses.value],
        "style": [colorStyles.value],
        "disabled": props.disabled || undefined,
        "draggable": props.draggable,
        "href": link.href.value,
        "onClick": isClickable && link.navigate
      }, {
        default: () => [genOverlays(isClickable, 'v-chip'), hasPrepend && _createVNode("div", {
          "class": "v-chip__prepend"
        }, [slots.prepend ? slots.prepend() : _createVNode(VAvatar, {
          "icon": props.prependIcon,
          "image": props.prependAvatar,
          "size": props.size
        }, null, 8, ["icon", "image", "size"])]), (_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)) != null ? _slots$default : props.text, hasAppend && _createVNode("div", {
          "class": "v-chip__append"
        }, [slots.append ? slots.append() : _createVNode(VAvatar, {
          "icon": props.appendIcon,
          "image": props.appendAvatar,
          "size": props.size
        }, null, 8, ["icon", "image", "size"])]), hasClose && _createVNode("div", {
          "class": "v-chip__close",
          "onClick": onCloseClick
        }, [slots.close ? slots.close({
          props: {
            onClick: onCloseClick
          }
        }) : _createVNode(VIcon, {
          "icon": props.closeIcon,
          "size": "x-small"
        }, null, 8, ["icon"])], 8, ["onClick"])],
        _: 1
      }, 8, ["class", "style", "disabled", "draggable", "href", "onClick"]), [[_resolveDirective("ripple"), isClickable && props.ripple, null]]);
    };
  }

});
//# sourceMappingURL=VChip.mjs.map