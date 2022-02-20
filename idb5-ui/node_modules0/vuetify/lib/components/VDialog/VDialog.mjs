import { createVNode as _createVNode, mergeProps as _mergeProps, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VDialog.css"; // Components

import { VDialogTransition } from "../transitions/index.mjs";
import { VOverlay } from "../VOverlay/index.mjs"; // Composables

import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeTransitionProps } from "../../composables/transition.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utilities

import { nextTick, ref, watch } from 'vue';
import { genericComponent, IN_BROWSER } from "../../util/index.mjs"; // Types

export const VDialog = genericComponent()({
  name: 'VDialog',
  inheritAttrs: false,
  props: {
    fullscreen: Boolean,
    origin: {
      type: String,
      default: 'center center'
    },
    retainFocus: {
      type: Boolean,
      default: true
    },
    scrollable: Boolean,
    modelValue: Boolean,
    ...makeDimensionProps({
      width: 'auto'
    }),
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
    const {
      dimensionStyles
    } = useDimension(props);
    const overlay = ref();

    function onFocusin(e) {
      var _overlay$value;

      const before = e.relatedTarget;
      const after = e.target;

      if (before !== after && (_overlay$value = overlay.value) != null && _overlay$value.contentEl && // It isn't the document or the dialog body
      ![document, overlay.value.contentEl].includes(after) && // It isn't inside the dialog body
      !overlay.value.contentEl.contains(after) // We're the topmost dialog
      // TODO: this.activeZIndex >= this.getMaxZIndex() &&
      // It isn't inside a dependent element (like a menu)
      // TODO: !this.getOpenDependentElements().some(el => el.contains(target))
      // So we must have focused something outside the dialog and its children
      ) {
        const focusable = [...overlay.value.contentEl.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(el => !el.hasAttribute('disabled'));
        if (!focusable.length) return;
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (before === firstElement) {
          lastElement.focus();
        } else {
          firstElement.focus();
        }
      }
    }

    if (IN_BROWSER) {
      watch(() => isActive.value && props.retainFocus, val => {
        val ? document.addEventListener('focusin', onFocusin) : document.removeEventListener('focusin', onFocusin);
      }, {
        immediate: true
      });
    }

    watch(isActive, async val => {
      await nextTick();

      if (val) {
        var _contentEl;

        (_contentEl = overlay.value.contentEl) == null ? void 0 : _contentEl.focus({
          preventScroll: true
        });
      } else {
        var _activatorEl;

        (_activatorEl = overlay.value.activatorEl) == null ? void 0 : _activatorEl.focus({
          preventScroll: true
        });
      }
    });
    return () => {
      return _createVNode(VOverlay, _mergeProps({
        "modelValue": isActive.value,
        "onUpdate:modelValue": $event => isActive.value = $event,
        "class": ['v-dialog', {
          'v-dialog--fullscreen': props.fullscreen
        }],
        "style": dimensionStyles.value,
        "transition": props.transition,
        "ref": overlay,
        "aria-role": "dialog",
        "aria-modal": "true",
        "activatorProps": {
          'aria-haspopup': 'dialog',
          'aria-expanded': String(isActive.value)
        }
      }, attrs), {
        default: slots.default,
        activator: slots.activator
      }, 16, ["modelValue", "onUpdate:modelValue", "class", "style", "transition", "activatorProps"]);
    };
  }

});
//# sourceMappingURL=VDialog.mjs.map