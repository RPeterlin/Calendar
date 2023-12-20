import { useGlobalContext } from '../contexts/GlobalContext';
import { useState } from 'react';
import { validateCustomDateData } from '../utils';
import styles from '../styles/Form.module.css';

function CustomDateForm() {

  // Access variables in global context
  const { 
    currentDate, 
    currentMonth, 
    setCurrentMonth, 
    currentYear,
    setCurrentYear, 
    errorMessage,
    setErrorMessage,
  } = useGlobalContext();

  // State that tracks the content in the input field
  const [customDate, setCustomDate] = useState(`${currentDate.getDate()}-${currentMonth}-${currentYear}`);


  function handleReset(e) {
    // Handler that sets the month-year (that the user is viewing) to the current month-year

    e.preventDefault();
    setCurrentMonth(currentDate.getMonth());
    setCurrentYear(currentDate.getFullYear());
    setErrorMessage('');
  }

  
  function handleSubmit(e) {
    // Event handler that prevents the submission of the form, validates the input field and finally updates the states or sets the error state if the inputs were in the wrong format.

    e.preventDefault();

    try {
      // Month and year are not extractable from user input or non-numeric
      const validatedData = validateCustomDateData(customDate);
      if (!validatedData) {
        setErrorMessage('Please enter a valid date (DD-MM-YYYY).');
        return;
      }

      let [monthIndex, year] = validatedData;
      monthIndex = Number(monthIndex);
      year = Number(year);

      setErrorMessage('');
      setCustomDate('');
      setCurrentMonth(monthIndex - 1);
      setCurrentYear(year);
    }
    catch (error) {
      setErrorMessage('Please enter a valid date (DD-MM-YYYY).');
      return;
    }
  }

  return (
    <form className={styles.dateSelectionForm}>

      {/* Label and input */}
      <div className={styles.labelInput}>
        <label htmlFor='dateInput'>Enter a custom date:</label>
        <input 
          id='dateInput' 
          value={customDate} 
          onChange={(event) => setCustomDate(event.target.value)}
        />
      </div>
    
      {/* Display error message if it exists */}
      {errorMessage && <div className={styles.errorMsg}>
        {errorMessage}
      </div>}

      {/* Submit and Go-to-current-date button */}
      <div className={styles.buttonGroup}> 
        <button 
          className={styles.submitButton}
          type='submit' 
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button className={styles.resetButton} onClick={handleReset}>
          Move to current date
        </button>
      </div>
    </form>
  );
}

export default CustomDateForm