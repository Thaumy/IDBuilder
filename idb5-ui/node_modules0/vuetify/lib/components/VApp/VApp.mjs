import { createVNode as _createVNode } from "vue";
// Styles
import "./VApp.css"; // Composables

import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { createLayout, makeLayoutProps } from "../../composables/layout.mjs"; // Utilities

import { defineComponent, useRender } from "../../util/index.mjs";
import { useRtl } from "../../composables/rtl.mjs";
export const VApp = defineComponent({
  name: 'VApp',
  props: { ...makeLayoutProps({
      fullHeight: true
    }),
    ...makeThemeProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme(props);
    const {
      layoutClasses,
      getLayoutItem,
      items
    } = createLayout(props);
    const {
      rtlClasses
    } = useRtl();
    useRender(() => {
      var _slots$default;

      return _createVNode("div", {
        "class": ['v-application', themeClasses.value, layoutClasses.value, rtlClasses.value],
        "data-app": "true"
      }, [_createVNode("div", {
        "class": "v-application__wrap"
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])], 2);
    });
    return {
      getLayoutItem,
      items
    };
  }

});
//# sourceMappingURL=VApp.mjs.map