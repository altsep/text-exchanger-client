import React from 'react';
import { useThemeContext } from '../ThemeContext';

export default function Foot() {
  const { theme } = useThemeContext();
  return (
    <div
      className={`${
        theme && theme.system
      }  absolute bottom-0 left-1/2 -translate-x-1/2 p-3 text-xs`}
    >
      Reach me&nbsp;
      <a
        className='foot-link'
        href='https://altsep.vercel.app/'
        target='_blank'
        rel='noreferrer'
      >
        here
      </a>
    </div>
  );
}
