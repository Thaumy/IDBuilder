import { createVNode as _createVNode } from "vue";
// Components
import { VBtn } from "../VBtn/index.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VAppBarNavIcon = defineComponent({
  name: 'VAppBarNavIcon',
  props: {
    icon: {
      type: String,
      default: '$menu'
    }
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      var _slots$default;

      return _createVNode(VBtn, {
        "class": "v-app-bar-nav-icon",
        "icon": props.icon
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      }, 8, ["icon"]);
    };
  }

});
//# sourceMappingURL=VAppBarNavIcon.mjs.map