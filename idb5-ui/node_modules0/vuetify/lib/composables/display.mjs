// Utilities
import { inject, reactive, ref, toRefs, watchEffect } from 'vue';
import { mergeDeep } from "../util/index.mjs"; // Globals

import { IN_BROWSER, SUPPORTS_TOUCH } from "../util/globals.mjs"; // Types

export const DisplaySymbol = Symbol.for('vuetify:display');
const defaultDisplayOptions = {
  mobileBreakpoint: 'lg',
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
    xxl: 2560
  }
};

const parseDisplayOptions = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultDisplayOptions;
  return mergeDeep(defaultDisplayOptions, options);
}; // Cross-browser support as described in:
// https://stackoverflow.com/questions/1248081


function getClientWidth() {
  return IN_BROWSER ? Math.max(document.documentElement.clientWidth, window.innerWidth) : 0; // SSR
}

function getClientHeight() {
  return IN_BROWSER ? Math.max(document.documentElement.clientHeight, window.innerHeight) : 0; // SSR
}

function getPlatform() {
  const userAgent = IN_BROWSER ? window.navigator.userAgent : 'ssr';

  function match(regexp) {
    return Boolean(userAgent.match(regexp));
  }

  const android = match(/android/i);
  const ios = match(/iphone|ipad|ipod/i);
  const cordova = match(/cordova/i);
  const electron = match(/electron/i);
  const chrome = match(/chrome/i);
  const edge = match(/edge/i);
  const firefox = match(/firefox/i);
  const opera = match(/opera/i);
  const win = match(/win/i);
  const mac = match(/mac/i);
  const linux = match(/linux/i);
  const ssr = match(/ssr/i);
  return {
    android,
    ios,
    cordova,
    electron,
    chrome,
    edge,
    firefox,
    opera,
    win,
    mac,
    linux,
    touch: SUPPORTS_TOUCH,
    ssr
  };
}

export function createDisplay(options) {
  const {
    thresholds,
    mobileBreakpoint
  } = parseDisplayOptions(options);
  const height = ref(getClientHeight());
  const platform = getPlatform();
  const state = reactive({});
  const width = ref(getClientWidth());

  function onResize() {
    height.value = getClientHeight();
    width.value = getClientWidth();
  } // eslint-disable-next-line max-statements


  watchEffect(() => {
    const xs = width.value < thresholds.sm;
    const sm = width.value < thresholds.md && !xs;
    const md = width.value < thresholds.lg && !(sm || xs);
    const lg = width.value < thresholds.xl && !(md || sm || xs);
    const xl = width.value < thresholds.xxl && !(lg || md || sm || xs);
    const xxl = width.value >= thresholds.xxl;
    const name = xs ? 'xs' : sm ? 'sm' : md ? 'md' : lg ? 'lg' : xl ? 'xl' : 'xxl';
    const breakpointValue = typeof mobileBreakpoint === 'number' ? mobileBreakpoint : thresholds[mobileBreakpoint];
    const mobile = !platform.ssr ? width.value < breakpointValue : platform.android || platform.ios || platform.opera;
    state.xs = xs;
    state.sm = sm;
    state.md = md;
    state.lg = lg;
    state.xl = xl;
    state.xxl = xxl;
    state.smAndUp = !xs;
    state.mdAndUp = !(xs || sm);
    state.lgAndUp = !(xs || sm || md);
    state.xlAndUp = !(xs || sm || md || lg);
    state.smAndDown = !(md || lg || xl || xxl);
    state.mdAndDown = !(lg || xl || xxl);
    state.lgAndDown = !(xl || xxl);
    state.xlAndDown = !xxl;
    state.name = name;
    state.height = height.value;
    state.width = width.value;
    state.mobile = mobile;
    state.mobileBreakpoint = mobileBreakpoint;
    state.platform = platform;
    state.thresholds = thresholds;
  });

  if (IN_BROWSER) {
    window.addEventListener('resize', onResize, {
      passive: true
    });
  }

  return toRefs(state);
}
export function useDisplay() {
  const display = inject(DisplaySymbol);
  if (!display) throw new Error('Could not find Vuetify display injection');
  return display;
}
//# sourceMappingURL=display.mjs.map