// @ts-nocheck

/* eslint-disable */
// Extensions
import { BaseItem } from "../VItemGroup/VItem.mjs"; // Mixins

import { factory as GroupableFactory } from "../../mixins/groupable.mjs";
import mixins from "../../util/mixins.mjs";
export default mixins(BaseItem, GroupableFactory('slideGroup')
/* @vue/component */
).extend({
  name: 'v-slide-item'
});
//# sourceMappingURL=VSlideItem.mjs.map