export const singleOpenStrategy = _ref => {
  let {
    id,
    value,
    opened,
    parents
  } = _ref;

  if (value) {
    const newOpened = new Set();
    newOpened.add(id);
    let parent = parents.get(id);

    while (parent != null) {
      newOpened.add(parent);
      parent = parents.get(parent);
    }

    return newOpened;
  } else {
    opened.delete(id);
    return opened;
  }
};
export const multipleOpenStrategy = _ref2 => {
  let {
    id,
    value,
    opened,
    parents
  } = _ref2;

  if (value) {
    let parent = parents.get(id);
    opened.add(id);

    while (parent != null) {
      opened.add(parent);
      parent = parents.get(parent);
    }

    return opened;
  } else {
    opened.delete(id);
  }

  return opened;
};
//# sourceMappingURL=openStrategies.mjs.map