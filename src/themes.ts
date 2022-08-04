interface themesI {
  [key: string]: {
    default: string;
    btn: string;
    anchor: string;
    userText: string;
    system: string;
    themeMenu: string;
  };
}

const btnStyle = 'p-4 m-3 rounded-sm font-bold text-base font-mono';
const anchorStyle = 'underline hovered:no-underline';
const userTextStyle =
  'items-center justify-center text-lg w-full max-w-5xl resize-none my-3 p-4';
const dropdownStyle =
  'text-base font-mono cursor-pointer children:py-2 children:px-4 text-right';
const systemStyle = 'text-base font-mono';

export const themes: themesI = {
  'black on white': {
    default: 'text-gray-900 bg-gray-50 text-2xl',
    btn: `text-gray-50 bg-gray-900 hover:bg-gray-400 ${btnStyle}`,
    anchor: `text-gray-600 visited:text-amber-800 ${anchorStyle}`,
    userText: `bg-gray-100 border-gray-600 ${userTextStyle}`,
    system: `text-gray-400 ${systemStyle}`,
    themeMenu: `text-gray-400 children:bg-gray-50 hover:children:bg-gray-200 ${dropdownStyle}`,
  },
  'white on gray': {
    default: 'text-gray-50 bg-gray-500 text-2xl',
    btn: `text-gray-500 bg-gray-50 hover:bg-gray-200 ${btnStyle}`,
    anchor: `text-gray-400 visited:text-amber-600 ${anchorStyle}`,
    userText: `placeholder:text-gray-300 bg-gray-400 border-gray-600 ${userTextStyle}`,
    system: `text-gray-300 ${systemStyle}`,
    themeMenu: `text-gray-300 children:bg-gray-500 hover:children:bg-gray-50 ${dropdownStyle}`,
  },
  'amber on blue': {
    default: 'text-amber-300 bg-blue-900 text-2xl',
    btn: `text-blue-800 bg-amber-300 hover:bg-amber-500 ${btnStyle}`,
    anchor: `text-amber-600 visited:text-amber-800 ${anchorStyle}`,
    userText: `bg-blue-300/10 border-amber-800 ${userTextStyle}`,
    system: `text-gray-400 ${systemStyle}`,
    themeMenu: `text-gray-400 children:bg-blue-900 hover:children:bg-amber-300 ${dropdownStyle}`,
  },
};

// This runs in index.html on open and in ThemeContext.tsx after setting a theme
export const defineTheme = (t: string) => {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('theme', t);
  // Apply main style to body, other elements get styles through context
  const defaultStyle = themes[t].default.split(' ');
  const body = document.querySelector('body');
  if (body) {
    const classList = body.classList;
    if (classList.length > 0) {
      for (let i = 0; i < defaultStyle.length; i++) {
        classList.replace(classList[i], defaultStyle[i]);
      }
    } else {
      for (const token of defaultStyle) {
        classList.add(token);
      }
    }
  }
};
