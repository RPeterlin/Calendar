import MonthMatrix from './MonthMatrix';
import { useGlobalContext } from '../contexts/GlobalContext';
import styles from '../styles/Calendar.module.css';


function Calendar() {

  // Access variables in global context
  const { 
    currentMonth,
    currentYear, 
    monthsOfTheYear,
  } = useGlobalContext();

  return (
    <div className={styles.calendarLayout}>

      {/* Displays the 'Month, year' */}
      <div className={styles.currentInfo}>
        {monthsOfTheYear[currentMonth]}, {currentYear} 
      </div>

      {/* Header of days in each week (Mon... Sun) */}
      <WeekDaysHeader />

      {/* Calendar month displayed as 2D table */}
      <MonthMatrix />
    </div>
  );
}

// Component that represents 'Mon Tue Wed ...' header above the calendar
function WeekDaysHeader() {

  // Access variables in global context
  const { daysOfTheWeek } = useGlobalContext();

  return (
    <div className={styles.weekDaysHeader}>
      {daysOfTheWeek.map((day, ind) => 
        <div className={styles.weekDay} key={ind}>
          {day}
        </div>
      )}
    </div>
  );
}

export default Calendar