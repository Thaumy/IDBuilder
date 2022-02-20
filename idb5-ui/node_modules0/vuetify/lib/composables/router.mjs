// Utilities
import { getCurrentInstance, propsFactory } from "../util/index.mjs";
import { computed, onBeforeUnmount, onMounted, resolveDynamicComponent, toRef } from 'vue'; // Types

export function useRoute() {
  const vm = getCurrentInstance('useRoute');
  return computed(() => {
    var _vm$proxy;

    return vm == null ? void 0 : (_vm$proxy = vm.proxy) == null ? void 0 : _vm$proxy.$route;
  });
}
export function useRouter() {
  var _getCurrentInstance, _getCurrentInstance$p;

  return (_getCurrentInstance = getCurrentInstance('useRouter')) == null ? void 0 : (_getCurrentInstance$p = _getCurrentInstance.proxy) == null ? void 0 : _getCurrentInstance$p.$router;
}
export function useLink(props, attrs) {
  const RouterLink = resolveDynamicComponent('RouterLink');
  const isLink = computed(() => !!(props.href || props.to));
  const isClickable = computed(() => {
    return (isLink == null ? void 0 : isLink.value) || !!(attrs.onClick || attrs.onClickOnce);
  });

  if (typeof RouterLink === 'string') {
    return {
      isLink,
      isClickable,
      href: toRef(props, 'href')
    };
  }

  const link = props.to ? RouterLink.useLink(props) : undefined;
  return { ...link,
    isLink,
    isClickable,
    href: computed(() => props.to ? link == null ? void 0 : link.route.value.href : props.href)
  };
}
export const makeRouterProps = propsFactory({
  href: String,
  replace: Boolean,
  to: [String, Object]
}, 'router');
export function useBackButton(cb) {
  const router = useRouter();
  let popped = false;
  let removeGuard;
  onMounted(() => {
    window.addEventListener('popstate', onPopstate);
    removeGuard = router == null ? void 0 : router.beforeEach((to, from, next) => {
      setTimeout(() => popped ? cb(next) : next());
    });
  });
  onBeforeUnmount(() => {
    var _removeGuard;

    window.removeEventListener('popstate', onPopstate);
    (_removeGuard = removeGuard) == null ? void 0 : _removeGuard();
  });

  function onPopstate(e) {
    if (e.state.replaced) return;
    popped = true;
    setTimeout(() => popped = false);
  }
}
//# sourceMappingURL=router.mjs.map