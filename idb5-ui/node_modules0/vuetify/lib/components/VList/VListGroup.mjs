import { withDirectives as _withDirectives, vShow as _vShow, createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Components
import { VExpandTransition } from "../transitions/index.mjs";
import { VListChildren } from "./VListChildren.mjs"; // Composables

import { useNestedGroup } from "../../composables/nested/nested.mjs";
import { makeTagProps } from "../../composables/tag.mjs"; // Utilities

import { computed } from 'vue';
import { defineComponent, genericComponent } from "../../util/index.mjs";
import { createList, useDepth, useList } from "./VList.mjs"; // Types

const VListGroupItems = defineComponent({
  name: 'VListGroupItems',
  props: {
    open: Boolean,
    items: Array
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const parent = createList();
    const depth = useDepth(parent.hasPrepend);
    return () => {
      return _createVNode(VExpandTransition, null, {
        default: () => [_withDirectives(_createVNode("div", {
          "class": "v-list-group__items",
          "style": {
            '--v-list-depth': depth.value
          }
        }, [_createVNode(VListChildren, {
          "items": props.items
        }, slots, 8, ["items"])], 4), [[_vShow, props.open]])]
      });
    };
  }

});
export const VListGroup = genericComponent()({
  name: 'VListGroup',
  props: {
    value: null,
    collapseIcon: {
      type: String,
      default: '$collapse'
    },
    expandIcon: {
      type: String,
      default: '$expand'
    },
    items: Array,
    ...makeTagProps()
  },

  setup(props, _ref2) {
    let {
      slots
    } = _ref2;
    const {
      isOpen,
      open
    } = useNestedGroup(props);
    const list = useList();

    const onClick = e => {
      open(!isOpen.value, e);
    };

    const headerProps = computed(() => ({
      onClick,
      appendIcon: isOpen.value ? props.collapseIcon : props.expandIcon,
      class: 'v-list-group__header'
    }));
    return () => {
      var _slots$header;

      return _createVNode(props.tag, {
        "class": ['v-list-group', {
          'v-list-group--prepend': list == null ? void 0 : list.hasPrepend.value
        }]
      }, {
        default: () => [(_slots$header = slots.header) == null ? void 0 : _slots$header.call(slots, headerProps.value), _createVNode(VListGroupItems, {
          "items": props.items,
          "open": isOpen.value
        }, slots, 8, ["items", "open"])],
        _: 1
      }, 8, ["class"]);
    };
  }

});
//# sourceMappingURL=VListGroup.mjs.map