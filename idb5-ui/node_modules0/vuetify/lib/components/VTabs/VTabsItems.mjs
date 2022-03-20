// @ts-nocheck

/* eslint-disable */
// Extensions
import VWindow from "../VWindow/VWindow.mjs"; // Types & Components

import { BaseItemGroup } from "./../VItemGroup/VItemGroup.mjs";
/* @vue/component */

export default VWindow.extend({
  name: 'v-tabs-items',
  props: {
    mandatory: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return { ...VWindow.options.computed.classes.call(this),
        'v-tabs-items': true
      };
    },

    isDark() {
      return this.rootIsDark;
    }

  },
  methods: {
    getValue(item, i) {
      return item.id || BaseItemGroup.options.methods.getValue.call(this, item, i);
    }

  }
});
//# sourceMappingURL=VTabsItems.mjs.map