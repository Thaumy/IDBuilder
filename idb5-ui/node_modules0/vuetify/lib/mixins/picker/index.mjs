// @ts-nocheck

/* eslint-disable */
// Components
import VPicker from "../../components/VPicker/index.mjs"; // Mixins

import Colorable from "../colorable/index.mjs";
import Elevatable from "../../mixins/elevatable/index.mjs";
import Themeable from "../themeable/index.mjs"; // Utils

import mixins from "../../util/mixins.mjs"; // Types

export default mixins(Colorable, Elevatable, Themeable
/* @vue/component */
).extend({
  name: 'picker',
  props: {
    flat: Boolean,
    fullWidth: Boolean,
    headerColor: String,
    landscape: Boolean,
    noTitle: Boolean,
    width: {
      type: [Number, String],
      default: 290
    }
  },
  methods: {
    genPickerTitle() {
      return null;
    },

    genPickerBody() {
      return null;
    },

    genPickerActionsSlot() {
      return this.$scopedSlots.default ? this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      }) : this.$slots.default;
    },

    genPicker(staticClass) {
      const children = [];

      if (!this.noTitle) {
        const title = this.genPickerTitle();
        title && children.push(title);
      }

      const body = this.genPickerBody();
      body && children.push(body);
      children.push(this.$createElement('template', {
        slot: 'actions'
      }, [this.genPickerActionsSlot()]));
      return this.$createElement(VPicker, {
        staticClass,
        props: {
          color: this.headerColor || this.color,
          dark: this.dark,
          elevation: this.elevation,
          flat: this.flat,
          fullWidth: this.fullWidth,
          landscape: this.landscape,
          light: this.light,
          width: this.width,
          noTitle: this.noTitle
        }
      }, children);
    }

  }
});
//# sourceMappingURL=index.mjs.map