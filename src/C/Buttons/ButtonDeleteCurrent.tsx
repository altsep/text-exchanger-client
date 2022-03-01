import React from 'react';
import { exchangeT } from '../../App';
import { useThemeContext } from '../../ThemeContext';

export default function BtnDeleteCurrent(props: {
  currentPath: string;
  exchangeArr: exchangeT;
  setExchangeArr: React.Dispatch<React.SetStateAction<exchangeT>>;
  setPageWasDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setExchangeArr, currentPath, setPageWasDeleted } = props;
  const { theme } = useThemeContext();

  const handleClick = () => {
    setPageWasDeleted(true);
    setExchangeArr((prevState) =>
      prevState.filter((item) => item.path !== currentPath)
    );
  };

  return (
    <button className={theme && theme.btn} onClick={handleClick}>
      Remove this page
    </button>
  );
}
