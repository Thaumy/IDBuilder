import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
// Utilities
import { computed, inject, isRef } from 'vue';
import { defineComponent, propsFactory } from "../util/index.mjs"; // Types

export const IconSymbol = Symbol.for('vuetify:icons');
export const makeIconProps = propsFactory({
  icon: {
    type: [String, Object],
    required: true
  },
  // Could not remove this and use makeTagProps, types complained because it is not required
  tag: {
    type: String,
    required: true
  }
}, 'icon');
export const VComponentIcon = defineComponent({
  name: 'VComponentIcon',
  props: makeIconProps(),

  setup(props) {
    return () => {
      return _createVNode(props.tag, null, {
        default: () => [_createVNode(props.icon, null, null)]
      });
    };
  }

});
export const VSvgIcon = defineComponent({
  name: 'VSvgIcon',
  inheritAttrs: false,
  props: makeIconProps(),

  setup(props, _ref) {
    let {
      attrs
    } = _ref;
    return () => {
      return _createVNode(props.tag, _mergeProps(attrs, {
        "style": null
      }), {
        default: () => [_createVNode("svg", {
          "class": "v-icon__svg",
          "xmlns": "http://www.w3.org/2000/svg",
          "viewBox": "0 0 24 24",
          "role": "img",
          "aria-hidden": "true"
        }, [_createVNode("path", {
          "d": props.icon
        }, null, 8, ["d"])])]
      }, 16);
    };
  }

});
export const VLigatureIcon = defineComponent({
  name: 'VLigatureIcon',
  props: makeIconProps(),

  setup(props) {
    return () => {
      return _createVNode(props.tag, null, {
        default: () => [props.icon]
      });
    };
  }

});
export const VClassIcon = defineComponent({
  name: 'VClassIcon',
  props: makeIconProps(),

  setup(props) {
    return () => {
      return _createVNode(props.tag, {
        "class": props.icon
      }, null, 8, ["class"]);
    };
  }

});
export const defaultSets = {
  svg: {
    component: VSvgIcon
  },
  class: {
    component: VClassIcon
  }
}; // Composables

export const useIcon = props => {
  const icons = inject(IconSymbol);
  if (!icons) throw new Error('Missing Vuetify Icons provide!');
  const iconData = computed(() => {
    const iconAlias = isRef(props) ? props.value : props.icon;
    if (!iconAlias) throw new Error('Icon value is undefined or null');
    let icon = iconAlias;

    if (typeof iconAlias === 'string' && iconAlias.includes('$')) {
      var _icons$aliases;

      icon = (_icons$aliases = icons.aliases) == null ? void 0 : _icons$aliases[iconAlias.slice(iconAlias.indexOf('$') + 1)];
    }

    if (!icon) throw new Error(`Could not find aliased icon "${iconAlias}"`);

    if (typeof icon !== 'string') {
      return {
        component: VComponentIcon,
        icon
      };
    }

    const iconSetName = Object.keys(icons.sets).find(setName => typeof icon === 'string' && icon.startsWith(`${setName}:`));
    const iconName = iconSetName ? icon.slice(iconSetName.length + 1) : icon;
    const iconSet = icons.sets[iconSetName != null ? iconSetName : icons.defaultSet];
    return {
      component: iconSet.component,
      icon: iconName
    };
  });
  return {
    iconData
  };
};
//# sourceMappingURL=icons.mjs.map