import { createVNode as _createVNode, mergeProps as _mergeProps, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VTooltip.css"; // Components

import { VOverlay } from "../VOverlay/index.mjs"; // Composables

import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { makeTransitionProps } from "../../composables/transition.mjs"; // Utilities

import { computed } from 'vue';
import { genericComponent, getUid } from "../../util/index.mjs"; // Types

export const VTooltip = genericComponent()({
  name: 'VTooltip',
  inheritAttrs: false,
  props: {
    id: String,
    modelValue: Boolean,
    text: String,
    anchor: {
      type: String,
      default: 'end'
    },
    origin: {
      type: String,
      default: 'auto'
    },
    ...makeTransitionProps({
      transition: false
    })
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const uid = getUid();
    const id = computed(() => props.id || `v-tooltip-${uid}`);
    const anchor = computed(() => {
      return props.anchor.split(' ').length > 1 ? props.anchor : props.anchor + ' center';
    });
    const origin = computed(() => {
      return props.origin === 'auto' || props.origin === 'overlap' || props.origin.split(' ').length > 1 || props.anchor.split(' ').length > 1 ? props.origin : props.origin + ' center';
    });
    const transition = computed(() => {
      if (props.transition) return props.transition;
      return isActive.value ? 'scale-transition' : 'fade-transition';
    });
    return () => {
      var _slots$default, _slots$default2;

      return _createVNode(VOverlay, _mergeProps({
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "class": ['v-tooltip'],
        "id": id.value,
        "transition": transition.value,
        "absolute": true,
        "positionStrategy": "connected",
        "scrollStrategy": "reposition",
        "anchor": anchor.value,
        "origin": origin.value,
        "min-width": 0,
        "offset": 10,
        "scrim": false,
        "persistent": true,
        "open-on-click": false,
        "open-on-hover": true,
        "role": "tooltip",
        "eager": true,
        "activatorProps": {
          'aria-describedby': id.value
        }
      }, attrs), {
        default: () => [(_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)) != null ? _slots$default : props.text],
        activator: slots.activator,
        _: 1
      }, 16, ["modelValue", "onUpdate:modelValue", "id", "transition", "absolute", "anchor", "origin", "persistent", "open-on-hover", "eager", "activatorProps"]);
    };
  }

});
//# sourceMappingURL=VTooltip.mjs.map