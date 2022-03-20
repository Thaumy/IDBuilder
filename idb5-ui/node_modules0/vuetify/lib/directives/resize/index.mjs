function mounted(el, binding) {
  var _binding$modifiers, _binding$modifiers2;

  const handler = binding.value;
  const options = {
    passive: !((_binding$modifiers = binding.modifiers) != null && _binding$modifiers.active)
  };
  window.addEventListener('resize', handler, options);
  el._onResize = Object(el._onResize);
  el._onResize[binding.instance.$.uid] = {
    handler,
    options
  };

  if (!((_binding$modifiers2 = binding.modifiers) != null && _binding$modifiers2.quiet)) {
    handler();
  }
}

function unmounted(el, binding) {
  var _el$_onResize;

  if (!((_el$_onResize = el._onResize) != null && _el$_onResize[binding.instance.$.uid])) return;
  const {
    handler,
    options
  } = el._onResize[binding.instance.$.uid];
  window.removeEventListener('resize', handler, options);
  delete el._onResize[binding.instance.$.uid];
}

export const Resize = {
  mounted,
  unmounted
};
export default Resize;
//# sourceMappingURL=index.mjs.map