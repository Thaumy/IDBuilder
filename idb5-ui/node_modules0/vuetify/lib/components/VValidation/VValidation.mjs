// Composables
import { makeValidationProps, useValidation } from "../../composables/validation.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VValidation = defineComponent({
  name: 'VValidation',
  props: { ...makeValidationProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const validation = useValidation(props, 'validation');
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, validation);
    };
  }

});
//# sourceMappingURL=VValidation.mjs.map