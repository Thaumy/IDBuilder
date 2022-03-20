// @ts-nocheck

/* eslint-disable */
import Vue from 'vue';
export function factory() {
  let prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
  let event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'change';
  return Vue.extend({
    name: 'proxyable',
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
        internalLazyValue: this[prop]
      };
    },

    computed: {
      internalValue: {
        get() {
          return this.internalLazyValue;
        },

        set(val) {
          if (val === this.internalLazyValue) return;
          this.internalLazyValue = val;
          this.$emit(event, val);
        }

      }
    },
    watch: {
      [prop](val) {
        this.internalLazyValue = val;
      }

    }
  });
}
const Proxyable = factory();
export default Proxyable;
//# sourceMappingURL=index.mjs.map