import { createVNode as _createVNode } from "vue";
// Styles
import "./VMessages.css"; // Components

import { VSlideYTransition } from "../transitions/index.mjs"; // Composables

import { makeTransitionProps, MaybeTransition } from "../../composables/transition.mjs"; // Utilities

import { defineComponent, wrapInArray } from "../../util/index.mjs";
import { computed } from 'vue';
export const VMessages = defineComponent({
  name: 'VMessages',
  props: {
    active: Boolean,
    value: {
      type: [Array, String],
      default: () => []
    },
    ...makeTransitionProps({
      transition: {
        component: VSlideYTransition,
        group: true
      }
    })
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const messages = computed(() => wrapInArray(props.value));
    return () => {
      var _slots$default;

      return _createVNode(MaybeTransition, {
        "transition": props.transition,
        "tag": "div",
        "class": "v-messages"
      }, {
        default: () => [messages.value.length > 0 && props.active && messages.value.map((message, i) => _createVNode("div", {
          "class": "v-messages__message",
          "key": i
        }, [message])), slots == null ? void 0 : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
        _: 1
      }, 8, ["transition"]);
    };
  }

});
//# sourceMappingURL=VMessages.mjs.map