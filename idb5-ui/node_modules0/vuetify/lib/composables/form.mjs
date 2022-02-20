import { getCurrentInstance, propsFactory } from "../util/index.mjs"; // Utilities

import { computed, inject, provide, ref } from 'vue';
import { useProxiedModel } from "./proxiedModel.mjs"; // Types

export const FormKey = Symbol.for('vuetify:form');
export const makeFormProps = propsFactory({
  disabled: Boolean,
  fastFail: Boolean,
  lazyValidation: Boolean,
  readonly: Boolean,
  modelValue: {
    type: Boolean,
    default: null
  }
});
export function createForm(props) {
  const vm = getCurrentInstance('createForm');
  const model = useProxiedModel(props, 'modelValue');
  const isDisabled = computed(() => props.disabled);
  const isReadonly = computed(() => props.readonly);
  const isValidating = ref(false);
  const items = ref([]);
  const errorMessages = ref([]);

  async function submit(e) {
    e.preventDefault();
    const results = [];
    let valid = true;
    errorMessages.value = [];
    model.value = null;
    isValidating.value = true;

    for (const item of items.value) {
      const itemErrorMessages = await item.validate();

      if (itemErrorMessages.length > 0) {
        valid = false;
        results.push({
          id: item.id,
          errorMessages: itemErrorMessages
        });
      }

      if (!valid && props.fastFail) break;
    }

    errorMessages.value = results;
    model.value = valid;
    isValidating.value = false;
    vm == null ? void 0 : vm.emit('submit', e);
  }

  async function reset(e) {
    e.preventDefault();
    items.value.forEach(item => item.reset());
    model.value = null;
    vm == null ? void 0 : vm.emit('reset', e);
  }

  async function resetValidation() {
    items.value.forEach(item => item.resetValidation());
    errorMessages.value = [];
    model.value = null;
    vm == null ? void 0 : vm.emit('resetValidation');
  }

  provide(FormKey, {
    register: (id, validate, reset, resetValidation) => {
      items.value.push({
        id,
        validate,
        reset,
        resetValidation
      });
    },
    unregister: id => {
      items.value = items.value.filter(item => {
        return item.id !== id;
      });
    },
    isDisabled,
    isReadonly,
    isValidating,
    items
  });
  return {
    errorMessages,
    isDisabled,
    isReadonly,
    isValidating,
    items,
    submit,
    reset,
    resetValidation
  };
}
export function useForm() {
  return inject(FormKey, null);
}
//# sourceMappingURL=form.mjs.map