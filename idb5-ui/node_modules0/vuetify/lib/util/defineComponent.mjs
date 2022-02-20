// Utils
import { defineComponent as _defineComponent, getCurrentInstance, shallowReactive, toRaw, watchEffect } from 'vue';
import { consoleWarn } from "./console.mjs";
import { toKebabCase } from "./helpers.mjs";
import { useDefaults } from "../composables/defaults.mjs"; // Types

function propIsDefined(vnode, prop) {
  var _vnode$props, _vnode$props2;

  return ((_vnode$props = vnode.props) == null ? void 0 : _vnode$props.hasOwnProperty(prop)) || ((_vnode$props2 = vnode.props) == null ? void 0 : _vnode$props2.hasOwnProperty(toKebabCase(prop)));
}

export const defineComponent = function defineComponent(options) {
  var _options$_setup;

  options._setup = (_options$_setup = options._setup) != null ? _options$_setup : options.setup;

  if (!options.name) {
    consoleWarn('The component is missing an explicit name, unable to generate default prop value');
    return options;
  }

  if (options._setup) {
    options.setup = function setup(props, ctx) {
      const vm = getCurrentInstance();
      const defaults = useDefaults();

      const _props = shallowReactive({ ...toRaw(props)
      });

      watchEffect(() => {
        const globalDefaults = defaults.value.global;
        const componentDefaults = defaults.value[options.name];

        for (const prop of Object.keys(props)) {
          let newVal;

          if (propIsDefined(vm.vnode, prop)) {
            newVal = props[prop];
          } else {
            var _ref, _componentDefaults$pr;

            newVal = (_ref = (_componentDefaults$pr = componentDefaults == null ? void 0 : componentDefaults[prop]) != null ? _componentDefaults$pr : globalDefaults == null ? void 0 : globalDefaults[prop]) != null ? _ref : props[prop];
          }

          if (_props[prop] !== newVal) {
            _props[prop] = newVal;
          }
        }
      });
      return options._setup(_props, ctx);
    };
  }

  return options;
};
export function genericComponent() {
  let exposeDefaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  return options => (exposeDefaults ? defineComponent : _defineComponent)(options);
}
//# sourceMappingURL=defineComponent.mjs.map