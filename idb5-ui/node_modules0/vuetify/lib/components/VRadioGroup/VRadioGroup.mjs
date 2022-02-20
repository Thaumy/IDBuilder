import { mergeProps as _mergeProps, resolveDirective as _resolveDirective, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VRadioGroup.css"; // Components

import { filterInputAttrs, filterInputProps, VInput } from "../VInput/VInput.mjs";
import { VLabel } from "../VLabel/index.mjs";
import { VSelectionControlGroup } from "../VSelectionControlGroup/index.mjs"; // Utility

import { computed, defineComponent } from 'vue';
import { getUid, useRender } from "../../util/index.mjs";
export const VRadioGroup = defineComponent({
  name: 'VRadioGroup',
  inheritAttrs: false,
  props: {
    height: {
      type: [Number, String],
      default: 'auto'
    },
    label: String,
    id: String,
    inline: Boolean,
    onIcon: {
      type: String,
      default: '$radioOn'
    },
    offIcon: {
      type: String,
      default: '$radioOff'
    },
    type: {
      type: String,
      default: 'radio'
    }
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const uid = getUid();
    const id = computed(() => props.id || `radio-group-${uid}`);
    useRender(() => {
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const [rootProps, inputProps] = filterInputProps(inputAttrs);
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      return _createVNode(VInput, _mergeProps({
        "class": "v-radio-group"
      }, rootAttrs, rootProps), { ...slots,
        default: _ref2 => {
          let {
            isDisabled,
            isReadonly,
            isValid
          } = _ref2;
          return _createVNode(_Fragment, null, [label && _createVNode(VLabel, {
            "disabled": isDisabled.value,
            "error": isValid.value === false,
            "for": id.value
          }, {
            default: () => [label],
            _: 2
          }, 8, ["disabled", "error", "for"]), _createVNode(VSelectionControlGroup, _mergeProps({
            "id": id.value,
            "disabled": isDisabled.value,
            "onIcon": props.onIcon,
            "offIcon": props.offIcon,
            "type": props.type,
            "readonly": isReadonly.value,
            "inline": props.inline
          }, inputProps), slots, 16, ["id", "disabled", "onIcon", "offIcon", "type", "readonly", "inline"])]);
        }
      }, 16);
    });
    return {};
  }

});
//# sourceMappingURL=VRadioGroup.mjs.map