import { withDirectives as _withDirectives, resolveDirective as _resolveDirective, createVNode as _createVNode } from "vue";
import "./VImg.css"; // Components

import { VResponsive } from "../VResponsive/index.mjs"; // Directives

import intersect from "../../directives/intersect/index.mjs"; // Composables

import { makeTransitionProps, MaybeTransition } from "../../composables/transition.mjs"; // Utilities

import { computed, h, nextTick, onBeforeMount, ref, vShow, watch, withDirectives } from 'vue';
import { convertToUnit, defineComponent, SUPPORTS_INTERSECTION, useRender } from "../../util/index.mjs"; // Types

export const VImg = defineComponent({
  name: 'VImg',
  directives: {
    intersect
  },
  props: {
    aspectRatio: [String, Number],
    alt: String,
    cover: Boolean,
    eager: Boolean,
    gradient: String,
    lazySrc: String,
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
    sizes: String,
    src: {
      type: [String, Object],
      default: ''
    },
    srcset: String,
    width: [String, Number],
    ...makeTransitionProps()
  },
  emits: ['loadstart', 'load', 'error'],

  setup(props, _ref) {
    let {
      emit,
      slots
    } = _ref;
    const currentSrc = ref(''); // Set from srcset

    const image = ref();
    const state = ref(props.eager ? 'loading' : 'idle');
    const naturalWidth = ref();
    const naturalHeight = ref();
    const normalisedSrc = computed(() => {
      return props.src && typeof props.src === 'object' ? {
        src: props.src.src,
        srcset: props.srcset || props.src.srcset,
        lazySrc: props.lazySrc || props.src.lazySrc,
        aspect: Number(props.aspectRatio || props.src.aspect)
      } : {
        src: props.src,
        srcset: props.srcset,
        lazySrc: props.lazySrc,
        aspect: Number(props.aspectRatio || 0)
      };
    });
    const aspectRatio = computed(() => {
      return normalisedSrc.value.aspect || naturalWidth.value / naturalHeight.value || 0;
    });
    watch(() => props.src, () => {
      init(state.value !== 'idle');
    }); // TODO: getSrc when window width changes

    onBeforeMount(() => init());

    function init(isIntersecting) {
      if (props.eager && isIntersecting) return;
      if (SUPPORTS_INTERSECTION && !isIntersecting && !props.eager) return;
      state.value = 'loading';
      nextTick(() => {
        var _image$value, _image$value2;

        emit('loadstart', ((_image$value = image.value) == null ? void 0 : _image$value.currentSrc) || normalisedSrc.value.src);

        if ((_image$value2 = image.value) != null && _image$value2.complete) {
          if (!image.value.naturalWidth) {
            onError();
          }

          if (state.value === 'error') return;
          if (!aspectRatio.value) pollForSize(image.value, null);
          onLoad();
        } else {
          if (!aspectRatio.value) pollForSize(image.value);
          getSrc();
        }
      });

      if (normalisedSrc.value.lazySrc) {
        const lazyImg = new Image();
        lazyImg.src = normalisedSrc.value.lazySrc;
        pollForSize(lazyImg, null);
      }
    }

    function onLoad() {
      var _image$value3;

      getSrc();
      state.value = 'loaded';
      emit('load', ((_image$value3 = image.value) == null ? void 0 : _image$value3.currentSrc) || normalisedSrc.value.src);
    }

    function onError() {
      var _image$value4;

      state.value = 'error';
      emit('error', ((_image$value4 = image.value) == null ? void 0 : _image$value4.currentSrc) || normalisedSrc.value.src);
    }

    function getSrc() {
      const img = image.value;
      if (img) currentSrc.value = img.currentSrc || img.src;
    }

    function pollForSize(img) {
      let timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;

      const poll = () => {
        const {
          naturalHeight: imgHeight,
          naturalWidth: imgWidth
        } = img;

        if (imgHeight || imgWidth) {
          naturalWidth.value = imgWidth;
          naturalHeight.value = imgHeight;
        } else if (!img.complete && state.value === 'loading' && timeout != null) {
          setTimeout(poll, timeout);
        } else if (img.currentSrc.endsWith('.svg') || img.currentSrc.startsWith('data:image/svg+xml')) {
          naturalWidth.value = 1;
          naturalHeight.value = 1;
        }
      };

      poll();
    }

    const containClasses = computed(() => ({
      'v-img__img--cover': props.cover,
      'v-img__img--contain': !props.cover
    }));

    const __image = computed(() => {
      var _slots$sources;

      if (!normalisedSrc.value.src || state.value === 'idle') return;
      const img = h('img', {
        class: ['v-img__img', containClasses.value],
        src: normalisedSrc.value.src,
        srcset: normalisedSrc.value.srcset,
        sizes: props.sizes,
        ref: image,
        onLoad,
        onError
      });
      const sources = (_slots$sources = slots.sources) == null ? void 0 : _slots$sources.call(slots);
      return _createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [withDirectives(sources ? _createVNode("picture", {
          "class": "v-img__picture"
        }, [sources, img]) : img, [[vShow, state.value === 'loaded']])],
        _: 2
      }, 8, ["transition", "appear"]);
    });

    const __preloadImage = computed(() => _createVNode(MaybeTransition, {
      "transition": props.transition
    }, {
      default: () => [normalisedSrc.value.lazySrc && state.value !== 'loaded' && _createVNode("img", {
        "class": ['v-img__img', 'v-img__img--preload', containClasses.value],
        "src": normalisedSrc.value.lazySrc,
        "alt": ""
      }, null, 10, ["src"])]
    }, 8, ["transition"]));

    const __placeholder = computed(() => {
      if (!slots.placeholder) return;
      return _createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [(state.value === 'loading' || state.value === 'error' && !slots.error) && _createVNode("div", {
          "class": "v-img__placeholder"
        }, [slots.placeholder()])]
      }, 8, ["transition", "appear"]);
    });

    const __error = computed(() => {
      if (!slots.error) return;
      return _createVNode(MaybeTransition, {
        "transition": props.transition,
        "appear": true
      }, {
        default: () => [state.value === 'error' && _createVNode("div", {
          "class": "v-img__error"
        }, [slots.error()])]
      }, 8, ["transition", "appear"]);
    });

    const __gradient = computed(() => {
      if (!props.gradient) return;
      return _createVNode("div", {
        "class": "v-img__gradient",
        "style": {
          backgroundImage: `linear-gradient(${props.gradient})`
        }
      }, null);
    });

    const isBooted = ref(false);
    {
      const stop = watch(aspectRatio, val => {
        if (val) {
          // Doesn't work with nextTick, idk why
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              isBooted.value = true;
            });
          });
          stop();
        }
      });
    }
    useRender(() => _withDirectives(_createVNode(VResponsive, {
      "class": ['v-img', {
        'v-img--booting': !isBooted.value
      }],
      "style": {
        width: convertToUnit(props.width === 'auto' ? naturalWidth.value : props.width)
      },
      "aspectRatio": aspectRatio.value,
      "aria-label": props.alt,
      "role": props.alt ? 'img' : undefined
    }, {
      additional: () => [__image.value, __preloadImage.value, __gradient.value, __placeholder.value, __error.value],
      default: slots.default
    }, 8, ["class", "style", "aspectRatio", "aria-label", "role"]), [[_resolveDirective("intersect"), {
      handler: init,
      options: props.options
    }, null, {
      once: true
    }]]));
    return {
      currentSrc,
      image,
      state,
      naturalWidth,
      naturalHeight
    };
  }

});
//# sourceMappingURL=VImg.mjs.map