import React from 'react';
import { themeI } from '../../../ThemeContext';

export default function Show(props: {
  theme: themeI;
  textElementType: string;
  setTextElementType: React.Dispatch<React.SetStateAction<string>>;
  isCreator: boolean;
}) {
  const { theme, isCreator, textElementType, setTextElementType } = props;
  const handleTextElementType = () =>
    textElementType === 'default'
      ? setTextElementType('other')
      : setTextElementType('default');
  return (
    <button className={theme.btn} onClick={handleTextElementType}>
      {textElementType === 'default'
        ? isCreator
          ? 'Show guest\'s text'
          : 'Show creator\'s text'
        : 'Show your text'}
    </button>
  );
}
