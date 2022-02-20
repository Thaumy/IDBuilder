import { createVNode as _createVNode } from "vue";
// Styles
import "./VThemeProvider.css"; // Composables

import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { makeTagProps } from "../../composables/tag.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VThemeProvider = defineComponent({
  name: 'VThemeProvider',
  props: {
    withBackground: Boolean,
    ...makeThemeProps(),
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme(props);
    return () => {
      var _slots$default, _slots$default2;

      if (!props.withBackground) return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots);
      return _createVNode(props.tag, {
        "class": ['v-theme-provider', themeClasses.value]
      }, {
        default: () => [(_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)]
      }, 8, ["class"]);
    };
  }

});
//# sourceMappingURL=VThemeProvider.mjs.map