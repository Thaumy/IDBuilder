// @ts-nocheck

/* eslint-disable */
// Styles
import "./VColorPickerSwatches.css"; // Components

import VIcon from "../VIcon/index.mjs"; // Helpers

import colors from "../../util/colors.mjs";
import { fromHex, parseColor } from "./util/index.mjs";
import { convertToUnit, deepEqual } from "../../util/helpers.mjs";
import mixins from "../../util/mixins.mjs";
import Themeable from "../../mixins/themeable/index.mjs"; // Types

import { contrastRatio } from "../../util/colorUtils.mjs";

function parseDefaultColors(colors) {
  return Object.keys(colors).map(key => {
    const color = colors[key];
    return color.base ? [color.base, color.darken4, color.darken3, color.darken2, color.darken1, color.lighten1, color.lighten2, color.lighten3, color.lighten4, color.lighten5] : [color.black, color.white, color.transparent];
  });
}

const white = fromHex('#FFFFFF').rgba;
const black = fromHex('#000000').rgba;
export default mixins(Themeable).extend({
  name: 'v-color-picker-swatches',
  props: {
    swatches: {
      type: Array,
      default: () => parseDefaultColors(colors)
    },
    disabled: Boolean,
    color: Object,
    maxWidth: [Number, String],
    maxHeight: [Number, String]
  },
  methods: {
    genColor(color) {
      const content = this.$createElement('div', {
        style: {
          background: color
        }
      }, [deepEqual(this.color, parseColor(color, null)) && this.$createElement(VIcon, {
        props: {
          small: true,
          dark: contrastRatio(this.color.rgba, white) > 2 && this.color.alpha > 0.5,
          light: contrastRatio(this.color.rgba, black) > 2 && this.color.alpha > 0.5
        }
      }, '$success')]);
      return this.$createElement('div', {
        staticClass: 'v-color-picker__color',
        on: {
          // TODO: Less hacky way of catching transparent
          click: () => this.disabled || this.$emit('update:color', fromHex(color === 'transparent' ? '#00000000' : color))
        }
      }, [content]);
    },

    genSwatches() {
      return this.swatches.map(swatch => {
        const colors = swatch.map(this.genColor);
        return this.$createElement('div', {
          staticClass: 'v-color-picker__swatch'
        }, colors);
      });
    }

  },

  render(h) {
    return h('div', {
      staticClass: 'v-color-picker__swatches',
      style: {
        maxWidth: convertToUnit(this.maxWidth),
        maxHeight: convertToUnit(this.maxHeight)
      }
    }, [this.$createElement('div', this.genSwatches())]);
  }

});
//# sourceMappingURL=VColorPickerSwatches.mjs.map