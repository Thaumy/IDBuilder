// @ts-nocheck

/* eslint-disable */
import Vue from 'vue';
export function factory() {
  let prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
  let event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'input';
  return Vue.extend({
    name: 'toggleable',
    model: {
      prop,
      event
    },
    props: {
      [prop]: {
        required: false
      }
    },

    data() {
      return {
        isActive: !!this[prop]
      };
    },

    watch: {
      [prop](val) {
        this.isActive = !!val;
      },

      isActive(val) {
        !!val !== this[prop] && this.$emit(event, val);
      }

    }
  });
}
const Toggleable = factory();
export default Toggleable;
//# sourceMappingURL=index.mjs.map