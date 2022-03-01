import React from 'react';
import { userTextPropsI } from './TextDefault';

export default function TextOther(props: userTextPropsI) {
  const { isCreator, textElementType, creatorText, guestText, theme } = props;
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h1 className='curs'>{isCreator ? 'Guest\'s text' : 'Creator\'s text'}</h1>
      <div
        className={`${
          theme && theme.userText
        } ${textElementType} font-sans whitespace-pre-line break-words`}
      >
        {isCreator ? (
          !guestText ? (
            <p className={theme && theme.system}>
              Waiting for guest to send data...
            </p>
          ) : (
            guestText
          )
        ) : !creatorText ? (
          <p className={theme && theme.system}>
            Waiting for creator to send data...
          </p>
        ) : (
          creatorText
        )}
      </div>
    </div>
  );
}
