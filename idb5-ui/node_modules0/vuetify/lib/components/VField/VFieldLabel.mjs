import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Components
import { VLabel } from "../VLabel/index.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VFieldLabel = defineComponent({
  name: 'VFieldLabel',
  props: {
    floating: Boolean
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      return _createVNode(VLabel, {
        "class": ['v-field-label', {
          'v-field-label--floating': props.floating
        }],
        "aria-hidden": props.floating || undefined
      }, slots, 8, ["class", "aria-hidden"]);
    };
  }

});
//# sourceMappingURL=VFieldLabel.mjs.map