export const formatDateAndTime = timestamp => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return ` ${date.toLocaleDateString('en-GB')}, ${hour}:${minutes <= 9 ? `0${minutes}` : minutes}`;
};
