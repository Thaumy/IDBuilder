// Utilities
import { getCurrentInstance, IN_BROWSER, propsFactory, SUPPORTS_FOCUS_VISIBLE } from "../../util/index.mjs";
import { makeDelayProps, useDelay } from "../../composables/delay.mjs";
import { computed, effectScope, nextTick, onScopeDispose, ref, watch } from 'vue'; // Types

export const makeActivatorProps = propsFactory({
  activator: [String, Object],
  activatorProps: {
    type: Object,
    default: () => ({})
  },
  openOnClick: {
    type: Boolean,
    default: undefined
  },
  openOnHover: Boolean,
  openOnFocus: {
    type: Boolean,
    default: undefined
  },
  ...makeDelayProps()
});
export function useActivator(props, isActive) {
  const activatorEl = ref();
  let isHovered = false;
  let isFocused = false;
  const openOnFocus = computed(() => props.openOnFocus || props.openOnFocus == null && props.openOnHover);
  const openOnClick = computed(() => props.openOnClick || props.openOnClick == null && !props.openOnHover && !openOnFocus.value);
  const {
    runOpenDelay,
    runCloseDelay
  } = useDelay(props, value => {
    if (value === (props.openOnHover && isHovered || openOnFocus.value && isFocused)) {
      isActive.value = value;
    }
  });
  const availableEvents = {
    click: e => {
      e.stopPropagation();
      activatorEl.value = e.currentTarget || e.target;
      isActive.value = !isActive.value;
    },
    mouseenter: e => {
      isHovered = true;
      runOpenDelay();
    },
    mouseleave: e => {
      isHovered = false;
      runCloseDelay();
    },
    focus: e => {
      if (SUPPORTS_FOCUS_VISIBLE && !e.target.matches(':focus-visible')) return;
      isFocused = true;
      e.stopPropagation();
      runOpenDelay();
    },
    blur: e => {
      isFocused = false;
      e.stopPropagation();
      runCloseDelay();
    }
  };
  const activatorEvents = computed(() => {
    const events = {};

    if (openOnClick.value) {
      events.click = availableEvents.click;
    }

    if (props.openOnHover) {
      events.mouseenter = availableEvents.mouseenter;
      events.mouseleave = availableEvents.mouseleave;
    }

    if (openOnFocus.value) {
      events.focus = availableEvents.focus;
      events.blur = availableEvents.blur;
    }

    return events;
  });
  let scope;
  watch(() => !!props.activator, val => {
    if (val && IN_BROWSER) {
      scope = effectScope();
      scope.run(() => {
        _useActivator(props, {
          activatorEl,
          activatorEvents
        });
      });
    } else if (scope) {
      scope.stop();
    }
  }, {
    flush: 'post',
    immediate: true
  });
  return {
    activatorEl,
    activatorEvents
  };
}

function _useActivator(props, _ref) {
  let {
    activatorEl,
    activatorEvents
  } = _ref;
  watch(() => props.activator, (val, oldVal) => {
    if (oldVal && val !== oldVal) {
      const activator = getActivator(oldVal);
      activator && unbindActivatorProps(activator);
    }

    if (val) {
      nextTick(() => bindActivatorProps());
    }
  }, {
    immediate: true
  });
  watch(() => props.activatorProps, () => {
    bindActivatorProps();
  });
  onScopeDispose(() => {
    unbindActivatorProps();
  });

  function bindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActivator();

    let _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.activatorProps;

    if (!el) return;
    Object.entries(activatorEvents.value).forEach(_ref2 => {
      let [name, cb] = _ref2;
      el.addEventListener(name, cb);
    });
    Object.keys(_props).forEach(k => {
      if (_props[k] == null) {
        el.removeAttribute(k);
      } else {
        el.setAttribute(k, _props[k]);
      }
    });
  }

  function unbindActivatorProps() {
    let el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getActivator();

    let _props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : props.activatorProps;

    if (!el) return;
    Object.entries(activatorEvents.value).forEach(_ref3 => {
      let [name, cb] = _ref3;
      el.removeEventListener(name, cb);
    });
    Object.keys(_props).forEach(k => {
      el.removeAttribute(k);
    });
  }

  const vm = getCurrentInstance('useActivator');

  function getActivator() {
    var _activator;

    let selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : props.activator;
    let activator;

    if (selector) {
      if (selector === 'parent') {
        var _vm$proxy, _vm$proxy$$el;

        activator = vm == null ? void 0 : (_vm$proxy = vm.proxy) == null ? void 0 : (_vm$proxy$$el = _vm$proxy.$el) == null ? void 0 : _vm$proxy$$el.parentNode;
      } else if (typeof selector === 'string') {
        // Selector
        activator = document.querySelector(selector);
      } else if ('$el' in selector) {
        // Component (ref)
        activator = selector.$el;
      } else {
        // HTMLElement | Element
        activator = selector;
      }
    } // The activator should only be a valid element (Ignore comments and text nodes)


    activatorEl.value = ((_activator = activator) == null ? void 0 : _activator.nodeType) === Node.ELEMENT_NODE ? activator : null;
    return activatorEl.value;
  }
}
//# sourceMappingURL=useActivator.mjs.map