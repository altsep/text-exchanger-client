import React from 'react';
import { themeI } from '../../ThemeContext';

export interface userTextPropsI {
  theme: themeI;
  isCreator: boolean;
  textElementType: string;
  creatorText: string;
  guestText: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  gotText: boolean;
}

export default function TextArea(props: userTextPropsI) {
  const { theme, isCreator, creatorText, guestText, handleChange, gotText } =
    props;

  const setTextAreaHeight = () => {
    const ta = document.querySelector('textarea') as HTMLTextAreaElement;
    if (ta) {
      if (ta.value.length === 0) {
        ta.style.height = '60px';
      } else {
        ta.style.height = 'auto';
        ta.style.height = ta.scrollHeight + 'px';
      }
    }
  };

  React.useEffect(() => {
    const ta = document.querySelector('textarea') as HTMLTextAreaElement;
    if (ta) {
      setTextAreaHeight();
      ta.selectionStart = ta.value.length;
    }
  }, [gotText]);

  React.useEffect(() => {
    const ta = document.querySelector('textarea');
    if (ta) {
      ta.addEventListener('input', setTextAreaHeight);
    }
    window.addEventListener('resize', setTextAreaHeight);
    return () => {
      if (ta) {
        ta.removeEventListener('input', setTextAreaHeight);
      }
      window.removeEventListener('resize', setTextAreaHeight);
    };
  }, [gotText]);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h1 className='curs'>Edit your text</h1>
      <textarea
        className={`${theme.userText} shadow-inner shadow-black/25 placeholder:text-base placeholder:font-mono overflow-y-hidden resize-none focus:outline-none`}
        placeholder={gotText ? 'Enter text here...' : 'Getting data...'}
        value={isCreator ? creatorText : guestText}
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
}
