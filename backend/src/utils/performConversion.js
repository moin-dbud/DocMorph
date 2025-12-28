export const performConversion = async (job, onProgress) => {
  onProgress(20);
  // convert file here
  onProgress(60);
  // finalize
  onProgress(90);

  return {
    outputFileName: "generated-file.pdf",
  };
};
