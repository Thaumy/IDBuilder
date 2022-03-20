import { resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Styles
import "./VInput.css"; // Components

import { VIcon } from "../VIcon/index.mjs";
import { VMessages } from "../VMessages/index.mjs"; // Composables

import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeValidationProps, useValidation } from "../../composables/validation.mjs"; // Utilities

import { computed } from 'vue';
import { genericComponent, pick, propsFactory, toKebabCase } from "../../util/index.mjs"; // Types

export const makeVInputProps = propsFactory({
  appendIcon: String,
  prependIcon: String,
  focused: Boolean,
  hideDetails: [Boolean, String],
  hint: String,
  messages: {
    type: [Array, String],
    default: () => []
  },
  persistentHint: Boolean,
  ...makeDensityProps(),
  ...makeValidationProps()
});
export const VInput = genericComponent()({
  name: 'VInput',
  props: makeVInputProps(),
  emits: {
    'click:prepend': e => true,
    'click:append': e => true
  },

  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const {
      densityClasses
    } = useDensity(props, 'v-input');
    const {
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
    } = useValidation(props, 'v-input');
    const slotProps = computed(() => ({
      isDisabled,
      isReadonly,
      isPristine,
      isValid,
      isValidating,
      reset,
      resetValidation,
      validate
    }));
    return () => {
      var _props$messages, _slots$prepend, _slots$default, _slots$append, _slots$details;

      const hasPrepend = slots.prepend || props.prependIcon;
      const hasAppend = slots.append || props.appendIcon;
      const hasHint = !!(slots.hint || props.hint);
      const hasMessages = !!(slots.messages || (_props$messages = props.messages) != null && _props$messages.length || errorMessages.value.length);
      const hasDetails = !props.hideDetails || props.hideDetails === 'auto' && (hasMessages || hasHint);
      const showMessages = hasMessages || hasHint && (props.persistentHint || props.focused);
      return _createVNode("div", {
        "class": ['v-input', densityClasses.value, validationClasses.value]
      }, [hasPrepend && _createVNode("div", {
        "class": "v-input__prepend",
        "onClick": e => emit('click:prepend', e)
      }, [slots == null ? void 0 : (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, slotProps.value), props.prependIcon && _createVNode(VIcon, {
        "icon": props.prependIcon
      }, null, 8, ["icon"])], 8, ["onClick"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value), hasAppend && _createVNode("div", {
        "class": "v-input__append",
        "onClick": e => emit('click:append', e)
      }, [slots == null ? void 0 : (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, slotProps.value), props.appendIcon && _createVNode(VIcon, {
        "icon": props.appendIcon
      }, null, 8, ["icon"])], 8, ["onClick"]), hasDetails && _createVNode("div", {
        "class": "v-input__details"
      }, [_createVNode(VMessages, {
        "active": showMessages,
        "value": hasMessages ? props.messages : [props.hint]
      }, {
        default: slots.messages
      }, 8, ["active", "value"]), (_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, slotProps.value)])], 2);
    };
  }

});
export function filterInputAttrs(attrs) {
  return pick(attrs, ['class', 'style', 'id', /^data-/]);
}
export function filterInputProps(attrs) {
  return pick(attrs, Object.keys(VInput.props).map(toKebabCase));
}
//# sourceMappingURL=VInput.mjs.map