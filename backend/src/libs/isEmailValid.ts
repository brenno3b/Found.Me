const emailRegExp = new RegExp(
  '^[a-zA-Z0-9]{3,}((.|_|-)?[a-zA-Z0-9]+)?@[a-zA-Z0-9]+(-?[a-zA-Z0-9]+)?.[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})*$'
);

export default function isEmailValid(email: string): Boolean {
  return emailRegExp.test(email);
}
