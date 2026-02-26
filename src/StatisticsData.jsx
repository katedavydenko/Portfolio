import {students} from './data';
import { useState } from 'react';
import styles from './App.module.css';
function StatisticsData() {
  const getAverage = (grades) => grades.reduce((a, b) => a + b, 0) / grades.length;
  const totalAverage = students.reduce((acc, student) => {
    return acc + getAverage(student.grades);
  }, 0) / students.length;

  const sortedStudents = [...students].sort((a, b) => {
  const avgA = a.grades.reduce((sum, g) => sum + g, 0) / a.grades.length;
  const avgB = b.grades.reduce((sum, g) => sum + g, 0) / b.grades.length;
  return avgB - avgA; 

});
  const [showHelp, setShowHelp] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  const filteredStudents = students.filter(student => getAverage(student.grades) >= 60);

  const studentsToShow = filterActive ? filteredStudents : students;
  const [activeTab, setActiveTab] = useState('list'); // default


  return (
    <div className={styles.appContainer}>
      
      <div className={styles.feed}>
        <div className={styles.filters}>
        <button onClick={() => setFilterActive(!filterActive)}>
          {filterActive ? "Показати всіх" : "Показати тільки успішних"}
        </button>
        
      </div>

        {studentsToShow.map(student => {
          const avg = getAverage(student.grades);
          return (
            <li key={student.id} style={{ marginBottom: '10px' }}>
              <strong>{student.name}</strong> — Бал: {avg.toFixed(1)}{' '}
              <span style={{ color: avg >= 60 ? 'green' : 'red' }}>
                {avg >= 60 ? 'Зараховано' : 'Незараховано'}
              </span>
            </li>
          );
        })}
      </div>
      
      <p >Середній бал усіх студентів: {totalAverage.toFixed(2)} </p>
        
      <div className={styles.filters}>
        <button onClick={() => setShowHelp(!showHelp)}>
        {showHelp ? "Приховати інструкцію" : "Показати інструкцію"}
        </button>

        {showHelp && (
        <p>Довідка: Дозволяє керувати списками студентів.</p>
      )}
      </div>
    </div>
  );
}

export default StatisticsData;