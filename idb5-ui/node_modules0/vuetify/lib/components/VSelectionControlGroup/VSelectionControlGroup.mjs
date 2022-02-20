import { createVNode as _createVNode } from "vue";
// Styles
import "./VSelectionControlGroup.css"; // Composables

import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utility

import { computed, defineComponent, provide, toRef } from 'vue';
import { getUid, useRender } from "../../util/index.mjs"; // Types

export const VSelectionControlGroupSymbol = Symbol.for('vuetify:selection-control-group');
export const VSelectionControlGroup = defineComponent({
  name: 'VSelectionControlGroup',
  props: {
    disabled: Boolean,
    id: String,
    inline: Boolean,
    name: String,
    offIcon: String,
    onIcon: String,
    multiple: {
      type: Boolean,
      default: null
    },
    readonly: Boolean,
    type: String,
    modelValue: null
  },
  emits: {
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const modelValue = useProxiedModel(props, 'modelValue');
    const uid = getUid();
    const id = computed(() => props.id || `v-selection-control-group-${uid}`);
    const name = computed(() => props.name || id.value);
    provide(VSelectionControlGroupSymbol, {
      disabled: toRef(props, 'disabled'),
      inline: toRef(props, 'inline'),
      modelValue,
      multiple: computed(() => !!props.multiple || props.multiple == null && Array.isArray(modelValue.value)),
      name,
      offIcon: toRef(props, 'offIcon'),
      onIcon: toRef(props, 'onIcon'),
      readonly: toRef(props, 'readonly'),
      type: toRef(props, 'type')
    });
    useRender(() => {
      var _slots$default;

      return _createVNode("div", {
        "class": "v-selection-control-group",
        "aria-labelled-by": props.type === 'radio' ? id.value : undefined,
        "role": props.type === 'radio' ? 'radiogroup' : undefined
      }, [slots == null ? void 0 : (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 8, ["aria-labelled-by", "role"]);
    });
    return {};
  }

});
//# sourceMappingURL=VSelectionControlGroup.mjs.map