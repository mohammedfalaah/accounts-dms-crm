export function DateFormat(utcTimeString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(utcTimeString);

  const day = date.getDate();

  const month = months[date.getMonth()];

  const year = date.getFullYear();

  const hours = date.getHours();

  const minutes = ("0" + date.getMinutes()).slice(-2);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${day} ${month} ${year} ${formattedHours}:${minutes} ${period}`;
}

export function DateFormatWithOutTime(utcTimeString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(utcTimeString);

  const day = date.getDate();

  const month = months[date.getMonth()];

  const year = date.getFullYear();

  const hours = date.getHours();

  const minutes = ("0" + date.getMinutes()).slice(-2);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${day} ${month} ${year} `;
}
