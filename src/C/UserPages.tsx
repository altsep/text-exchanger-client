import React from 'react';
import { exchangeT } from '../App';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../ThemeContext';

export default function UserPages(props: {
  userId: string;
  exchangeArr: exchangeT;
}) {
  const { userId, exchangeArr } = props;
  const { theme } = useThemeContext();
  return (
    <>
      {(() => {
        const filteredExchangeArr = exchangeArr.filter(
          (item) => item.creator === userId
        );
        return (
          filteredExchangeArr.length > 0 && (
            <div
              className={`${
                theme && theme.system
              } flex flex-row flex-wrap max-w-3xl p-4`}
            >
              your pages:&nbsp;
              {filteredExchangeArr.map((item) => (
                <div key={`link to ${item.path}`}>
                  <Link to={`/${item.path}`}>{item.path}</Link>
                  {filteredExchangeArr.length > 1 &&
                    filteredExchangeArr.indexOf(item) !==
                      filteredExchangeArr.length - 1 && <>,&nbsp;</>}
                </div>
              ))}
            </div>
          )
        );
      })()}
    </>
  );
}
