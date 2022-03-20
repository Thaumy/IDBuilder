import { createVNode as _createVNode } from "vue";
// Composables
import { createForm, makeFormProps } from "../../composables/form.mjs"; // Utilities

import { defineComponent, useRender } from "../../util/index.mjs";
export const VForm = defineComponent({
  name: 'VForm',
  props: { ...makeFormProps()
  },
  emits: {
    'update:modelValue': val => true,
    resetValidation: () => true,
    reset: e => true,
    submit: e => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const form = createForm(props);
    useRender(() => {
      var _slots$default;

      return _createVNode("form", {
        "class": "v-form",
        "novalidate": true,
        "onReset": form.reset,
        "onSubmit": form.submit
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, form)], 40, ["novalidate", "onReset", "onSubmit"]);
    });
    return form;
  }

});
//# sourceMappingURL=VForm.mjs.map