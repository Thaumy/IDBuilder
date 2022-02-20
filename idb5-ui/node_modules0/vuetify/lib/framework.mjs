import { createDisplay, DisplaySymbol } from "./composables/display.mjs";
import { createTheme, ThemeSymbol } from "./composables/theme.mjs";
import { defaultSets, IconSymbol } from "./composables/icons.mjs";
import { createDefaults, DefaultsSymbol } from "./composables/defaults.mjs";
import { createLocaleAdapter, LocaleAdapterSymbol } from "./composables/locale.mjs";
import { createRtl, RtlSymbol } from "./composables/rtl.mjs";
import { aliases, mdi } from "./iconsets/mdi.mjs"; // Utilities

import { reactive } from 'vue';
import { mergeDeep } from "./util/index.mjs"; // Types

export * from "./composables/index.mjs";
export const createVuetify = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  const install = app => {
    const {
      components = {},
      directives = {},
      icons = {}
    } = options;

    for (const key in directives) {
      const directive = directives[key];
      app.directive(key, directive);
    }

    for (const key in components) {
      const component = components[key];
      app.component(key, component);
    }

    app.provide(DefaultsSymbol, createDefaults(options.defaults));
    app.provide(DisplaySymbol, createDisplay(options.display));
    app.provide(ThemeSymbol, createTheme(options.theme));
    app.provide(IconSymbol, mergeDeep({
      defaultSet: 'mdi',
      sets: { ...defaultSets,
        mdi
      },
      aliases
    }, icons));
    const {
      adapter,
      rootInstance
    } = createLocaleAdapter(app, options == null ? void 0 : options.locale);
    app.provide(LocaleAdapterSymbol, adapter);
    app.provide(RtlSymbol, createRtl(rootInstance, options == null ? void 0 : options.locale)); // Vue's inject() can only be used in setup

    function inject(key) {
      var _vm$parent$provides, _vm$parent, _vm$vnode$appContext;

      const vm = this.$;
      const provides = (_vm$parent$provides = (_vm$parent = vm.parent) == null ? void 0 : _vm$parent.provides) != null ? _vm$parent$provides : (_vm$vnode$appContext = vm.vnode.appContext) == null ? void 0 : _vm$vnode$appContext.provides;

      if (provides && key in provides) {
        return provides[key];
      }
    }

    app.mixin({
      computed: {
        $vuetify() {
          return reactive({
            defaults: inject.call(this, DefaultsSymbol),
            display: inject.call(this, DisplaySymbol),
            theme: inject.call(this, ThemeSymbol),
            icons: inject.call(this, IconSymbol),
            locale: inject.call(this, LocaleAdapterSymbol),
            rtl: inject.call(this, RtlSymbol)
          });
        }

      }
    });
  };

  return {
    install
  };
};
//# sourceMappingURL=framework.mjs.map