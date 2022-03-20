import { withDirectives as _withDirectives, mergeProps as _mergeProps, vShow as _vShow, createVNode as _createVNode } from "vue";
// Styles
import "./VBadge.css"; // Components

import { VIcon } from "../VIcon/index.mjs"; // Composables

import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeTransitionProps, MaybeTransition } from "../../composables/transition.mjs";
import { useBackgroundColor, useTextColor } from "../../composables/color.mjs"; // Utilities

import { computed, toRef } from 'vue';
import { convertToUnit, defineComponent, pick } from "../../util/index.mjs";
export const VBadge = defineComponent({
  name: 'VBadge',
  inheritAttrs: false,
  props: {
    bordered: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    content: String,
    dot: Boolean,
    floating: Boolean,
    icon: String,
    inline: Boolean,
    label: {
      type: String,
      default: '$vuetify.badge'
    },
    location: {
      type: String,
      default: 'top-right',
      validator: value => {
        const [vertical, horizontal] = (value != null ? value : '').split('-');
        return ['top', 'bottom'].includes(vertical) && ['left', 'right'].includes(horizontal);
      }
    },
    max: [Number, String],
    modelValue: {
      type: Boolean,
      default: true
    },
    offsetX: [Number, String],
    offsetY: [Number, String],
    textColor: String,
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeTransitionProps({
      transition: 'scale-rotate-transition'
    })
  },

  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'color'));
    const {
      roundedClasses
    } = useRounded(props, 'v-badge');
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, 'textColor'));
    const position = computed(() => {
      return props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
    });

    function calculatePosition(offset) {
      return `calc(100% - ${convertToUnit(position.value + parseInt(offset != null ? offset : 0, 10))})`;
    }

    const locationStyles = computed(() => {
      var _props$location;

      const [vertical, horizontal] = ((_props$location = props.location) != null ? _props$location : '').split('-'); // TODO: RTL support

      const styles = {
        bottom: 'auto',
        left: 'auto',
        right: 'auto',
        top: 'auto'
      };

      if (!props.inline) {
        styles[horizontal === 'left' ? 'right' : 'left'] = calculatePosition(props.offsetX);
        styles[vertical === 'top' ? 'bottom' : 'top'] = calculatePosition(props.offsetY);
      }

      return styles;
    });
    return () => {
      var _ctx$slots$default, _ctx$slots, _ctx$slots$badge, _ctx$slots2;

      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= props.max ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pick(ctx.attrs, ['aria-atomic', 'aria-label', 'aria-live', 'role', 'title']);
      return _createVNode(props.tag, _mergeProps({
        "class": ['v-badge', {
          'v-badge--bordered': props.bordered,
          'v-badge--dot': props.dot,
          'v-badge--floating': props.floating,
          'v-badge--inline': props.inline
        }]
      }, attrs), {
        default: () => [_createVNode("div", {
          "class": "v-badge__wrapper"
        }, [(_ctx$slots$default = (_ctx$slots = ctx.slots).default) == null ? void 0 : _ctx$slots$default.call(_ctx$slots), _createVNode(MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [_withDirectives(_createVNode("span", _mergeProps({
            "class": ['v-badge__badge', backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
            "style": [backgroundColorStyles.value, locationStyles.value, textColorStyles.value],
            "aria-atomic": "true",
            "aria-label": "locale string here",
            "aria-live": "polite",
            "role": "status"
          }, badgeAttrs), [props.dot ? undefined : ctx.slots.badge ? (_ctx$slots$badge = (_ctx$slots2 = ctx.slots).badge) == null ? void 0 : _ctx$slots$badge.call(_ctx$slots2) : props.icon ? _createVNode(VIcon, {
            "icon": props.icon
          }, null, 8, ["icon"]) : _createVNode("span", {
            "class": "v-badge__content"
          }, [content])], 16), [[_vShow, props.modelValue]])]
        }, 8, ["transition"])])]
      }, 16, ["class"]);
    };
  }

});
//# sourceMappingURL=VBadge.mjs.map