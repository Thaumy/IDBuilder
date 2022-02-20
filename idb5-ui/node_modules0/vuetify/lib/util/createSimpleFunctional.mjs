import { camelize, capitalize, h } from 'vue';
import { defineComponent } from "./defineComponent.mjs";
export function createSimpleFunctional(klass) {
  let tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  let name = arguments.length > 2 ? arguments[2] : undefined;
  return defineComponent({
    name: name != null ? name : capitalize(camelize(klass.replace(/__/g, '-'))),
    props: {
      tag: {
        type: String,
        default: tag
      }
    },

    setup(props, _ref) {
      let {
        slots
      } = _ref;
      return () => {
        var _slots$default;

        return h(props.tag, {
          class: klass
        }, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots));
      };
    }

  });
}
//# sourceMappingURL=createSimpleFunctional.mjs.map