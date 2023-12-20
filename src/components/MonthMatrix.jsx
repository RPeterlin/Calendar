import { useGlobalContext } from '../contexts/GlobalContext';
import { getMonthMatrix } from '../utils';
import styles from '../styles/Calendar.module.css';


function MonthMatrix() {
  // Access the current month and year from the global context
  const { currentMonth, currentYear } = useGlobalContext();

  // 6x7 array corresponding to the current calendar month
  const monthMatrix = getMonthMatrix(currentYear, currentMonth);

  return (
    <div className={styles.matrixContainer}>
      {/* Transform each row of a given matrix into a Week component */}
      {monthMatrix.map((row, ind) => 
        <Week week={row} key={ind} />)}
    </div>
  )
}

function Week({ week }){
  return (
    <div className={styles.matrixRow}>
      {/* Transform each element of a given row into a Day component*/}
      {week.map((day, ind) => 
      <Day 
        key={ind} 
        day={day} 
        dayIndex={ind}
      />)}
    </div>
  );
}

function Day({ day, dayIndex }) {

  // Access the current month from the global context
  const { currentDate, currentMonth, holidayLookupTable } = useGlobalContext();
  
  // The date belongs to the month we are currently viewing
  const partOfCurrentMonth = Boolean(day.getMonth() === currentMonth);

  // The date corresponds to holidays (single or double)
  let isSingleHoliday = false;
  let isDoubleHoliday = false;
  if (holidayLookupTable.length) {
    // Fetch promise has resolved - table is available
    isSingleHoliday = holidayLookupTable[day.getMonth()][day.getDate()-1] === 1;
    isDoubleHoliday = holidayLookupTable[day.getMonth()][day.getDate()-1] === 2;
  }

  // The date is today (matches the present date)
  const isToday = currentDate.toDateString() === day.toDateString();

  // The date is Sunday
  const isSunday = dayIndex === 6;

  return (
    // Add base class of 'matrixElement' to each div. Additionally add a class if the date: 
    // - is not part of the current moth,
    // - is today (matches the the present date)
    // - is Sunday
    // - corresponds to basic holiday
    // - corresponds to double holidays
    <div className={`
      ${styles.matrixElement}
      ${!partOfCurrentMonth ? styles.grayTxt : ''}
      ${isToday ? styles.today : ''}
      ${isSunday ? styles.sunday : ''}
      ${isSingleHoliday ? styles.singleHoliday : ''}
      ${isDoubleHoliday ? styles.doubleHoliday : ''}
      `}>
      {day.getDate()}
    </div>
  );
}

export default MonthMatrix