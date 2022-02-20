import { createVNode as _createVNode } from "vue";
// Components
import { VIcon } from "../VIcon/index.mjs";
import { VTimelineSymbol } from "./shared.mjs"; // Composables

import { useBackgroundColor } from "../../composables/color.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeSizeProps, useSize } from "../../composables/size.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs"; // Utilities

import { defineComponent, inject, toRef } from 'vue';
export const VTimelineDivider = defineComponent({
  name: 'VTimelineDivider',
  props: {
    hideDot: Boolean,
    lineColor: String,
    icon: String,
    iconColor: String,
    fillDot: Boolean,
    dotColor: String,
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeElevationProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const timeline = inject(VTimelineSymbol);
    if (!timeline) throw new Error('[Vuetify] Could not find v-timeline provider');
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props, 'v-timeline-divider__dot');
    const {
      backgroundColorStyles,
      backgroundColorClasses
    } = useBackgroundColor(toRef(props, 'dotColor'));
    const {
      backgroundColorStyles: lineColorStyles,
      backgroundColorClasses: lineColorClasses
    } = useBackgroundColor(timeline.lineColor);
    const {
      roundedClasses
    } = useRounded(props, 'v-timeline-divider__dot');
    const {
      elevationClasses
    } = useElevation(props);
    return () => _createVNode("div", {
      "class": ['v-timeline-divider', {
        'v-timeline-divider--fill-dot': props.fillDot
      }]
    }, [!props.hideDot && _createVNode("div", {
      "class": ['v-timeline-divider__dot', roundedClasses.value, sizeClasses.value, elevationClasses.value],
      "style": sizeStyles.value
    }, [_createVNode("div", {
      "class": ['v-timeline-divider__inner-dot', roundedClasses.value, backgroundColorClasses.value],
      "style": backgroundColorStyles.value
    }, [slots.default ? slots.default({
      icon: props.icon,
      iconColor: props.iconColor,
      size: props.size
    }) : props.icon ? _createVNode(VIcon, {
      "icon": props.icon,
      "color": props.iconColor,
      "size": props.size
    }, null, 8, ["icon", "color", "size"]) : undefined], 6)], 6), _createVNode("div", {
      "class": ['v-timeline-divider__line', lineColorClasses.value],
      "style": lineColorStyles.value
    }, null, 6)], 2);
  }

});
//# sourceMappingURL=VTimelineDivider.mjs.map