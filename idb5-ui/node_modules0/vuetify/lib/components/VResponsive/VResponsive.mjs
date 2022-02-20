import { createVNode as _createVNode } from "vue";
// Styles
import "./VResponsive.css"; // Composables

import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs"; // Utilities

import { computed } from 'vue';
import { defineComponent } from "../../util/index.mjs";
export function useAspectStyles(props) {
  return {
    aspectStyles: computed(() => {
      const ratio = Number(props.aspectRatio);
      return ratio ? {
        paddingBottom: String(1 / ratio * 100) + '%'
      } : undefined;
    })
  };
}
export const VResponsive = defineComponent({
  name: 'VResponsive',
  props: {
    aspectRatio: [String, Number],
    contentClass: String,
    ...makeDimensionProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const {
      aspectStyles
    } = useAspectStyles(props);
    return () => {
      var _slots$additional;

      return _createVNode("div", {
        "class": "v-responsive",
        "style": dimensionStyles.value
      }, [_createVNode("div", {
        "class": "v-responsive__sizer",
        "style": aspectStyles.value
      }, null, 4), (_slots$additional = slots.additional) == null ? void 0 : _slots$additional.call(slots), slots.default && _createVNode("div", {
        "class": ['v-responsive__content', props.contentClass]
      }, [slots.default()], 2)], 4);
    };
  }

});
//# sourceMappingURL=VResponsive.mjs.map