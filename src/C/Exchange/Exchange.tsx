import React from 'react';
import { PageList } from '../../App';
import { RemovePage, Send, Select, Show } from './Buttons';
import { useThemeContext } from '../../ThemeContext';
import Area from './TextArea';
import Other from './TextOther';
import useWarning from '../../H/useWarning';

interface exchangePropsI {
  currentPath: string;
  userId: string;
  isCreator: boolean;
  date: string;
  setPageWasDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setPagesCreated: React.Dispatch<React.SetStateAction<PageList>>;
  setExists: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Exchange(props: exchangePropsI) {
  const {
    currentPath,
    userId,
    isCreator,
    date,
    setPageWasDeleted,
    setPagesCreated,
    setExists,
  } = props;
  const { theme } = useThemeContext();
  const [textElementType, setTextElementType] =
    React.useState<string>('default');
  const [gotText, setGotText] = React.useState<boolean>(false);
  const [creatorText, setCreatorText] = React.useState<string>('');
  const [guestText, setGuestText] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    isCreator ? setCreatorText(e.target.value) : setGuestText(e.target.value);

  React.useEffect(() => {
    import('../../F/requests').then(({ getText }) =>
      getText(currentPath)
        .then((data) => {
          if (data) {
            const { creatorData, guestData } = JSON.parse(data);
            setCreatorText(creatorData);
            setGuestText(guestData);
          }
        })
        .finally(() => setGotText(true))
    );
  }, []);

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout;
    import('../../F/requests').then(({ getTextOther }) => {
      intervalId = setInterval(
        () =>
          getTextOther({ pageName: currentPath, isCreator })
            .then((data) => {
              if (data) {
                const { err, text } = JSON.parse(data);
                if (err) {
                  throw Error(err);
                } else if (isCreator) {
                  setGuestText(text);
                } else {
                  setCreatorText(text);
                }
              }
            })
            .catch((err) => {
              console.error(err.message);
              setExists(false);
            }),
        3000
      );
    });
    return () => clearInterval(intervalId);
  }, []);

  const userTextProps = {
    theme,
    isCreator,
    textElementType,
    creatorText,
    guestText,
    handleChange,
    gotText,
  };

  const deleteBtnProps = {
    theme,
    currentPath,
    userId,
    setPageWasDeleted,
    setPagesCreated,
  };

  const sendBtnProps = {
    theme,
    currentPath,
    isCreator,
    creatorText,
    guestText,
    setExists,
  };

  const selectBtnProps = {
    theme,
    isCreator,
    creatorText,
    guestText,
    setCreatorText,
    setGuestText,
    gotText,
  };

  const showBtnProps = {
    theme,
    isCreator,
    textElementType,
    setTextElementType,
  };

  const { warning, warningDisplay } = useWarning(
    '! Information posted is not secure and is accessible to anyone visiting the url. Take caution not to share any sensitive data.',
    localStorage.getItem('exchangeWarningDisplay') || 'flex'
  );

  React.useEffect(() => {
    localStorage.setItem('exchangeWarningDisplay', warningDisplay);
  }, [warningDisplay]);

  return (
    <>
      {document.cookie ? (
        <div className='flex flex-col items-center'>
          {warning}
          <div className='m-3 w-full'>
            {textElementType === 'default' ? (
              <Area {...userTextProps} />
            ) : (
              <Other {...userTextProps} />
            )}
          </div>
          <div className='flex flex-row flex-wrap justify-center'>
            {textElementType === 'default' && (
              <>
                <Send {...sendBtnProps} />
                <Select {...selectBtnProps} />
              </>
            )}
            {isCreator && <RemovePage {...deleteBtnProps} />}
            <Show {...showBtnProps} />
          </div>
          <div
            className={`${
              theme && theme.system
            } p-3 text-xs flex flex-col items-center`}
          >
            <p>Page created</p>
            <p>{date}</p>
          </div>
        </div>
      ) : (
        <p>Can&apos;t identify user! Please enable cookies for this site.</p>
      )}
    </>
  );
}
