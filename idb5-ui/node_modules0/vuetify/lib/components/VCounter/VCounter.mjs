import { withDirectives as _withDirectives, createVNode as _createVNode, vShow as _vShow } from "vue";
// Styles
import "./VCounter.css"; // Components

import { VSlideYTransition } from "../transitions/index.mjs"; // Utilities

import { makeTransitionProps, MaybeTransition } from "../../composables/transition.mjs";
import { computed, defineComponent } from 'vue';
export const VCounter = defineComponent({
  name: 'VCounter',
  functional: true,
  props: {
    active: Boolean,
    max: [Number, String],
    value: {
      type: [Number, String],
      default: 0
    },
    ...makeTransitionProps({
      transition: {
        component: VSlideYTransition
      }
    })
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const counter = computed(() => {
      return props.max ? `${props.value} / ${props.max}` : String(props.value);
    });
    return () => {
      return _createVNode(MaybeTransition, {
        "transition": props.transition
      }, {
        default: () => [_withDirectives(_createVNode("div", {
          "class": "v-counter"
        }, [slots.default ? slots.default({
          counter: counter.value,
          max: props.max,
          value: props.value
        }) : counter.value], 512), [[_vShow, props.active]])]
      }, 8, ["transition"]);
    };
  }

});
//# sourceMappingURL=VCounter.mjs.map