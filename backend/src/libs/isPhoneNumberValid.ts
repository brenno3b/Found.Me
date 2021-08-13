const phoneRegExp = RegExp('^[1-9]{2}9?[0-9]{8}$');

export default function isPhoneNumberValid(phoneNumber: string): Boolean {
  return phoneRegExp.test(phoneNumber);
}
