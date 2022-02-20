// Utilities
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { consoleWarn, propsFactory } from "../util/index.mjs"; // Types

// Composables
export const makeScrollProps = propsFactory({
  scrollTarget: {
    type: String
  },
  scrollThreshold: {
    type: [String, Number]
  }
}, 'scroll');
export function useScroll(props) {
  let args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    thresholdMetCallback,
    scrollThreshold,
    canScroll
  } = args;
  let previousScroll = 0;
  const target = ref(null);
  const currentScroll = ref(0);
  const savedScroll = ref(0);
  const currentThreshold = ref(0);
  const isScrollActive = ref(false);
  const isScrollingUp = ref(false);
  const computedScrollThreshold = computed(() => {
    var _ref, _props$scrollThreshol;

    return Number((_ref = (_props$scrollThreshol = props.scrollThreshold) != null ? _props$scrollThreshol : scrollThreshold) != null ? _ref : 300);
  });

  const onScroll = () => {
    const targetEl = target.value;
    if (!targetEl || canScroll && !canScroll.value) return;
    previousScroll = currentScroll.value;
    currentScroll.value = 'window' in targetEl ? targetEl.pageYOffset : targetEl.scrollTop;
    isScrollingUp.value = currentScroll.value < previousScroll;
    currentThreshold.value = Math.abs(currentScroll.value - computedScrollThreshold.value);
  };

  watch(isScrollingUp, () => {
    savedScroll.value = savedScroll.value || currentScroll.value;
  });
  watch(isScrollActive, () => {
    savedScroll.value = 0;
  });
  onMounted(() => {
    watch(() => props.scrollTarget, scrollTarget => {
      var _target$value;

      const newTarget = scrollTarget ? document.querySelector(scrollTarget) : window;

      if (!newTarget) {
        consoleWarn(`Unable to locate element with identifier ${scrollTarget}`, getCurrentInstance());
        return;
      }

      if (newTarget === target.value) return;
      (_target$value = target.value) == null ? void 0 : _target$value.removeEventListener('scroll', onScroll);
      target.value = newTarget;
      target.value.addEventListener('scroll', onScroll, {
        passive: true
      });
    }, {
      immediate: true
    });
  });
  onBeforeUnmount(() => {
    var _target$value2;

    (_target$value2 = target.value) == null ? void 0 : _target$value2.removeEventListener('scroll', onScroll);
  });
  thresholdMetCallback && watch(() => Math.abs(currentScroll.value - savedScroll.value) > computedScrollThreshold.value, thresholdMet => {
    thresholdMet && thresholdMetCallback({
      currentThreshold: currentThreshold.value,
      isScrollingUp: isScrollingUp.value,
      savedScroll
    });
  }, {
    immediate: true
  }); // Do we need this? If yes - seems that
  // there's no need to expose onScroll

  canScroll && watch(canScroll, onScroll, {
    immediate: true
  });
  return {
    isScrollActive,
    // required only for testing
    // probably can be removed
    // later (2 chars chlng)
    isScrollingUp,
    savedScroll
  };
}
//# sourceMappingURL=scroll.mjs.map