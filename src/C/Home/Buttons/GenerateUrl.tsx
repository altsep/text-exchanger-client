import React from 'react';
import { Navigate } from 'react-router-dom';
import { PageList } from '../../../App';
import { useThemeContext } from '../../../ThemeContext';

export default function Generate(props: {
  connected: boolean;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
  pagesCreated: PageList;
  setPagesCreated: React.Dispatch<React.SetStateAction<PageList>>;
  setWarningDisplay: React.Dispatch<React.SetStateAction<string>>;
  setWarningText: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { connected, pagesCreated, setPagesCreated, setWarningDisplay, setWarningText, setConnected } = props;
  const { theme } = useThemeContext();
  const [isPageCreated, setIsPageCreated] = React.useState<boolean>(false);
  const [newPath, setNewPath] = React.useState<string>('');
  const [innerText, setInnerText] = React.useState<string>('Generate');

  const handleClickAlphanum = async () => {
    if (document.cookie && pagesCreated.length < 100) {
      setInnerText('Working...');
      const id = document.cookie.split('=')[1];
      try {
        const { genAlphanumStr } = await import('../../../F/gen-str');
        const generatedString: string = genAlphanumStr();
        setNewPath(generatedString);
        const body = {
          pageName: generatedString,
          info: {
            creator: id,
            date: Date.now(),
          },
        };
        const { addPage } = await import('../../../F/requests');
        const res = await addPage(body);
        setWarningDisplay('hidden');
        setConnected(true);
        if (!res) throw 'No response received';
        // Wait for response before redirecting
        setIsPageCreated(true);
        setPagesCreated((prevState) => [...prevState, generatedString]);
        const url = location.href + generatedString;
        navigator.clipboard.writeText(url);
      } catch (e) {
        console.error(e);
        setConnected(false);
        setInnerText('Generate');
        setWarningDisplay('visible');
      }
    } else {
      const warningText = !connected
        ? "! Couldn't connect to server"
        : !document.cookie
        ? "! Can't identify user! Please make sure cookies are enabled and reload the page"
        : !(pagesCreated.length < 100)
        ? '! Cannot have more than 100 pages at a time'
        : '';
      setWarningText(warningText);
      setWarningDisplay('visible');
    }
  };

  return (
    <>
      <button
        className={theme && theme.btn}
        onClick={() => {
          // Create an arbitrary amount of pages
          // for (let i = 0; i < 25; i++) {
          handleClickAlphanum();
          // }
        }}
      >
        {innerText}
      </button>
      {isPageCreated && <Navigate to={`/${newPath}`} replace={true} />}
    </>
  );
}
