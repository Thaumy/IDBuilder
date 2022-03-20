import { useProxiedModel } from "../proxiedModel.mjs";
import { getUid, propsFactory } from "../../util/index.mjs";
import { computed, inject, onBeforeUnmount, provide, ref } from 'vue';
import { multipleOpenStrategy, singleOpenStrategy } from "./openStrategies.mjs";
import { classicSelectStrategy, independentSelectStrategy, leafSelectStrategy } from "./selectStrategies.mjs";
import { classicActiveStrategy } from "./activeStrategies.mjs"; // Types

const VNestedSymbol = Symbol.for('vuetify:nested');
const emptyNested = {
  id: ref(null),
  root: {
    register: () => null,
    unregister: () => null,
    parents: ref(new Map()),
    children: ref(new Map()),
    open: () => null,
    select: () => null,
    opened: ref(new Set()),
    selected: ref(new Map()),
    active: ref(new Set()),
    activate: () => null,
    selectedValues: ref([])
  }
};
export const makeNestedProps = propsFactory({
  selectStrategy: [String, Function],
  openStrategy: [String, Function],
  activeStrategy: [String, Function],
  opened: Array,
  selected: Array,
  active: Array
}, 'nested');
export const useNested = props => {
  let isUnmounted = false;
  const children = ref(new Map());
  const parents = ref(new Map());
  const opened = useProxiedModel(props, 'opened', props.opened, v => new Set(v), v => [...v.values()]);
  const active = useProxiedModel(props, 'active', props.active, v => new Set(v), v => [...v.values()]);
  const activeStrategy = computed(() => {
    if (typeof props.activeStrategy === 'object') return props.activeStrategy;

    switch (props.activeStrategy) {
      case 'single':
        return classicActiveStrategy(true);

      case 'multiple':
      default:
        return classicActiveStrategy();
    }
  });
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === 'object') return props.selectStrategy;

    switch (props.selectStrategy) {
      case 'single-leaf':
        return leafSelectStrategy(true);

      case 'leaf':
        return leafSelectStrategy();

      case 'independent':
        return independentSelectStrategy;

      case 'classic':
      default:
        return classicSelectStrategy;
    }
  });
  const openStrategy = computed(() => {
    if (typeof props.openStrategy === 'function') return props.openStrategy;

    switch (props.openStrategy) {
      case 'single':
        return singleOpenStrategy;

      case 'multiple':
      default:
        return multipleOpenStrategy;
    }
  });
  const selected = useProxiedModel(props, 'selected', props.selected, v => selectStrategy.value.in(v, children.value, parents.value), v => selectStrategy.value.out(v, children.value, parents.value));
  onBeforeUnmount(() => {
    isUnmounted = true;
  });
  const nested = {
    id: ref(null),
    root: {
      opened,
      selected,
      active,
      selectedValues: computed(() => {
        const arr = [];

        for (const [key, value] of selected.value.entries()) {
          if (value === 'on') arr.push(key);
        }

        return arr;
      }),
      register: (id, parentId, isGroup) => {
        parentId && parents.value.set(id, parentId);
        isGroup && children.value.set(id, []);

        if (parentId != null) {
          children.value.set(parentId, [...(children.value.get(parentId) || []), id]);
        }
      },
      unregister: id => {
        if (isUnmounted) return;
        children.value.delete(id);
        const parent = parents.value.get(id);

        if (parent) {
          var _children$value$get;

          const list = (_children$value$get = children.value.get(parent)) != null ? _children$value$get : [];
          children.value.set(parent, list.filter(child => child !== id));
        }

        parents.value.delete(id);
        opened.value.delete(id);
        active.value.delete(id);
        selected.value.delete(id);
      },
      open: (id, value, event) => {
        const newOpened = openStrategy.value({
          id,
          value,
          opened: new Set(opened.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newOpened && (opened.value = newOpened);
      },
      select: (id, value, event) => {
        const newSelected = selectStrategy.value.select({
          id,
          value,
          selected: new Map(selected.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newSelected && (selected.value = newSelected);
      },
      activate: (id, value, event) => {
        const newActive = activeStrategy.value({
          id,
          value,
          active: new Set(active.value),
          children: children.value,
          parents: parents.value,
          event
        });
        newActive && (active.value = newActive);
      },
      children,
      parents
    }
  };
  provide(VNestedSymbol, nested);
  return nested.root;
};
export const useNestedItem = id => {
  const parent = inject(VNestedSymbol, emptyNested);
  const computedId = computed(() => {
    var _id$value;

    return (_id$value = id.value) != null ? _id$value : getUid().toString();
  });
  const item = { ...parent,
    id: computedId,
    parent: computed(() => parent.root.parents.value.get(computedId.value)),
    select: (selected, e) => parent.root.select(computedId.value, selected, e),
    isSelected: computed(() => parent.root.selected.value.get(computedId.value) === 'on'),
    activate: (activated, e) => parent.root.activate(computedId.value, activated, e),
    isActive: computed(() => parent.root.active.value.has(computedId.value))
  };
  parent.root.register(computedId.value, parent.id.value, false);
  onBeforeUnmount(() => {
    parent.root.unregister(computedId.value);
  });
  return item;
};
export const useNestedGroup = props => {
  const parent = inject(VNestedSymbol, emptyNested);
  const id = computed(() => {
    var _props$value;

    return (_props$value = props.value) != null ? _props$value : getUid().toString();
  });
  const group = { ...parent,
    id,
    open: (open, e) => parent.root.open(id.value, open, e),
    isOpen: computed(() => parent.root.opened.value.has(id.value)),
    isSelected: computed(() => parent.root.selected.value.get(id.value) === 'on'),
    isIndeterminate: computed(() => parent.root.selected.value.get(id.value) === 'indeterminate')
  };
  parent.root.register(id.value, parent.id.value, true);
  onBeforeUnmount(() => {
    parent.root.unregister(id.value);
  });
  provide(VNestedSymbol, group);
  return group;
};
//# sourceMappingURL=nested.mjs.map