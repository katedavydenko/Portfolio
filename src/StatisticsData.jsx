import { students } from './data';
import { useState } from 'react';
import styles from './App.module.css';

function StatisticsData() {
  const [filterActive, setFilterActive] = useState(false);
  
  const [showHelp, setShowHelp] = useState(false);
  const getAverage = (grades) => {
    if (!grades || grades.length === 0) return null;
    return grades.reduce((a, b) => a + b, 0) / grades.length;
  };

  const filteredStudents = students.filter(student => {
    const avg = getAverage(student.grades);
    return avg !== null && avg >= 60;
  });

  const studentsToShow = filterActive ? filteredStudents : students;

  return (
    <div className={styles.appContainer}>

      <div className={styles.filters}>
        <button onClick={() => setFilterActive(!filterActive)}>
          {filterActive ? "Показати всіх" : "Показати тільки успішних"}
        </button>
      </div>

      {studentsToShow.length === 0 ? (
        <p>За вашим запитом нікого не знайдено</p>
      ) : (
        <ul>
          {studentsToShow.map(student => {
            const avg = getAverage(student.grades);

            return (
              <li key={student.id} style={{ marginBottom: '10px' }}>
                <strong>{student.name}</strong> — Бал:{' '}

                {avg !== null ? avg.toFixed(1) : "Оцінка відсутня"}{' '}

                {avg !== null && (
                  <span style={{ color: avg >= 60 ? 'green' : 'red' }}>
                    {avg >= 60 ? 'Зараховано' : 'Незараховано'}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
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