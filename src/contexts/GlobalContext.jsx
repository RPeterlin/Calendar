import { createContext, useContext, useEffect, useState } from "react";
import { validateHolidayData } from '../utils';


const GlobalContext = createContext();


export function GlobalProvider({ children }) {

  // 'currentMonth' and 'currentYear' stand for the month/year the user is currently viewing, while the currentDate represent the time at that moment (now).
  const currentDate = new Date(Date());
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  // 'errorMessage' belongs to the 'CustomForm' component but is defined here because setState function needs to be exposed to other components.
  const [errorMessage, setErrorMessage] = useState('');

  // 12x31 lookup-table, where each element is either 0 (normal day), 1 (holiday) or 2(double holiday)
  const [holidayLookupTable, setHolidayLookupTable] = useState([]);


  // Read (or rather fetch) the data from public/data folder and fill in the holidayLookupTable
  useEffect(()=>{
    fetch('data/data.json')
      .then(function(response){
        return response.json();
      })
      .then(function(data) {
        // Define a 12x31 lookup-table of zeros
        const holidayTable = new Array(12).fill(null).map(() => {
          return new Array(31).fill(0);
        });

        // Fill the table
        Object.keys(data).map((date) => {
          // Validate each key-value pair (right format and numeric values)
          const validatedData = validateHolidayData(date, data[date]?.dvojni);

          // If validation check is passed, save the holiday into lookup table
          if (validatedData) {
            const [day, month, isDouble] = validatedData;
            isDouble ? holidayTable[month-1][day-1] = 2 : holidayTable[month-1][day-1] = 1;
          }
        });

        // Save the filled-in table in a state
        setHolidayLookupTable(holidayTable);
      })
      .catch((e) => console.log("Couldn't read holidays. Skipping it..."));
  },[]);

  // Enums (of a sort) of hardcoded values used for headers
  const daysOfTheWeek = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sun',
  ];
  const monthsOfTheYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Expose states and functions to the whole app
  const value = {
    currentDate,
    currentMonth,
    setCurrentMonth,
    currentYear,
    setCurrentYear,
    daysOfTheWeek,
    monthsOfTheYear,
    errorMessage,
    setErrorMessage,
    holidayLookupTable,
  } 

  return (
    <GlobalContext.Provider value={value}>
      { children }
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}