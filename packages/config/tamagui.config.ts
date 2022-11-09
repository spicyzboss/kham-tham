import { createTamagui, createTheme } from '@my/ui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { themes, tokens } from '@tamagui/theme-base'

import { animations } from './animations'

const headingFont = createInterFont({
  size: {
    6: 15,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    6: '400',
    7: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: -2,
    10: -3,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: { normal: 'Inter' },
  },
})

const bodyFont = createInterFont(
  {
    face: {
      700: { normal: 'Inter' },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.1 + (size > 20 ? 10 : 10)),
  }
)
const dark_Input = createTheme({
  borderColor: "#CD1D8D",
  borderColorHover: '#CD1D8D',
  borderColorPress: '#CD1D8D',
  borderColorFocus: '#CD1D8D',
  background: "#251425",
  backgroundHover: "#251425",
  backgroundPress: "#251425",
  backgroundFocus: "#251425",
  color: "#FFFCFC",
})

const dark_TextArea = createTheme({
  borderColor: "#CD1D8D",
  borderColorHover: '#CD1D8D',
  borderColorPress: '#CD1D8D',
  borderColorFocus: '#CD1D8D',
  background: "#251425",
  backgroundHover: "#251425",
  backgroundPress: "#251425",
  backgroundFocus: "#251425",
  color: "#FFFCFC",
})

const dark_Button = createTheme({
  background: '#F0C000',
  backgroundHover: '#F0C000',
  backgroundPress: '#F0C000',
  backgroundFocus: '#F0C000',
  backgroundTransparent: '#F0C000',
  borderColor: '#F0C000',
  borderColorHover: '#F0C000',
  borderColorPress: '#F0C000',
  borderColorFocus: '#F0C000',
  color: '#341711',
  colorHover: '#341711',
  colorPress: '#341711',
  colorFocus: '#341711',
})

export const config = createTamagui({
  animations,
  defaultTheme: 'dark',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  themes: {
    ...themes,
    dark_Button,
    dark_Input,
    dark_TextArea,
  },
  dark_Button,
  dark_Input,
  dark_TextArea,
  tokens,
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  },
})
