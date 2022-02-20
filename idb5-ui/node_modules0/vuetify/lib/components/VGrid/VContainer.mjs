import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VGrid.css"; // Composables

import { makeTagProps } from "../../composables/tag.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VContainer = defineComponent({
  name: 'VContainer',
  props: {
    fluid: {
      type: Boolean,
      default: false
    },
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => _createVNode(props.tag, {
      "class": ['v-container', {
        'v-container--fluid': props.fluid
      }]
    }, slots, 8, ["class"]);
  }

});
//# sourceMappingURL=VContainer.mjs.map