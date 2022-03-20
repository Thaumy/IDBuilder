function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// @ts-nocheck

/* eslint-disable */
// Extensions
import { Service } from "../service/index.mjs"; // Types

export class Breakpoint extends Service {
  // Public
  // Value is xs to match v2.x functionality
  // TODO: Add functionality to detect this dynamically in v3
  // Value is true to match v2.x functionality
  constructor(preset) {
    super();

    _defineProperty(this, "xs", false);

    _defineProperty(this, "sm", false);

    _defineProperty(this, "md", false);

    _defineProperty(this, "lg", false);

    _defineProperty(this, "xl", false);

    _defineProperty(this, "xsOnly", false);

    _defineProperty(this, "smOnly", false);

    _defineProperty(this, "smAndDown", false);

    _defineProperty(this, "smAndUp", false);

    _defineProperty(this, "mdOnly", false);

    _defineProperty(this, "mdAndDown", false);

    _defineProperty(this, "mdAndUp", false);

    _defineProperty(this, "lgOnly", false);

    _defineProperty(this, "lgAndDown", false);

    _defineProperty(this, "lgAndUp", false);

    _defineProperty(this, "xlOnly", false);

    _defineProperty(this, "name", 'xs');

    _defineProperty(this, "height", 0);

    _defineProperty(this, "width", 0);

    _defineProperty(this, "mobile", true);

    _defineProperty(this, "resizeTimeout", 0);

    const {
      mobileBreakpoint,
      scrollBarWidth,
      thresholds
    } = preset[Breakpoint.property];
    this.mobileBreakpoint = mobileBreakpoint;
    this.scrollBarWidth = scrollBarWidth;
    this.thresholds = thresholds;
  }

  init() {
    this.update();
    /* istanbul ignore if */

    if (typeof window === 'undefined') return;
    window.addEventListener('resize', this.onResize.bind(this), {
      passive: true
    });
  }
  /* eslint-disable-next-line max-statements */


  update() {
    let ssr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    const height = ssr ? 0 : this.getClientHeight();
    const width = ssr ? 0 : this.getClientWidth();
    const xs = width < this.thresholds.xs;
    const sm = width < this.thresholds.sm && !xs;
    const md = width < this.thresholds.md - this.scrollBarWidth && !(sm || xs);
    const lg = width < this.thresholds.lg - this.scrollBarWidth && !(md || sm || xs);
    const xl = width >= this.thresholds.lg - this.scrollBarWidth;
    this.height = height;
    this.width = width;
    this.xs = xs;
    this.sm = sm;
    this.md = md;
    this.lg = lg;
    this.xl = xl;
    this.xsOnly = xs;
    this.smOnly = sm;
    this.smAndDown = (xs || sm) && !(md || lg || xl);
    this.smAndUp = !xs && (sm || md || lg || xl);
    this.mdOnly = md;
    this.mdAndDown = (xs || sm || md) && !(lg || xl);
    this.mdAndUp = !(xs || sm) && (md || lg || xl);
    this.lgOnly = lg;
    this.lgAndDown = (xs || sm || md || lg) && !xl;
    this.lgAndUp = !(xs || sm || md) && (lg || xl);
    this.xlOnly = xl;

    switch (true) {
      case xs:
        this.name = 'xs';
        break;

      case sm:
        this.name = 'sm';
        break;

      case md:
        this.name = 'md';
        break;

      case lg:
        this.name = 'lg';
        break;

      default:
        this.name = 'xl';
        break;
    }

    if (typeof this.mobileBreakpoint === 'number') {
      this.mobile = width < parseInt(this.mobileBreakpoint, 10);
      return;
    }

    const breakpoints = {
      xs: 0,
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4
    };
    const current = breakpoints[this.name];
    const max = breakpoints[this.mobileBreakpoint];
    this.mobile = current <= max;
  }

  onResize() {
    clearTimeout(this.resizeTimeout); // Added debounce to match what
    // v-resize used to do but was
    // removed due to a memory leak
    // https://github.com/vuetifyjs/vuetify/pull/2997

    this.resizeTimeout = window.setTimeout(this.update.bind(this), 200);
  } // Cross-browser support as described in:
  // https://stackoverflow.com/questions/1248081


  getClientWidth() {
    /* istanbul ignore if */
    if (typeof document === 'undefined') return 0; // SSR

    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  getClientHeight() {
    /* istanbul ignore if */
    if (typeof document === 'undefined') return 0; // SSR

    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

}

_defineProperty(Breakpoint, "property", 'breakpoint');
//# sourceMappingURL=index.mjs.map