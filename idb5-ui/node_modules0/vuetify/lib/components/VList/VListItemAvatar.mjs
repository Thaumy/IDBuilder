import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Composables
import { makeTagProps } from "../../composables/tag.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VListItemAvatar = defineComponent({
  name: 'VListItemAvatar',
  props: {
    left: Boolean,
    right: Boolean,
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      return _createVNode(props.tag, {
        "class": ['v-list-item-avatar', {
          'v-list-item-avatar--start': props.left,
          'v-list-item-avatar--end': props.right
        }]
      }, slots, 8, ["class"]);
    };
  }

});
//# sourceMappingURL=VListItemAvatar.mjs.map