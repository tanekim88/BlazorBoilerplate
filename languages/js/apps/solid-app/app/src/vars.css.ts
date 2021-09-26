import { createGlobalTheme } from "@vanilla-extract/css";
import { materialColors } from "./material-colors";

export const vars = createGlobalTheme(':root', {
  colors: materialColors,
  space: {
    none: '0',
    small: '1rem',
    medium: '2rem',
    large: '3rem'
  }
})