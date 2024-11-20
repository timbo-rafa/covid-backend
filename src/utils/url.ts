export const parseUrl = (encodedUrl: string) => {
  const decodedUrl = decodeURIComponent(encodedUrl);
  try {
    new URL(decodedUrl);
    return decodedUrl;
  } catch (e) {
    return null;
  }
};
