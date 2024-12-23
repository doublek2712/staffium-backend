const appTimeFormatter = (input) => {
  const hours = String(input.getHours()).padStart(2, '0');
  const minutes = String(input.getMinutes()).padStart(2, '0');
  const seconds = String(input.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

const compareTime = (time1, time2) => {
  const [hours1, minutes1, seconds1] = time1.split(':').map(Number);
  const [hours2, minutes2, seconds2] = time2.split(':').map(Number);

  if (hours1 < hours2) return -1;
  if (hours1 > hours2) return 1;
  if (minutes1 < minutes2) return -1;
  if (minutes1 > minutes2) return 1;
  if (seconds1 < seconds2) return -1;
  if (seconds1 > seconds2) return 1;
  return 0; // equal
}

module.exports = { appTimeFormatter, compareTime }


