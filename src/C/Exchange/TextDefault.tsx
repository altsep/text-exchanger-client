import React from 'react';
import { themeT } from '../../ThemeContext';

export interface userTextPropsI {
  isLoading: boolean;
    isCreator: boolean;
    textElementType: string;
    creatorText: string;
    guestText: string;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    theme: themeT;
  }

export default function TextDefault(props: userTextPropsI) {
  const { isLoading, isCreator, textElementType, creatorText, guestText, handleChange, theme } = props;

  const setTextAreaHeight = () => {
    const el = document.querySelector('textarea');
    if (el) {
      el.style.setProperty('height', 'auto');
      el.style.setProperty('height', el.scrollHeight + 'px');
    }
  };

  React.useEffect(() => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!isLoading && textarea) {
      setTextAreaHeight();
      if (textarea.value.length === 0) {
        textarea.style.setProperty('height', '60px');
      }
      const valueLength = textarea.value.length * 2;
      textarea.selectionStart = valueLength;
    }
  }, [isLoading, textElementType]);

  // Resize textarea on input or window resize
  React.useEffect(() => {
    const textarea = document.querySelector('textarea');
    if (textarea) {
      textarea.addEventListener('input', setTextAreaHeight);
      window.addEventListener('resize', setTextAreaHeight);
    }
    return () => {
      if (textarea) {
        textarea.removeEventListener('input', setTextAreaHeight);
        window.removeEventListener('resize', setTextAreaHeight);
      }
    };
  }, [isLoading]);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h1 className='curs'>Edit your text</h1>
      <textarea
        className={`${
          theme && theme.userText
        } shadow-inner shadow-black/25 placeholder:text-base placeholder:font-mono overflow-y-hidden resize-none focus:outline-none`}
        placeholder='Enter text here...'
        value={isCreator ? creatorText : guestText}
        onChange={handleChange}
        autoFocus
      />
    </div>
  );
}
