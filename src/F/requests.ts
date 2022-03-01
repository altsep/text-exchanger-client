import { exchangeT } from '../App';

// Get entries if available at server
export const getData = async () => {
  try {
    const res = await fetch('/api');
    const data = await res.json();
    // console.log('data received');
    return data;
  } catch (err) {
    console.log(err);
  }
};

// Send new entries to server
export const setData = async (body: exchangeT) => {
  try {
    const res = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    // console.log('data was sent, current items:', body.length);
    return data;
  } catch (err) {
    console.log(err);
  }
};
