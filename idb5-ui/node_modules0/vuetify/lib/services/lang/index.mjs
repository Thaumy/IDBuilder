function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-nocheck

/* eslint-disable */
// Extensions
import { Service } from "../service/index.mjs"; // Utilities

import { getObjectValueByPath } from "../../util/helpers.mjs";
import { consoleError, consoleWarn } from "../../util/console.mjs"; // Types

const LANG_PREFIX = '$vuetify.';
const fallback = Symbol('Lang fallback');

function getTranslation(locale, key) {
  let usingDefault = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  let defaultLocale = arguments.length > 3 ? arguments[3] : undefined;
  const shortKey = key.replace(LANG_PREFIX, '');
  let translation = getObjectValueByPath(locale, shortKey, fallback);

  if (translation === fallback) {
    if (usingDefault) {
      consoleError(`Translation key "${shortKey}" not found in fallback`);
      translation = key;
    } else {
      consoleWarn(`Translation key "${shortKey}" not found, falling back to default`);
      translation = getTranslation(defaultLocale, key, true, defaultLocale);
    }
  }

  return translation;
}

export class Lang extends Service {
  constructor(preset) {
    super();

    _defineProperty(this, "defaultLocale", 'en');

    const {
      current,
      locales,
      t
    } = preset[Lang.property];
    this.current = current;
    this.locales = locales;
    this.translator = t || this.defaultTranslator;
  }

  currentLocale(key) {
    const translation = this.locales[this.current];
    const defaultLocale = this.locales[this.defaultLocale];
    return getTranslation(translation, key, false, defaultLocale);
  }

  t(key) {
    for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (!key.startsWith(LANG_PREFIX)) return this.replace(key, params);
    return this.translator(key, ...params);
  }

  defaultTranslator(key) {
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }

    return this.replace(this.currentLocale(key), params);
  }

  replace(str, params) {
    return str.replace(/\{(\d+)\}/g, (match, index) => {
      /* istanbul ignore next */
      return String(params[+index]);
    });
  }

}

_defineProperty(Lang, "property", 'lang');
//# sourceMappingURL=index.mjs.map