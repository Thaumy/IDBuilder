import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Composables
import { makeTagProps } from "../../composables/tag.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VBannerAvatar = defineComponent({
  name: 'VBannerAvatar',
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
        "class": ['v-banner-avatar', {
          'v-banner-avatar--start': props.left,
          'v-banner-avatar--end': props.right
        }]
      }, slots, 8, ["class"]);
    };
  }

});
//# sourceMappingURL=VBannerAvatar.mjs.map