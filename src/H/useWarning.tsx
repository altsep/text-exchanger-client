import React from 'react';
import { useThemeContext } from '../ThemeContext';

export default function useWarning(
  text: string,
  defaultDisplay?: string | null,
  margin?: string | null
) {
  const [display, setDisplay] = React.useState<string>(
    defaultDisplay || 'hidden'
  );
  const [buttonOpacity, setButtonOpacity] = React.useState<string>('opacity-0');
  const { theme } = useThemeContext();
  const warning = (
    <div
      className={`${
        theme && theme.system
      } ${display} flex-row justify-center text-center hover:opacity-60 cursor-pointer w-full ${margin}`}
      title='Hide'
      onClick={() => setDisplay('hidden')}
      onMouseEnter={() => setButtonOpacity('opacity-60')}
      onMouseLeave={() => setButtonOpacity('opacity-0')}
    >
      <p>{text}</p>&nbsp;
      <button className={buttonOpacity}>x</button>
    </div>
  );
  return { warning, warningDisplay: display, setWarningDisplay: setDisplay };
}
