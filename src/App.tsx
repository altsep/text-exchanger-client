import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Desc, Foot, Unknown, Themes, UserPages } from './C/Home';
import { Generate } from './C/Home/Buttons';
import useWarning from './H/useWarning';

export type PageList = string[];

export interface Info {
  type: string;
  path: string;
  date: number;
  creator: string;
}

export default function App() {
  const [userId, setUserId] = React.useState<string>('');
  const [gotPages, setGotPages] = React.useState<boolean>(false);
  const [pagesCreated, setPagesCreated] = React.useState<PageList>([]);

  React.useEffect(() => {
    // Determine if user has an id. If not, assign one in the form of a cookie
    const id = document.cookie.split('=')[1];
    setCookie(id);
    setGotPages(false);
    if (id) {
      import('./F/requests')
        .then(({ getCreatorPages }) =>
          getCreatorPages(id).then((data) => {
            if (!data) throw 'No data was returned';
            if (data.err) throw data.err;
            setPagesCreated(data);
          })
        )
        .catch((err) => console.error(err))
        .finally(() => setGotPages(true));
    } else {
      import('./F/gen-str')
        .then(({ genAlphanumStr }) => {
          const rndStr = genAlphanumStr(32);
          setCookie(rndStr);
        })
        .catch((err) => console.error(err))
        .finally(() => setGotPages(true));
    }
    function setCookie(id: string) {
      const userToken = 'user-id=' + id;
      const attr = ';max-age=2592000;secure;samesite=strict';
      document.cookie = userToken + attr;
      setUserId(id);
    }
  }, []);

  const { warning, setWarningText, setWarningDisplay } = useWarning();

  const genBtnProps = {
    pagesCreated,
    setPagesCreated,
    setWarningDisplay,
    setWarningText,
  };

  const unknownProps = {
    userId,
    pagesCreated,
    setPagesCreated,
  };

  const userPagesProps = { userId, pagesCreated, setPagesCreated, gotPages };

  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Themes />
            <div className='flex flex-col items-center w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-4 children:mb-4'>
              <Desc />
              <div className='flex flex-row flex-wrap justify-center'>
                <Generate {...genBtnProps} />
              </div>
              {warning}
              <UserPages {...userPagesProps} />
            </div>
            <Foot />
          </>
        }
      />
      <Route path=':p' element={<Unknown {...unknownProps} />} />
    </Routes>
  );
}
