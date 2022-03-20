export const classicActiveStrategy = single => {
  return _ref => {
    let {
      id,
      value,
      active
    } = _ref;
    const newActive = single ? new Set() : active;

    if (value) {
      newActive.add(id);
    } else {
      newActive.delete(id);
    }

    return newActive;
  };
};
//# sourceMappingURL=activeStrategies.mjs.map