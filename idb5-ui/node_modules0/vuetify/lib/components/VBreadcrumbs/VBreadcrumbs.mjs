import { mergeProps as _mergeProps, Fragment as _Fragment, createVNode as _createVNode } from "vue";
// Styles
import "./VBreadcrumbs.css"; // Components

import { VIcon } from "../VIcon/index.mjs";
import { VBreadcrumbsItem } from "./VBreadcrumbsItem.mjs";
import { VBreadcrumbsDivider } from "./VBreadcrumbsDivider.mjs"; // Composables

import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useTextColor } from "../../composables/color.mjs"; // Utilities

import { computed, provide, toRef } from 'vue';
import { defineComponent } from "../../util/index.mjs";
import { VBreadcrumbsSymbol } from "./shared.mjs"; // Types

export const VBreadcrumbs = defineComponent({
  name: 'VBreadcrumbs',
  props: {
    color: String,
    disabled: Boolean,
    divider: {
      type: String,
      default: '/'
    },
    icon: String,
    items: {
      type: Array,
      default: () => []
    },
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: 'ul'
    })
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      densityClasses
    } = useDensity(props, 'v-breadcrumbs');
    const {
      roundedClasses
    } = useRounded(props, 'v-breadcrumbs');
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, 'color'));
    const items = computed(() => {
      return props.items.map((item, index, array) => ({
        props: {
          disabled: index >= array.length - 1,
          ...(typeof item === 'string' ? {
            text: item
          } : item)
        }
      }));
    });
    provide(VBreadcrumbsSymbol, {
      color: toRef(props, 'color'),
      disabled: toRef(props, 'disabled')
    });
    return () => {
      var _slots$default;

      return _createVNode(props.tag, {
        "class": ['v-breadcrumbs', densityClasses.value, roundedClasses.value, textColorClasses.value],
        "style": [textColorStyles.value]
      }, {
        default: () => [props.icon && _createVNode(VIcon, {
          "icon": props.icon,
          "left": true
        }, null, 8, ["icon", "left"]), items.value.map((item, index) => {
          var _slots$item;

          return _createVNode(_Fragment, null, [_createVNode(VBreadcrumbsItem, _mergeProps({
            "key": index
          }, item.props), {
            default: () => [(_slots$item = slots.item) == null ? void 0 : _slots$item.call(slots, { ...item,
              index
            })]
          }, 16), index < props.items.length - 1 && _createVNode(VBreadcrumbsDivider, null, {
            default: () => [slots.divider ? slots.divider({ ...item,
              index
            }) : props.divider]
          })]);
        }), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

});
//# sourceMappingURL=VBreadcrumbs.mjs.map