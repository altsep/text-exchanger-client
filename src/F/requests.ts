interface AddPage {
  pageName: string;
  info: {
    creator: string;
    date: number;
  };
}

interface AddText {
  pageName: string;
  isCreator: boolean;
  text: string;
}

interface GetTextOther {
  pageName: string;
  isCreator: boolean;
}

// ! Unused. Get pages currently available at server
export const getPages = async () => {
  try {
    const res = await fetch('/api/list');
    return await res.text();
  } catch (err) {
    console.log(err);
  }
};

// Get pages filtered by creator id
export const getCreatorPages = async (pageName: string) => {
  try {
    const res = await fetch('/api/list-created', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: pageName,
    });
    return await res.text();
  } catch (err) {
    console.log(err);
  }
};

// Use generated string to create a new page directory
export const addPage = async (body: AddPage) => {
  try {
    const res = await fetch('/api/new-page', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await res.text();
  } catch (err) {
    console.log(err);
  }
};

// Remove specific page
export const removePage = async (pageName: string) => {
  try {
    await fetch('/api/remove-page', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: pageName,
    });
  } catch (err) {
    console.log(err);
  }
};

// ! Used for debugging. Remove all contents of the pages dir
export const removePages = async () => {
  try {
    await fetch('/api/remove-all');
  } catch (err) {
    console.log(err);
  }
};

// Get info.json for a particular path
export const getInfo = async (pageName: string) => {
  try {
    const res = await fetch('/api/get-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: pageName,
    });
    return await res.text();
  } catch (err) {
    console.log(err);
  }
};

export const updateInfo = async (body: AddPage) => {
  try {
    const res = await fetch('/api/update-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await res.text();
  } catch (err) {
    console.log(err);
  }
};

export const sendText = async (body: AddText) => {
  try {
    const res = await fetch('/api/save-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    return await res.text();
  } catch (err) {
    console.log(err);
  }
};

export const getText = async (pageName: string) => {
  try {
    const res = await fetch('/api/get-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: pageName,
    });
    return await res.text();
  } catch (err) {
    console.log(err);
  }
};

export const getTextOther = async (body: GetTextOther) => {
  try {
    const res = await fetch('/api/get-text-other', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    return await res.text();
  } catch (err) {
    console.log(err);
  }
};
