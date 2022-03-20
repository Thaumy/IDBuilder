import { withDirectives as _withDirectives, mergeProps as _mergeProps, resolveDirective as _resolveDirective, vModelDynamic as _vModelDynamic, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VTextField.css"; // Components

import { filterFieldProps, makeVFieldProps } from "../VField/VField.mjs";
import { VCounter } from "../VCounter/index.mjs";
import { VField } from "../VField/index.mjs";
import { filterInputAttrs } from "../VInput/VInput.mjs"; // Composables

import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Directives

import Intersect from "../../directives/intersect/index.mjs"; // Utilities

import { computed, ref } from 'vue';
import { defineComponent, useRender } from "../../util/index.mjs"; // Types

const dirtyTypes = ['color', 'file', 'time', 'date', 'datetime-local', 'week', 'month'];
export const VTextField = defineComponent({
  name: 'VTextField',
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: {
    autofocus: Boolean,
    counter: [Boolean, Number, String],
    counterValue: Function,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    suffix: String,
    type: {
      type: String,
      default: 'text'
    },
    ...makeVFieldProps()
  },
  emits: {
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const internalDirty = ref(false);
    const isDirty = computed(() => {
      return internalDirty.value || !!model.value || dirtyTypes.includes(props.type);
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === 'function' ? props.counterValue(model.value) : (model.value || '').toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== 'number' && typeof props.counter !== 'string') return undefined;
      return props.counter;
    });

    function onIntersect(isIntersecting, entries) {
      var _entries$0$target, _entries$0$target$foc;

      if (!props.autofocus || !isIntersecting) return;
      (_entries$0$target = entries[0].target) == null ? void 0 : (_entries$0$target$foc = _entries$0$target.focus) == null ? void 0 : _entries$0$target$foc.call(_entries$0$target);
    }

    const fieldRef = ref();

    function focus() {
      var _fieldRef$value, _fieldRef$value$input;

      (_fieldRef$value = fieldRef.value) == null ? void 0 : (_fieldRef$value$input = _fieldRef$value.inputRef) == null ? void 0 : _fieldRef$value$input.focus();
    }

    function blur() {
      var _fieldRef$value2, _fieldRef$value2$inpu;

      (_fieldRef$value2 = fieldRef.value) == null ? void 0 : (_fieldRef$value2$inpu = _fieldRef$value2.inputRef) == null ? void 0 : _fieldRef$value2$inpu.blur();
    }

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [fieldProps, _] = filterFieldProps(props);
      return _createVNode(VField, _mergeProps({
        "ref": fieldRef,
        "class": ['v-text-field', {
          'v-text-field--prefixed': props.prefix,
          'v-text-field--suffixed': props.suffix
        }],
        "active": isDirty.value,
        "onUpdate:active": val => internalDirty.value = val,
        "onClick:control": focus,
        "onClick:clear": e => {
          e.stopPropagation();
          model.value = '';
        },
        "role": "textbox"
      }, rootAttrs, fieldProps), { ...slots,
        default: _ref2 => {
          let {
            isActive,
            isDisabled,
            isReadonly,
            inputRef,
            props: {
              class: fieldClass,
              ...slotProps
            }
          } = _ref2;
          const showPlaceholder = isActive || props.persistentPlaceholder;
          return _createVNode(_Fragment, null, [props.prefix && _createVNode("span", {
            "class": "v-text-field__prefix",
            "style": {
              opacity: showPlaceholder ? undefined : '0'
            }
          }, [props.prefix], 4), _withDirectives(_createVNode("input", _mergeProps({
            "class": fieldClass,
            "style": {
              opacity: showPlaceholder ? undefined : '0'
            },
            "onUpdate:modelValue": $event => model.value = $event,
            "ref": inputRef,
            "autofocus": props.autofocus,
            "readonly": isReadonly.value,
            "disabled": isDisabled.value,
            "placeholder": props.placeholder,
            "size": 1,
            "type": props.type
          }, slotProps, inputAttrs), null, 16, ["onUpdate:modelValue", "autofocus", "readonly", "disabled", "placeholder", "type"]), [[_vModelDynamic, model.value], [_resolveDirective("intersect"), {
            handler: onIntersect
          }, null, {
            once: true
          }]]), props.suffix && _createVNode("span", {
            "class": "v-text-field__suffix",
            "style": {
              opacity: showPlaceholder ? undefined : '0'
            }
          }, [props.suffix], 4)]);
        },
        details: hasCounter ? _ref3 => {
          let {
            isFocused
          } = _ref3;
          return _createVNode(_Fragment, null, [_createVNode("span", null, null), _createVNode(VCounter, {
            "active": props.persistentCounter || isFocused,
            "value": counterValue.value,
            "max": max.value
          }, slots.counter, 8, ["active", "value", "max"])]);
        } : undefined
      }, 16, ["class", "active", "onUpdate:active", "onClick:control", "onClick:clear"]);
    });
    return {
      fieldRef,
      focus,
      blur
    };
  }

});
//# sourceMappingURL=VTextField.mjs.map