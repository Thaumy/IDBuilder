import { createVNode as _createVNode } from "vue";
import "./VLocaleProvider.css"; // Composables

import { provideLocale } from "../../composables/locale.mjs";
import { provideRtl } from "../../composables/rtl.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VLocaleProvider = defineComponent({
  name: 'VLocaleProvider',
  props: {
    locale: String,
    fallbackLocale: String,
    messages: Object,
    rtl: {
      type: Boolean,
      default: undefined
    }
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const localeInstance = provideLocale(props);
    const {
      rtlClasses
    } = provideRtl(props, localeInstance);
    return () => {
      var _slots$default;

      return _createVNode("div", {
        "class": ['v-locale-provider', rtlClasses.value]
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 2);
    };
  }

});
//# sourceMappingURL=VLocaleProvider.mjs.map