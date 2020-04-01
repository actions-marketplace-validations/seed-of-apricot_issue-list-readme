import * as core from '@actions/core';
import getIndices from './getIndices';

const extractBody = async (text: string) => {
  let extracted;
  const pattern = core.getInput('pattern');
  const [firstIndex, lastIndex] = await getIndices(text, pattern);

  if (firstIndex === -1 || lastIndex === -1) {
    extracted = text;
  } else {
    extracted = text.substring(firstIndex + 1, lastIndex - 1);
  }

  console.log([extracted]);

  const strArray = extracted.split('\r\n');

  console.log(strArray);

  const newText = strArray
    .slice(0, 3)
    .map(item => item.replace('\n', '').replace('\r', ''))
    .join('<br />');

  console.log([newText]);

  return strArray.length > 3 ? newText + '<br />...' : newText;
};

export default extractBody;
