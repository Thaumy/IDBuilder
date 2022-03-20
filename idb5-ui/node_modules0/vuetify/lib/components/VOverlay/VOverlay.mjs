import { withDirectives as _withDirectives, resolveDirective as _resolveDirective, vShow as _vShow, Fragment as _Fragment, createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
// Styles
import "./VOverlay.css"; // Composables

import { makeActivatorProps, useActivator } from "./useActivator.mjs";
import { makePositionStrategyProps, usePositionStrategies } from "./positionStrategies.mjs";
import { makeScrollStrategyProps, useScrollStrategies } from "./scrollStrategies.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { makeTransitionProps, MaybeTransition } from "../../composables/transition.mjs";
import { useBackButton } from "../../composables/router.mjs";
import { useBackgroundColor } from "../../composables/color.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { useRtl } from "../../composables/rtl.mjs";
import { useTeleport } from "../../composables/teleport.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeLazyProps, useLazy } from "../../composables/lazy.mjs";
import { useStack } from "../../composables/stack.mjs"; // Directives

import { ClickOutside } from "../../directives/click-outside/index.mjs"; // Utilities

import { convertToUnit, genericComponent, getScrollParent, standardEasing, useRender } from "../../util/index.mjs";
import { computed, mergeProps, ref, Teleport, toHandlers, Transition, watch } from 'vue'; // Types

function Scrim(props) {
  const {
    modelValue,
    color,
    ...rest
  } = props;
  return _createVNode(Transition, {
    "name": "fade-transition",
    "appear": true
  }, {
    default: () => [props.modelValue && _createVNode("div", _mergeProps({
      "class": ['v-overlay__scrim', props.color.backgroundColorClasses.value],
      "style": props.color.backgroundColorStyles.value
    }, rest), null, 16)]
  }, 8, ["appear"]);
}

export const VOverlay = genericComponent()({
  name: 'VOverlay',
  directives: {
    ClickOutside
  },
  inheritAttrs: false,
  props: {
    absolute: Boolean,
    attach: [Boolean, String, Object],
    contained: Boolean,
    contentClass: null,
    noClickAnimation: Boolean,
    modelValue: Boolean,
    persistent: Boolean,
    scrim: {
      type: [String, Boolean],
      default: true
    },
    ...makeActivatorProps(),
    ...makeDimensionProps(),
    ...makePositionStrategyProps(),
    ...makeScrollStrategyProps(),
    ...makeThemeProps(),
    ...makeTransitionProps(),
    ...makeLazyProps()
  },
  emits: {
    'click:outside': e => true,
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots,
      attrs,
      emit
    } = _ref;
    const isActive = useProxiedModel(props, 'modelValue');
    const {
      teleportTarget
    } = useTeleport(computed(() => props.attach || props.contained));
    const {
      themeClasses
    } = useTheme(props);
    const {
      rtlClasses
    } = useRtl();
    const {
      hasContent,
      onAfterLeave
    } = useLazy(props, isActive);
    const scrimColor = useBackgroundColor(computed(() => {
      return typeof props.scrim === 'string' ? props.scrim : null;
    }));
    const {
      activatorEl,
      activatorEvents
    } = useActivator(props, isActive);
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      isTop
    } = useStack(isActive);
    const root = ref();
    const contentEl = ref();
    const {
      contentStyles,
      updatePosition
    } = usePositionStrategies(props, {
      contentEl,
      activatorEl,
      isActive
    });
    useScrollStrategies(props, {
      root,
      contentEl,
      activatorEl,
      isActive,
      updatePosition
    });

    function onClickOutside(e) {
      emit('click:outside', e);
      if (!props.persistent) isActive.value = false;else animateClick();
    }

    function closeConditional() {
      return isActive.value && isTop.value;
    }

    watch(isActive, val => {
      if (val) {
        window.addEventListener('keydown', onKeydown);
      } else {
        window.removeEventListener('keydown', onKeydown);
      }
    }, {
      immediate: true
    });

    function onKeydown(e) {
      if (e.key === 'Escape' && isTop.value) {
        if (!props.persistent) {
          isActive.value = false;
        } else animateClick();
      }
    }

    useBackButton(next => {
      if (isTop.value && isActive.value) {
        next(false);
        if (!props.persistent) isActive.value = false;else animateClick();
      } else {
        next();
      }
    });
    const top = ref();
    watch(() => isActive.value && (props.absolute || props.contained) && teleportTarget.value == null, val => {
      if (val) {
        const scrollParent = getScrollParent(root.value);

        if (scrollParent && scrollParent !== document.scrollingElement) {
          top.value = scrollParent.scrollTop;
        }
      }
    }); // Add a quick "bounce" animation to the content

    function animateClick() {
      var _contentEl$value;

      if (props.noClickAnimation) return;
      (_contentEl$value = contentEl.value) == null ? void 0 : _contentEl$value.animate([{
        transformOrigin: 'center'
      }, {
        transform: 'scale(1.03)'
      }, {
        transformOrigin: 'center'
      }], {
        duration: 150,
        easing: standardEasing
      });
    }

    useRender(() => {
      var _slots$activator, _slots$default;

      return _createVNode(_Fragment, null, [(_slots$activator = slots.activator) == null ? void 0 : _slots$activator.call(slots, {
        isActive: isActive.value,
        props: mergeProps({
          modelValue: isActive.value,
          'onUpdate:modelValue': val => isActive.value = val
        }, toHandlers(activatorEvents.value), props.activatorProps)
      }), _createVNode(Teleport, {
        "disabled": !teleportTarget.value,
        "to": teleportTarget.value
      }, {
        default: () => [hasContent.value && _createVNode("div", _mergeProps({
          "class": ['v-overlay', {
            'v-overlay--absolute': props.absolute || props.contained,
            'v-overlay--active': isActive.value,
            'v-overlay--contained': props.contained
          }, themeClasses.value, rtlClasses.value],
          "style": top.value != null ? `top: ${convertToUnit(top.value)}` : undefined,
          "ref": root
        }, attrs), [_createVNode(Scrim, {
          "color": scrimColor,
          "modelValue": isActive.value && !!props.scrim
        }, null, 8, ["color", "modelValue"]), _createVNode(MaybeTransition, {
          "appear": true,
          "onAfterLeave": onAfterLeave,
          "persisted": true,
          "transition": props.transition,
          "target": activatorEl.value
        }, {
          default: () => [_withDirectives(_createVNode("div", {
            "ref": contentEl,
            "class": ['v-overlay__content', props.contentClass],
            "style": [dimensionStyles.value, contentStyles.value]
          }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
            isActive
          })], 6), [[_vShow, isActive.value], [_resolveDirective("click-outside"), {
            handler: onClickOutside,
            closeConditional,
            include: () => [activatorEl.value]
          }]])]
        }, 8, ["appear", "onAfterLeave", "persisted", "transition", "target"])], 16)]
      }, 8, ["disabled", "to"])]);
    });
    return {
      animateClick,
      contentEl,
      activatorEl
    };
  }

});
//# sourceMappingURL=VOverlay.mjs.map