export function capitalizeFirstLetters(str) {
  if (!str) {
    return "";
  }
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}
