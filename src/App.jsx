import { useState } from 'react';
import StudentList from './StudentList';
import StatisticsData from './StatisticsData';
import AboutAuthor from './AboutAuthor';
import styles from './App.module.css';

function App() {
  const [activeTab, setActiveTab] = useState('list');

  return (
    <div className={styles.appContainer}>
      <div className={styles.filters}>
        <button onClick={() => setActiveTab('list')} className={activeTab === 'list' ? styles.active : ''}>
          Student List
        </button>

        <button onClick={() => setActiveTab('stats')} className={activeTab === 'stats' ? styles.active : ''}>
          Statistics
        </button>

        <button onClick={() => setActiveTab('about')}className={activeTab === 'about' ? styles.active : ''}>
          About Author
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'list' && <StudentList />}
        {activeTab === 'stats' && <StatisticsData />}
        {activeTab === 'about' && <AboutAuthor />}
      </div>
    </div>
  );
}

export default App;