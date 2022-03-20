import { resolveDirective as _resolveDirective, createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
// Components
import { VListGroup } from "./VListGroup.mjs";
import { VListItem } from "./VListItem.mjs"; // Utilities

import { genericComponent } from "../../util/index.mjs"; // Types

export const VListChildren = genericComponent()({
  name: 'VListChildren',
  props: {
    items: Array
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    return () => {
      var _slots$default, _slots$default2, _props$items;

      return (_slots$default = (_slots$default2 = slots.default) == null ? void 0 : _slots$default2.call(slots)) != null ? _slots$default : (_props$items = props.items) == null ? void 0 : _props$items.map(_ref2 => {
        let {
          children,
          ...item
        } = _ref2;
        const {
          value,
          ...rest
        } = item;
        return children ? _createVNode(VListGroup, {
          "value": value,
          "items": children
        }, { ...slots,
          header: headerProps => slots.header ? slots.header({ ...rest,
            ...headerProps
          }) : _createVNode(VListItem, _mergeProps(rest, headerProps), null, 16)
        }, 8, ["value", "items"]) : slots.item ? slots.item(item) : _createVNode(VListItem, item, slots, 16);
      });
    };
  }

});
//# sourceMappingURL=VListChildren.mjs.map