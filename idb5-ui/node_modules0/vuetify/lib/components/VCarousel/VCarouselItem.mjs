// @ts-nocheck

/* eslint-disable */
// Extensions
import VWindowItem from "../VWindow/VWindowItem.mjs"; // Components

import { VImg } from "../VImg/index.mjs"; // Utilities

import mixins from "../../util/mixins.mjs";
import { getSlot } from "../../util/helpers.mjs";
import Routable from "../../mixins/routable.mjs"; // Types

const baseMixins = mixins(VWindowItem, Routable);

/* @vue/component */
export default baseMixins.extend().extend({
  name: 'v-carousel-item',
  inject: {
    parentTheme: {
      default: {
        isDark: false
      }
    }
  },

  // pass down the parent's theme
  provide() {
    return {
      theme: this.parentTheme
    };
  },

  inheritAttrs: false,
  methods: {
    genDefaultSlot() {
      return [this.$createElement(VImg, {
        staticClass: 'v-carousel__item',
        props: { ...this.$attrs,
          height: this.windowGroup.internalHeight
        },
        on: this.$listeners,
        scopedSlots: {
          placeholder: this.$scopedSlots.placeholder
        }
      }, getSlot(this))];
    },

    genWindowItem() {
      const {
        tag,
        data
      } = this.generateRouteLink();
      data.staticClass = 'v-window-item';
      data.directives.push({
        name: 'show',
        value: this.isActive
      });
      return this.$createElement(tag, data, this.genDefaultSlot());
    }

  }
});
//# sourceMappingURL=VCarouselItem.mjs.map