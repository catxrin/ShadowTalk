export const formatDateAndTime = timestamp => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  return ` ${date.toLocaleDateString('en-GB')}, ${hour}:${minutes <= 9 ? `0${minutes}` : minutes}`;
};

export const formatDate = date => new Date(date).toLocaleDateString('en-GB');

export const accentColors = Object.freeze({
  Pink: 'text-pink-300',
  Purple: 'text-purple-300',
  Sky: 'text-blue-300',
  Green: 'text-green-300',
  Default: 'text-white',
});
