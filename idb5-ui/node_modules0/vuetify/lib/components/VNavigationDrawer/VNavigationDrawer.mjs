import { createVNode as _createVNode } from "vue";
// Styles
import "./VNavigationDrawer.css"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeLayoutItemProps, useLayoutItem } from "../../composables/layout.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useDisplay } from "../../composables/display.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { useBackgroundColor } from "../../composables/color.mjs"; // Utilities

import { computed, onBeforeMount, ref, toRef, watch } from 'vue';
import { defineComponent } from "../../util/index.mjs"; // Types

export const VNavigationDrawer = defineComponent({
  name: 'VNavigationDrawer',
  props: {
    color: String,
    disableResizeWatcher: Boolean,
    expandOnHover: Boolean,
    floating: Boolean,
    modelValue: {
      type: Boolean,
      default: null
    },
    permanent: Boolean,
    rail: Boolean,
    railWidth: {
      type: [Number, String],
      default: 72
    },
    image: String,
    temporary: Boolean,
    width: {
      type: [Number, String],
      default: 256
    },
    position: {
      type: String,
      default: 'left',
      validator: value => ['left', 'right', 'bottom'].includes(value)
    },
    ...makeBorderProps(),
    ...makeElevationProps(),
    ...makeLayoutItemProps(),
    ...makeRoundedProps(),
    ...makeTagProps({
      tag: 'nav'
    }),
    ...makeThemeProps()
  },
  emits: {
    'update:modelValue': val => true
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
    } = useBorder(props, 'v-navigation-drawer');
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
    const {
      elevationClasses
    } = useElevation(props);
    const {
      mobile
    } = useDisplay();
    const {
      roundedClasses
    } = useRounded(props, 'v-navigation-drawer');
    const isActive = useProxiedModel(props, 'modelValue');
    const isHovering = ref(false);
    const width = computed(() => {
      return props.rail && props.expandOnHover && isHovering.value ? props.width : Number(props.rail ? props.railWidth : props.width);
    });
    const isTemporary = computed(() => !props.permanent && (mobile.value || props.temporary));
    const layoutStyles = useLayoutItem(props.name, toRef(props, 'priority'), toRef(props, 'position'), computed(() => isTemporary.value ? 0 : props.rail && props.expandOnHover ? Number(props.railWidth) : width.value), width, isActive);

    if (!props.disableResizeWatcher) {
      watch(mobile, val => !props.permanent && (isActive.value = !val));
    }

    watch(props, val => {
      if (val.permanent) isActive.value = true;
    });
    onBeforeMount(() => {
      if (props.modelValue != null) return;
      isActive.value = props.permanent || !mobile.value;
    });
    return () => {
      var _slots$image, _slots$prepend, _slots$default, _slots$append;

      const hasImage = slots.image || props.image;
      return _createVNode(props.tag, {
        "onMouseenter": () => isHovering.value = true,
        "onMouseleave": () => isHovering.value = false,
        "class": ['v-navigation-drawer', {
          'v-navigation-drawer--bottom': props.position === 'bottom',
          'v-navigation-drawer--end': props.position === 'right',
          'v-navigation-drawer--expand-on-hover': props.expandOnHover,
          'v-navigation-drawer--floating': props.floating,
          'v-navigation-drawer--is-hovering': isHovering.value,
          'v-navigation-drawer--rail': props.rail,
          'v-navigation-drawer--start': props.position === 'left',
          'v-navigation-drawer--temporary': isTemporary.value,
          'v-navigation-drawer--absolute': props.absolute
        }, themeClasses.value, backgroundColorClasses.value, borderClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutStyles.value]
      }, {
        default: () => [hasImage && _createVNode("div", {
          "class": "v-navigation-drawer__img"
        }, [slots.image ? (_slots$image = slots.image) == null ? void 0 : _slots$image.call(slots, {
          image: props.image
        }) : _createVNode("img", {
          "src": props.image,
          "alt": ""
        }, null, 8, ["src"])]), slots.prepend && _createVNode("div", {
          "class": "v-navigation-drawer__prepend"
        }, [(_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots)]), _createVNode("div", {
          "class": "v-navigation-drawer__content"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]), slots.append && _createVNode("div", {
          "class": "v-navigation-drawer__append"
        }, [(_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots)])],
        _: 1
      }, 8, ["onMouseenter", "onMouseleave", "class", "style"]);
    };
  }

});
//# sourceMappingURL=VNavigationDrawer.mjs.map