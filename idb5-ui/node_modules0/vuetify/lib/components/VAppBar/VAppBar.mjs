import { createVNode as _createVNode } from "vue";
// Styles
import "./VAppBar.css"; // Components

import { VImg } from "../VImg/index.mjs"; // Composables

import { makeBorderProps, useBorder } from "../../composables/border.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeLayoutItemProps, useLayoutItem } from "../../composables/layout.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useBackgroundColor } from "../../composables/color.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utilities

import { computed, toRef } from 'vue';
import { convertToUnit, defineComponent } from "../../util/index.mjs"; // Types

export const VAppBar = defineComponent({
  name: 'VAppBar',
  props: {
    // TODO: Implement scrolling techniques
    // hideOnScroll: Boolean
    // invertedScroll: Boolean
    // collapseOnScroll: Boolean
    // elevateOnScroll: Boolean
    // shrinkOnScroll: Boolean
    // fadeImageOnScroll: Boolean
    collapse: Boolean,
    color: String,
    flat: Boolean,
    height: {
      type: [Number, String],
      default: 64
    },
    extensionHeight: {
      type: [Number, String],
      default: 48
    },
    floating: Boolean,
    image: String,
    modelValue: {
      type: Boolean,
      default: true
    },
    prominent: Boolean,
    prominentHeight: {
      type: [Number, String],
      default: 128
    },
    position: {
      type: String,
      default: 'top',
      validator: value => ['top', 'bottom'].includes(value)
    },
    ...makeBorderProps(),
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makeRoundedProps(),
    ...makeLayoutItemProps({
      name: 'app-bar'
    }),
    ...makeTagProps({
      tag: 'header'
    })
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      borderClasses
    } = useBorder(props, 'v-app-bar');
    const {
      densityClasses
    } = useDensity(props, 'v-app-bar');
    const {
      elevationClasses
    } = useElevation(props);
    const {
      roundedClasses
    } = useRounded(props, 'v-app-bar');
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
    const isExtended = !!slots.extension;
    const contentHeight = computed(() => Number(props.prominent ? props.prominentHeight : props.height) - (props.density === 'comfortable' ? 8 : 0) - (props.density === 'compact' ? 16 : 0));
    const height = computed(() => contentHeight.value + Number(isExtended ? props.extensionHeight : 0));
    const isActive = useProxiedModel(props, 'modelValue', props.modelValue);
    const layoutStyles = useLayoutItem(props.name, toRef(props, 'priority'), toRef(props, 'position'), height, height, isActive);
    return () => {
      var _slots$img, _slots$default, _slots$extension;

      const hasImage = !!(slots.image || props.image);
      return _createVNode(props.tag, {
        "class": ['v-app-bar', {
          'v-app-bar--bottom': props.position === 'bottom',
          'v-app-bar--collapsed': props.collapse,
          'v-app-bar--flat': props.flat,
          'v-app-bar--floating': props.floating,
          'v-app-bar--is-active': isActive.value,
          'v-app-bar--prominent': props.prominent,
          'v-app-bar--absolute': props.absolute
        }, backgroundColorClasses.value, borderClasses.value, densityClasses.value, elevationClasses.value, roundedClasses.value],
        "style": [backgroundColorStyles.value, layoutStyles.value]
      }, {
        default: () => [hasImage && _createVNode("div", {
          "class": "v-app-bar__image"
        }, [slots.image ? (_slots$img = slots.img) == null ? void 0 : _slots$img.call(slots, {
          src: props.image
        }) : _createVNode(VImg, {
          "src": props.image,
          "cover": true
        }, null, 8, ["src", "cover"])]), _createVNode("div", {
          "class": "v-app-bar__content",
          "style": {
            height: convertToUnit(contentHeight.value)
          }
        }, [slots.prepend && _createVNode("div", {
          "class": "v-app-bar__prepend"
        }, [slots.prepend()]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), slots.append && _createVNode("div", {
          "class": "v-app-bar__append"
        }, [slots.append()])], 4), isExtended && _createVNode("div", {
          "class": "v-app-bar__extension",
          "style": {
            height: convertToUnit(props.extensionHeight)
          }
        }, [(_slots$extension = slots.extension) == null ? void 0 : _slots$extension.call(slots)], 4)],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

});
//# sourceMappingURL=VAppBar.mjs.map