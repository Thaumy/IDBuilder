import { withDirectives as _withDirectives, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Styles
import "./VListItem.css"; // Components

import { VAvatar } from "../VAvatar/index.mjs";
import { VListItemAvatar } from "./VListItemAvatar.mjs";
import { VListItemHeader } from "./VListItemHeader.mjs";
import { VListItemSubtitle } from "./VListItemSubtitle.mjs";
import { VListItemTitle } from "./VListItemTitle.mjs"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeRouterProps, useLink } from "../../composables/router.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { genOverlays, makeVariantProps, useVariant } from "../../composables/variant.mjs"; // Directives

import { Ripple } from "../../directives/ripple/index.mjs"; // Utilities

import { computed, onMounted } from 'vue';
import { genericComponent } from "../../util/index.mjs";
import { useNestedItem } from "../../composables/nested/nested.mjs";
import { useList } from "./VList.mjs"; // Types

export const VListItem = genericComponent()({
  name: 'VListItem',
  directives: {
    Ripple
  },
  props: {
    active: Boolean,
    activeColor: String,
    activeClass: String,
    appendAvatar: String,
    appendIcon: String,
    disabled: Boolean,
    link: Boolean,
    prependAvatar: String,
    prependIcon: String,
    subtitle: String,
    title: String,
    value: null,
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeRouterProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'text'
    })
  },

  setup(props, _ref) {
    var _props$activeColor;

    let {
      attrs,
      slots
    } = _ref;
    const link = useLink(props, attrs);
    const id = computed(() => {
      var _props$value;

      return (_props$value = props.value) != null ? _props$value : link.href.value;
    });
    const {
      activate,
      isActive: isNestedActive,
      select,
      isSelected,
      root,
      parent
    } = useNestedItem(id);
    const list = useList();
    const isActive = computed(() => {
      var _link$isExactActive;

      return props.active || ((_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value) || isNestedActive.value;
    });
    const activeColor = (_props$activeColor = props.activeColor) != null ? _props$activeColor : props.color;
    const variantProps = computed(() => ({
      color: isActive.value ? activeColor : props.color,
      textColor: props.textColor,
      variant: props.variant
    }));
    onMounted(() => {
      var _link$isExactActive2;

      if ((_link$isExactActive2 = link.isExactActive) != null && _link$isExactActive2.value && parent.value != null) {
        root.open(parent.value, true);
      }
    });
    const {
      themeClasses
    } = useTheme(props);
    const {
      borderClasses
    } = useBorder(props, 'v-list-item');
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps, 'v-list-item');
    const {
      densityClasses
    } = useDensity(props, 'v-list-item');
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props, 'v-list-item');
    const slotProps = computed(() => ({
      isActive: isActive.value,
      activate,
      select,
      isSelected: isSelected.value
    }));
    return () => {
      var _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      const hasTitle = slots.title || props.title;
      const hasSubtitle = slots.subtitle || props.subtitle;
      const hasHeader = !!(hasTitle || hasSubtitle);
      const hasAppend = !!(slots.append || props.appendAvatar || props.appendIcon);
      const hasPrepend = !!(slots.prepend || props.prependAvatar || props.prependIcon);
      const isClickable = !props.disabled && (link.isClickable.value || props.link || props.value != null);
      list == null ? void 0 : list.updateHasPrepend(hasPrepend);
      return _withDirectives(_createVNode(Tag, {
        "class": ['v-list-item', {
          'v-list-item--active': isActive.value,
          'v-list-item--disabled': props.disabled,
          'v-list-item--link': isClickable,
          'v-list-item--prepend': !hasPrepend && (list == null ? void 0 : list.hasPrepend.value),
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, themeClasses.value, borderClasses.value, colorClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value, variantClasses.value],
        "style": [colorStyles.value, dimensionStyles.value],
        "href": link.href.value,
        "tabindex": isClickable ? 0 : undefined,
        "onClick": isClickable && (e => {
          var _link$navigate;

          (_link$navigate = link.navigate) == null ? void 0 : _link$navigate.call(link, e);
          props.value != null && activate(!isNestedActive.value, e);
        })
      }, {
        default: () => [genOverlays(isClickable || isActive.value, 'v-list-item'), hasPrepend && (slots.prepend ? slots.prepend(slotProps.value) : _createVNode(VListItemAvatar, {
          "left": true
        }, {
          default: () => [_createVNode(VAvatar, {
            "density": props.density,
            "icon": props.prependIcon,
            "image": props.prependAvatar
          }, null, 8, ["density", "icon", "image"])]
        }, 8, ["left"])), hasHeader && _createVNode(VListItemHeader, null, {
          default: () => [hasTitle && _createVNode(VListItemTitle, null, {
            default: () => [slots.title ? slots.title() : props.title]
          }), hasSubtitle && _createVNode(VListItemSubtitle, null, {
            default: () => [slots.subtitle ? slots.subtitle() : props.subtitle]
          })],
          _: 1
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value), hasAppend && (slots.append ? slots.append(slotProps.value) : _createVNode(VListItemAvatar, {
          "right": true
        }, {
          default: () => [_createVNode(VAvatar, {
            "density": props.density,
            "icon": props.appendIcon,
            "image": props.appendAvatar
          }, null, 8, ["density", "icon", "image"])]
        }, 8, ["right"]))],
        _: 1
      }, 8, ["class", "style", "href", "tabindex", "onClick"]), [[_resolveDirective("ripple"), isClickable]]);
    };
  }

});
//# sourceMappingURL=VListItem.mjs.map