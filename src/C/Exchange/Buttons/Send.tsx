import { themeI } from '../../../ThemeContext';

interface Props {
  theme: themeI;
  currentPath: string;
  isCreator: boolean;
  creatorText: string;
  guestText: string;
  sendFormatted: (
    type: string,
    payload: string | Record<string, unknown>
  ) => void;
}

export default function Send({
  theme,
  currentPath,
  isCreator,
  creatorText,
  guestText,
  sendFormatted,
}: Props) {
  const handleSend = () =>
    sendFormatted('save-text', {
      pageName: currentPath,
      isCreator,
      text: isCreator ? creatorText : guestText,
    });
  return (
    <button
      className={`${theme.btn} flex flex-row items-center`}
      onClick={handleSend}
    >
      <p>Send</p>&nbsp;
      <p className='text-xs'>(128kb max)</p>
    </button>
  );
}
