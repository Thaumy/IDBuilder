import { createVNode as _createVNode } from "vue";
// Styles
import "./VLayoutItem.css"; // Composables

import { makeLayoutItemProps, useLayoutItem } from "../../composables/layout.mjs"; // Utilities

import { toRef } from 'vue';
import { defineComponent } from "../../util/index.mjs"; // Types

export const VLayoutItem = defineComponent({
  name: 'VLayoutItem',
  props: {
    position: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 300
    },
    modelValue: Boolean,
    ...makeLayoutItemProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const styles = useLayoutItem(props.name, toRef(props, 'priority'), toRef(props, 'position'), toRef(props, 'size'), toRef(props, 'size'), toRef(props, 'modelValue'));
    return () => {
      var _slots$default;

      return _createVNode("div", {
        "class": ['v-layout-item', {
          'v-layout-item--absolute': props.absolute
        }],
        "style": styles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 6);
    };
  }

});
//# sourceMappingURL=VLayoutItem.mjs.map