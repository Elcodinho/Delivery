export function phoneFormatter(phone) {
  const arr = phone.split("");
  let res = "+";
  for (let i = 0; i < arr.length; i++) {
    if (i === 1) {
      res += ` (${arr[i]}`;
    } else if (i === 4) {
      res += `) ${arr[i]}`;
    } else if (i === 7 || i === 9) {
      res += `-${arr[i]}`;
    } else {
      res += arr[i];
    }
  }
  return res;
}
