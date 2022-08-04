import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useThemeContext } from '../../ThemeContext';
import { Exchange } from '../Exchange';
import { PageList } from '../../App';

interface info {
  creator: string;
  date: string;
}

export default function Unknown(props: {
  userId: string;
  pagesCreated: PageList;
  setPagesCreated: React.Dispatch<React.SetStateAction<PageList>>;
}) {
  const { userId, setPagesCreated } = props;
  const [pageWasDeleted, setPageWasDeleted] = React.useState<boolean>(false);
  const { theme } = useThemeContext();
  const [count, setCount] = React.useState<number>(3);
  const { p } = useParams();
  React.useEffect(() => {
    p && setCurrentPath(p);
  }, []);
  const [currentPath, setCurrentPath] = React.useState<string>('');

  React.useEffect(() => {
    const intervalId = setInterval(
      () => pageWasDeleted && setCount((prevState) => prevState - 1),
      1000
    );
    return () => clearInterval(intervalId);
  }, [pageWasDeleted]);

  const [isCreator, setIsCreator] = React.useState<boolean>(true);
  const [isDataLoading, setIsDataLoading] = React.useState<boolean>(true);
  const [localInfo, setLocalInfo] = React.useState<info>({
    creator: '',
    date: '',
  });
  const [exists, setExists] = React.useState<boolean>(false);

  React.useEffect(() => {
    currentPath &&
      import('../../F/requests')
        .then(({ getInfo, updateInfo }) =>
          getInfo(currentPath).then((data) => {
            if (data) {
              const parsedData = JSON.parse(data);
              if (parsedData.err) {
                throw Error(parsedData.err);
              } else {
                setExists(true);
                const { creator, date } = parsedData;
                const options: Intl.DateTimeFormatOptions = {
                  dateStyle: 'medium',
                  timeStyle: 'medium',
                };
                const dateConverted = new Date(date).toLocaleString(
                  'en-US',
                  options
                );
                setLocalInfo({ creator, date: dateConverted });
                const dateNow = Date.now();
                updateInfo({
                  pageName: currentPath,
                  info: {
                    creator,
                    date: dateNow,
                  },
                });
                if (creator !== userId) {
                  setIsCreator(false);
                }
              }
            }
          })
        )
        .catch((err) => console.error(err.message))
        .finally(() => setIsDataLoading(false));
  }, [currentPath]);

  const exchangeProps = {
    currentPath,
    userId,
    isCreator,
    date: localInfo.date,
    setPageWasDeleted,
    setPagesCreated,
    setExists,
  };

  const sysStyle = `${theme && theme.system} m-2 mb-4`;

  return (
    <>
      <div className={`${sysStyle} flex flex-row justify-between`}>
        <Link to='/'>Return to home page</Link>
        <p>{exists && currentPath}</p>
      </div>
      {/^\w{6}$/.test(currentPath) && isDataLoading ? (
        <p className={sysStyle}>Getting data...</p>
      ) : exists ? (
        pageWasDeleted ? (
          <div className={sysStyle}>
            <p>Page was deleted. You will be redirected in {count} seconds.</p>
            {count === 0 && <Navigate to='/' replace={true} />}
          </div>
        ) : (
          <Exchange {...exchangeProps} />
        )
      ) : (
        <p className={sysStyle}>Page not found.</p>
      )}
    </>
  );
}
