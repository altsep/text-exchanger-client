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
  const [connected, setConnected] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    // Determine if user has an id. If not, assign one in the form of a cookie
    const id = document.cookie.split('=')[1];
    setCookie(id);
    setGotPages(false);
    if (id) {
      getPages(id);
    } else {
      import('./F/gen-str')
        .then(({ genAlphanumStr }) => {
          const rndStr = genAlphanumStr(32);
          setCookie(rndStr);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
    function setCookie(id: string) {
      const userToken = 'user-id=' + id;
      const attr = ';max-age=2592000;secure;samesite=strict';
      document.cookie = userToken + attr;
      setUserId(id);
    }
  }, []);

  const { warning, setWarningText, setWarningDisplay } = useWarning();

  React.useEffect(() => {
    let intervalId: NodeJS.Timer | undefined;
    if (!connected && !gotPages) {
      intervalId = setInterval(() => {
        console.log('Attempting to access the server...');
        getPages(userId);
      }, 5000);
      setWarningText('! Could not connect to the server. Try refreshing the page or wait until it reconnects...');
      setWarningDisplay('flex');
    } else setWarningDisplay('hidden');
    return () => clearInterval(intervalId);
  }, [connected, gotPages, userId, setWarningDisplay, setWarningText]);

  const getPages = (id: string) =>
    import('./F/requests')
      .then(({ getCreatorPages }) =>
        getCreatorPages(id).then((res) => {
          if (!res) throw 'No response received';
          if (res.err) throw res.err;
          setPagesCreated(res);
          setConnected(true);
          setGotPages(true);
          if (res.length > 0) console.log('Received list of pages');
          else console.log('User has no pages');
        })
      )
      .catch((err) => {
        console.log(err);
        setConnected(false);
      })
      .finally(() => setLoading(false));

  const genBtnProps = {
    connected,
    pagesCreated,
    setPagesCreated,
    setWarningDisplay,
    setWarningText,
    setConnected,
  };

  const unknownProps = {
    userId,
    pagesCreated,
    setPagesCreated,
    setConnected,
  };

  const userPagesProps = {
    loading,
    userId,
    pagesCreated,
    setPagesCreated,
    gotPages,
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Themes />
            <div className="flex flex-col items-center w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 px-4 children:mb-4">
              <Desc />
              <div className="flex flex-row flex-wrap justify-center">
                <Generate {...genBtnProps} />
              </div>
              {warning}
              <UserPages {...userPagesProps} />
            </div>
            <Foot />
          </>
        }
      />
      <Route path=":p" element={<Unknown {...unknownProps} />} />
    </Routes>
  );
}
