import { resolveDirective as _resolveDirective, createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
// Styles
import "./VCheckbox.css"; // Components

import { filterInputAttrs, filterInputProps } from "../VInput/VInput.mjs";
import { VInput } from "../VInput/index.mjs";
import { VSelectionControl } from "../VSelectionControl/index.mjs"; // Composables

import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utility

import { computed, defineComponent } from 'vue';
import { useRender } from "../../util/index.mjs";
export const VCheckbox = defineComponent({
  name: 'VCheckbox',
  inheritAttrs: false,
  props: {
    indeterminate: Boolean,
    indeterminateIcon: {
      type: String,
      default: '$checkboxIndeterminate'
    },
    offIcon: {
      type: String,
      default: '$checkboxOff'
    },
    onIcon: {
      type: String,
      default: '$checkboxOn'
    },
    modelValue: null
  },
  emits: {
    'update:indeterminate': val => true,
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const model = useProxiedModel(props, 'modelValue');
    const indeterminate = useProxiedModel(props, 'indeterminate');
    const offIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.offIcon;
    });
    const onIcon = computed(() => {
      return indeterminate.value ? props.indeterminateIcon : props.onIcon;
    });

    function onChange() {
      if (indeterminate.value) {
        indeterminate.value = false;
      }
    }

    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [rootProps, inputProps] = filterInputProps(inputAttrs);
      return _createVNode(VInput, _mergeProps({
        "class": "v-checkbox"
      }, rootAttrs, rootProps), { ...slots,
        default: _ref2 => {
          let {
            isDisabled,
            isReadonly
          } = _ref2;
          return _createVNode(VSelectionControl, _mergeProps({
            "type": "checkbox",
            "modelValue": model.value,
            "onUpdate:modelValue": [$event => model.value = $event, onChange],
            "disabled": isDisabled.value,
            "readonly": isReadonly.value,
            "offIcon": offIcon.value,
            "onIcon": onIcon.value,
            "aria-checked": indeterminate.value ? 'mixed' : undefined
          }, inputProps), null, 16, ["modelValue", "onUpdate:modelValue", "disabled", "readonly", "offIcon", "onIcon", "aria-checked"]);
        }
      }, 16);
    });
    return {};
  }

});
//# sourceMappingURL=VCheckbox.mjs.map