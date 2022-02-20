import { createVNode as _createVNode } from "vue";
// Styles
import "./VItemGroup.css"; // Composables

import { makeGroupProps, useGroup } from "../../composables/group.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VItemGroupSymbol = Symbol.for('vuetify:v-item-group');
export const VItemGroup = defineComponent({
  name: 'VItemGroup',
  props: { ...makeGroupProps({
      selectedClass: 'v-item--selected'
    }),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme(props);
    const {
      isSelected,
      select,
      next,
      prev,
      selected
    } = useGroup(props, VItemGroupSymbol);
    return () => {
      var _slots$default;

      return _createVNode(props.tag, {
        "class": ['v-item-group', themeClasses.value]
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
          isSelected,
          select,
          next,
          prev,
          selected: selected.value
        })]
      }, 8, ["class"]);
    };
  }

});
//# sourceMappingURL=VItemGroup.mjs.map