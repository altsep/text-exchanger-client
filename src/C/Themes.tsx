import React from 'react';
import { themes } from '../styles';
import { useThemeContext } from '../ThemeContext';

export default function ThemeProvider() {
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const { theme, setTheme } = useThemeContext();
  const themeList = Object.keys(themes);
  return (
    <div className={`${theme && theme.dropdown} absolute top-0 right-0 z-10`}>
      {isActive ? (
        themeList.map((item) => (
          <p
            key={item}
            onClick={() => {
              import('../styles').then(({ defineTheme }) => defineTheme(item));
              setTheme(themes[item]);
              setIsActive(false);
            }}
          >
            {item}
          </p>
        ))
      ) : (
        <p
          onClick={() => {
            setIsActive(true);
          }}
        >
          theme
        </p>
      )}
    </div>
  );
}
