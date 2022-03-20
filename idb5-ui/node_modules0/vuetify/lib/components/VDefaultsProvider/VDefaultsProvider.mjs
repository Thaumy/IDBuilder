import { provideDefaults } from "../../composables/defaults.mjs";
import { defineComponent } from 'vue';
export const VDefaultsProvider = defineComponent({
  name: 'VDefaultsProvider',
  props: {
    defaults: Object
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    provideDefaults(props);
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
    };
  }

});
//# sourceMappingURL=VDefaultsProvider.mjs.map