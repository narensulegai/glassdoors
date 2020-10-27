export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toDateString();
};

export const to12Hr = (hr24) => {
  if (!hr24) return hr24;
  const ts = hr24;
  const H = +ts.substr(0, 2);
  let h = (H % 12) || 12;
  h = (h < 10) ? (`0${h}`) : h;
  const ampm = H < 12 ? ' AM' : ' PM';
  return h + ts.substr(2, 3) + ampm;
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours %= 12;
  hours = hours || 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes} ${ampm}`;
};
