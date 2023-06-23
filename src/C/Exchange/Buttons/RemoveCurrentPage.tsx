import React from 'react';
import { PageList } from '../../../App';
import { themeI } from '../../../ThemeContext';

export default function RemoveCurrentPage(props: {
  theme: themeI;
  currentPath: string;
  userId: string;
  setPageWasDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  setPagesCreated: React.Dispatch<React.SetStateAction<PageList>>;
  setConnected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { theme, currentPath, userId, setPageWasDeleted, setPagesCreated, setConnected } = props;

  const handleClick = async () => {
    try {
      const { removePage, getCreatorPages } = await import('../../../F/requests');
      await removePage(currentPath);
      setPageWasDeleted(true);
      const data = await getCreatorPages(userId);
      if (!data) throw 'No data received';
      setPagesCreated(data);
    } catch (e) {
      console.log(e);
      setConnected(false);
    }
  };

  return (
    <button className={theme.btn} onClick={handleClick}>
      Remove this page
    </button>
  );
}
