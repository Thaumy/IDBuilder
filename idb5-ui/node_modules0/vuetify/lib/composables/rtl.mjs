import { computed, inject, provide, ref } from 'vue';
import { rtl } from "../locale/index.mjs"; // Types

export const RtlSymbol = Symbol.for('vuetify:rtl');
export function createRtl(localeScope, options) {
  var _options$rtl, _options$defaultRtl;

  return createRtlScope({
    rtl: { ...rtl,
      ...((_options$rtl = options == null ? void 0 : options.rtl) != null ? _options$rtl : {})
    },
    isRtl: ref((_options$defaultRtl = options == null ? void 0 : options.defaultRtl) != null ? _options$defaultRtl : false),
    rtlClasses: ref('')
  }, localeScope);
}
export function createRtlScope(currentScope, localeScope, options) {
  const isRtl = computed(() => {
    if (typeof (options == null ? void 0 : options.rtl) === 'boolean') return options.rtl;

    if (localeScope.current.value && currentScope.rtl.hasOwnProperty(localeScope.current.value)) {
      return currentScope.rtl[localeScope.current.value];
    }

    return currentScope.isRtl.value;
  });
  return {
    isRtl,
    rtl: currentScope.rtl,
    rtlClasses: computed(() => `v-locale--is-${isRtl.value ? 'rtl' : 'ltr'}`)
  };
}
export function provideRtl(props, localeScope) {
  const currentScope = inject(RtlSymbol);
  if (!currentScope) throw new Error('[Vuetify] Could not find injected rtl instance');
  const newScope = createRtlScope(currentScope, localeScope, props);
  provide(RtlSymbol, newScope);
  return newScope;
}
export function useRtl() {
  const currentScope = inject(RtlSymbol);
  if (!currentScope) throw new Error('[Vuetify] Could not find injected rtl instance');
  return currentScope;
}
//# sourceMappingURL=rtl.mjs.map