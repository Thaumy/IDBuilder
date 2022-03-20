import { createVNode as _createVNode } from "vue";
// Styles
import "./VExpansionPanel.css"; // Composables

import { makeTagProps } from "../../composables/tag.mjs";
import { makeGroupProps, useGroup } from "../../composables/group.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs"; // Utilities

import { computed } from 'vue';
import { defineComponent } from "../../util/index.mjs"; // Types

export const VExpansionPanelSymbol = Symbol.for('vuetify:v-expansion-panel');
const allowedVariants = ['default', 'accordion', 'inset', 'popout'];
export const VExpansionPanels = defineComponent({
  name: 'VExpansionPanels',
  props: {
    variant: {
      type: String,
      default: 'default',
      validator: v => allowedVariants.includes(v)
    },
    ...makeTagProps(),
    ...makeGroupProps(),
    ...makeThemeProps()
  },
  emits: {
    'update:modelValue': val => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useGroup(props, VExpansionPanelSymbol);
    const {
      themeClasses
    } = useTheme(props);
    const variantClass = computed(() => props.variant && `v-expansion-panels--variant-${props.variant}`);
    return () => {
      var _slots$default;

      return _createVNode(props.tag, {
        "class": ['v-expansion-panels', themeClasses.value, variantClass.value]
      }, {
        default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
      }, 8, ["class"]);
    };
  }

});
//# sourceMappingURL=VExpansionPanels.mjs.map