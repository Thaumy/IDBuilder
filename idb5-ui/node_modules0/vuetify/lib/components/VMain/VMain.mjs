import { createVNode as _createVNode } from "vue";
// Styles
import "./VMain.css"; // Composables

import { makeTagProps } from "../../composables/tag.mjs";
import { useLayout } from "../../composables/layout.mjs";
import { useSsrBoot } from "../../composables/ssrBoot.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VMain = defineComponent({
  name: 'VMain',
  props: makeTagProps({
    tag: 'main'
  }),

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      mainStyles
    } = useLayout();
    const {
      ssrBootStyles
    } = useSsrBoot();
    return () => {
      var _slots$default;

      return _createVNode(props.tag, {
        "class": "v-main",
        "style": [mainStyles.value, ssrBootStyles.value]
      }, {
        default: () => [_createVNode("div", {
          "class": "v-main__wrap"
        }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])]
      }, 8, ["style"]);
    };
  }

});
//# sourceMappingURL=VMain.mjs.map