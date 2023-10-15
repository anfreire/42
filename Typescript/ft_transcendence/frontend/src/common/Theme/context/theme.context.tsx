import { Theme, createTheme } from "@mui/material";
import React, { useState } from "react";

export interface ThemeProps {
  dark: Theme;
  light: Theme;
  currTheme: "light" | "dark";
  setCurrTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  accentColor: string;
  setAccentColor: React.Dispatch<React.SetStateAction<string>>;
}

const themeContext = React.createContext<ThemeProps | undefined>(undefined);

export function ThemeProvider({ children }: any) {
  const [currTheme, setCurrTheme] = useState<"light" | "dark">("dark");
  const [accentColor, setAccentColor] = useState<string>("#90caf9");

  return (
    <themeContext.Provider
      value={{
        dark: createTheme({
          palette: {
            mode: "dark",
          },
        }),
        light: createTheme({
          palette: {
            mode: "light",
          },
        }),
        currTheme: currTheme,
        setCurrTheme: setCurrTheme,
        accentColor: accentColor,
        setAccentColor: setAccentColor,
      }}
    >
      {children}
    </themeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(themeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
