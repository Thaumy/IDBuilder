// @ts-nocheck

/* eslint-disable */
// Styles
import "./VDataTableHeader.css"; // Components

import VDataTableHeaderMobile from "./VDataTableHeaderMobile.mjs";
import VDataTableHeaderDesktop from "./VDataTableHeaderDesktop.mjs"; // Mixins

import header from "./mixins/header.mjs"; // Utilities

import dedupeModelListeners from "../../util/dedupeModelListeners.mjs";
import mergeData from "../../util/mergeData.mjs";
import rebuildSlots from "../../util/rebuildFunctionalSlots.mjs"; // Types

import Vue from 'vue';
/* @vue/component */

export default Vue.extend({
  name: 'v-data-table-header',
  functional: true,
  props: { ...header.options.props,
    mobile: Boolean
  },

  render(h, _ref) {
    let {
      props,
      data,
      slots
    } = _ref;
    dedupeModelListeners(data);
    const children = rebuildSlots(slots(), h);
    data = mergeData(data, {
      props
    });

    if (props.mobile) {
      return h(VDataTableHeaderMobile, data, children);
    } else {
      return h(VDataTableHeaderDesktop, data, children);
    }
  }

});
//# sourceMappingURL=VDataTableHeader.mjs.map