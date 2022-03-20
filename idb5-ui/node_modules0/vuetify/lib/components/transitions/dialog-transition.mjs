import { createVNode as _createVNode, mergeProps as _mergeProps, resolveDirective as _resolveDirective } from "vue";
import { Transition } from 'vue';
import { acceleratedEasing, deceleratedEasing, defineComponent, nullifyTransforms } from "../../util/index.mjs";
export const VDialogTransition = defineComponent({
  name: 'VDialogTransition',
  props: {
    target: Object
  },

  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const functions = {
      onBeforeEnter(el) {
        el.style.pointerEvents = 'none';
      },

      async onEnter(el, done) {
        await new Promise(resolve => requestAnimationFrame(resolve));
        const {
          x,
          y
        } = getDimensions(props.target, el);
        const animation = el.animate([{
          transform: `translate(${x}px, ${y}px) scale(0.1)`,
          opacity: 0
        }, {
          transform: ''
        }], {
          duration: 225,
          easing: deceleratedEasing
        });
        animation.finished.then(() => done());
      },

      onAfterEnter(el) {
        el.style.removeProperty('pointer-events');
      },

      onBeforeLeave(el) {
        el.style.pointerEvents = 'none';
      },

      async onLeave(el, done) {
        await new Promise(resolve => requestAnimationFrame(resolve));
        const {
          x,
          y
        } = getDimensions(props.target, el);
        const animation = el.animate([{
          transform: ''
        }, {
          transform: `translate(${x}px, ${y}px) scale(0.1)`,
          opacity: 0
        }], {
          duration: 125,
          easing: acceleratedEasing
        });
        animation.finished.then(() => done());
      },

      onAfterLeave(el) {
        el.style.removeProperty('pointer-events');
      }

    };
    return () => {
      return props.target ? _createVNode(Transition, _mergeProps({
        "name": "dialog-transition"
      }, functions, {
        "css": false
      }), slots, 16) : _createVNode(Transition, {
        "name": "dialog-transition"
      }, slots);
    };
  }

});

function getDimensions(target, el) {
  const targetBox = target.getBoundingClientRect();
  const elBox = nullifyTransforms(el);
  const [originX, originY] = getComputedStyle(el).transformOrigin.split(' ').map(v => parseFloat(v));
  const [anchorSide, anchorOffset] = getComputedStyle(el).getPropertyValue('--v-overlay-anchor-origin').split(' ');
  let offsetX = targetBox.left + targetBox.width / 2;

  if (anchorSide === 'left' || anchorOffset === 'left') {
    offsetX -= targetBox.width / 2;
  } else if (anchorSide === 'right' || anchorOffset === 'right') {
    offsetX += targetBox.width / 2;
  }

  let offsetY = targetBox.top + targetBox.height / 2;

  if (anchorSide === 'top' || anchorOffset === 'top') {
    offsetY -= targetBox.height / 2;
  } else if (anchorSide === 'bottom' || anchorOffset === 'bottom') {
    offsetY += targetBox.height / 2;
  }

  return {
    x: offsetX - (originX + elBox.left),
    y: offsetY - (originY + elBox.top)
  };
}
//# sourceMappingURL=dialog-transition.mjs.map