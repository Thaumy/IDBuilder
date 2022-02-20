import { createVNode as _createVNode } from "vue";
import "./VBtnGroup.css";
import { defineComponent } from "../../util/index.mjs";
export const VBtnGroup = defineComponent({
  name: 'VBtnGroup',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      var _slots$default;

      return _createVNode(props.tag, {
        "class": "v-btn-group"
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      });
    };
  }

});
//# sourceMappingURL=VBtnGroup.mjs.map