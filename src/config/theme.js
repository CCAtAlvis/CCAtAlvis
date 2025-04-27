export const colorPalettes = {
  gold: {
    primary: {
      50: '#fefce8',
      100: '#fef9c3',
      200: '#fef08a',
      300: '#fde047',
      400: '#facc15',
      500: '#eab308',
      600: '#ca8a04',
      700: '#a16207',
      800: '#854d0e',
      900: '#713f12',
    },
    secondary: {
      50: '#fff7ed',
      100: '#ffedd5',
      200: '#fed7aa',
      300: '#fdba74',
      400: '#fb923c',
      500: '#f97316',
      600: '#ea580c',
      700: '#c2410c',
      800: '#9a3412',
      900: '#7c2d12',
    }
  },
  yellow: {
    primary: {
      50:  '#fffde7',
      100: '#fff9c4',
      200: '#fff59d',
      300: '#fff176',
      400: '#ffee58',
      500: '#ffeb3b',
      600: '#fdd835',
      700: '#fbc02d',
      800: '#f9a825',
      900: '#f57f17',
    },
    secondary: {
      50:  '#fffbe6',
      100: '#fff1b8',
      200: '#ffe066',
      300: '#ffd700',
      400: '#ffca28',
      500: '#ffc107',
      600: '#ffb300',
      700: '#ffa000',
      800: '#ff8f00',
      900: '#ff6f00',
    }
  },
  blue: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
    },
    secondary: {
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    }
  },
  purple: {
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },
    secondary: {
      50: '#fff1f2',
      100: '#ffe4e6',
      200: '#fecdd3',
      300: '#fda4af',
      400: '#fb7185',
      500: '#f43f5e',
      600: '#e11d48',
      700: '#be123c',
      800: '#9f1239',
      900: '#881337',
    }
  },
  green: {
    primary: {
      50:  '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    secondary: {
      50:  '#f6ffed',
      100: '#d9f7be',
      200: '#b7eb8f',
      300: '#95de64',
      400: '#73d13d',
      500: '#52c41a',
      600: '#389e0d',
      700: '#237804',
      800: '#135200',
      900: '#092b00',
    }
  },
  red: {
    primary: {
      50:  '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },
    secondary: {
      50:  '#fff1f0',
      100: '#ffccc7',
      200: '#ffa39e',
      300: '#ff7875',
      400: '#ff4d4f',
      500: '#f5222d',
      600: '#cf1322',
      700: '#a8071a',
      800: '#820014',
      900: '#5c0011',
    }
  },
  teal: {
    primary: {
      50:  '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    secondary: {
      50:  '#e6fffb',
      100: '#b5f5ec',
      200: '#87e8de',
      300: '#5cdbd3',
      400: '#36cfc9',
      500: '#13c2c2',
      600: '#08979c',
      700: '#006d75',
      800: '#00474f',
      900: '#002329',
    }
  }
}

// Default palette for build-time configuration
export const getDefaultPalette = () => colorPalettes.purple

// Browser-only function for getting current palette
export const getCurrentPalette = () => {
  if (typeof window === 'undefined') {
    return getDefaultPalette()
  }
  const savedPalette = localStorage.getItem('colorPalette') || 'purple'
  return colorPalettes[savedPalette]
}

export const setColorPalette = (paletteName) => {
  if (colorPalettes[paletteName]) {
    localStorage.setItem('colorPalette', paletteName)
    window.location.reload()
  }
}