import { createVNode as _createVNode } from "vue";
// Styles
import "./VAppBarTitle.css"; // Composables

import { makeTagProps } from "../../composables/tag.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VAppBarTitle = defineComponent({
  name: 'VAppBarTitle',
  props: { ...makeTagProps({
      tag: 'header'
    })
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => _createVNode(props.tag, {
      "class": "v-app-bar-title"
    }, {
      default: () => [slots.default && _createVNode("div", {
        "class": "v-app-bar-title__placeholder"
      }, [slots.default()])]
    });
  }

});
//# sourceMappingURL=VAppBarTitle.mjs.map