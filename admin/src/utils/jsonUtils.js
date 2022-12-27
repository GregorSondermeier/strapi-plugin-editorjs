/**
 * @param { string } json
 * @return { import('@editorjs/editorjs/types').OutputData | null }
 */
export const jsonToEditorJsOutputData = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};

/**
 * @param { import('@editorjs/editorjs/types').OutputData } outputData
 * @return { string | null }
 */
export const editorJsOutputDataToJson = (outputData) => {
  try {
    return JSON.stringify(outputData);
  } catch (e) {
    return null;
  }
};
