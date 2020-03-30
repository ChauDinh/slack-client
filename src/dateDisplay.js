function refactorDay(str) {
  switch (str) {
    case "Mon":
      return "Monday";
    case "Tue":
      return "Tuesday";
    case "Wed":
      return "Wednesday";
    case "Thu":
      return "Thursday";
    case "Fri":
      return "Friday";
    case "Sat":
      return "Saturday";
    default:
      return "Sunday";
  }
}

function refactorMonth(str) {
  switch (str) {
    case "Jan":
      return "January";
    case "Feb":
      return "February";
    case "Mar":
      return "March";
    case "Apr":
      return "April";
    case "May":
      return "May";
    case "Jun":
      return "June";
    case "Jul":
      return "July";
    case "Aug":
      return "August";
    case "Oct":
      return "October";
    case "Nov":
      return "November";
    case "Dec":
      return "December";
    default:
      return "September";
  }
}

function refactorTime(str) {
  return str
    .split(":")
    .slice(0, 2)
    .join(":");
}

export default function dateDisplay(str) {
  const arrayOfDateElements = str.split(" ");

  arrayOfDateElements[0] = refactorDay(arrayOfDateElements[0]);
  arrayOfDateElements[1] = refactorMonth(arrayOfDateElements[1]);
  arrayOfDateElements[4] = refactorTime(arrayOfDateElements[4]);

  return arrayOfDateElements;
}
