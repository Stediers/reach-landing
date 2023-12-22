export function verifyMobileNumber(mobileNumber: string, maxLength: number) {
  if (mobileNumber.length != maxLength) {
    return false;
  } else if (!mobileNumber.match(/^[0-9]+$/)) {
    return false;
  } else {
    return true;
  }
}
