import { DevToolsTheme, ThemeMode } from '../../core';

function isLightColor(hex: string): boolean {
  if (!hex || typeof hex !== 'string') return false;
  const color = hex.replace('#', '');
  let r = 0;
  let g = 0;
  let b = 0;
  if (color.length === 3) {
    const c0 = color.substring(0, 1);
    const c1 = color.substring(1, 2);
    const c2 = color.substring(2, 3);
    r = parseInt(c0 + c0, 16);
    g = parseInt(c1 + c1, 16);
    b = parseInt(c2 + c2, 16);
  } else if (color.length === 6) {
    r = parseInt(color.substring(0, 2), 16);
    g = parseInt(color.substring(2, 4), 16);
    b = parseInt(color.substring(4, 6), 16);
  } else {
    return false;
  }
  if (isNaN(r) || isNaN(g) || isNaN(b)) return false;
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128;
}

export function applyThemeVariables(
  container: HTMLElement,
  theme?: DevToolsTheme,
  effectiveMode?: ThemeMode
) {
  if (!theme) {
    clearAllThemeOverrides(container);
    return;
  }

  const isModeToggled = Boolean(theme.mode && effectiveMode && theme.mode !== effectiveMode);

  if (isModeToggled) {
    clearAllThemeOverrides(container);
  } else {
    if (theme.backgroundColor) {
      container.style.setProperty('--dev-bg', theme.backgroundColor);
      container.style.setProperty('--dev-bg-200', theme.backgroundColor);
      container.style.setProperty('--dev-bg-300', theme.backgroundColor);

      // Auto contrast text & card colors based on background brightness
      const lightBg = isLightColor(theme.backgroundColor);
      if (!theme.textColor) {
        container.style.setProperty('--dev-text', lightBg ? '#0f172a' : '#e2e8f0');
        container.style.setProperty('--dev-text-bright', lightBg ? '#020617' : '#f8fafc');
      }
      if (!theme.textMutedColor) {
        container.style.setProperty('--dev-text-muted', lightBg ? '#64748b' : '#94a3b8');
      }
      if (!theme.cardBackgroundColor) {
        container.style.setProperty('--dev-card-bg', lightBg ? '#ffffff' : '#141417');
      }
      if (!theme.cardBorderColor) {
        container.style.setProperty('--dev-card-border', lightBg ? '#e2e8f0' : '#292932');
      }
      if (!theme.borderColor) {
        container.style.setProperty('--dev-border', lightBg ? '#e2e8f0' : '#22222a');
      }
    } else {
      container.style.removeProperty('--dev-bg');
      container.style.removeProperty('--dev-bg-200');
      container.style.removeProperty('--dev-bg-300');
    }

    if (theme.cardBackgroundColor) {
      container.style.setProperty('--dev-card-bg', theme.cardBackgroundColor);
    }

    if (theme.cardBorderColor) {
      container.style.setProperty('--dev-card-border', theme.cardBorderColor);
    }

    if (theme.borderColor) {
      container.style.setProperty('--dev-border', theme.borderColor);
    }

    if (theme.textColor) {
      container.style.setProperty('--dev-text', theme.textColor);
      container.style.setProperty('--dev-text-bright', theme.textColor);
    }

    if (theme.textMutedColor) {
      container.style.setProperty('--dev-text-muted', theme.textMutedColor);
    }
  }

  // Accent color
  if (theme.accentColor) {
    container.style.setProperty('--dev-accent', theme.accentColor);
    container.style.setProperty('--dev-method-get-text', theme.accentColor);
    container.style.setProperty('--dev-method-get-border', theme.accentColor);
  } else {
    container.style.removeProperty('--dev-accent');
    container.style.removeProperty('--dev-method-get-text');
    container.style.removeProperty('--dev-method-get-border');
  }

  if (theme.errorColor) {
    container.style.setProperty('--dev-error', theme.errorColor);
  } else {
    container.style.removeProperty('--dev-error');
  }

  if (theme.warningColor) {
    container.style.setProperty('--dev-warn', theme.warningColor);
  } else {
    container.style.removeProperty('--dev-warn');
  }

  if (theme.successColor) {
    container.style.setProperty('--dev-success', theme.successColor);
  } else {
    container.style.removeProperty('--dev-success');
  }

  if (theme.fontFamily) {
    container.style.setProperty('--dev-font-sans', theme.fontFamily);
    container.style.setProperty('--dev-font-mono', theme.fontFamily);
  } else {
    container.style.removeProperty('--dev-font-sans');
    container.style.removeProperty('--dev-font-mono');
  }
}

function clearAllThemeOverrides(container: HTMLElement) {
  container.style.removeProperty('--dev-bg');
  container.style.removeProperty('--dev-bg-200');
  container.style.removeProperty('--dev-bg-300');
  container.style.removeProperty('--dev-card-bg');
  container.style.removeProperty('--dev-card-border');
  container.style.removeProperty('--dev-border');
  container.style.removeProperty('--dev-text');
  container.style.removeProperty('--dev-text-bright');
  container.style.removeProperty('--dev-text-muted');
  container.style.removeProperty('--dev-accent');
  container.style.removeProperty('--dev-method-get-text');
  container.style.removeProperty('--dev-method-get-border');
  container.style.removeProperty('--dev-error');
  container.style.removeProperty('--dev-warn');
  container.style.removeProperty('--dev-success');
  container.style.removeProperty('--dev-font-sans');
  container.style.removeProperty('--dev-font-mono');
}
