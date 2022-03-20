import { withDirectives as _withDirectives, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
// Composables
import { makeDimensionProps, useDimension } from "../../composables/dimensions.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { makeTransitionProps, MaybeTransition } from "../../composables/transition.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Directives

import intersect from "../../directives/intersect/index.mjs"; // Utilities

import { defineComponent } from "../../util/index.mjs";
export const VLazy = defineComponent({
  name: 'VLazy',
  directives: {
    intersect
  },
  props: {
    modelValue: Boolean,
    options: {
      type: Object,
      // For more information on types, navigate to:
      // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      default: () => ({
        root: undefined,
        rootMargin: undefined,
        threshold: undefined
      })
    },
    ...makeDimensionProps(),
    ...makeTagProps(),
    ...makeTransitionProps({
      transition: 'fade-transition'
    })
  },
  emits: {
    'update:modelValue': value => true
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      dimensionStyles
    } = useDimension(props);
    const isActive = useProxiedModel(props, 'modelValue');

    function onIntersect(isIntersecting) {
      if (isActive.value) return;
      isActive.value = isIntersecting;
    }

    return () => {
      var _slots$default;

      return _withDirectives(_createVNode(props.tag, {
        "class": "v-lazy",
        "style": dimensionStyles.value
      }, {
        default: () => [isActive.value && _createVNode(MaybeTransition, {
          "transition": props.transition
        }, {
          default: () => [(_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)]
        }, 8, ["transition"])]
      }, 8, ["style"]), [[_resolveDirective("intersect"), onIntersect, props.options]]);
    };
  }

});
//# sourceMappingURL=VLazy.mjs.map