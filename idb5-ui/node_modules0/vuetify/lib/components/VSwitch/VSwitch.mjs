import { mergeProps as _mergeProps, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Styles
import "./VSwitch.css"; // Components

import { VSelectionControl } from "../VSelectionControl/index.mjs";
import { VInput } from "../VInput/index.mjs";
import { filterInputAttrs, filterInputProps } from "../VInput/VInput.mjs"; // Utility

import { defineComponent, ref } from 'vue';
import { useRender } from "../../util/index.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
export const VSwitch = defineComponent({
  name: 'VSwitch',
  inheritAttrs: false,
  props: {
    indeterminate: Boolean,
    inset: Boolean,
    loading: [Boolean, String],
    flat: Boolean
  },
  emits: {
    'update:indeterminate': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const indeterminate = useProxiedModel(props, 'indeterminate');

    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [rootProps, inputProps] = filterInputProps(inputAttrs);
      const control = ref();

      function onClick() {
        var _control$value, _control$value$input;

        (_control$value = control.value) == null ? void 0 : (_control$value$input = _control$value.input) == null ? void 0 : _control$value$input.click();
      }

      return _createVNode(VInput, _mergeProps({
        "class": ['v-switch', {
          'v-switch--indeterminate': indeterminate.value
        }]
      }, rootAttrs, rootProps), { ...slots,
        default: _ref2 => {
          let {
            isDisabled,
            isReadonly
          } = _ref2;
          return _createVNode(VSelectionControl, _mergeProps({
            "type": "checkbox",
            "disabled": isDisabled.value,
            "readonly": isReadonly.value,
            "onUpdate:modelValue": onChange,
            "aria-checked": indeterminate.value ? 'mixed' : undefined,
            "ref": control
          }, inputProps), {
            default: () => _createVNode("div", {
              "class": "v-switch__track",
              "onClick": onClick
            }, null, 8, ["onClick"]),
            input: _ref3 => {
              let {
                textColorClasses
              } = _ref3;
              return _createVNode("div", {
                "class": ['v-switch__thumb', textColorClasses.value]
              }, null, 2);
            }
          }, 16, ["disabled", "readonly", "onUpdate:modelValue", "aria-checked"]);
        }
      }, 16, ["class"]);
    });
    return {};
  }

});
//# sourceMappingURL=VSwitch.mjs.map