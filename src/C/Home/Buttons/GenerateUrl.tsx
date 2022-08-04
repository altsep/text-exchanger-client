import React from 'react';
import { Navigate } from 'react-router-dom';
import { PageList } from '../../../App';
import { useThemeContext } from '../../../ThemeContext';

export default function Generate(props: {
  pagesCreated: PageList;
  setPagesCreated: React.Dispatch<React.SetStateAction<PageList>>;
  setWarningDisplay: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { pagesCreated, setPagesCreated, setWarningDisplay } = props;
  const { theme } = useThemeContext();
  const [isPageCreated, setIsPageCreated] = React.useState<boolean>(false);
  const [newPath, setNewPath] = React.useState<string>('');
  const [innerText, setInnerText] = React.useState<string>('Generate');

  const handleClickAlphanum = () => {
    if (pagesCreated.length < 100) {
      setInnerText('Working...');
      const id = document.cookie.split('=')[1];
      import('../../../F/gen-str')
        .then(({ genAlphanumStr }) => {
          const generatedString: string = genAlphanumStr();
          setNewPath(generatedString);
          const body = {
            pageName: generatedString,
            info: {
              creator: id,
              date: Date.now(),
            },
          };
          import('../../../F/requests')
            .then(({ addPage }) => {
              addPage(body).then(() => {
                // Wait for response before redirecting
                setIsPageCreated(true);
                setPagesCreated((prevState) => [...prevState, generatedString]);
              });
            })
            .catch((err) => console.error(err));
          const url = location.href + generatedString;
          navigator.clipboard.writeText(url);
        })
        .catch((err) => console.error(err))
    } else {
      setWarningDisplay('flex');
    }
  };

  return (
    <>
      <button
        className={theme && theme.btn}
        onClick={() => {
          // Can be set to create an arbitrary amount of pages if required
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
