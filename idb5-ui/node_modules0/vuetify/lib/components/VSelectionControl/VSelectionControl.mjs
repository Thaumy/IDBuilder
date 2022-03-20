import { resolveDirective as _resolveDirective, withDirectives as _withDirectives, mergeProps as _mergeProps, vModelDynamic as _vModelDynamic, createVNode as _createVNode } from "vue";
// Styles
import "./VSelectionControl.css"; // Components

import { VIcon } from "../VIcon/index.mjs";
import { VLabel } from "../VLabel/index.mjs";
import { VSelectionControlGroupSymbol } from "../VSelectionControlGroup/VSelectionControlGroup.mjs"; // Composables

import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeThemeProps } from "../../composables/theme.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { useTextColor } from "../../composables/color.mjs"; // Directives

import { Ripple } from "../../directives/ripple/index.mjs"; // Utilities

import { computed, inject, ref } from 'vue';
import { deepEqual, genericComponent, getUid, SUPPORTS_FOCUS_VISIBLE, useRender, wrapInArray } from "../../util/index.mjs"; // Types

const selectionControlProps = {
  color: String,
  disabled: Boolean,
  error: Boolean,
  id: String,
  inline: Boolean,
  label: String,
  offIcon: String,
  onIcon: String,
  ripple: {
    type: Boolean,
    default: true
  },
  multiple: {
    type: Boolean,
    default: null
  },
  name: String,
  readonly: Boolean,
  trueValue: null,
  falseValue: null,
  modelValue: null,
  type: String,
  value: null,
  valueComparator: {
    type: Function,
    default: deepEqual
  },
  ...makeThemeProps(),
  ...makeDensityProps()
};
export function useSelectionControl(props) {
  const group = inject(VSelectionControlGroupSymbol, undefined);
  const {
    densityClasses
  } = useDensity(props, 'v-selection-control');
  const modelValue = useProxiedModel(props, 'modelValue');
  const trueValue = computed(() => props.trueValue !== undefined ? props.trueValue : props.value !== undefined ? props.value : true);
  const falseValue = computed(() => props.falseValue !== undefined ? props.falseValue : false);
  const isMultiple = computed(() => (group == null ? void 0 : group.multiple.value) || !!props.multiple || props.multiple == null && Array.isArray(modelValue.value));
  const model = computed({
    get() {
      const val = group ? group.modelValue.value : modelValue.value;
      return isMultiple.value ? val.some(v => props.valueComparator(v, trueValue.value)) : props.valueComparator(val, trueValue.value);
    },

    set(val) {
      const currentValue = val ? trueValue.value : falseValue.value;
      let newVal = currentValue;

      if (isMultiple.value) {
        newVal = val ? [...wrapInArray(modelValue.value), currentValue] : wrapInArray(modelValue.value).filter(item => !props.valueComparator(item, trueValue.value));
      }

      if (group) {
        group.modelValue.value = newVal;
      } else {
        modelValue.value = newVal;
      }
    }

  });
  const {
    textColorClasses,
    textColorStyles
  } = useTextColor(computed(() => {
    return model.value && !props.error && !props.disabled ? props.color : undefined;
  }));
  const icon = computed(() => {
    var _group$onIcon$value, _group$offIcon$value;

    return model.value ? (_group$onIcon$value = group == null ? void 0 : group.onIcon.value) != null ? _group$onIcon$value : props.onIcon : (_group$offIcon$value = group == null ? void 0 : group.offIcon.value) != null ? _group$offIcon$value : props.offIcon;
  });
  return {
    group,
    densityClasses,
    trueValue,
    falseValue,
    model,
    textColorClasses,
    textColorStyles,
    icon
  };
}
export const VSelectionControl = genericComponent()({
  name: 'VSelectionControl',
  directives: {
    Ripple
  },
  inheritAttrs: false,
  props: selectionControlProps,
  emits: {
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      densityClasses,
      group,
      icon,
      model,
      textColorClasses,
      textColorStyles,
      trueValue
    } = useSelectionControl(props);
    const uid = getUid();
    const id = computed(() => props.id || `input-${uid}`);
    const isFocused = ref(false);
    const isFocusVisible = ref(false);
    const input = ref();

    function onFocus(e) {
      isFocused.value = true;

      if (!SUPPORTS_FOCUS_VISIBLE || SUPPORTS_FOCUS_VISIBLE && e.target.matches(':focus-visible')) {
        isFocusVisible.value = true;
      }
    }

    function onBlur() {
      isFocused.value = false;
      isFocusVisible.value = false;
    }

    useRender(() => {
      var _group$type$value, _slots$default, _group$name$value, _slots$input;

      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      const type = (_group$type$value = group == null ? void 0 : group.type.value) != null ? _group$type$value : props.type;
      return _createVNode("div", {
        "class": ['v-selection-control', {
          'v-selection-control--dirty': model.value,
          'v-selection-control--disabled': props.disabled,
          'v-selection-control--error': props.error,
          'v-selection-control--focused': isFocused.value,
          'v-selection-control--focus-visible': isFocusVisible.value,
          'v-selection-control--inline': (group == null ? void 0 : group.inline.value) || props.inline
        }, densityClasses.value, textColorClasses.value]
      }, [_createVNode("div", {
        "class": "v-selection-control__wrapper"
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots), _withDirectives(_createVNode("div", {
        "class": ['v-selection-control__input'],
        "style": textColorStyles.value
      }, [icon.value && _createVNode(VIcon, {
        "icon": icon.value
      }, null, 8, ["icon"]), _withDirectives(_createVNode("input", _mergeProps({
        "onUpdate:modelValue": $event => model.value = $event,
        "ref": input,
        "disabled": props.disabled,
        "id": id.value,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "readonly": props.readonly,
        "type": type,
        "value": trueValue.value,
        "name": (_group$name$value = group == null ? void 0 : group.name.value) != null ? _group$name$value : props.name,
        "aria-checked": type === 'checkbox' ? model.value : undefined
      }, attrs), null, 16, ["onUpdate:modelValue", "disabled", "id", "onBlur", "onFocus", "readonly", "type", "value", "name", "aria-checked"]), [[_vModelDynamic, model.value]]), (_slots$input = slots.input) == null ? void 0 : _slots$input.call(slots, {
        model,
        textColorClasses,
        props: {
          onFocus,
          onBlur,
          id: id.value
        }
      })], 4), [[_resolveDirective("ripple"), props.ripple && [!props.disabled && !props.readonly, null, ['center', 'circle']]]])]), _createVNode(VLabel, {
        "disabled": props.disabled,
        "error": props.error,
        "for": id.value
      }, {
        default: () => [label],
        _: 2
      }, 8, ["disabled", "error", "for"])], 2);
    });
    return {
      isFocused,
      input
    };
  }

});
//# sourceMappingURL=VSelectionControl.mjs.map