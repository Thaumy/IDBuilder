import { createVNode as _createVNode } from "vue";
// Styles
import "./VTimeline.css"; // Components

import { VTimelineItem } from "./VTimelineItem.mjs"; // Composables

import { makeTagProps } from "../../composables/tag.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs"; // Helpers

import { computed, provide, toRef } from 'vue';
import { convertToUnit, defineComponent } from "../../util/index.mjs";
import { VTimelineSymbol } from "./shared.mjs"; // Types

export const VTimeline = defineComponent({
  name: 'VTimeline',
  props: {
    direction: {
      type: String,
      default: 'vertical',
      validator: v => ['vertical', 'horizontal'].includes(v)
    },
    side: {
      type: String,
      validator: v => v == null || ['start', 'end'].includes(v)
    },
    lineInset: {
      type: [String, Number],
      default: 0
    },
    lineThickness: {
      type: [String, Number],
      default: 2
    },
    lineColor: String,
    truncateLine: {
      type: String,
      default: 'start',
      validator: v => ['none', 'start', 'end', 'both'].includes(v)
    },
    ...makeDensityProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme(props);
    const {
      densityClasses
    } = useDensity(props, 'v-timeline');
    provide(VTimelineSymbol, {
      density: toRef(props, 'density'),
      lineColor: toRef(props, 'lineColor')
    });
    const sideClass = computed(() => {
      const side = props.side ? props.side : props.density !== 'default' ? 'end' : null;
      return side && `v-timeline--side-${side}`;
    });
    return () => {
      var _slots$default;

      return _createVNode(props.tag, {
        "class": ['v-timeline', `v-timeline--${props.direction}`, {
          'v-timeline--inset-line': !!props.lineInset,
          'v-timeline--truncate-line-end': props.truncateLine === 'end' || props.truncateLine === 'both'
        }, themeClasses.value, densityClasses.value, sideClass.value],
        "style": {
          '--v-timeline-line-thickness': convertToUnit(props.lineThickness),
          '--v-timeline-line-inset': convertToUnit(props.lineInset || undefined)
        }
      }, {
        default: () => [(props.truncateLine === 'none' || props.truncateLine === 'end') && _createVNode(VTimelineItem, {
          "hideDot": true
        }, null, 8, ["hideDot"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

});
//# sourceMappingURL=VTimeline.mjs.map