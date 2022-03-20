import { createVNode as _createVNode } from "vue";
// Styles
import "./VAvatar.css"; // Components

import { VIcon } from "../VIcon/index.mjs";
import { VImg } from "../VImg/index.mjs"; // Composables

import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeSizeProps, useSize } from "../../composables/size.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useBackgroundColor } from "../../composables/color.mjs"; // Utilities

import { toRef } from 'vue';
import { defineComponent } from "../../util/index.mjs";
export const VAvatar = defineComponent({
  name: 'VAvatar',
  props: {
    color: String,
    left: Boolean,
    right: Boolean,
    icon: String,
    image: String,
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
    const {
      densityClasses
    } = useDensity(props, 'v-avatar');
    const {
      roundedClasses
    } = useRounded(props, 'v-avatar');
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props, 'v-avatar');
    return () => {
      var _slots$default;

      return _createVNode(props.tag, {
        "class": ['v-avatar', {
          'v-avatar--left': props.left,
          'v-avatar--right': props.right
        }, backgroundColorClasses.value, densityClasses.value, roundedClasses.value, sizeClasses.value],
        "style": [backgroundColorStyles.value, sizeStyles.value]
      }, {
        default: () => [props.image && _createVNode(VImg, {
          "src": props.image,
          "alt": ""
        }, null, 8, ["src"]), props.icon && !props.image && _createVNode(VIcon, {
          "icon": props.icon
        }, null, 8, ["icon"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

});
//# sourceMappingURL=VAvatar.mjs.map