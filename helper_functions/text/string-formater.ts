export default function stringFormater(string: string) {
  //remove all -
  const newString = string.replace(/-/g, " ");
  // capitalize first letter after each space
  return newString.replace(/(?:^|\s)\S/g, (a) => a.toUpperCase());
}
