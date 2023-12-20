import { getScrollMenu } from '../utils';
import { useGlobalContext } from '../contexts/GlobalContext';
import styles from '../styles/Sidebar.module.css';


function Sidebar() {

  // Access variables in global context
  const { 
    currentMonth, 
    setCurrentMonth, 
    currentYear,
    setCurrentYear, 
    monthsOfTheYear, 
    setErrorMessage,
  } = useGlobalContext();

  // Construct 7x1 array of offsets: 
  // [currentMonth-3, currentMonth-2, currentMonth-1, currentMonth, currentMonth+1, ...],
  // representing the relation between current month and other months in the scroll menu
  const scrollMenu = getScrollMenu(currentMonth);

  function handleClick(monthIndex) {
    // Event handler that switches the current month/year to the selected one. If the index of the clicked month is greater or equal to 12, start at the beginning of the next year. If the index is negative, go back to previous year. Otherwise update the current month accordingly. 

    if (monthIndex >= 12) {
      setCurrentMonth(monthIndex % 12);
      setCurrentYear(currentYear + 1);
    }
    else if (monthIndex < 0) {
      setCurrentMonth(12 + monthIndex)
      setCurrentYear(currentYear - 1);
    }
    else {
      setCurrentMonth(monthIndex)
    }
    setErrorMessage('');
  }

  return (
    <div className={styles.siderbarContainer}>
      <div className={styles.scrollMenuContainer}>
        {scrollMenu.map((monthIndex) => 
          <div 
            className={styles.scrollMenuItem}
            key={monthIndex} 
            onClick={() => handleClick(monthIndex)}
          >
            {/* Display the first 3 letters of month's name. Also indices in scroll menu are circular: -1 = 11 (mod 12) */}
            {monthsOfTheYear[monthIndex >= 0 ? (monthIndex % 12) : (12 + monthIndex)].slice(0, 3)}
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar