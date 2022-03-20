import { createVNode as _createVNode } from "vue";
// Composables
import { makeTagProps } from "../../composables/tag.mjs";
import { useTextColor } from "../../composables/color.mjs"; // Utilities

import { toRef } from 'vue';
import { defineComponent } from "../../util/index.mjs";
export const VListSubheader = defineComponent({
  name: 'VListSubheader',
  props: {
    color: String,
    inset: Boolean,
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, 'color'));
    return () => _createVNode(props.tag, {
      "class": ['v-list-subheader', {
        'v-list-subheader--inset': props.inset
      }, textColorClasses.value],
      "style": {
        textColorStyles
      }
    }, {
      default: () => [slots.default && _createVNode("div", {
        "class": "v-list-subheader__text"
      }, [slots.default()])]
    }, 8, ["class", "style"]);
  }

});
//# sourceMappingURL=VListSubheader.mjs.map