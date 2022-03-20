import { createTextVNode as _createTextVNode, createVNode as _createVNode, Fragment as _Fragment } from "vue";
// Styles
import "./VRating.css"; // Components

import { VBtn } from "../VBtn/index.mjs"; // Composables

import { makeDensityProps } from "../../composables/density.mjs";
import { makeSizeProps } from "../../composables/size.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { useLocale } from "../../composables/locale.mjs"; // Utilities

import { computed, ref } from 'vue';
import { createRange, defineComponent, getUid } from "../../util/index.mjs"; // Types

export const VRating = defineComponent({
  name: 'VRating',
  props: {
    name: String,
    itemAriaLabel: {
      type: String,
      default: '$vuetify.rating.ariaLabel.item'
    },
    activeColor: String,
    color: String,
    clearable: Boolean,
    disabled: Boolean,
    emptyIcon: {
      type: String,
      default: '$ratingEmpty'
    },
    fullIcon: {
      type: String,
      default: '$ratingFull'
    },
    halfIncrements: Boolean,
    hover: Boolean,
    length: {
      type: [Number, String],
      default: 5
    },
    readonly: Boolean,
    modelValue: {
      type: Number,
      default: 0
    },
    itemLabels: Array,
    itemLabelPosition: {
      type: String,
      default: 'top',
      validator: v => ['top', 'bottom'].includes(v)
    },
    ripple: Boolean,
    ...makeDensityProps(),
    ...makeSizeProps(),
    ...makeTagProps(),
    ...makeThemeProps()
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      themeClasses
    } = useTheme(props);
    const rating = useProxiedModel(props, 'modelValue');
    const range = computed(() => createRange(Number(props.length), 1));
    const increments = computed(() => range.value.flatMap(v => props.halfIncrements ? [v - 0.5, v] : [v]));
    const hoverIndex = ref(-1);
    const focusIndex = ref(-1);
    const firstRef = ref();
    let isClicking = false;
    const itemState = computed(() => increments.value.map(value => {
      var _props$activeColor;

      const isHovering = props.hover && hoverIndex.value > -1;
      const isFilled = rating.value >= value;
      const isHovered = hoverIndex.value >= value;
      const isFullIcon = isHovering ? isHovered : isFilled;
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
      const activeColor = (_props$activeColor = props.activeColor) != null ? _props$activeColor : props.color;
      const color = isFilled || isHovered ? activeColor : props.color;
      return {
        isFilled,
        isHovered,
        icon,
        color
      };
    }));
    const eventState = computed(() => [0, ...increments.value].map(value => {
      function onMouseenter() {
        hoverIndex.value = value;
      }

      function onMouseleave() {
        hoverIndex.value = -1;
      }

      function onFocus() {
        if (value === 0 && rating.value === 0) {
          var _firstRef$value;

          (_firstRef$value = firstRef.value) == null ? void 0 : _firstRef$value.focus();
        } else {
          focusIndex.value = value;
        }
      }

      function onBlur() {
        if (!isClicking) focusIndex.value = -1;
      }

      function onClick() {
        if (props.disabled || props.readonly) return;
        rating.value = rating.value === value && props.clearable ? 0 : value;
      }

      return {
        onMouseenter: props.hover ? onMouseenter : undefined,
        onMouseleave: props.hover ? onMouseleave : undefined,
        onFocus,
        onBlur,
        onClick
      };
    }));

    function onMousedown() {
      isClicking = true;
    }

    function onMouseup() {
      isClicking = false;
    }

    const name = computed(() => {
      var _props$name;

      return (_props$name = props.name) != null ? _props$name : `v-rating-${getUid()}`;
    });

    function VRatingItem(_ref2) {
      var _itemState$value$inde, _itemState$value$inde2;

      let {
        value,
        index,
        showStar = true
      } = _ref2;
      const {
        onMouseenter,
        onMouseleave,
        onFocus,
        onBlur,
        onClick
      } = eventState.value[index + 1];
      const id = `${name.value}-${String(value).replace('.', '-')}`;
      const btnProps = {
        color: (_itemState$value$inde = itemState.value[index]) == null ? void 0 : _itemState$value$inde.color,
        density: props.density,
        disabled: props.disabled,
        icon: (_itemState$value$inde2 = itemState.value[index]) == null ? void 0 : _itemState$value$inde2.icon,
        ripple: props.ripple,
        size: props.size,
        tag: 'span',
        variant: 'plain'
      };
      return _createVNode(_Fragment, null, [_createVNode("label", {
        "for": id,
        "class": {
          'v-rating__item--half': props.halfIncrements && value % 1 > 0,
          'v-rating__item--full': props.halfIncrements && value % 1 === 0
        },
        "onMousedown": onMousedown,
        "onMouseup": onMouseup,
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave
      }, [_createVNode("span", {
        "class": "v-rating__hidden"
      }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? undefined : slots.item ? slots.item({ ...itemState.value,
        props: btnProps,
        value,
        index
      }) : _createVNode(VBtn, btnProps, null, 16)], 42, ["for", "onMousedown", "onMouseup", "onMouseenter", "onMouseleave"]), _createVNode("input", {
        "class": "v-rating__hidden",
        "name": name.value,
        "id": id,
        "type": "radio",
        "value": value,
        "checked": rating.value === value,
        "onClick": onClick,
        "onFocus": onFocus,
        "onBlur": onBlur,
        "ref": index === 0 ? firstRef : undefined,
        "readonly": props.readonly,
        "disabled": props.disabled
      }, null, 40, ["name", "id", "value", "checked", "onClick", "onFocus", "onBlur", "readonly", "disabled"])]);
    }

    return () => {
      var _props$itemLabels;

      const hasLabels = !!((_props$itemLabels = props.itemLabels) != null && _props$itemLabels.length);
      return _createVNode(props.tag, {
        "class": ['v-rating', {
          'v-rating--hover': props.hover,
          'v-rating--readonly': props.readonly
        }, themeClasses.value]
      }, {
        default: () => [_createVNode(VRatingItem, {
          "value": 0,
          "index": -1,
          "showStar": false
        }, null, 8, ["index"]), range.value.map((value, i) => {
          var _props$itemLabels2, _props$itemLabels3;

          return _createVNode("div", {
            "class": "v-rating__wrapper"
          }, [!hasLabels ? undefined : slots['item-label'] ? slots['item-label']() : (_props$itemLabels2 = props.itemLabels) != null && _props$itemLabels2[i] ? _createVNode("span", null, [(_props$itemLabels3 = props.itemLabels) == null ? void 0 : _props$itemLabels3[i]]) : _createVNode("span", null, [_createTextVNode("\xA0")]), _createVNode("div", {
            "class": ['v-rating__item', {
              'v-rating__item--focused': Math.ceil(focusIndex.value) === value
            }]
          }, [props.halfIncrements ? _createVNode(_Fragment, null, [_createVNode(VRatingItem, {
            "value": value - 0.5,
            "index": i * 2
          }, null, 8, ["value", "index"]), _createVNode(VRatingItem, {
            "value": value,
            "index": i * 2 + 1
          }, null, 8, ["value", "index"])]) : _createVNode(VRatingItem, {
            "value": value,
            "index": i
          }, null, 8, ["value", "index"])], 2)]);
        })],
        _: 1
      }, 8, ["class"]);
    };
  }

});
//# sourceMappingURL=VRating.mjs.map