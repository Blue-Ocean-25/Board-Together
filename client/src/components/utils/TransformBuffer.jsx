const transformBuffer = (buffer, contentType) => {
  const byteArray = new Uint8Array(buffer);
  const blob = new Blob([byteArray], { type: contentType });
  const url = URL.createObjectURL(blob);
  return url;
}

export default transformBuffer;