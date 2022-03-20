import { resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Components
import { VTimelineSymbol } from "./shared.mjs";
import { VTimelineDivider } from "./VTimelineDivider.mjs"; // Composables

import { makeTagProps } from "../../composables/tag.mjs";
import { makeSizeProps } from "../../composables/size.mjs";
import { makeElevationProps } from "../../composables/elevation.mjs";
import { makeRoundedProps } from "../../composables/rounded.mjs"; // Utilities

import { inject, ref, watch } from 'vue';
import { convertToUnit, defineComponent } from "../../util/index.mjs";
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
export const VTimelineItem = defineComponent({
  name: 'VTimelineItem',
  props: {
    dotColor: String,
    fillDot: Boolean,
    hideDot: Boolean,
    hideOpposite: {
      type: Boolean,
      default: undefined
    },
    icon: String,
    iconColor: String,
    ...makeRoundedProps(),
    ...makeElevationProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeDimensionProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const timeline = inject(VTimelineSymbol);
    if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider');
    const {
      dimensionStyles
    } = useDimension(props);
    const dotSize = ref(0);
    const dotRef = ref();
    watch(dotRef, newValue => {
      var _newValue$$el$querySe, _newValue$$el$querySe2;

      if (!newValue) return;
      dotSize.value = (_newValue$$el$querySe = (_newValue$$el$querySe2 = newValue.$el.querySelector('.v-timeline-divider__dot')) == null ? void 0 : _newValue$$el$querySe2.getBoundingClientRect().width) != null ? _newValue$$el$querySe : 0;
    }, {
      flush: 'post'
    });
    return () => {
      var _slots$default, _slots$opposite;

      return _createVNode("div", {
        "class": ['v-timeline-item', {
          'v-timeline-item--fill-dot': props.fillDot
        }],
        "style": {
          '--v-timeline-dot-size': convertToUnit(dotSize.value)
        }
      }, [_createVNode("div", {
        "class": "v-timeline-item__body",
        "style": dimensionStyles.value
      }, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)], 4), _createVNode(VTimelineDivider, {
        "ref": dotRef,
        "hideDot": props.hideDot,
        "icon": props.icon,
        "iconColor": props.iconColor,
        "size": props.size,
        "elevation": props.elevation,
        "dotColor": props.dotColor,
        "fillDot": props.fillDot,
        "rounded": props.rounded
      }, {
        default: slots.icon
      }, 8, ["hideDot", "icon", "iconColor", "size", "elevation", "dotColor", "fillDot", "rounded"]), timeline.density.value !== 'compact' && _createVNode("div", {
        "class": "v-timeline-item__opposite"
      }, [!props.hideOpposite && ((_slots$opposite = slots.opposite) == null ? void 0 : _slots$opposite.call(slots))])], 6);
    };
  }

});
//# sourceMappingURL=VTimelineItem.mjs.map