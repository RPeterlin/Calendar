export function getMonthMatrix(year, month){
  // This function creates a 2D array corresponding to calendar month for given year and month index.

  // getDay() method returns the index of day-of-the-week for specific date. Since I wasn't sure whether I can use this particular function (which is a part of the Date object in JavaScript), I have also implemented the method myself. It can be found bellow (dateToWeekday).
  let initWeekDay = new Date(year, month, 1).getDay() - 1;

  // Manually correct the initWeekDay if the first day of the month is Sunday, since JavaScript counts Sundays as index 0, Mondays as index 1 etc., while I count Mondays as index 0, Tuesdays as 1 etc.
  if (initWeekDay === -1) {
    initWeekDay = 6
  }

  // Counter used to fill in the 2D array
  let offset = 0 - initWeekDay;
  // 6x7 array corresponding to 6 7-day weeks in a calendar month
  const monthMatrix = new Array(6).fill(null).map(() => {
    return new Array(7).fill(null).map(() => {
      offset++;
      return new Date(year, month, offset);
    });
  });

  return monthMatrix;
}


export function getScrollMenu(month) {
  // 7x1 array of offsets: 
  // [currentMonth-3, currentMonth-2, currentMonth-1, currentMonth, currentMonth+1, currentMonth+2, currentMonth+3],
  // representing the relation between current month and other months in the scroll menu
  return [month-3, month-2, month-1, month, month+1, month+2, month+3];
}


export function validateCustomDateData(data) {
  // The format has to be of shape DD-MM-YYYY. The year has to be numeric, while month has to be numeric and within [1-12] interval. Reject the input otherwise.

  let splitData = data.split('-');
  if (splitData.length !== 3) {
    return false;
  }

  const [day, monthIndex, year] = splitData;

  if (isNaN(monthIndex) || monthIndex <= 0 || monthIndex > 12) {
    return false;
  }
  if (isNaN(year)) {
    return false;
  }
  // This check is not neccessary but is there for the sake of completion
  if (isNaN(day) || day <= 0 || day > 31) {
    return false;
  }

  return [monthIndex, year];
}


export function validateHolidayData(elementKey, elementProperty = '') {
  // The format has to be of shape DD-MM: 'someString'. The day and month have to be within bounds ((0 < day <= 31, 0 < month <= 12))

  let splitElementKey = elementKey.split('-');
  if (splitElementKey.length !== 2) {
    return false;
  }

  let [day, monthIndex] = splitElementKey;

  if (isNaN(day) || isNaN(monthIndex)) {
    return false;
  }
  else if (day <= 0 || day > 31 || monthIndex <= 0 || monthIndex > 12) {
    return false;
  }
  else if (elementProperty === 'true'){
    return [Number(day), Number(monthIndex), true];
  }
  else {
    // If property is anything other than 'true', default it to false.
    return [Number(day), Number(monthIndex), false];
  }
}


/* 
  This function works in the same way as Date.getDay() method, which returns the index of day-of-the-week for specific date. It is based on Gauss's algorithm for determining the day-of-the-week (weekday) of January 1. for any given year. It then adds the month offset and day to compute the weekday of any date. More on that can be read at: https://en.wikipedia.org/wiki/Determination_of_the_day_of_the_week
*/

// Tables of month offsets for both leap and non-leap years
const nonLeapMonthOffsets = [0, 3, 3, 6, 1, 4, 6, 2, 5, 0, 3, 5];
const leapMonthOffsets = [0, 3, 4, 0, 2, 5, 0, 3, 6, 1, 4, 6];

export function dateToWeekday(day, month, year){

  // Determine the day-of-the-week (weekday) of January 1. for specific year using Gauss's algorithm. 
  const initWeekDay = (1 + 5 * ((year - 1) % 4) + 4 * ((year - 1) % 100) + 6 * ((year - 1) % 400)) % 7;

  // Get month offset from one of the arrays defined above
  let monthOffset = isLeapYear(year) ? leapMonthOffsets[month-1] : nonLeapMonthOffsets[month-1];

  // Return the day-of-the-week of the date specified in the function argument
  return (initWeekDay + day - 1 + monthOffset) % 7;
}


function isLeapYear(year) {
  // Check if year is leap year: it is divisible by 400 or divisible by 4 and not 100
  if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)){
    return true;
  }
  return false;
}