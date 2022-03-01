import React from 'react';
import { useSpring, animated } from 'react-spring';

export default function Desc() {
  const spring = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 250 },
  });
  React.useEffect(() => {
    const timeoutId = setTimeout(
      () => sessionStorage.setItem('descIsFaded', 'true'),
      250
    );
    return () => clearTimeout(timeoutId);
  }, [spring]);
  return (
    <animated.div
      className='flex flex-col items-center w-full max-w-lg p-4'
      style={
        sessionStorage.getItem('descIsFaded') !== 'true' ? spring : undefined
      }
    >
      <p className='curs indent-2'>
        This app allows to exchange fragments of text. Press
        &quot;Generate&quot; to generate a link that could be then sent to
        another person. Paste the text you wanted to share and press send. The other person
        will have an option to share their piece of text as well. On press you
        will be redirected, link will be copied to clipboard. Page will be removed after one week of inactivity.
      </p>
      <p className='curs'>Have fun!</p>
    </animated.div>
  );
}
