// @ts-nocheck

/* eslint-disable */
// Types
import Vue from 'vue';
// Utils
import { getObjectValueByPath, wrapInArray } from "../../util/helpers.mjs";

function needsTd(slot) {
  var _;

  return slot.length !== 1 || !['td', 'th'].includes((_ = slot[0]) == null ? void 0 : _.tag);
}

export default Vue.extend({
  name: 'row',
  functional: true,
  props: {
    headers: Array,
    index: Number,
    item: Object,
    rtl: Boolean
  },

  render(h, _ref) {
    let {
      props,
      slots,
      data
    } = _ref;
    const computedSlots = slots();
    const columns = props.headers.map(header => {
      const children = [];
      const value = getObjectValueByPath(props.item, header.value);
      const slotName = header.value;
      const scopedSlot = data.scopedSlots && data.scopedSlots[slotName];
      const regularSlot = computedSlots[slotName];

      if (scopedSlot) {
        children.push(...wrapInArray(scopedSlot({
          item: props.item,
          isMobile: false,
          header,
          index: props.index,
          value
        })));
      } else if (regularSlot) {
        children.push(...wrapInArray(regularSlot));
      } else {
        children.push(value == null ? value : String(value));
      }

      const textAlign = `text-${header.align || 'start'}`;
      return needsTd(children) ? h('td', {
        class: [textAlign, header.cellClass, {
          'v-data-table__divider': header.divider
        }]
      }, children) : children;
    });
    return h('tr', data, columns);
  }

});
//# sourceMappingURL=Row.mjs.map