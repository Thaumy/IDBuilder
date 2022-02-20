// @ts-nocheck

/* eslint-disable */
// Styles
import "./VColorPicker.css"; // Components

import VSheet from "../VSheet/VSheet.mjs";
import VColorPickerPreview from "./VColorPickerPreview.mjs";
import VColorPickerCanvas from "./VColorPickerCanvas.mjs";
import VColorPickerEdit, { modes } from "./VColorPickerEdit.mjs";
import VColorPickerSwatches from "./VColorPickerSwatches.mjs"; // Helpers

import { parseColor, fromRGBA, extractColor, hasAlpha } from "./util/index.mjs";
import mixins from "../../util/mixins.mjs";
import { deepEqual } from "../../util/helpers.mjs"; // Mixins

import Elevatable from "../../mixins/elevatable/index.mjs";
import Themeable from "../../mixins/themeable/index.mjs"; // Types

export default mixins(Elevatable, Themeable).extend({
  name: 'v-color-picker',
  props: {
    canvasHeight: {
      type: [String, Number],
      default: 150
    },
    disabled: Boolean,
    dotSize: {
      type: [Number, String],
      default: 10
    },
    flat: Boolean,
    hideCanvas: Boolean,
    hideSliders: Boolean,
    hideInputs: Boolean,
    hideModeSwitch: Boolean,
    mode: {
      type: String,
      default: 'rgba',
      validator: v => Object.keys(modes).includes(v)
    },
    showSwatches: Boolean,
    swatches: Array,
    swatchesMaxHeight: {
      type: [Number, String],
      default: 150
    },
    value: {
      type: [Object, String]
    },
    width: {
      type: [Number, String],
      default: 300
    }
  },
  data: () => ({
    internalValue: fromRGBA({
      r: 255,
      g: 0,
      b: 0,
      a: 1
    })
  }),
  computed: {
    hideAlpha() {
      if (!this.value) return false;
      return !hasAlpha(this.value);
    }

  },
  watch: {
    value: {
      handler(color) {
        this.updateColor(parseColor(color, this.internalValue));
      },

      immediate: true
    }
  },
  methods: {
    updateColor(color) {
      this.internalValue = color;
      const value = extractColor(this.internalValue, this.value);

      if (!deepEqual(value, this.value)) {
        this.$emit('input', value);
        this.$emit('update:color', this.internalValue);
      }
    },

    genCanvas() {
      return this.$createElement(VColorPickerCanvas, {
        props: {
          color: this.internalValue,
          disabled: this.disabled,
          dotSize: this.dotSize,
          width: this.width,
          height: this.canvasHeight
        },
        on: {
          'update:color': this.updateColor
        }
      });
    },

    genControls() {
      return this.$createElement('div', {
        staticClass: 'v-color-picker__controls'
      }, [!this.hideSliders && this.genPreview(), !this.hideInputs && this.genEdit()]);
    },

    genEdit() {
      return this.$createElement(VColorPickerEdit, {
        props: {
          color: this.internalValue,
          disabled: this.disabled,
          hideAlpha: this.hideAlpha,
          hideModeSwitch: this.hideModeSwitch,
          mode: this.mode
        },
        on: {
          'update:color': this.updateColor,
          'update:mode': v => this.$emit('update:mode', v)
        }
      });
    },

    genPreview() {
      return this.$createElement(VColorPickerPreview, {
        props: {
          color: this.internalValue,
          disabled: this.disabled,
          hideAlpha: this.hideAlpha
        },
        on: {
          'update:color': this.updateColor
        }
      });
    },

    genSwatches() {
      return this.$createElement(VColorPickerSwatches, {
        props: {
          dark: this.dark,
          light: this.light,
          disabled: this.disabled,
          swatches: this.swatches,
          color: this.internalValue,
          maxHeight: this.swatchesMaxHeight
        },
        on: {
          'update:color': this.updateColor
        }
      });
    }

  },

  render(h) {
    return h(VSheet, {
      staticClass: 'v-color-picker',
      class: {
        'v-color-picker--flat': this.flat,
        ...this.themeClasses,
        ...this.elevationClasses
      },
      props: {
        maxWidth: this.width
      }
    }, [!this.hideCanvas && this.genCanvas(), (!this.hideSliders || !this.hideInputs) && this.genControls(), this.showSwatches && this.genSwatches()]);
  }

});
//# sourceMappingURL=VColorPicker.mjs.map