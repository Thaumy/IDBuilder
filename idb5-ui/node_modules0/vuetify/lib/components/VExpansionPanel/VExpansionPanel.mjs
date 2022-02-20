import { Fragment as _Fragment, createVNode as _createVNode } from "vue";
// Components
import { makeVExpansionPanelTitleProps, VExpansionPanelTitle } from "./VExpansionPanelTitle.mjs";
import { VExpansionPanelText } from "./VExpansionPanelText.mjs";
import { VExpansionPanelSymbol } from "./VExpansionPanels.mjs"; // Composables

import { makeElevationProps, useElevation } from "../../composables/elevation.mjs";
import { makeGroupItemProps, useGroupItem } from "../../composables/group.mjs";
import { makeRoundedProps, useRounded } from "../../composables/rounded.mjs";
import { useBackgroundColor } from "../../composables/color.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeLazyProps } from "../../composables/lazy.mjs"; // Utilities

import { computed, provide } from 'vue';
import { defineComponent } from "../../util/index.mjs";
export const VExpansionPanel = defineComponent({
  name: 'VExpansionPanel',
  props: {
    title: String,
    text: String,
    bgColor: String,
    ...makeLazyProps(),
    ...makeGroupItemProps(),
    ...makeRoundedProps(),
    ...makeElevationProps(),
    ...makeTagProps(),
    ...makeVExpansionPanelTitleProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const groupItem = useGroupItem(props, VExpansionPanelSymbol);
    const {
      roundedClasses
    } = useRounded(props, 'v-expansion-panel');
    const {
      elevationClasses
    } = useElevation(props);
    provide(VExpansionPanelSymbol, groupItem);
    const isBeforeSelected = computed(() => {
      const index = groupItem.group.items.value.indexOf(groupItem.id);
      return !groupItem.isSelected.value && groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === 1);
    });
    const isAfterSelected = computed(() => {
      const index = groupItem.group.items.value.indexOf(groupItem.id);
      return !groupItem.isSelected.value && groupItem.group.selected.value.some(id => groupItem.group.items.value.indexOf(id) - index === -1);
    });
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, 'bgColor');
    return () => {
      var _slots$default;

      return _createVNode(props.tag, {
        "class": ['v-expansion-panel', {
          'v-expansion-panel--active': groupItem.isSelected.value,
          'v-expansion-panel--before-active': isBeforeSelected.value,
          'v-expansion-panel--after-active': isAfterSelected.value,
          'v-expansion-panel--disabled': groupItem.disabled.value
        }, roundedClasses.value, backgroundColorClasses.value],
        "style": backgroundColorStyles.value,
        "aria-expanded": groupItem.isSelected.value
      }, {
        default: () => [_createVNode("div", {
          "class": ['v-expansion-panel__shadow', ...elevationClasses.value]
        }, null, 2), ((_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)) || _createVNode(_Fragment, null, [_createVNode(VExpansionPanelTitle, {
          "expandIcon": props.expandIcon,
          "collapseIcon": props.collapseIcon,
          "color": props.color,
          "hideActions": props.hideActions,
          "ripple": props.ripple
        }, {
          default: () => [slots.title ? slots.title() : props.title]
        }, 8, ["expandIcon", "collapseIcon", "color", "hideActions", "ripple"]), _createVNode(VExpansionPanelText, {
          "eager": props.eager
        }, {
          default: () => [slots.text ? slots.text() : props.text]
        }, 8, ["eager"])])],
        _: 1
      }, 8, ["class", "style", "aria-expanded"]);
    };
  }

});
//# sourceMappingURL=VExpansionPanel.mjs.map