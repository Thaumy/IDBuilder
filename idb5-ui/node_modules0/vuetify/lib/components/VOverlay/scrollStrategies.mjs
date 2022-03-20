// Utilities
import { convertToUnit, getScrollParents, hasScrollbar, IN_BROWSER, propsFactory } from "../../util/index.mjs";
import { effectScope, nextTick, onScopeDispose, watchEffect } from 'vue';
import { requestNewFrame } from "./requestNewFrame.mjs"; // Types

const scrollStrategies = {
  close: closeScrollStrategy,
  block: blockScrollStrategy,
  reposition: repositionScrollStrategy
};
export const makeScrollStrategyProps = propsFactory({
  scrollStrategy: {
    type: [String, Function],
    default: 'block',
    validator: val => typeof val === 'function' || val in scrollStrategies
  }
});
export function useScrollStrategies(props, data) {
  if (!IN_BROWSER) return;
  let scope;
  watchEffect(async () => {
    var _scope;

    (_scope = scope) == null ? void 0 : _scope.stop();
    if (!(data.isActive.value && props.scrollStrategy)) return;
    scope = effectScope();
    await nextTick();
    scope.run(() => {
      if (typeof props.scrollStrategy === 'function') {
        props.scrollStrategy(data);
      } else {
        var _scrollStrategies$pro;

        (_scrollStrategies$pro = scrollStrategies[props.scrollStrategy]) == null ? void 0 : _scrollStrategies$pro.call(scrollStrategies, data);
      }
    });
  });
}

function closeScrollStrategy(data) {
  var _data$activatorEl$val;

  function onScroll(e) {
    data.isActive.value = false;
  }

  bindScroll((_data$activatorEl$val = data.activatorEl.value) != null ? _data$activatorEl$val : data.contentEl.value, onScroll);
}

function blockScrollStrategy(data) {
  var _data$root$value;

  const scrollElements = [...new Set([...getScrollParents(data.activatorEl.value), ...getScrollParents(data.contentEl.value)])].filter(el => !el.classList.contains('v-overlay-scroll-blocked'));
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth;

  const scrollableParent = (el => hasScrollbar(el) && el)(((_data$root$value = data.root.value) == null ? void 0 : _data$root$value.offsetParent) || document.documentElement);

  if (scrollableParent) {
    data.root.value.classList.add('v-overlay--scroll-blocked');
  }

  scrollElements.forEach((el, i) => {
    el.style.setProperty('--v-scrollbar-offset', convertToUnit(scrollbarWidth));
    el.classList.add('v-overlay-scroll-blocked');
  });
  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      el.style.removeProperty('--v-scrollbar-offset');
      el.classList.remove('v-overlay-scroll-blocked');
    });

    if (scrollableParent) {
      data.root.value.classList.remove('v-overlay--scroll-blocked');
    }
  });
}

function repositionScrollStrategy(data) {
  var _data$activatorEl$val2;

  let slow = false;
  let raf = -1;

  function update(e) {
    requestNewFrame(() => {
      var _data$updatePosition$, _data$updatePosition;

      const start = performance.now();
      (_data$updatePosition$ = (_data$updatePosition = data.updatePosition).value) == null ? void 0 : _data$updatePosition$.call(_data$updatePosition, e);
      const time = performance.now() - start;
      slow = time / (1000 / 60) > 2;
    });
  }

  bindScroll((_data$activatorEl$val2 = data.activatorEl.value) != null ? _data$activatorEl$val2 : data.contentEl.value, e => {
    if (slow) {
      // If the position calculation is slow,
      // defer updates until scrolling is finished.
      // Browsers usually fire one scroll event per frame so
      // we just wait until we've got two frames without an event
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => {
          update(e);
        });
      });
    } else {
      update(e);
    }
  });
}
/** @private */


function bindScroll(el, onScroll) {
  const scrollElements = [document, ...getScrollParents(el)];
  scrollElements.forEach(el => {
    el.addEventListener('scroll', onScroll, {
      passive: true
    });
  });
  onScopeDispose(() => {
    scrollElements.forEach(el => {
      el.removeEventListener('scroll', onScroll);
    });
  });
}
//# sourceMappingURL=scrollStrategies.mjs.map