// Composables
import { useForm } from "./form.mjs"; // Utilities

import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue';
import { getCurrentInstance, getUid, propsFactory } from "../util/index.mjs"; // Types

export const makeValidationProps = propsFactory({
  disabled: Boolean,
  error: Boolean,
  errorMessages: {
    type: [Array, String],
    default: () => []
  },
  maxErrors: {
    type: [Number, String],
    default: 1
  },
  name: String,
  readonly: Boolean,
  rules: {
    type: Array,
    default: () => []
  },
  modelValue: {
    type: null,
    default: undefined
  }
});
export function useValidation(props, name) {
  const form = useForm();
  const errorMessages = ref([]);
  const isPristine = ref(true);
  const isDisabled = computed(() => !!(props.disabled || form != null && form.isDisabled.value));
  const isReadonly = computed(() => !!(props.readonly || form != null && form.isReadonly.value));
  const isValid = computed(() => {
    var _props$errorMessages;

    if (props.error || (_props$errorMessages = props.errorMessages) != null && _props$errorMessages.length || errorMessages.value.length) return false;
    return isPristine.value ? null : true;
  });
  const isValidating = ref(false);
  const validationClasses = computed(() => {
    return {
      [`${name}--error`]: isValid.value === false,
      [`${name}--disabled`]: isDisabled.value,
      [`${name}--readonly`]: isReadonly.value
    };
  });
  const vm = getCurrentInstance('useValidation');
  const uid = computed(() => {
    var _props$name;

    return (_props$name = props.name) != null ? _props$name : getUid();
  });
  onBeforeMount(() => {
    form == null ? void 0 : form.register(uid.value, validate, reset, resetValidation);
  });
  onBeforeUnmount(() => {
    form == null ? void 0 : form.unregister(uid.value);
  });

  function reset() {
    resetValidation();
    vm == null ? void 0 : vm.emit('update:modelValue', null);
  }

  function resetValidation() {
    isPristine.value = true;
    errorMessages.value = [];
  }

  async function validate() {
    const results = [];
    errorMessages.value = [];
    isValidating.value = true;

    for (const rule of props.rules) {
      var _props$modelValue$val, _props$modelValue;

      if (results.length >= (props.maxErrors || 1)) {
        break;
      }

      const handler = typeof rule === 'function' ? rule : () => rule;
      const result = await handler((_props$modelValue$val = props == null ? void 0 : (_props$modelValue = props.modelValue) == null ? void 0 : _props$modelValue.value) != null ? _props$modelValue$val : props.modelValue);
      if (result === true) continue;

      if (typeof result !== 'string') {
        // eslint-disable-next-line no-console
        console.warn(`${result} is not a valid value. Rule functions must return boolean true or a string.`);
        continue;
      }

      results.push(result);
    }

    errorMessages.value = results;
    isValidating.value = false;
    isPristine.value = false;
    return errorMessages.value;
  }

  return {
    errorMessages,
    isDisabled,
    isReadonly,
    isPristine,
    isValid,
    isValidating,
    reset,
    resetValidation,
    validate,
    validationClasses
  };
}
//# sourceMappingURL=validation.mjs.map