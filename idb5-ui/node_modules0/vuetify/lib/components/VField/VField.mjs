import { mergeProps as _mergeProps, Fragment as _Fragment, withDirectives as _withDirectives, vShow as _vShow, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Styles
import "./VField.css"; // Components

import { filterInputProps, makeVInputProps, VInput } from "../VInput/VInput.mjs";
import { VExpandXTransition } from "../transitions/index.mjs";
import { VFieldLabel } from "./VFieldLabel.mjs";
import { VIcon } from "../VIcon/index.mjs"; // Composables

import { LoaderSlot, makeLoaderProps, useLoader } from "../../composables/loader.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { useBackgroundColor, useTextColor } from "../../composables/color.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utilities

import { computed, ref, toRef, watch, watchEffect } from 'vue';
import { convertToUnit, genericComponent, getUid, nullifyTransforms, pick, propsFactory, standardEasing, useRender } from "../../util/index.mjs"; // Types

const allowedVariants = ['underlined', 'outlined', 'filled', 'contained', 'plain'];
export const makeVFieldProps = propsFactory({
  appendInnerIcon: String,
  bgColor: String,
  clearable: Boolean,
  clearIcon: {
    type: String,
    default: '$clear'
  },
  color: String,
  id: String,
  label: String,
  persistentClear: Boolean,
  prependInnerIcon: String,
  reverse: Boolean,
  singleLine: Boolean,
  variant: {
    type: String,
    default: 'filled',
    validator: v => allowedVariants.includes(v)
  },
  ...makeThemeProps(),
  ...makeLoaderProps(),
  ...makeVInputProps()
}, 'v-field');
export const VField = genericComponent()({
  name: 'VField',
  inheritAttrs: false,
  props: {
    active: Boolean,
    dirty: Boolean,
    ...makeVFieldProps()
  },
  emits: {
    'click:clear': e => true,
    'click:prepend-inner': e => true,
    'click:append-inner': e => true,
    'click:control': props => true,
    'update:active': active => true,
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme(props);
    const {
      loaderClasses
    } = useLoader(props, 'v-field');
    const isActive = useProxiedModel(props, 'active');
    const uid = getUid();
    const labelRef = ref();
    const floatingLabelRef = ref();
    const controlRef = ref();
    const inputRef = ref();
    const isFocused = ref(false);
    const id = computed(() => props.id || `input-${uid}`);
    watchEffect(() => isActive.value = isFocused.value || props.dirty);
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, 'bgColor'));
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(computed(() => {
      return isActive.value && isFocused.value && !props.error && !props.disabled ? props.color : undefined;
    }));
    watch(isActive, val => {
      if (!props.singleLine) {
        const el = labelRef.value.$el;
        const targetEl = floatingLabelRef.value.$el;
        const rect = nullifyTransforms(el);
        const targetRect = targetEl.getBoundingClientRect();
        const x = targetRect.x - rect.x;
        const y = targetRect.y - rect.y - (rect.height / 2 - targetRect.height / 2);
        const targetWidth = targetRect.width / 0.75;
        const width = Math.abs(targetWidth - rect.width) > 1 ? {
          maxWidth: convertToUnit(targetWidth)
        } : undefined;
        const duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000;
        const scale = parseFloat(getComputedStyle(targetEl).getPropertyValue('--v-field-label-scale'));
        el.style.visibility = 'visible';
        targetEl.style.visibility = 'hidden';
        el.animate([{
          transform: 'translate(0)'
        }, {
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
          ...width
        }], {
          duration,
          easing: standardEasing,
          direction: val ? 'normal' : 'reverse'
        }).finished.then(() => {
          el.style.removeProperty('visibility');
          targetEl.style.removeProperty('visibility');
        });
      }
    }, {
      flush: 'post'
    });

    function focus() {
      isFocused.value = true;
    }

    function blur() {
      isFocused.value = false;
    }

    const slotProps = computed(() => ({
      isActive: isActive.value,
      isDirty: props.dirty,
      isFocused: isFocused.value,
      inputRef,
      controlRef,
      blur,
      focus
    }));

    function onClick(e) {
      if (e.target !== document.activeElement) {
        e.preventDefault();
      }

      emit('click:control', slotProps.value);
    }

    useRender(() => {
      const isOutlined = props.variant === 'outlined';
      const hasPrepend = slots.prependInner || props.prependInnerIcon;
      const hasClear = !!(props.clearable || slots.clear);
      const hasAppend = !!(slots.appendInner || props.appendInnerIcon || hasClear);
      const label = slots.label ? slots.label({
        label: props.label,
        props: {
          for: id.value
        }
      }) : props.label;
      const [inputProps, _] = filterInputProps(props);
      return _createVNode(VInput, _mergeProps({
        "class": ['v-field', {
          'v-field--active': isActive.value,
          'v-field--appended': hasAppend,
          'v-field--dirty': props.dirty,
          'v-field--focused': isFocused.value,
          'v-field--has-background': !!props.bgColor,
          'v-field--persistent-clear': props.persistentClear,
          'v-field--prepended': hasPrepend,
          'v-field--reverse': props.reverse,
          'v-field--single-line': props.singleLine,
          [`v-field--variant-${props.variant}`]: true
        }, themeClasses.value, loaderClasses.value, textColorClasses.value],
        "style": [textColorStyles.value],
        "focused": isFocused.value
      }, inputProps, attrs), {
        prepend: slots.prepend ? props => {
          var _slots$prepend;

          return (_slots$prepend = slots.prepend) == null ? void 0 : _slots$prepend.call(slots, { ...props,
            ...slotProps.value
          });
        } : undefined,
        append: slots.append ? props => {
          var _slots$append;

          return (_slots$append = slots.append) == null ? void 0 : _slots$append.call(slots, { ...props,
            ...slotProps.value
          });
        } : undefined,
        details: slots.details ? props => {
          var _slots$details;

          return (_slots$details = slots.details) == null ? void 0 : _slots$details.call(slots, { ...props,
            ...slotProps.value
          });
        } : undefined,
        default: defaultProps => {
          var _slots$prependInner, _slots$default, _slots$appendInner;

          return _createVNode("div", {
            "class": ['v-field__control', backgroundColorClasses.value],
            "style": backgroundColorStyles.value,
            "onClick": onClick
          }, [_createVNode("div", {
            "class": "v-field__overlay"
          }, null), _createVNode(LoaderSlot, {
            "name": "v-field",
            "active": props.loading,
            "color": !defaultProps.isValid.value ? undefined : props.color
          }, {
            default: slots.loader
          }, 8, ["active", "color"]), hasPrepend && _createVNode("div", {
            "class": "v-field__prepend-inner",
            "onClick": e => emit('click:prepend-inner', e)
          }, [props.prependInnerIcon && _createVNode(VIcon, {
            "icon": props.prependInnerIcon
          }, null, 8, ["icon"]), slots == null ? void 0 : (_slots$prependInner = slots.prependInner) == null ? void 0 : _slots$prependInner.call(slots, defaultProps)], 8, ["onClick"]), _createVNode("div", {
            "class": "v-field__field"
          }, [['contained', 'filled'].includes(props.variant) && !props.singleLine && _createVNode(VFieldLabel, {
            "ref": floatingLabelRef,
            "floating": true
          }, {
            default: () => [label],
            _: 2
          }, 8, ["floating"]), _createVNode(VFieldLabel, {
            "ref": labelRef,
            "for": id.value
          }, {
            default: () => [label],
            _: 2
          }, 8, ["for"]), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, { ...slotProps.value,
            ...defaultProps,
            props: {
              id: id.value,
              class: 'v-field__input',
              onFocus: () => isFocused.value = true,
              onBlur: () => isFocused.value = false
            },
            focus,
            blur
          })]), hasClear && _createVNode(VExpandXTransition, null, {
            default: () => [_withDirectives(_createVNode("div", {
              "class": "v-field__clearable",
              "onClick": e => emit('click:clear', e)
            }, [slots.clear ? slots.clear() : _createVNode(VIcon, {
              "icon": props.clearIcon
            }, null, 8, ["icon"])], 8, ["onClick"]), [[_vShow, props.dirty]])]
          }), hasAppend && _createVNode("div", {
            "class": "v-field__append-inner",
            "onClick": e => emit('click:append-inner', e)
          }, [slots == null ? void 0 : (_slots$appendInner = slots.appendInner) == null ? void 0 : _slots$appendInner.call(slots, defaultProps), props.appendInnerIcon && _createVNode(VIcon, {
            "icon": props.appendInnerIcon
          }, null, 8, ["icon"])], 8, ["onClick"]), _createVNode("div", {
            "class": "v-field__outline"
          }, [isOutlined && _createVNode(_Fragment, null, [_createVNode("div", {
            "class": "v-field__outline__start"
          }, null), _createVNode("div", {
            "class": "v-field__outline__notch"
          }, [!props.singleLine && _createVNode(VFieldLabel, {
            "ref": floatingLabelRef,
            "floating": true
          }, {
            default: () => [label],
            _: 2
          }, 8, ["floating"])]), _createVNode("div", {
            "class": "v-field__outline__end"
          }, null)]), ['plain', 'underlined'].includes(props.variant) && !props.singleLine && _createVNode(VFieldLabel, {
            "ref": floatingLabelRef,
            "floating": true
          }, {
            default: () => [label],
            _: 2
          }, 8, ["floating"])])], 14, ["onClick"]);
        }
      }, 16, ["class", "style", "focused"]);
    });
    return {
      inputRef,
      controlRef
    };
  }

});
// TODO: this is kinda slow, might be better to implicitly inherit props instead
export function filterFieldProps(attrs) {
  return pick(attrs, Object.keys(VField.props));
}
//# sourceMappingURL=VField.mjs.map