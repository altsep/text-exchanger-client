export function genAlphanumStr(amount = 6):string {
  let res = '';
  let charList = '';
  for (let i = 48; i <= 57; i++) {
    charList += String.fromCharCode(i);
  }
  for (let i = 65; i <= 90; i++) {
    charList += String.fromCharCode(i);
    charList += String.fromCharCode(i).toLowerCase();
  }
  for (let i = 0; i < amount; i++) {
    const rnd = (Math.random() * charList.length) << 0;
    res += charList[rnd];
  }
  return res;
}

export function genHexStr(amount = 6):string {
  let res = '';
  for (let i = 0; i < amount; i++) {
    res += ((Math.random() * 0xf) << 0).toString(16);
  }
  return res;
}
