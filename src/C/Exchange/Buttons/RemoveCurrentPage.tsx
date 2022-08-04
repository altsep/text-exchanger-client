import React from 'react';
import { PageList } from '../../../App';
import { themeI } from '../../../ThemeContext';

export default function RemoveCurrentPage(props: {
  theme: themeI;
  currentPath: string;
  userId: string;
  setPageWasDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setPagesCreated: React.Dispatch<React.SetStateAction<PageList>>;
}) {
  const { theme, currentPath, userId, setPageWasDeleted, setPagesCreated } = props;

  const handleClick = () => {
    import('../../../F/requests').then(({ removePage, getCreatorPages }) => {
      removePage(currentPath).then(() =>
        getCreatorPages(userId).then((data) => {
          if (data) {
            setPagesCreated(JSON.parse(data));
          }
        })
      );
    });
    setPageWasDeleted(true);
  };

  return (
    <button className={theme.btn} onClick={handleClick}>
      Remove this page
    </button>
  );
}
