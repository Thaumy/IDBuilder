// @ts-nocheck

/* eslint-disable */
// Extensions
import { BaseItemGroup } from "../../components/VItemGroup/VItemGroup.mjs";
/* @vue/component */

export default BaseItemGroup.extend({
  name: 'button-group',

  provide() {
    return {
      btnToggle: this
    };
  },

  computed: {
    classes() {
      return BaseItemGroup.options.computed.classes.call(this);
    }

  },
  methods: {
    // Isn't being passed down through types
    genData: BaseItemGroup.options.methods.genData
  }
});
//# sourceMappingURL=index.mjs.map