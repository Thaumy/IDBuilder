import { createVNode as _createVNode } from "vue";
// Styles
import "./VAlert.css"; // Components

import { VAvatar } from "../VAvatar/index.mjs";
import { VBtn } from "../VBtn/index.mjs"; // Composables

import { makeDensityProps, useDensity } from "../../composables/density.mjs";
import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makePositionProps, usePosition } from "../../composables/position.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { makeVariantProps, useVariant } from "../../composables/variant.mjs";
import { useBorder } from "../../composables/border.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs";
import { useTextColor } from "../../composables/color.mjs"; // Utilities

import { computed } from 'vue';
import { defineComponent } from "../../util/index.mjs"; // Types

const allowedTypes = ['success', 'info', 'warning', 'error'];
export const VAlert = defineComponent({
  name: 'VAlert',
  props: {
    border: {
      type: [Boolean, String],
      validator: val => {
        return typeof val === 'boolean' || ['top', 'end', 'bottom', 'start'].includes(val);
      }
    },
    borderColor: String,
    closable: Boolean,
    closeIcon: {
      type: String,
      default: '$close'
    },
    closeLabel: {
      type: String,
      default: '$vuetify.close'
    },
    icon: {
      type: [Boolean, String],
      default: null
    },
    modelValue: {
      type: Boolean,
      default: true
    },
    prominent: Boolean,
    sticky: Boolean,
    text: String,
    tip: Boolean,
    type: {
      type: String,
      validator: val => allowedTypes.includes(val)
    },
    ...makeDensityProps(),
    ...makeElevationProps(),
    ...makePositionProps(),
    ...makeRoundedProps(),
    ...makeTagProps(),
    ...makeThemeProps(),
    ...makeVariantProps()
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const borderProps = computed(() => ({
      border: props.border === true || props.tip ? 'start' : props.border
    }));
    const isActive = useProxiedModel(props, 'modelValue');
    const icon = computed(() => {
      var _props$icon;

      if (props.icon === false) return undefined;
      if (!props.type) return props.icon;
      return (_props$icon = props.icon) != null ? _props$icon : `$${props.type}`;
    });
    const variantProps = computed(() => {
      var _props$color;

      return {
        color: (_props$color = props.color) != null ? _props$color : props.type,
        textColor: props.textColor,
        variant: props.variant
      };
    });
    const {
      themeClasses
    } = useTheme(props);
    const {
      borderClasses
    } = useBorder(borderProps.value, 'v-alert');
    const {
      colorClasses,
      colorStyles,
      variantClasses
    } = useVariant(variantProps, 'v-alert');
    const {
      densityClasses
    } = useDensity(props, 'v-alert');
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses,
      positionStyles
    } = usePosition(props, 'v-alert');
    const {
      roundedClasses
    } = useRounded(props, 'v-alert');
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => {
      var _props$borderColor;

      return (_props$borderColor = props.borderColor) != null ? _props$borderColor : props.tip ? variantProps.value.color : undefined;
    }));

    function onCloseClick(e) {
      isActive.value = false;
    }

    return () => {
      const hasBorder = !!borderProps.value.border;
      const hasClose = !!(slots.close || props.closable);
      const hasPrepend = !!(slots.prepend || props.icon || props.type);
      const hasText = !!(slots.default || props.text || hasClose);
      return isActive.value && _createVNode(props.tag, {
        "class": ['v-alert', {
          [`v-alert--border-${borderProps.value.border}`]: hasBorder,
          'v-alert--prominent': props.prominent,
          'v-alert--tip': props.tip
        }, themeClasses.value, borderClasses.value, !props.tip && colorClasses.value, densityClasses.value, elevationClasses.value, positionClasses.value, roundedClasses.value, variantClasses.value],
        "style": [!props.tip && colorStyles.value, positionStyles.value],
        "role": "alert"
      }, {
        default: () => [hasBorder && _createVNode("div", {
          "class": ['v-alert__border', textColorClasses.value],
          "style": textColorStyles.value
        }, null, 6), _createVNode("div", {
          "class": "v-alert__underlay"
        }, null), _createVNode("div", {
          "class": "v-alert__content"
        }, [hasPrepend && _createVNode("div", {
          "class": "v-alert__avatar"
        }, [slots.prepend ? slots.prepend() : _createVNode(VAvatar, {
          "class": props.tip && textColorClasses.value,
          "style": props.tip && textColorStyles.value,
          "density": props.density,
          "icon": icon.value
        }, null, 8, ["class", "style", "density", "icon"])]), hasText && _createVNode("div", {
          "class": "v-alert__text"
        }, [slots.default ? slots.default() : props.text, hasClose && _createVNode("div", {
          "class": "v-alert__close"
        }, [slots.close ? slots.close({
          props: {
            onClick: onCloseClick
          }
        }) : _createVNode(VBtn, {
          "density": props.density,
          "icon": props.closeIcon,
          "variant": "text",
          "onClick": onCloseClick
        }, null, 8, ["density", "icon", "onClick"])])])])],
        _: 1
      }, 8, ["class", "style"]);
    };
  }

});
//# sourceMappingURL=VAlert.mjs.map