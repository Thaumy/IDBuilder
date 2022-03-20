// @ts-nocheck

/* eslint-disable */
import Vue from 'vue';
import { deepEqual } from "../../util/helpers.mjs";
export default Vue.extend({
  name: 'comparable',
  props: {
    valueComparator: {
      type: Function,
      default: deepEqual
    }
  }
});
//# sourceMappingURL=index.mjs.map