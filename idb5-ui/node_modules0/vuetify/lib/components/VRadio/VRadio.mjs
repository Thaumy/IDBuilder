import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Components
import { VSelectionControl } from "../VSelectionControl/index.mjs"; // Utility

import { defineComponent } from 'vue';
import { useRender } from "../../util/index.mjs";
export const VRadio = defineComponent({
  name: 'VRadio',
  props: {
    offIcon: {
      type: String,
      default: '$radioOff'
    },
    onIcon: {
      type: String,
      default: '$radioOn'
    }
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => _createVNode(VSelectionControl, {
      "class": "v-radio",
      "onIcon": props.onIcon,
      "offIcon": props.offIcon,
      "type": "radio"
    }, slots, 8, ["onIcon", "offIcon"]));
    return {};
  }

});
//# sourceMappingURL=VRadio.mjs.map