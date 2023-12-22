export default function formatLargeNumber(number: number): string {
  if (number >= 1000) {
    const suffixes = ["", "K", "M", "B", "T"];
    const suffixIndex = Math.floor(Math.log10(number) / 3);
    const formattedNumber =
      (number / Math.pow(1000, suffixIndex)) % 1 === 0
        ? (number / Math.pow(1000, suffixIndex)).toFixed(0)
        : (number / Math.pow(1000, suffixIndex)).toFixed(1);
    return `${formattedNumber}${suffixes[suffixIndex]}`;
  }
  return number.toString();
}
