import { createVNode as _createVNode } from "vue";
// Styles
import "./VIcon.css"; // Composables

import { makeSizeProps, useSize } from "../../composables/size.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useIcon } from "../../composables/icons.mjs";
import { useTextColor } from "../../composables/color.mjs"; // Utilities

import { computed, toRef } from 'vue';
import { convertToUnit, defineComponent, flattenFragments } from "../../util/index.mjs"; // Types

export const VIcon = defineComponent({
  name: 'VIcon',
  props: {
    color: String,
    left: Boolean,
    right: Boolean,
    icon: {
      type: [String, Object]
    },
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'i'
    })
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    let slotIcon;

    if (slots.default) {
      slotIcon = computed(() => {
        var _slots$default, _flattenFragments$fil;

        const slot = (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
        if (!slot) return;
        return (_flattenFragments$fil = flattenFragments(slot).filter(node => node.children && typeof node.children === 'string')[0]) == null ? void 0 : _flattenFragments$fil.children;
      });
    }

    const {
      iconData
    } = useIcon(slotIcon || props);
    const {
      sizeClasses
    } = useSize(props, 'v-icon');
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, 'color'));
    return () => {
      return _createVNode(iconData.value.component, {
        "tag": props.tag,
        "icon": iconData.value.icon,
        "class": ['v-icon', 'notranslate', sizeClasses.value, textColorClasses.value, {
          'v-icon--left': props.left,
          'v-icon--right': props.right
        }],
        "style": [!sizeClasses.value ? {
          fontSize: convertToUnit(props.size),
          width: convertToUnit(props.size),
          height: convertToUnit(props.size)
        } : undefined, textColorStyles.value],
        "aria-hidden": "true"
      }, null, 8, ["tag", "icon", "class", "style"]);
    };
  }

});
//# sourceMappingURL=VIcon.mjs.map