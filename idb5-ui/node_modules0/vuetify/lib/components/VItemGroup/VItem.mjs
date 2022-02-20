// Composables
import { makeGroupItemProps, useGroupItem } from "../../composables/group.mjs";
import { VItemGroupSymbol } from "./VItemGroup.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VItem = defineComponent({
  name: 'VItem',
  props: makeGroupItemProps(),

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isSelected,
      select,
      toggle,
      selectedClass,
      value,
      disabled
    } = useGroupItem(props, VItemGroupSymbol);
    return () => {
      var _slots$default;

      return (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, {
        isSelected: isSelected.value,
        selectedClass: selectedClass.value,
        select,
        toggle,
        value: value.value,
        disabled: disabled.value
      });
    };
  }

});
//# sourceMappingURL=VItem.mjs.map