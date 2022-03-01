import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useThemeContext } from '../ThemeContext';

export default function Unknown(props: {
  isAppLoaded: boolean;
  pageWasDeleted: boolean;
  setPageWasDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { pageWasDeleted, isAppLoaded } = props;
  const { theme } = useThemeContext();
  const [count, setCount] = React.useState<number>(3);
  React.useEffect(() => {
    const intervalId = setInterval(
      () => pageWasDeleted && setCount((prevState) => prevState - 1),
      1000
    );
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className={`${theme && theme.system} m-2`}>
      <div className='mb-4'>
        <Link to='/'>Return to home page</Link>
      </div>
      {isAppLoaded &&
        (pageWasDeleted ? (
          <>
            <p>
              Page was deleted. You will be redirected in {count} seconds.
            </p>
            {count === 0 && <Navigate to='/' replace={true} />}
          </>
        ) : (
          <p>Page not found.</p>
        ))}
    </div>
  );
}
