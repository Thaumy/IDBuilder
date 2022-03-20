// Composables
import { useHydration } from "../../composables/hydration.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
import { ref } from 'vue';
export const VNoSsr = defineComponent({
  name: 'VNoSsr',

  setup(_, _ref) {
    let {
      slots
    } = _ref;
    const show = ref(false);
    useHydration(() => show.value = true);
    return () => {
      var _slots$default;

      return show.value && ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
    };
  }

});
//# sourceMappingURL=VNoSsr.mjs.map