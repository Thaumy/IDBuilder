import { computed, inject, provide, ref } from 'vue';
import { mergeDeep } from "../util/helpers.mjs";
export const DefaultsSymbol = Symbol.for('vuetify:defaults');
export function createDefaults(options) {
  return ref(options != null ? options : {});
}
export function useDefaults() {
  const defaults = inject(DefaultsSymbol);
  if (!defaults) throw new Error('[Vuetify] Could not find defaults instance');
  return defaults;
}
export function provideDefaults(props) {
  const defaults = useDefaults();
  const newDefaults = computed(() => mergeDeep(defaults.value, props == null ? void 0 : props.defaults));
  provide(DefaultsSymbol, newDefaults);
  return newDefaults;
}
//# sourceMappingURL=defaults.mjs.map