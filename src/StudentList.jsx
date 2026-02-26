import { students } from './data';

function StudentList() {
  const getAverage = (grades) =>
    grades.reduce((a, b) => a + b, 0) / grades.length;

  return (
    <div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {students.map((student) => {

          return (
            <li key={student.id} style={{ marginBottom: '12px' }}>
              <strong>{student.name}</strong> — {student.faculty}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default StudentList;