import { computed, inject, provide } from 'vue';
import { consoleError, consoleWarn, getObjectValueByPath, wrapInRef } from "../util/index.mjs";
import en from "../locale/en.mjs"; // Types

export const LocaleAdapterSymbol = Symbol.for('vuetify:locale-adapter');
export const VuetifyLocaleSymbol = Symbol.for('vuetify:locale');
export function provideLocale(props) {
  const adapter = inject(LocaleAdapterSymbol);
  if (!adapter) throw new Error('[Vuetify] Could not find injected locale adapter');
  return adapter.createScope(props);
}
export function useLocale() {
  const adapter = inject(LocaleAdapterSymbol);
  if (!adapter) throw new Error('[Vuetify] Could not find injected locale adapter');
  return adapter.getScope();
}

function isLocaleAdapter(x) {
  return !!x && x.hasOwnProperty('getScope') && x.hasOwnProperty('createScope') && x.hasOwnProperty('createRoot');
}

export function createLocaleAdapter(app, options) {
  const adapter = isLocaleAdapter(options) ? options : createDefaultLocaleAdapter(options);
  const rootInstance = adapter.createRoot(app);
  return {
    adapter,
    rootInstance
  };
}
const LANG_PREFIX = '$vuetify.';

const replace = (str, params) => {
  return str.replace(/\{(\d+)\}/g, (match, index) => {
    /* istanbul ignore next */
    return String(params[+index]);
  });
};

const createTranslateFunction = (current, fallback, messages) => {
  return function (key) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (!key.startsWith(LANG_PREFIX)) {
      return replace(key, params);
    }

    const shortKey = key.replace(LANG_PREFIX, '');
    const currentLocale = current.value && messages.value[current.value];
    const fallbackLocale = fallback.value && messages.value[fallback.value];
    let str = getObjectValueByPath(currentLocale, shortKey, null);

    if (!str) {
      consoleWarn(`Translation key "${key}" not found in "${current.value}", trying fallback locale`);
      str = getObjectValueByPath(fallbackLocale, shortKey, null);
    }

    if (!str) {
      consoleError(`Translation key "${key}" not found in fallback`);
      str = key;
    }

    if (typeof str !== 'string') {
      consoleError(`Translation key "${key}" has a non-string value`);
      str = key;
    }

    return replace(str, params);
  };
};

function createNumberFunction(current, fallback) {
  return (value, options) => {
    const numberFormat = new Intl.NumberFormat([current.value, fallback.value], options);
    return numberFormat.format(value);
  };
}

export function createDefaultLocaleAdapter(options) {
  const createScope = options => {
    const current = wrapInRef(options.current);
    const fallback = wrapInRef(options.fallback);
    const messages = wrapInRef(options.messages);
    return {
      current,
      fallback,
      messages,
      t: createTranslateFunction(current, fallback, messages),
      n: createNumberFunction(current, fallback)
    };
  };

  return {
    createRoot: app => {
      var _options$defaultLocal, _options$fallbackLoca, _options$messages;

      const rootScope = createScope({
        current: (_options$defaultLocal = options == null ? void 0 : options.defaultLocale) != null ? _options$defaultLocal : 'en',
        fallback: (_options$fallbackLoca = options == null ? void 0 : options.fallbackLocale) != null ? _options$fallbackLoca : 'en',
        messages: (_options$messages = options == null ? void 0 : options.messages) != null ? _options$messages : {
          en
        }
      });
      app.provide(VuetifyLocaleSymbol, rootScope);
      return rootScope;
    },
    getScope: () => {
      const currentScope = inject(VuetifyLocaleSymbol);
      if (!currentScope) throw new Error('[Vuetify] Could not find injected locale instance');
      return currentScope;
    },
    createScope: options => {
      const currentScope = inject(VuetifyLocaleSymbol);
      if (!currentScope) throw new Error('[Vuetify] Could not find injected locale instance');
      const newScope = createScope({
        current: computed(() => {
          var _options$locale;

          return (_options$locale = options == null ? void 0 : options.locale) != null ? _options$locale : currentScope.current.value;
        }),
        fallback: computed(() => {
          var _options$locale2;

          return (_options$locale2 = options == null ? void 0 : options.locale) != null ? _options$locale2 : currentScope.fallback.value;
        }),
        messages: computed(() => {
          var _options$messages2;

          return (_options$messages2 = options == null ? void 0 : options.messages) != null ? _options$messages2 : currentScope.messages.value;
        })
      });
      provide(VuetifyLocaleSymbol, newScope);
      return newScope;
    }
  };
}
//# sourceMappingURL=locale.mjs.map