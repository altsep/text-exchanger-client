import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {
  Desc,
  Foot,
  Unknown,
  Generate,
  Themes,
  UserPages,
  Exchange,
} from './C';
import { getData, setData } from './F/requests';

export interface exchangeEntry {
  type: string;
  path: string;
  date: number;
  creator: string;
  creatorText?: string;
  guestText?: string;
}

export type exchangeT = [] | exchangeEntry[];

export default function App() {
  // prettier-ignore
  const [exchangeArr, setExchangeArr] = React.useState<exchangeEntry[]>([]);
  const [isAppLoaded, setIsAppLoaded] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<string>('');

  React.useEffect(() => {
    // Get pages data and let the app know it was processed
    getData().then(({ data }) => {
      data && setExchangeArr(JSON.parse(data));
      setIsAppLoaded(true);
    });
  }, []);

  React.useEffect(() => {
    // Determine if user has an id. If not, assign one in the form of a cookie
    const id = document.cookie.split('=')[1];
    if (id) {
      setUserId(id);
    } else {
      import('./F/gen-str')
        .then(({ genAlphanumStr }) => {
          const userToken = 'user-id=' + genAlphanumStr(32);
          const attr =
            ';max-age=2592000;secure;samesite=strict';
          document.cookie = userToken + attr;
        })
        .catch((err) => console.log(err));
    }
    // Send new data to server on every update of the data array
    if (isAppLoaded) {
      setData(exchangeArr);
    }
  }, [exchangeArr]);

  const btnProps = { setExchangeArr, getData, setData };

  const [pageWasDeleted, setPageWasDeleted] = React.useState<boolean>(false);

  const exchangeProps = {
    userId,
    exchangeArr,
    setExchangeArr,
    setPageWasDeleted,
  };

  const unknownProps = { isAppLoaded, pageWasDeleted, setPageWasDeleted };

  const userPagesProps = { userId, exchangeArr };

  return (
    <div>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Themes />
              <div className='flex flex-col items-center w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
                <Desc />
                {/* <div className='flex flex-row flex-wrap justify-center mb-4'> */}
                <Generate {...btnProps} />
                {/* </div> */}
                <UserPages {...userPagesProps} />
              </div>
              <Foot />
            </>
          }
        />
        {/* Render pages from remote data */}
        {exchangeArr !== undefined &&
          exchangeArr.map((item) => (
            <Route
              key={item.path}
              path={`/${item.path}`}
              element={<Exchange {...exchangeProps} currentPath={item.path} />}
            />
          ))}
        <Route path='*' element={<Unknown {...unknownProps} />} />
      </Routes>
    </div>
  );
}
