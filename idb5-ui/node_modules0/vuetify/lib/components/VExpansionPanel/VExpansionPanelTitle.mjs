import { withDirectives as _withDirectives, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Components
import { VIcon } from "../VIcon/index.mjs";
import { VExpansionPanelSymbol } from "./VExpansionPanels.mjs"; // Composables

import { useBackgroundColor } from "../../composables/color.mjs"; // Directives

import ripple from "../../directives/ripple/index.mjs"; // Utilities

import { computed, inject } from 'vue';
import { defineComponent, propsFactory } from "../../util/index.mjs";
export const makeVExpansionPanelTitleProps = propsFactory({
  expandIcon: {
    type: String,
    default: '$expand'
  },
  collapseIcon: {
    type: String,
    default: '$collapse'
  },
  hideActions: Boolean,
  ripple: {
    type: [Boolean, Object],
    default: false
  },
  color: String
});
export const VExpansionPanelTitle = defineComponent({
  name: 'VExpansionPanelTitle',
  directives: {
    ripple
  },
  props: { ...makeVExpansionPanelTitleProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const expansionPanel = inject(VExpansionPanelSymbol);
    if (!expansionPanel) throw new Error('[Vuetify] v-expansion-panel-title needs to be placed inside v-expansion-panel');
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, 'color');
    const slotProps = computed(() => ({
      expanded: expansionPanel.isSelected.value,
      disabled: expansionPanel.disabled.value,
      expandIcon: props.expandIcon,
      collapseIcon: props.collapseIcon
    }));
    return () => {
      var _slots$default;

      return _withDirectives(_createVNode("button", {
        "class": ['v-expansion-panel-title', {
          'v-expansion-panel-title--active': expansionPanel.isSelected.value
        }, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "type": "button",
        "tabindex": expansionPanel.disabled.value ? -1 : undefined,
        "disabled": expansionPanel.disabled.value,
        "aria-expanded": expansionPanel.isSelected.value,
        "onClick": expansionPanel.toggle
      }, [_createVNode("div", {
        "class": "v-expansion-panel-title__overlay"
      }, null), (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots, slotProps.value), !props.hideActions && _createVNode("div", {
        "class": "v-expansion-panel-title__icon"
      }, [slots.actions ? slots.actions(slotProps.value) : _createVNode(VIcon, {
        "icon": expansionPanel.isSelected.value ? props.collapseIcon : props.expandIcon
      }, null, 8, ["icon"])])], 14, ["tabindex", "disabled", "aria-expanded", "onClick"]), [[_resolveDirective("ripple"), props.ripple]]);
    };
  }

});
//# sourceMappingURL=VExpansionPanelTitle.mjs.map