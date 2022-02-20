import { resolveDirective as _resolveDirective, createVNode as _createVNode, mergeProps as _mergeProps, Fragment as _Fragment } from "vue";
// Styles
import "./VFileInput.css"; // Components

import { filterFieldProps, makeVFieldProps } from "../VField/VField.mjs";
import { VChip } from "../VChip/index.mjs";
import { VCounter } from "../VCounter/index.mjs";
import { VField } from "../VField/index.mjs"; // Composables

import { useLocale } from "../../composables/locale.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utilities

import { computed, ref } from 'vue';
import { defineComponent, humanReadableFileSize, useRender, wrapInArray } from "../../util/index.mjs"; // Types

import { filterInputAttrs } from "../VInput/VInput.mjs";
export const VFileInput = defineComponent({
  name: 'VFileInput',
  inheritAttrs: false,
  props: {
    chips: Boolean,
    counter: Boolean,
    counterSizeString: {
      type: String,
      default: '$vuetify.fileInput.counterSize'
    },
    counterString: {
      type: String,
      default: '$vuetify.fileInput.counter'
    },
    multiple: Boolean,
    showSize: {
      type: [Boolean, Number],
      default: false,
      validator: v => {
        return typeof v === 'boolean' || [1000, 1024].includes(v);
      }
    },
    ...makeVFieldProps({
      clearable: true
    }),
    prependIcon: {
      type: String,
      default: '$file'
    },
    modelValue: {
      type: Array,
      default: () => [],
      validator: val => {
        return wrapInArray(val).every(v => v != null && typeof v === 'object');
      }
    }
  },
  emits: {
    'update:modelValue': files => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const model = useProxiedModel(props, 'modelValue');
    const internalDirty = ref(false);
    const isDirty = computed(() => {
      var _model$value;

      return internalDirty.value || !!((_model$value = model.value) != null && _model$value.length);
    });
    const base = computed(() => typeof props.showSize !== 'boolean' ? props.showSize : undefined);
    const totalBytes = computed(() => {
      var _model$value2;

      return ((_model$value2 = model.value) != null ? _model$value2 : []).reduce((bytes, _ref2) => {
        let {
          size = 0
        } = _ref2;
        return bytes + size;
      }, 0);
    });
    const totalBytesReadable = computed(() => humanReadableFileSize(totalBytes.value, base.value));
    const fileNames = computed(() => {
      var _model$value3;

      return ((_model$value3 = model.value) != null ? _model$value3 : []).map(file => {
        const {
          name = '',
          size = 0
        } = file;
        return !props.showSize ? name : `${name} (${humanReadableFileSize(size, base.value)})`;
      });
    });
    const counterValue = computed(() => {
      var _model$value$length, _model$value4;

      const fileCount = (_model$value$length = (_model$value4 = model.value) == null ? void 0 : _model$value4.length) != null ? _model$value$length : 0;
      if (props.showSize) return t(props.counterSizeString, fileCount, totalBytesReadable.value);else return t(props.counterString, fileCount);
    });
    const fieldRef = ref();

    function focus() {
      var _fieldRef$value, _fieldRef$value$input;

      (_fieldRef$value = fieldRef.value) == null ? void 0 : (_fieldRef$value$input = _fieldRef$value.inputRef) == null ? void 0 : _fieldRef$value$input.focus();
    }

    function blur() {
      var _fieldRef$value2, _fieldRef$value2$inpu;

      (_fieldRef$value2 = fieldRef.value) == null ? void 0 : (_fieldRef$value2$inpu = _fieldRef$value2.inputRef) == null ? void 0 : _fieldRef$value2$inpu.blur();
    }

    function click() {
      var _fieldRef$value3, _fieldRef$value3$inpu;

      (_fieldRef$value3 = fieldRef.value) == null ? void 0 : (_fieldRef$value3$inpu = _fieldRef$value3.inputRef) == null ? void 0 : _fieldRef$value3$inpu.click();
    }

    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || counterValue.value);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [fieldProps, _] = filterFieldProps(props);
      return _createVNode(VField, _mergeProps({
        "ref": fieldRef,
        "class": "v-file-input",
        "active": isDirty.value,
        "dirty": isDirty.value,
        "prepend-icon": props.prependIcon,
        "onUpdate:active": val => internalDirty.value = val,
        "onClick:control": click,
        "onClick:prepend": click,
        "onClick:clear": e => {
          var _fieldRef$value4, _fieldRef$value4$inpu;

          e.stopPropagation();
          model.value = [];
          if (!((_fieldRef$value4 = fieldRef.value) != null && (_fieldRef$value4$inpu = _fieldRef$value4.inputRef) != null && _fieldRef$value4$inpu.value)) return;
          fieldRef.value.inputRef.value = '';
        }
      }, rootAttrs, fieldProps), { ...slots,
        default: _ref3 => {
          let {
            isActive,
            inputRef,
            props: {
              class: fieldClass,
              ...slotProps
            }
          } = _ref3;
          return _createVNode(_Fragment, null, [_createVNode("input", _mergeProps({
            "ref": inputRef,
            "type": "file",
            "disabled": props.disabled,
            "multiple": props.multiple,
            "onClick": e => e.stopPropagation(),
            "onChange": e => {
              var _target$files, _inputRef$value;

              if (!e.target) return;
              const target = e.target;
              model.value = [...((_target$files = target.files) != null ? _target$files : [])];
              if (!isActive) (_inputRef$value = inputRef.value) == null ? void 0 : _inputRef$value.focus();
            }
          }, slotProps, inputAttrs), null, 16, ["disabled", "multiple", "onClick", "onChange"]), isDirty.value && _createVNode("div", {
            "class": fieldClass
          }, [slots.selection ? slots.selection({
            fileNames: fileNames.value,
            totalBytes: totalBytes.value,
            totalBytesReadable: totalBytesReadable.value
          }) : props.chips ? fileNames.value.map(text => _createVNode(VChip, {
            "key": text,
            "size": "small",
            "color": props.color
          }, {
            default: () => [text],
            _: 2
          }, 8, ["color"])) : fileNames.value.join(', ')], 2)]);
        },
        details: hasCounter ? () => _createVNode(_Fragment, null, [_createVNode("span", null, null), _createVNode(VCounter, {
          "value": counterValue.value
        }, slots.counter, 8, ["value"])]) : undefined
      }, 16, ["active", "dirty", "prepend-icon", "onUpdate:active", "onClick:control", "onClick:prepend", "onClick:clear"]);
    });
    return {
      fieldRef,
      focus,
      blur,
      click
    };
  }

});
//# sourceMappingURL=VFileInput.mjs.map