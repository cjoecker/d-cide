export default function wrapWord(word: string, maxCharsPerLine: number) {
  if (word.length > maxCharsPerLine && !word.includes(' ')) {
    const breakLongWords = new RegExp(`([^s]{${maxCharsPerLine}})`, 'g');
    const dropLastDash = new RegExp(`-\n$`, 'g');

    return word.replace(breakLongWords, '$1-\n').replace(dropLastDash, '');
  }

  return word;
}
