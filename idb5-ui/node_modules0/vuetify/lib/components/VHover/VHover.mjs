// Composables
import { makeDelayProps, useDelay } from "../../composables/delay.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VHover = defineComponent({
  name: 'VHover',
  props: {
    disabled: Boolean,
    modelValue: {
      type: Boolean,
      default: undefined
    },
    ...makeDelayProps()
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const hover = useProxiedModel(props, 'modelValue');
    const {
      runOpenDelay,
      runCloseDelay
    } = useDelay(props, value => !props.disabled && (hover.value = value));
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        hover: hover.value,
        props: {
          onMouseenter: runOpenDelay,
          onMouseleave: runCloseDelay
        }
      });
    };
  }

});
//# sourceMappingURL=VHover.mjs.map