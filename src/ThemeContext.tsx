import React from 'react';
import { themes } from './themes';

export interface themeI {
  default: string;
  btn: string;
  anchor: string;
  userText: string;
  system: string;
  themeMenu: string;
}

export type themeT = themeI;

export interface valueT {
  theme: themeI;
  setTheme: React.Dispatch<React.SetStateAction<themeI>>;
}

function ThemeProvider(props: { children: JSX.Element | JSX.Element[] }) {
  const [theme, setTheme] = React.useState<themeT>({
    default: '',
    btn: '',
    anchor: '',
    userText: '',
    system: '',
    themeMenu: '',
  });
  React.useEffect(() => {
    const storageItem: string | null = localStorage.getItem('theme');
    if (storageItem) {
      setTheme(themes[storageItem]);
    }
  }, []);

  return <Provider value={{ theme, setTheme }}>{props.children}</Provider>;
}

const Context = React.createContext<valueT>({
  theme: themes['black on white'],
  setTheme: () => {
    return;
  },
});
const { Provider, Consumer } = Context;
const useThemeContext = () => React.useContext(Context);

export { Context as ThemeContext, ThemeProvider, Consumer as ThemeConsumer, useThemeContext };
