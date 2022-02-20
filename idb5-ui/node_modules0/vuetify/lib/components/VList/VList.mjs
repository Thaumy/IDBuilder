import { resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Styles
import "./VList.css"; // Components

import { VListSubheader } from "./VListSubheader.mjs";
import { VListChildren } from "./VListChildren.mjs"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useBackgroundColor } from "../../composables/color.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { makeNestedProps, useNested } from "../../composables/nested/nested.mjs"; // Utilities

import { computed, inject, provide, ref, toRef } from 'vue';
import { genericComponent, useRender } from "../../util/index.mjs"; // Types

// Depth
export const DepthKey = Symbol.for('vuetify:depth');
export const useDepth = hasPrepend => {
  const parent = inject(DepthKey, ref(-1));
  const depth = computed(() => parent.value + 1 + (hasPrepend != null && hasPrepend.value ? 1 : 0));
  provide(DepthKey, depth);
  return depth;
}; // List

export const ListKey = Symbol.for('vuetify:list');
export const createList = () => {
  const parent = inject(ListKey, {
    hasPrepend: ref(false),
    updateHasPrepend: () => null
  });
  const data = {
    hasPrepend: ref(false),
    updateHasPrepend: value => {
      if (value) data.hasPrepend.value = value;
    }
  };
  provide(ListKey, data);
  return parent;
};
export const useList = () => {
  return inject(ListKey, null);
};
export const VList = genericComponent()({
  name: 'VList',
  props: {
    color: String,
    disabled: Boolean,
    lines: {
      type: String,
      default: 'one'
    },
    nav: Boolean,
    subheader: {
      type: [Boolean, String],
      default: false
    },
    items: Array,
    ...makeNestedProps({
      selectStrategy: 'leaf',
      openStrategy: 'multiple',
      activeStrategy: 'single'
    }),
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeDimensionProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    'update:selected': val => true,
    'update:opened': val => true,
    'update:active': val => true
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
    } = useBorder(props, 'v-list');
    const {
      densityClasses
    } = useDensity(props, 'v-list');
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props, 'v-list');
    const {
      open,
      select,
      activate
    } = useNested(props);
    const depth = useDepth();
    createList();
    useRender(() => {
      const hasHeader = typeof props.subheader === 'string' || slots.subheader;
      return _createVNode(props.tag, {
        "class": ['v-list', {
          'v-list--disabled': props.disabled,
          'v-list--nav': props.nav,
          'v-list--subheader': props.subheader,
          'v-list--subheader-sticky': props.subheader === 'sticky',
          [`v-list--${props.lines}-line`]: true
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, dimensionStyles.value, {
          '--v-list-depth': depth.value
        }]
      }, {
        default: () => [hasHeader && (slots.subheader ? slots.subheader() : _createVNode(VListSubheader, null, {
          default: () => [props.subheader]
        })), _createVNode(VListChildren, {
          "items": props.items
        }, slots, 8, ["items"])],
        _: 1
      }, 8, ["class", "style"]);
    });
    return {
      open,
      select,
      activate
    };
  }

});
//# sourceMappingURL=VList.mjs.map