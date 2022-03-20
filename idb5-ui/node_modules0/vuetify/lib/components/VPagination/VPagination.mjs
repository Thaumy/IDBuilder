import { createVNode as _createVNode } from "vue";
import "./VPagination.css"; // Components

import { VPaginationBtn } from "./VPaginationBtn.mjs"; // Composables

import { makeTagProps } from "../../composables/tag.mjs";
import { useLocale } from "../../composables/locale.mjs";
import { useRtl } from "../../composables/rtl.mjs";
import { makeElevationProps } from "../../composables/elevation.mjs";
import { makeDensityProps } from "../../composables/density.mjs";
import { makeRoundedProps } from "../../composables/rounded.mjs";
import { makeSizeProps } from "../../composables/size.mjs";
import { makeThemeProps, useTheme } from "../../composables/theme.mjs";
import { makeVariantProps } from "../../composables/variant.mjs";
import { useResizeObserver } from "../../composables/resizeObserver.mjs";
import { makeBorderProps } from "../../composables/border.mjs";
import { useRefs } from "../../composables/refs.mjs";
import { useProxiedModel } from "../../composables/proxiedModel.mjs"; // Utilities

import { computed, nextTick, ref } from 'vue';
import { createRange, defineComponent, keyValues } from "../../util/index.mjs"; // Types

export const VPagination = defineComponent({
  name: 'VPagination',
  props: {
    start: {
      type: [Number, String],
      default: 1
    },
    modelValue: {
      type: Number,
      default: props => props.start
    },
    disabled: Boolean,
    length: {
      type: [Number, String],
      default: 1,
      validator: val => val % 1 === 0
    },
    totalVisible: [Number, String],
    firstIcon: {
      type: String,
      default: '$first'
    },
    prevIcon: {
      type: String,
      default: '$prev'
    },
    nextIcon: {
      type: String,
      default: '$next'
    },
    lastIcon: {
      type: String,
      default: '$last'
    },
    ariaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.root'
    },
    pageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.page'
    },
    currentPageAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.currentPage'
    },
    firstAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.first'
    },
    previousAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.previous'
    },
    nextAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.next'
    },
    lastAriaLabel: {
      type: String,
      default: '$vuetify.pagination.ariaLabel.last'
    },
    ellipsis: {
      type: String,
      default: '...'
    },
    showFirstLastPage: Boolean,
    ...makeTagProps({
      tag: 'nav'
    }),
    ...makeElevationProps(),
    ...makeDensityProps(),
    ...makeRoundedProps(),
    ...makeSizeProps(),
    ...makeBorderProps(),
    ...makeThemeProps(),
    ...makeVariantProps({
      variant: 'text'
    })
  },
  emits: {
    'update:modelValue': value => true,
    first: value => true,
    prev: value => true,
    next: value => true,
    last: value => true
  },

  setup(props, _ref) {
    let {
      slots,
      emit
    } = _ref;
    const page = useProxiedModel(props, 'modelValue');
    const {
      t,
      n
    } = useLocale();
    const {
      isRtl
    } = useRtl();
    const {
      themeClasses
    } = useTheme(props);
    const maxButtons = ref(-1);
    const {
      resizeRef
    } = useResizeObserver(entries => {
      if (!entries.length) return;
      const {
        target,
        contentRect
      } = entries[0];
      const firstItem = target.querySelector('.v-pagination__list > *');
      if (!firstItem) return;
      const totalWidth = contentRect.width;
      const itemWidth = firstItem.getBoundingClientRect().width + 10;
      maxButtons.value = Math.max(0, Math.floor((totalWidth - 96) / itemWidth));
    });
    const length = computed(() => parseInt(props.length, 10));
    const start = computed(() => parseInt(props.start, 10));
    const totalVisible = computed(() => {
      var _props$totalVisible;

      if (props.totalVisible) return Math.min(parseInt((_props$totalVisible = props.totalVisible) != null ? _props$totalVisible : '', 10), length.value);else if (maxButtons.value >= 0) return maxButtons.value;
      return length.value;
    });
    const range = computed(() => {
      if (length.value <= 0) return [];

      if (totalVisible.value <= 3) {
        return [Math.min(Math.max(start.value, page.value), start.value + length.value)];
      }

      if (props.length <= totalVisible.value) {
        return createRange(length.value, start.value);
      }

      const middle = Math.ceil(totalVisible.value / 2);
      const left = middle;
      const right = length.value - middle;

      if (page.value < left) {
        return [...createRange(Math.max(1, totalVisible.value - 2), start.value), props.ellipsis, length.value];
      } else if (page.value > right) {
        const rangeLength = totalVisible.value - 2;
        const rangeStart = length.value - rangeLength + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart)];
      } else {
        const rangeLength = Math.max(1, totalVisible.value - 4);
        const rangeStart = rangeLength === 1 ? page.value : page.value - Math.ceil(rangeLength / 2) + start.value;
        return [start.value, props.ellipsis, ...createRange(rangeLength, rangeStart), props.ellipsis, length.value];
      }
    }); // TODO: 'first' | 'prev' | 'next' | 'last' does not work here?

    function setValue(e, value, event) {
      e.preventDefault();
      page.value = value;
      event && emit(event, value);
    }

    const {
      refs,
      updateRef
    } = useRefs();
    const items = computed(() => {
      const sharedProps = {
        density: props.density,
        rounded: props.rounded,
        size: props.size
      };
      return range.value.map((item, index) => {
        const ref = e => updateRef(e, index);

        if (typeof item === 'string') {
          return {
            isActive: false,
            page: item,
            props: { ...sharedProps,
              ref,
              ellipsis: true,
              icon: true,
              disabled: true,
              variant: props.variant,
              border: props.border
            }
          };
        } else {
          const isActive = item === page.value;
          return {
            isActive,
            page: n(item),
            props: { ...sharedProps,
              ref,
              ellipsis: false,
              icon: true,
              disabled: !!props.disabled || props.length < 2,
              elevation: props.elevation,
              variant: props.variant,
              border: props.border,
              color: isActive ? props.color : undefined,
              ariaCurrent: isActive,
              ariaLabel: t(isActive ? props.currentPageAriaLabel : props.pageAriaLabel, index + 1),
              onClick: e => setValue(e, item)
            }
          };
        }
      });
    });
    const controls = computed(() => {
      const sharedProps = {
        color: undefined,
        density: props.density,
        rounded: props.rounded,
        size: props.size,
        variant: props.variant,
        border: props.border
      };
      const prevDisabled = !!props.disabled || page.value <= start.value;
      const nextDisabled = !!props.disabled || page.value >= start.value + length.value - 1;
      return {
        first: props.showFirstLastPage ? { ...sharedProps,
          icon: isRtl.value ? props.lastIcon : props.firstIcon,
          onClick: e => setValue(e, start.value, 'first'),
          disabled: prevDisabled,
          ariaLabel: t(props.firstAriaLabel),
          ariaDisabled: prevDisabled
        } : undefined,
        prev: { ...sharedProps,
          icon: isRtl.value ? props.nextIcon : props.prevIcon,
          onClick: e => setValue(e, page.value - 1, 'prev'),
          disabled: prevDisabled,
          ariaLabel: t(props.previousAriaLabel),
          ariaDisabled: prevDisabled
        },
        next: { ...sharedProps,
          icon: isRtl.value ? props.prevIcon : props.nextIcon,
          onClick: e => setValue(e, page.value + 1, 'next'),
          disabled: nextDisabled,
          ariaLabel: t(props.nextAriaLabel),
          ariaDisabled: nextDisabled
        },
        last: props.showFirstLastPage ? { ...sharedProps,
          icon: isRtl.value ? props.firstIcon : props.lastIcon,
          onClick: e => setValue(e, start.value + length.value - 1, 'last'),
          disabled: nextDisabled,
          ariaLabel: t(props.lastAriaLabel),
          ariaDisabled: nextDisabled
        } : undefined
      };
    });

    function updateFocus() {
      var _refs$value$currentIn;

      const currentIndex = page.value - start.value;
      (_refs$value$currentIn = refs.value[currentIndex]) == null ? void 0 : _refs$value$currentIn.$el.focus();
    }

    function onKeydown(e) {
      if (e.key === keyValues.left && !props.disabled && page.value > props.start) {
        page.value = page.value - 1;
        nextTick(updateFocus);
      } else if (e.key === keyValues.right && !props.disabled && page.value < start.value + length.value - 1) {
        page.value = page.value + 1;
        nextTick(updateFocus);
      }
    }

    return () => _createVNode(props.tag, {
      "ref": resizeRef,
      "class": ['v-pagination', themeClasses.value],
      "role": "navigation",
      "aria-label": t(props.ariaLabel),
      "onKeydown": onKeydown,
      "data-test": "v-pagination-root"
    }, {
      default: () => [_createVNode("ul", {
        "class": "v-pagination__list"
      }, [props.showFirstLastPage && _createVNode("li", {
        "class": "v-pagination__first",
        "data-test": "v-pagination-first"
      }, [slots.first ? slots.first(controls.value.first) : _createVNode(VPaginationBtn, controls.value.first, null, 16)]), _createVNode("li", {
        "class": "v-pagination__prev",
        "data-test": "v-pagination-prev"
      }, [slots.prev ? slots.prev(controls.value.prev) : _createVNode(VPaginationBtn, controls.value.prev, null, 16)]), items.value.map((item, index) => _createVNode("li", {
        "key": `${index}_${item.page}`,
        "class": ['v-pagination__item', {
          'v-pagination__item--is-active': item.isActive
        }],
        "data-test": "v-pagination-item"
      }, [slots.item ? slots.item(item) : _createVNode(VPaginationBtn, item.props, {
        default: () => [item.page]
      }, 16)], 2)), _createVNode("li", {
        "class": "v-pagination__next",
        "data-test": "v-pagination-next"
      }, [slots.next ? slots.next(controls.value.next) : _createVNode(VPaginationBtn, controls.value.next, null, 16)]), props.showFirstLastPage && _createVNode("li", {
        "class": "v-pagination__last",
        "data-test": "v-pagination-last"
      }, [slots.last ? slots.last(controls.value.last) : _createVNode(VPaginationBtn, controls.value.last, null, 16)])])]
    }, 8, ["class", "aria-label", "onKeydown"]);
  }

});
//# sourceMappingURL=VPagination.mjs.map