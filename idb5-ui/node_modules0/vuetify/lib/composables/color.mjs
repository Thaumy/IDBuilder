// Utilities
import { computed, isRef } from 'vue';
import { isCssColor } from "../util/index.mjs"; // Types

// Composables
export function useColor(colors) {
  const backgroundIsCssColor = computed(() => isCssColor(colors.value.background));
  const textIsCssColor = computed(() => isCssColor(colors.value.text));
  const colorClasses = computed(() => {
    const classes = [];

    if (colors.value.background && !backgroundIsCssColor.value) {
      classes.push(`bg-${colors.value.background}`);
    }

    if (colors.value.text && !textIsCssColor.value) {
      classes.push(`text-${colors.value.text}`);
    }

    return classes;
  });
  const colorStyles = computed(() => {
    const styles = {};

    if (colors.value.background && backgroundIsCssColor.value) {
      styles.backgroundColor = colors.value.background;
    }

    if (colors.value.text && textIsCssColor.value) {
      styles.color = colors.value.text;
      styles.caretColor = colors.value.text;
    }

    return styles;
  });
  return {
    colorClasses,
    colorStyles
  };
}
export function useTextColor(props, name) {
  const colors = computed(() => ({
    text: isRef(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: textColorClasses,
    colorStyles: textColorStyles
  } = useColor(colors);
  return {
    textColorClasses,
    textColorStyles
  };
}
export function useBackgroundColor(props, name) {
  const colors = computed(() => ({
    background: isRef(props) ? props.value : name ? props[name] : null
  }));
  const {
    colorClasses: backgroundColorClasses,
    colorStyles: backgroundColorStyles
  } = useColor(colors);
  return {
    backgroundColorClasses,
    backgroundColorStyles
  };
}
//# sourceMappingURL=color.mjs.map