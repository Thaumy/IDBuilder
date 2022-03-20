import { createVNode as _createVNode, mergeProps as _mergeProps, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VMenu.css"; // Components

import { VOverlay } from "../VOverlay/index.mjs";
import { VDialogTransition } from "../transitions/index.mjs"; // Composables

import { makeTransitionProps } from "../../composables/transition.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utilities

import { computed } from 'vue';
import { genericComponent, getUid } from "../../util/index.mjs"; // Types

export const VMenu = genericComponent()({
  name: 'VMenu',
  inheritAttrs: false,
  props: {
    // TODO
    // closeOnClick: {
    //   type: Boolean,
    //   default: true,
    // },
    // closeOnContentClick: {
    //   type: Boolean,
    //   default: true,
    // },
    disableKeys: Boolean,
    modelValue: Boolean,
    id: String,
    ...makeTransitionProps({
      transition: {
        component: VDialogTransition
      }
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
    const id = computed(() => props.id || `v-menu-${uid}`);
    return () => {
      return _createVNode(VOverlay, _mergeProps({
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "class": ['v-menu'],
        "transition": props.transition,
        "absolute": true,
        "positionStrategy": "connected",
        "scrollStrategy": "reposition",
        "scrim": false,
        "activatorProps": {
          'aria-haspopup': 'menu',
          'aria-expanded': String(isActive.value),
          'aria-owns': id.value
        }
      }, attrs), {
        default: slots.default,
        activator: slots.activator
      }, 16, ["modelValue", "onUpdate:modelValue", "transition", "absolute", "activatorProps"]);
    };
  }

});
//# sourceMappingURL=VMenu.mjs.map