// Utilities
import { getCurrentInstance as _getCurrentInstance } from 'vue';
export function getCurrentInstance(name, message) {
  const vm = _getCurrentInstance();

  if (!vm) {
    throw new Error(`[Vuetify] ${name} ${message || 'must be called from inside a setup function'}`);
  }

  return vm;
}
//# sourceMappingURL=getCurrentInstance.mjs.map