import { createVNode as _createVNode, resolveDirective as _resolveDirective } from "vue";
// Styles
import "./VParallax.css"; // Components

import { VImg } from "../VImg/index.mjs"; // Composables

import { useIntersectionObserver } from "../../composables/intersectionObserver.mjs"; // Utilities

import { onBeforeUnmount, ref, watch, watchEffect } from 'vue';
import { defineComponent, getScrollParent } from "../../util/index.mjs";

function floor(val) {
  return Math.floor(Math.abs(val)) * Math.sign(val);
}

export const VParallax = defineComponent({
  name: 'VParallax',
  props: {
    scale: {
      type: [Number, String],
      default: 1.3
    }
  },

  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const root = ref();
    const {
      intersectionRef,
      isIntersecting
    } = useIntersectionObserver();
    watchEffect(() => {
      var _root$value;

      intersectionRef.value = (_root$value = root.value) == null ? void 0 : _root$value.$el;
    });
    let scrollParent;
    watch(isIntersecting, val => {
      if (val) {
        scrollParent = getScrollParent(intersectionRef.value);
        scrollParent = scrollParent === document.scrollingElement ? document : scrollParent;
        scrollParent.addEventListener('scroll', onScroll, {
          passive: true
        });
        onScroll();
      } else {
        scrollParent.removeEventListener('scroll', onScroll);
      }
    });
    onBeforeUnmount(() => {
      var _scrollParent;

      (_scrollParent = scrollParent) == null ? void 0 : _scrollParent.removeEventListener('scroll', onScroll);
    });
    let frame = -1;

    function onScroll() {
      if (!isIntersecting.value) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        var _root$value2, _scrollParent$clientH, _scrollParent$scrollT;

        const el = ((_root$value2 = root.value) == null ? void 0 : _root$value2.$el).querySelector('.v-img__img');
        if (!el) return;
        const rect = intersectionRef.value.getBoundingClientRect();
        const scrollHeight = (_scrollParent$clientH = scrollParent.clientHeight) != null ? _scrollParent$clientH : window.innerHeight;
        const scrollPos = (_scrollParent$scrollT = scrollParent.scrollTop) != null ? _scrollParent$scrollT : window.scrollY;
        const top = rect.top + scrollPos;
        const progress = (scrollPos + scrollHeight - top) / (rect.height + scrollHeight);
        const translate = floor((rect.height * +props.scale - rect.height) * (-progress + 0.5));
        el.style.setProperty('transform', `translateY(${translate}px) scale(${props.scale})`);
      });
    }

    return () => _createVNode(VImg, {
      "class": ['v-parallax', {
        'v-parallax--active': isIntersecting.value
      }],
      "ref": root,
      "cover": true,
      "onLoadstart": onScroll,
      "onLoad": onScroll
    }, slots, 8, ["class", "cover", "onLoadstart", "onLoad"]);
  }

});
//# sourceMappingURL=VParallax.mjs.map