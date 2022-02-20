/* eslint-disable max-statements */

/* eslint-disable no-labels */
// Utilities
import { getPropertyFromItem, propsFactory, wrapInArray, wrapInRef } from "../util/index.mjs";
import { computed } from 'vue'; // Types

// Composables
export const defaultFilter = (value, query, item) => {
  if (value == null || query == null) return -1;
  return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
};
export const makeFilterProps = propsFactory({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: 'intersection'
  }
}, 'filter');
export function filterItems(items, query, options) {
  var _options$default, _options$customKeyFil;

  const array = []; // always ensure we fallback
  // to a functioning filter

  const filter = (_options$default = options == null ? void 0 : options.default) != null ? _options$default : defaultFilter;
  const keys = options != null && options.filterKeys ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys((_options$customKeyFil = options == null ? void 0 : options.customKeyFilter) != null ? _options$customKeyFil : {}).length;
  if (!(items != null && items.length)) return array;

  loop: for (const item of items) {
    const customMatches = {};
    let defaultMatches = {};
    let match = -1;

    if (typeof item === 'object') {
      const filterKeys = keys || Object.keys(item);

      for (const key of filterKeys) {
        var _options$customKeyFil2;

        const value = getPropertyFromItem(item, key, item);
        const keyFilter = options == null ? void 0 : (_options$customKeyFil2 = options.customKeyFilter) == null ? void 0 : _options$customKeyFil2[key];
        match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);

        if (match !== -1 && match !== false) {
          if (keyFilter) customMatches[key] = match;else defaultMatches[key] = match;
        } else if ((options == null ? void 0 : options.filterMode) === 'every') {
          continue loop;
        }
      }

      const defaultMatchesLength = Object.keys(defaultMatches).length;
      const customMatchesLength = Object.keys(customMatches).length;
      if (!defaultMatchesLength && !customMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === 'union' && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === 'intersection' && (customMatchesLength !== customFiltersLength || !defaultMatchesLength)) continue;
    } else if (typeof item === 'string') {
      match = filter(item, query, item);
      if (match === -1 || match === false) continue;
      defaultMatches = wrapInArray(match);
    }

    array.push({
      item,
      matches: { ...defaultMatches,
        ...customMatches
      }
    });
  }

  return array;
}
export function useFilter(props, items, query) {
  const strQuery = computed(() => typeof (query == null ? void 0 : query.value) !== 'string' && typeof (query == null ? void 0 : query.value) !== 'number' ? '' : String(query.value));
  const filteredItems = computed(() => {
    return filterItems(wrapInRef(items).value, strQuery.value, {
      customKeyFilter: props.customKeyFilter,
      default: props.customFilter,
      filterKeys: props.filterKeys,
      filterMode: props.filterMode
    });
  });
  return {
    filteredItems
  };
}
//# sourceMappingURL=filter.mjs.map