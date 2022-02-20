import { colorToInt, colorToRGB, createRange, darken, getCurrentInstance, getLuma, intToHex, lighten, mergeDeep, propsFactory } from "../util/index.mjs"; // Utilities

import { computed, inject, provide, ref, watch } from 'vue'; // Types

import { APCAcontrast } from "../util/color/APCA.mjs";
export const ThemeSymbol = Symbol.for('vuetify:theme');
export const makeThemeProps = propsFactory({
  theme: String
}, 'theme');
const defaultThemeOptions = {
  defaultTheme: 'light',
  variations: {
    colors: [],
    lighten: 0,
    darken: 0
  },
  themes: {
    light: {
      dark: false,
      colors: {
        background: '#FFFFFF',
        surface: '#FFFFFF',
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC6',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
      },
      variables: {
        'border-color': '#000000',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'activated-opacity': 0.12,
        'idle-opacity': 0.04,
        'hover-opacity': 0.12,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'dragged-opacity': 0.08,
        'pressed-opacity': 0.16,
        'kbd-background-color': '#212529',
        'kbd-color': '#FFFFFF',
        'code-background-color': '#C2C2C2'
      }
    },
    dark: {
      dark: true,
      colors: {
        background: '#121212',
        surface: '#212121',
        primary: '#BB86FC',
        'primary-darken-1': '#3700B3',
        secondary: '#03DAC5',
        'secondary-darken-1': '#03DAC5',
        error: '#CF6679',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00'
      },
      variables: {
        'border-color': '#FFFFFF',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'activated-opacity': 0.12,
        'idle-opacity': 0.10,
        'hover-opacity': 0.04,
        'focus-opacity': 0.12,
        'selected-opacity': 0.08,
        'dragged-opacity': 0.08,
        'pressed-opacity': 0.16,
        'kbd-background-color': '#212529',
        'kbd-color': '#FFFFFF',
        'code-background-color': '#B7B7B7'
      }
    }
  }
};

const parseThemeOptions = function () {
  let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultThemeOptions;
  if (!options) return { ...defaultThemeOptions,
    isDisabled: true
  };
  return mergeDeep(defaultThemeOptions, options);
}; // Composables


export function createTheme(options) {
  const parsedOptions = parseThemeOptions(options);
  const styleEl = ref();
  const current = ref(parsedOptions.defaultTheme);
  const themes = ref(parsedOptions.themes);
  const variations = ref(parsedOptions.variations);
  const computedThemes = computed(() => {
    return Object.keys(themes.value).reduce((obj, key) => {
      var _parsedOptions$variat;

      const theme = { ...themes.value[key],
        colors: { ...themes.value[key].colors,
          ...((_parsedOptions$variat = parsedOptions.variations.colors) != null ? _parsedOptions$variat : []).reduce((obj, color) => {
            return { ...obj,
              ...genColorVariations(color, themes.value[key].colors[color])
            };
          }, {})
        }
      };

      for (const color of Object.keys(theme.colors)) {
        if (/on-[a-z]/.test(color) || theme.colors[`on-${color}`]) continue;
        const onColor = `on-${color}`;
        const colorVal = colorToInt(theme.colors[color]);
        const blackContrast = Math.abs(APCAcontrast(0, colorVal));
        const whiteContrast = Math.abs(APCAcontrast(0xffffff, colorVal)); // TODO: warn about poor color selections
        // const contrastAsText = Math.abs(APCAcontrast(colorVal, colorToInt(theme.colors.background)))
        // const minContrast = Math.max(blackContrast, whiteContrast)
        // if (minContrast < 60) {
        //   consoleInfo(`${key} theme color ${color} has poor contrast (${minContrast.toFixed()}%)`)
        // } else if (contrastAsText < 60 && !['background', 'surface'].includes(color)) {
        //   consoleInfo(`${key} theme color ${color} has poor contrast as text (${contrastAsText.toFixed()}%)`)
        // }
        // Prefer white text if both have an acceptable contrast ratio

        theme.colors[onColor] = whiteContrast > Math.min(blackContrast, 50) ? '#fff' : '#000';
      }

      obj[key] = theme;
      return obj;
    }, {});
  });

  function genColorVariations(name, color) {
    const obj = {};

    for (const variation of ['lighten', 'darken']) {
      const fn = variation === 'lighten' ? lighten : darken;

      for (const amount of createRange(variations.value[variation], 1)) {
        obj[`${name}-${variation}-${amount}`] = intToHex(fn(colorToInt(color), amount));
      }
    }

    return obj;
  }

  function genCssVariables(name) {
    const theme = computedThemes.value[name];
    if (!theme) throw new Error(`Could not find theme ${name}`);
    const lightOverlay = theme.dark ? 2 : 1;
    const darkOverlay = theme.dark ? 1 : 2;
    const variables = [];

    for (const [key, value] of Object.entries(theme.colors)) {
      const rgb = colorToRGB(value);
      variables.push(`--v-theme-${key}: ${rgb.r},${rgb.g},${rgb.b}`);

      if (!key.startsWith('on-')) {
        variables.push(`--v-theme-${key}-overlay-multiplier: ${getLuma(value) > 0.18 ? lightOverlay : darkOverlay}`);
      }
    }

    return variables;
  }

  function genStyleElement() {
    if (typeof document === 'undefined' || styleEl.value) return;
    const el = document.createElement('style');
    el.type = 'text/css';
    el.id = 'vuetify-theme-stylesheet';
    styleEl.value = el;
    document.head.appendChild(styleEl.value);
  }

  function createCssClass(selector, content) {
    return [`${selector} {\n`, ...content.map(line => `  ${line};\n`), '}\n'];
  }

  function updateStyles() {
    if (parsedOptions.isDisabled) return;
    genStyleElement();
    const lines = [];

    for (const themeName of Object.keys(computedThemes.value)) {
      const variables = computedThemes.value[themeName].variables;
      lines.push(...createCssClass(`.v-theme--${themeName}`, [...genCssVariables(themeName), ...Object.keys(variables).map(key => {
        const value = variables[key];
        const color = typeof value === 'string' && value.startsWith('#') ? colorToRGB(value) : undefined;
        const rgb = color ? `${color.r}, ${color.g}, ${color.b}` : undefined;
        return `--v-${key}: ${rgb != null ? rgb : value}`;
      })]));
    } // Assumption is that all theme objects have the same keys, so it doesn't matter which one
    // we use since the values are all css variables.


    const firstTheme = Object.keys(computedThemes.value)[0];

    for (const key of Object.keys(computedThemes.value[firstTheme].colors)) {
      if (/on-[a-z]/.test(key)) {
        lines.push(...createCssClass(`.${key}`, [`color: rgb(var(--v-theme-${key}))`]));
      } else {
        lines.push(...createCssClass(`.bg-${key}`, [`--v-theme-overlay-multiplier: var(--v-theme-${key}-overlay-multiplier)`, `background: rgb(var(--v-theme-${key}))`, `color: rgb(var(--v-theme-on-${key}))`]), ...createCssClass(`.text-${key}`, [`color: rgb(var(--v-theme-${key}))`]), ...createCssClass(`.border-${key}`, [`--v-border-color: var(--v-theme-${key})`]));
      }
    }

    if (styleEl.value) styleEl.value.innerHTML = lines.map((str, i) => i === 0 ? str : `    ${str}`).join('');
  }

  watch(themes, updateStyles, {
    deep: true,
    immediate: true
  });
  return {
    isDisabled: parsedOptions.isDisabled,
    themes: computedThemes,
    setTheme: (key, theme) => themes.value[key] = theme,
    getTheme: key => computedThemes.value[key],
    current,
    themeClasses: computed(() => parsedOptions.isDisabled ? undefined : `v-theme--${current.value}`)
  };
}
/**
 * Used to either set up and provide a new theme instance, or to pass
 * along the closest available already provided instance.
 */

export function useTheme(props) {
  getCurrentInstance('useTheme');
  const theme = inject(ThemeSymbol, null);
  if (!theme) throw new Error('Could not find Vuetify theme injection');
  const current = computed(() => {
    var _props$theme;

    return (_props$theme = props.theme) != null ? _props$theme : theme == null ? void 0 : theme.current.value;
  });
  const themeClasses = computed(() => theme.isDisabled ? undefined : `v-theme--${current.value}`);
  const newTheme = { ...theme,
    current,
    themeClasses
  };
  provide(ThemeSymbol, newTheme);
  return newTheme;
}
//# sourceMappingURL=theme.mjs.map