import { withDirectives as _withDirectives, mergeProps as _mergeProps, resolveDirective as _resolveDirective, vModelText as _vModelText, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VTextarea.css"; // Components

import { filterFieldProps, makeVFieldProps } from "../VField/VField.mjs";
import { VCounter } from "../VCounter/index.mjs";
import { VField } from "../VField/index.mjs"; // Composables

import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Directives

import Intersect from "../../directives/intersect/index.mjs"; // Utilities

import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { convertToUnit, defineComponent, useRender } from "../../util/index.mjs"; // Types

import { filterInputAttrs } from "../VInput/VInput.mjs";
export const VTextarea = defineComponent({
  name: 'VTextarea',
  directives: {
    Intersect
  },
  inheritAttrs: false,
  props: {
    autoGrow: Boolean,
    autofocus: Boolean,
    counter: [Boolean, Number, String],
    counterValue: Function,
    prefix: String,
    placeholder: String,
    persistentPlaceholder: Boolean,
    persistentCounter: Boolean,
    noResize: Boolean,
    rows: {
      type: [Number, String],
      default: 5,
      validator: v => !isNaN(parseFloat(v))
    },
    maxRows: {
      type: [Number, String],
      validator: v => !isNaN(parseFloat(v))
    },
    suffix: String,
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
    const controlHeight = ref('auto');
    const internalDirty = ref(false);
    const isDirty = computed(() => {
      return internalDirty.value || !!model.value;
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

    const sizerRef = ref();

    function calculateInputHeight() {
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const padding = parseFloat(style.getPropertyValue('--v-field-padding-top')) + parseFloat(style.getPropertyValue('--v-field-padding-bottom'));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = parseFloat(props.rows) * lineHeight + padding;
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        controlHeight.value = convertToUnit(Math.min(maxHeight, Math.max(minHeight, height != null ? height : 0)));
      });
    }

    onMounted(calculateInputHeight);
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    let observer;
    watch(sizerRef, val => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        var _observer;

        (_observer = observer) == null ? void 0 : _observer.disconnect();
      }
    });
    onBeforeUnmount(() => {
      var _observer2;

      (_observer2 = observer) == null ? void 0 : _observer2.disconnect();
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [fieldProps, _] = filterFieldProps(props);
      return _createVNode(VField, _mergeProps({
        "ref": fieldRef,
        "class": ['v-textarea', {
          'v-textarea--prefixed': props.prefix,
          'v-textarea--suffixed': props.suffix,
          'v-textarea--auto-grow': props.autoGrow,
          'v-textarea--no-resize': props.noResize || props.autoGrow
        }, attrs.class],
        "style": {
          '--v-input-control-height': controlHeight.value
        },
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
            "class": "v-textarea__prefix",
            "style": {
              opacity: showPlaceholder ? undefined : '0'
            }
          }, [props.prefix], 4), _withDirectives(_createVNode("textarea", _mergeProps({
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
            "rows": props.rows
          }, slotProps, inputAttrs), null, 16, ["onUpdate:modelValue", "autofocus", "readonly", "disabled", "placeholder", "rows"]), [[_vModelText, model.value], [_resolveDirective("intersect"), {
            handler: onIntersect
          }, null, {
            once: true
          }]]), props.autoGrow && _withDirectives(_createVNode("textarea", {
            "class": [fieldClass, 'v-textarea__sizer'],
            "onUpdate:modelValue": $event => model.value = $event,
            "ref": sizerRef,
            "readonly": true,
            "aria-hidden": "true"
          }, null, 10, ["onUpdate:modelValue", "readonly"]), [[_vModelText, model.value]]), props.suffix && _createVNode("span", {
            "class": "v-textarea__suffix",
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
      }, 16, ["class", "style", "active", "onUpdate:active", "onClick:control", "onClick:clear"]);
    });
    return {
      fieldRef,
      focus,
      blur
    };
  }

});
//# sourceMappingURL=VTextarea.mjs.map