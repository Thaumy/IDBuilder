export const independentSelectStrategy = {
  select: _ref => {
    let {
      id,
      value,
      selected
    } = _ref;
    selected.set(id, value ? 'on' : 'off');
    return selected;
  },
  in: (v, children, parents) => {
    let map = new Map();

    for (const id of v || []) {
      map = independentSelectStrategy.select({
        id,
        value: true,
        selected: new Map(map),
        children,
        parents
      });
    }

    return map;
  },
  out: v => {
    const arr = [];

    for (const [key, value] of v.entries()) {
      if (value === 'on') arr.push(key);
    }

    return arr;
  }
};
export const leafSelectStrategy = function () {
  let single = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  const strategy = {
    select: _ref2 => {
      let {
        id,
        value,
        selected,
        children
      } = _ref2;
      if (children.has(id)) return selected;
      if (single) return new Map([[id, value ? 'on' : 'off']]);
      selected.set(id, value ? 'on' : 'off');
      return selected;
    },
    in: (v, children, parents) => {
      let map = new Map();

      for (const id of v != null ? v : []) {
        map = strategy.select({
          id,
          value: true,
          selected: new Map(map),
          children,
          parents
        });
      }

      return map;
    },
    out: independentSelectStrategy.out
  };
  return strategy;
};
export const classicSelectStrategy = {
  select: _ref3 => {
    let {
      id,
      value,
      selected,
      children,
      parents
    } = _ref3;
    const items = [id];

    while (items.length) {
      const item = items.shift();
      selected.set(item, value ? 'on' : 'off');

      if (children.has(item)) {
        items.push(...children.get(item));
      }
    }

    let parent = parents.get(id);

    while (parent) {
      const childrenIds = children.get(parent);
      const everySelected = childrenIds.every(cid => selected.get(cid) === 'on');
      const noneSelected = childrenIds.every(cid => !selected.has(cid) || selected.get(cid) === 'off');
      selected.set(parent, everySelected ? 'on' : noneSelected ? 'off' : 'indeterminate');
      parent = parents.get(parent);
    }

    return selected;
  },
  in: (v, children, parents) => {
    let map = new Map();

    for (const id of v || []) {
      map = classicSelectStrategy.select({
        id,
        value: true,
        selected: new Map(map),
        children,
        parents
      });
    }

    return map;
  },
  out: (v, children) => {
    const arr = [];

    for (const [key, value] of v.entries()) {
      if (value === 'on' && !children.has(key)) arr.push(key);
    }

    return arr;
  }
};
//# sourceMappingURL=selectStrategies.mjs.map