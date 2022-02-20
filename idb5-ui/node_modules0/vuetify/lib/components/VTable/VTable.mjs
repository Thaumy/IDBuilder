import { createVNode as _createVNode } from "vue";
// Styles
import "./VTable.css"; // Composables

import { makeTagProps } from "../../composables/tag.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs"; // Utilities

import { convertToUnit, defineComponent } from "../../util/index.mjs";
import { makeDensityProps, useDensity } from "../../composables/density.mjs";
export const VTable = defineComponent({
  name: 'VTable',
  props: {
    fixedHeader: Boolean,
    fixedFooter: Boolean,
    height: [Number, String],
    ...makeDensityProps(),
    ...makeThemeProps(),
    ...makeTagProps()
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      themeClasses
    } = useTheme(props);
    const {
      densityClasses
    } = useDensity(props, 'v-table');
    return () => {
      var _slots$top, _slots$default, _slots$bottom;

      return _createVNode(props.tag, {
        "class": ['v-table', {
          'v-table--fixed-height': !!props.height,
          'v-table--fixed-header': props.fixedHeader,
          'v-table--fixed-footer': props.fixedFooter,
          'v-table--has-top': !!slots.top,
          'v-table--has-bottom': !!slots.bottom
        }, themeClasses.value, densityClasses.value]
      }, {
        default: () => [(_slots$top = slots.top) == null ? void 0 : _slots$top.call(slots), slots.default && _createVNode("div", {
          "class": "v-table__wrapper",
          "style": {
            height: convertToUnit(props.height)
          }
        }, [_createVNode("table", null, [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)])], 4), (_slots$bottom = slots.bottom) == null ? void 0 : _slots$bottom.call(slots)],
        _: 1
      }, 8, ["class"]);
    };
  }

});
//# sourceMappingURL=VTable.mjs.map