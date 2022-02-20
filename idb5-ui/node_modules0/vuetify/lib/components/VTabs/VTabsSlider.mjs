// @ts-nocheck

/* eslint-disable */
// Mixins
import Colorable from "../../mixins/colorable/index.mjs"; // Utilities

import mixins from "../../util/mixins.mjs"; // Types

/* @vue/component */
export default mixins(Colorable).extend({
  name: 'v-tabs-slider',

  render(h) {
    return h('div', this.setBackgroundColor(this.color, {
      staticClass: 'v-tabs-slider'
    }));
  }

});
//# sourceMappingURL=VTabsSlider.mjs.map