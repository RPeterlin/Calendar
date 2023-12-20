import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import styles from './styles/App.module.css';
import CustomDateForm from './components/CustomDateForm';
import './styles/general.css';


function App() {
  return (
    <div className={styles.app}>
      <Sidebar />

      <div className={styles.main}>
        <Calendar />

        {/* Form that allows users to manually type the date to which the calendar then shifts */}
        <CustomDateForm />
      </div>
    </div>
  );
}

export default App;
