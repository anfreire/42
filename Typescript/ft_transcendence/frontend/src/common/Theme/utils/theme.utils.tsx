import {  Theme, createTheme } from "@mui/material";

export type Color = "primary" | "secondary" | "error" | "warning" | "success";

export class ThemeUtils {
  static readonly dark: Theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  static readonly light: Theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  static getColor(currTheme: "dark" | "light", color: Color) {
    return currTheme === "dark"
      ? ThemeUtils.dark.palette[color].main
      : ThemeUtils.light.palette[color].main;
  }

  static getColorCSS(
    currTheme: "dark" | "light",
    color: Color
  ) {
    return {
      backgroundColor: ThemeUtils.getColor(currTheme, color),
      "&:hover": {
        backgroundColor: ThemeUtils.getColor(currTheme, color),
      },
    };
  }
}
