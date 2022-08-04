import { userTextPropsI } from './TextArea';

export default function TextOther(props: userTextPropsI) {
  const { theme, isCreator, textElementType, creatorText, guestText } = props;
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h1 className='curs'>{isCreator ? 'Guest\'s text' : 'Creator\'s text'}</h1>
      <div
        className={`${theme.userText} ${textElementType} font-sans whitespace-pre-line break-words`}
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
