import { createVNode as _createVNode } from "vue";
// Styles
import "./VProgressCircular.css"; // Composables

import { makeSizeProps, useSize } from "../../composables/size.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { useIntersectionObserver } from "../../composables/intersectionObserver.mjs";
import { useTextColor } from "../../composables/color.mjs"; // Utilities

import { computed, toRef } from 'vue';
import { convertToUnit, defineComponent } from "../../util/index.mjs"; // Types

export const VProgressCircular = defineComponent({
  name: 'VProgressCircular',
  props: {
    bgColor: String,
    color: String,
    indeterminate: [Boolean, String],
    modelValue: {
      type: [Number, String],
      default: 0
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: [Number, String],
      default: 4
    },
    ...makeSizeProps(),
    ...makeTagProps({
      tag: 'div'
    }),
    ...makeThemeProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const MAGIC_RADIUS_CONSTANT = 20;
    const CIRCUMFERENCE = 2 * Math.PI * MAGIC_RADIUS_CONSTANT;
    const {
      themeClasses
    } = useTheme(props);
    const {
      sizeClasses,
      sizeStyles
    } = useSize(props, 'v-progress-circular');
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, 'color'));
    const {
      textColorClasses: underlayColorClasses,
      textColorStyles: underlayColorStyles
    } = useTextColor(toRef(props, 'bgColor'));
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    const normalizedValue = computed(() => Math.max(0, Math.min(100, parseFloat(props.modelValue))));
    const width = computed(() => Number(props.width));
    const size = computed(() => {
      // Get size from element if size prop value is small, large etc
      return sizeStyles.value ? Number(props.size) : intersectionRef.value ? intersectionRef.value.getBoundingClientRect().width : Math.max(width.value, 32);
    });
    const diameter = computed(() => MAGIC_RADIUS_CONSTANT / (1 - width.value / size.value) * 2);
    const strokeWidth = computed(() => width.value / size.value * diameter.value);
    const strokeDashOffset = computed(() => convertToUnit((100 - normalizedValue.value) / 100 * CIRCUMFERENCE));
    return () => _createVNode(props.tag, {
      "ref": intersectionRef,
      "class": ['v-progress-circular', {
        'v-progress-circular--indeterminate': !!props.indeterminate,
        'v-progress-circular--visible': isIntersecting.value,
        'v-progress-circular--disable-shrink': props.indeterminate === 'disable-shrink'
      }, themeClasses.value, sizeClasses.value, textColorClasses.value],
      "style": [sizeStyles.value, textColorStyles.value],
      "role": "progressbar",
      "aria-valuemin": "0",
      "aria-valuemax": "100",
      "aria-valuenow": props.indeterminate ? undefined : normalizedValue.value
    }, {
      default: () => [_createVNode("svg", {
        "style": {
          transform: `rotate(calc(-90deg + ${Number(props.rotate)}deg))`
        },
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": `0 0 ${diameter.value} ${diameter.value}`
      }, [_createVNode("circle", {
        "class": ['v-progress-circular__underlay', underlayColorClasses.value],
        "style": underlayColorStyles.value,
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": 0
      }, null, 14, ["r", "stroke-width", "stroke-dasharray"]), _createVNode("circle", {
        "class": "v-progress-circular__overlay",
        "fill": "transparent",
        "cx": "50%",
        "cy": "50%",
        "r": MAGIC_RADIUS_CONSTANT,
        "stroke-width": strokeWidth.value,
        "stroke-dasharray": CIRCUMFERENCE,
        "stroke-dashoffset": strokeDashOffset.value
      }, null, 8, ["r", "stroke-width", "stroke-dasharray", "stroke-dashoffset"])]), slots.default && _createVNode("div", {
        "class": "v-progress-circular__content"
      }, [slots.default({
        value: normalizedValue.value
      })])],
      _: 1
    }, 8, ["class", "style", "aria-valuenow"]);
  }

});
//# sourceMappingURL=VProgressCircular.mjs.map