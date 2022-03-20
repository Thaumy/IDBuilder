import { createVNode as _createVNode } from "vue";
// Composables
import { makeRouterProps, useLink } from "../../composables/router.mjs";
import { makeTagProps } from "../../composables/tag.mjs";
import { useTextColor } from "../../composables/color.mjs"; // Utilities

import { computed, inject } from 'vue';
import { defineComponent } from "../../util/index.mjs";
import { VBreadcrumbsSymbol } from "./shared.mjs";
export const VBreadcrumbsItem = defineComponent({
  name: 'VBreadcrumbsItem',
  props: {
    active: Boolean,
    activeClass: String,
    activeColor: String,
    color: String,
    disabled: Boolean,
    text: String,
    ...makeRouterProps(),
    ...makeTagProps({
      tag: 'li'
    })
  },

  setup(props, _ref) {
    let {
      slots,
      attrs
    } = _ref;
    const breadcrumbs = inject(VBreadcrumbsSymbol);
    if (!breadcrumbs) throw new Error('[Vuetify] Could not find v-breadcrumbs provider');
    const link = useLink(props, attrs);
    const isActive = computed(() => {
      var _link$isExactActive;

      return props.active || ((_link$isExactActive = link.isExactActive) == null ? void 0 : _link$isExactActive.value);
    });
    const color = computed(() => {
      var _props$activeColor;

      if (isActive.value) return (_props$activeColor = props.activeColor) != null ? _props$activeColor : breadcrumbs.color.value;
      return props.color;
    });
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(color);
    return () => {
      var _slots$default;

      const Tag = link.isLink.value ? 'a' : props.tag;
      return _createVNode(Tag, {
        "class": ['v-breadcrumbs-item', {
          'v-breadcrumbs-item--active': isActive.value,
          'v-breadcrumbs-item--disabled': props.disabled || breadcrumbs.disabled.value,
          'v-breadcrumbs-item--link': link.isLink.value,
          [`${props.activeClass}`]: isActive.value && props.activeClass
        }, textColorClasses.value],
        "style": [textColorStyles.value],
        "aria-current": isActive.value ? 'page' : undefined,
        "onClick": isActive.value && link.navigate
      }, {
        default: () => [props.text, (_slots$default = slots.default) == null ? void 0 : _slots$default.call(slots)],
        _: 1
      }, 8, ["class", "style", "aria-current", "onClick"]);
    };
  }

});
//# sourceMappingURL=VBreadcrumbsItem.mjs.map