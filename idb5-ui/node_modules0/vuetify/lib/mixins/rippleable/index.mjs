// @ts-nocheck

/* eslint-disable */
// Directives
import ripple from "../../directives/ripple/index.mjs"; // Types

import Vue from 'vue';
export default Vue.extend({
  name: 'rippleable',
  directives: {
    ripple
  },
  props: {
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },
  methods: {
    genRipple() {
      let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (!this.ripple) return null;
      data.staticClass = 'v-input--selection-controls__ripple';
      data.directives = data.directives || [];
      data.directives.push({
        name: 'ripple',
        value: {
          center: true
        }
      });
      return this.$createElement('div', data);
    }

  }
});
//# sourceMappingURL=index.mjs.map