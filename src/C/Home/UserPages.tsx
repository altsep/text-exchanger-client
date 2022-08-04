import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../../ThemeContext';
import { PageList } from '../../App';

export default function UserPages(props: {
  gotPages: boolean;
  pagesCreated: PageList;
}) {
  const { gotPages, pagesCreated } = props;
  const { theme } = useThemeContext();
  React.useEffect(() => {
    const el = document.querySelector('.pages') as HTMLDivElement;
    if (el) {
      const { scrollHeight, clientHeight, style } = el;
      if (scrollHeight > clientHeight) {
        style.overflowY = 'scroll';
      } else {
        style.overflowY = 'auto';
      }
    }
  }, [gotPages, pagesCreated]);
  return (
    <div className='max-h-min'>
      {!gotPages ? (
        <p className={theme && theme.system}>Getting data...</p>
      ) : pagesCreated.length > 0 ? (
        <div
          className={`pages ${
            theme && theme.system
          } flex flex-row flex-wrap max-w-lg max-h-32`}
        >
          <p>your pages:&nbsp;</p>
          {pagesCreated.map((pagePath) => {
            return (
              <div key={`link to ${pagePath}`}>
                <Link to={`/${pagePath}`}>{pagePath}</Link>
                {pagesCreated.length > 1 &&
                  pagesCreated.indexOf(pagePath) !==
                    pagesCreated.length - 1 && <>,&nbsp;</>}
              </div>
            );
          })}
        </div>
      ) : (
        <>&nbsp;</>
      )}
    </div>
  );
}
