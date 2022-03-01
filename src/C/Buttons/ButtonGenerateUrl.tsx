import React from 'react';
import { Navigate } from 'react-router-dom';
import { exchangeT } from '../../App';
import { useThemeContext } from '../../ThemeContext';

interface data {
  message: string;
  data: string;
}

export default function GenerateBtn(props: {
  setExchangeArr: React.Dispatch<React.SetStateAction<exchangeT>>;
  getData: () => Promise<data>;
  setData: (body: exchangeT) => Promise<data>;
}) {
  const { setExchangeArr } = props;
  const { theme } = useThemeContext();
  const [isActive, setIsActive] = React.useState<boolean>(false);
  const [newPath, setNewPath] = React.useState<string>('');

  const handleClickAlphanum = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const id = document.cookie.split('=')[1];
    import('../../F/gen-str')
      .then(({ genAlphanumStr }) => {
        const generatedString: string = genAlphanumStr();
        setNewPath(generatedString);
        setExchangeArr((prevState) => [
          ...prevState,
          {
            type: 'exchange',
            path: generatedString,
            date: Date.now(),
            creator: id,
          },
        ]);
        setIsActive(true);
        const url = location.href + generatedString;
        navigator.clipboard.writeText(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <button className={theme && theme.btn} onClick={handleClickAlphanum}>
        Generate
      </button>
      {isActive && <Navigate to={`/${newPath}`} replace={true} />}
    </>
  );
}
