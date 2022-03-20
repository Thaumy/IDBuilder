import { computed, effectScope, onScopeDispose, ref, toRaw, watch } from 'vue';
import { getCurrentInstance } from "../util/index.mjs"; // Types

const stack = ref([]);
export function useStack(isActive) {
  const vm = getCurrentInstance('useStack');
  let scope;
  watch(isActive, val => {
    if (val) {
      scope = effectScope();
      scope.run(() => {
        stack.value.push(vm);
        onScopeDispose(() => {
          const idx = stack.value.indexOf(vm);
          stack.value.splice(idx, 1);
        });
      });
    } else {
      var _scope;

      (_scope = scope) == null ? void 0 : _scope.stop();
    }
  }, {
    immediate: true
  });
  const isTop = computed(() => {
    return toRaw(stack.value[stack.value.length - 1]) === vm;
  });
  return {
    isTop
  };
}
//# sourceMappingURL=stack.mjs.map